import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import moment from 'moment';
import toDate from '../utils/toDate';
import generateUid from '../utils/generateUid';

const config = {
  apiKey: 'AIzaSyBueBSEoCL7Frc_nY5tfJgdqQ6ROyDhCN8',
  authDomain: 'etimetracking.firebaseapp.com',
  databaseURL: 'https://etimetracking.firebaseio.com',
  projectId: 'etimetracking',
  storageBucket: 'etimetracking.appspot.com',
  messagingSenderId: '1056832095843',
  appId: '1:1056832095843:web:82e6b049b0bf592f209a56',
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (
  userAuth,
  additionalData,
) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;
    let name = displayName ? displayName : additionalData.displayName;
    const createdAt = new Date();
    let after7Days = new Date();
    after7Days.setDate(after7Days.getDate() + 7);

    const id = generateUid();
    const customerId = Math.floor(100000 + Math.random() * 9000);
    try {
      await userRef.set({
        userId: userAuth.uid,
        displayName: name,
        customerNumber: customerId,
        email,
        createdAt,
        photoURL: photoURL ? photoURL : null,
        hasPaid: false,
        paidAmount: null,
        employeesAllowed: 3,
        workspacesLimit: 3,
        isOnTrial: true,
        trialEndsAt: after7Days,
        workspacesList: [
          {
            workspaceId: id,
            workspaceName: `${name}'s workspace`,
            userRole: 'owner',
          },
        ],
        ...additionalData,
      });

      const workspaceRef = firestore.collection('workspaces').doc(id);

      await workspaceRef.set({
        createdAt: new Date(),
        customerNumber: customerId,
        workspaceId: id,
        workspaceName: `${name}'s workspace`,
        workspaceOwnerId: userAuth.uid,
        logoURL: null,
        whoCategories: 'admin',
        whoProjects: 'admin',
        whoClients: 'admin',
        billableRate: 0,
        workspaceMembers: [
          {
            role: 'owner',
            userId: userAuth.uid,
            employeeNumber: 0,
            displayName: name,
            email,
            address: null,
            phoneNumber: null,
            invitationAccepted: true,
          },
        ],
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const checkUserRole = async (userData1) => {
  let userData = userData1;
  let allInvitations = [];

  const invitationRef = firestore
    .collection('invitations')
    .where('invitedUserEmail', '==', userData.email)
    .where('invitationAccepted', '==', false);

  const invitationSnapshot = await invitationRef.get();

  invitationSnapshot.forEach((doc) => {
    allInvitations.push(doc.data());
  });

  if (userData.isOnTrial === true) {
    const trialEndDate = toDate(userData.trialEndsAt);

    const days7After = moment(trialEndDate);
    const rightNow = moment();
    const trialEnded = days7After.isBefore(rightNow);

    if (trialEnded) {
      const userRef = firestore
        .collection('users')
        .doc(userData.userId);

      try {
        await userRef.update({
          isOnTrial: false,
          workspacesLimit: 0,
          employeesAllowed: 0,
        });

        userData.isOnTrial = false;
        userData.workspacesLimit = 0;
        userData.employeesAllowed = 0;
      } catch (error) {
        console.log(error);
      }

      return {
        newUserData: userData,
        selectedWorkspace: null,
        allInvitations,
      };
    }

    return {
      newUserData: userData,
      selectedWorkspace: userData.workspacesList[0],
      allInvitations,
    };

    // if trial has not ended then we will assign a user with selectedWorkspace and that selected workspace will be determined from the workspace he is already a owner of. workspacesList[0]
    // it will be better if I can start exec of a action called changeSelectedWorkspace
    // add a saga which starts fetching workspace document whenever workspace change is detected by it.

    // try to return userData and workspace object which is to be added to workspace reducer.
  } else if (
    userData.hasPaid === true &&
    userData.isOnTrial === false
  ) {
    console.log('Paid USer');

    return {
      newUserData: userData,
      selectedWorkspace: userData.workspacesList[0],
      allInvitations,
    };
    // it will be better if I can start exec of a action called changeSelectedWorkspace which selects a workspace

    //
  } else if (
    userData.hasPaid === false &&
    userData.isOnTrial === false
  ) {
    console.log('Un Paid USer');

    return {
      newUserData: userData,
      selectedWorkspace: userData.workspacesList[0],
      allInvitations,
    };
    // it will be better if I can start exec of a action called changeSelectedWorkspace which selects a workspace
    // has not paid === is a employee account or one whose trial is ended.
  }
  // Here add the logic of checking whether user
  // is a owner of some repo or an employee
  // or a trial person
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () =>
  auth.signInWithPopup(googleProvider);

export default firebase;
