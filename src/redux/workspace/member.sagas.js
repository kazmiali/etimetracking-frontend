import { takeLatest, put, all, call } from 'redux-saga/effects';
import firebase from 'firebase/app';

import WorkspaceActionTypes from './workspace.types';

import {
  addWorkspaceSuccess,
  addWorkspaceFailure,
  removeWorkspaceFailure,
  removeWorkspaceSuccess,
  acceptInvitationSuccess,
  declineInvitationFailure,
  declineInvitationSuccess,
  changeMemberRoleSuccess,
  changeMemberRoleFailure,
} from './workspace.actions';

import { firestore } from '../../firebase/firebase.utils';
import generateUid from '../../utils/generateUid';
import { linearAlertBottom } from '../../utils/swalMixins';

export function* addMember({ payload }) {
  // give back the toBeAddToMemebersList
  try {
    let {
      toBeAddedIntoWorkspaceMembers,
      invitationDoc,
      workspaceMembers,
    } = payload;

    // Adding into Workspace's memebers Array
    workspaceMembers.push(toBeAddedIntoWorkspaceMembers);

    const workspaceRef = firestore
      .collection('workspaces')
      .doc(invitationDoc.workspaceId);

    workspaceRef.update({
      workspaceMembers: workspaceMembers,
    });

    const invitationId = yield call(generateUid);

    const invitationRef = firestore
      .collection('invitations')
      .doc(invitationId);

    yield invitationRef.set({
      invitationId,
      ...invitationDoc,
    });

    yield put(addWorkspaceSuccess(toBeAddedIntoWorkspaceMembers));
    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Invitation Send Successfully',
    });
  } catch (error) {
    console.log(error);
    yield put(addWorkspaceFailure());
  }
}

export function* removeMember({ payload }) {
  // give back the email
  const { workspace, workspacesList, userId } = payload;
  try {
    const removedWorkspacesList = workspacesList.filter(
      (item) => item.workspaceId !== workspace.workspaceId,
    );

    const userRef = firestore.collection('users').doc(userId);
    const workspaceRef = firestore
      .collection('workspaces')
      .doc(workspace.workspaceId);

    yield userRef.update({
      workspacesList: removedWorkspacesList,
    });

    yield workspaceRef.delete();
    yield linearAlertBottom.fire({
      icon: 'warning',
      title: 'Workspace Deleted',
    });
    yield put(removeWorkspaceSuccess(workspace));
  } catch (error) {
    console.log(error);
    yield put(removeWorkspaceFailure());
  }
}

export function* acceptInvitation({ payload }) {
  try {
    //  1.Delete the invitation
    //  2.Add the user information in the workspace Members Array
    //  3.Add the workspace to the workspaceList of the accepting user document.

    let { invitation, currentUser } = payload;
    const workspaceRef = firestore
      .collection('workspaces')
      .doc(invitation.workspaceId);

    const workspaceSnapshot = yield workspaceRef.get();
    let workspaceData = yield workspaceSnapshot.data();

    let workspaceMembers = [...workspaceData.workspaceMembers];

    let oneObjArray = yield workspaceMembers.filter(
      (member) => member.email === invitation.invitedUserEmail,
    );

    let otherObjArray = yield workspaceMembers.filter(
      (member) => member.email !== invitation.invitedUserEmail,
    );

    let myObj = oneObjArray[0];

    myObj.userId = currentUser.userId;
    myObj.displayName = currentUser.displayName;
    myObj.invitationAccepted = true;
    myObj.address = currentUser.address ? currentUser.address : null;
    myObj.phoneNumber = currentUser.phoneNumber
      ? currentUser.phoneNumber
      : null;

    yield otherObjArray.push(myObj);

    const workspaceRefNew = firestore
      .collection('workspaces')
      .doc(invitation.workspaceId);

    yield workspaceRefNew.update({
      workspaceMembers: otherObjArray,
    });

    // deleting the invitation object
    const invitationRef = firestore
      .collection('invitations')
      .doc(invitation.invitationId);

    console.log('invitationRef', invitationRef);

    yield invitationRef.delete();

    // adding to workspaceList

    const addToWorkspacesList = {
      userRole: 'member',
      workspaceId: invitation.workspaceId,
      workspaceName: invitation.workspaceName,
    };

    const userRef = firestore
      .collection('users')
      .doc(currentUser.userId);

    yield userRef.update({
      workspacesList: firebase.firestore.FieldValue.arrayUnion(
        addToWorkspacesList,
      ),
    });

    yield put(
      acceptInvitationSuccess({
        addToWorkspacesList: addToWorkspacesList,
        invitationId: invitation.invitationId,
      }),
    );
    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Invitation Send Successfully',
    });

    yield put(acceptInvitationSuccess());
  } catch (error) {
    console.log(error);
  }
}

export function* declineInvitation({ payload }) {
  try {
    //  1.Delete the invitation
    //  2.REMOVE the user information object from workspace Members Array

    let { invitation } = payload;

    const workspaceRef = firestore
      .collection('workspaces')
      .doc(invitation.workspaceId);

    const workspaceSnapshot = yield workspaceRef.get();
    let workspaceData = yield workspaceSnapshot.data();

    let workspaceMembers = [...workspaceData.workspaceMembers];

    let otherObjArray = workspaceMembers.filter(
      (member) => member.email !== invitation.invitedUserEmail,
    );

    yield workspaceRef.update({
      workspaceMembers: otherObjArray,
    });

    // deleting the invitation object
    const invitationRef = firestore
      .collection('invitations')
      .doc(invitation.invitationId);

    yield invitationRef.delete();

    yield put(
      declineInvitationSuccess({
        invitationId: invitation.invitationId,
      }),
    );

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Invitation Declined Successfully',
    });
  } catch (error) {
    yield put(declineInvitationFailure());
    console.log(error);
  }
}

export function* changeMemberRole({ payload }) {
  // 1.  find user by workspaceList object in the payload
  //     get workspaceList and find the object and change it and update the user
  // 2.  fetch the worksapce by the workspaceId in the object provided
  try {
    let { userId, workspaceId, newRole } = payload;

    const userRef = firestore.collection('users').doc(userId);

    const userSnap = yield userRef.get();
    const userData = yield userSnap.data();

    const targetArrayUser = userData.workspacesList.filter(
      (item) => item.workspaceId === workspaceId,
    );
    const otherArrayUser = userData.workspacesList.filter(
      (item) => item.workspaceId !== workspaceId,
    );

    let targetObjUser = targetArrayUser[0];

    targetObjUser.userRole = newRole;

    const workspacesList = [...otherArrayUser, targetObjUser];

    yield userRef.update({
      workspacesList,
    });

    const workspaceRef = firestore
      .collection('workspaces')
      .doc(workspaceId);

    const workspaceSnapshot = yield workspaceRef.get();
    const workspaceData = yield workspaceSnapshot.data();

    const targetArrayWorkspace = workspaceData.workspaceMembers.filter(
      (member) => member.userId === userId,
    );
    const otherArrayWorkspace = workspaceData.workspaceMembers.filter(
      (member) => member.userId !== userId,
    );

    let targetObjWorkspace = targetArrayWorkspace[0];

    targetObjWorkspace.role = newRole;

    const workspaceMembers = [
      ...otherArrayWorkspace,
      targetObjWorkspace,
    ];

    yield workspaceRef.update({
      workspaceMembers,
    });

    yield put(
      changeMemberRoleSuccess({
        workspaceMembers,
      }),
    );

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Changed Member Role Successfully',
    });
  } catch (error) {
    console.log(error);
    yield put(changeMemberRoleFailure());
  }
}

export function* onAddMemberStart() {
  yield takeLatest(WorkspaceActionTypes.ADD_MEMBER_START, addMember);
}

export function* onRemoveMemberStart() {
  yield takeLatest(
    WorkspaceActionTypes.REMOVE_MEMBER_START,
    removeMember,
  );
}

export function* onAcceptInvitationStart() {
  yield takeLatest(
    WorkspaceActionTypes.ACCEPT_INVITATION_START,
    acceptInvitation,
  );
}

export function* onDeclineInvitationStart() {
  yield takeLatest(
    WorkspaceActionTypes.DECLINE_INVITATION_START,
    declineInvitation,
  );
}

export function* onChangeMemberRoleStart() {
  yield takeLatest(
    WorkspaceActionTypes.CHANGE_MEMBER_ROLE_START,
    changeMemberRole,
  );
}

export function* memberSagas() {
  yield all([
    call(onAddMemberStart),
    call(onRemoveMemberStart),
    call(onAcceptInvitationStart),
    call(onDeclineInvitationStart),
    call(onChangeMemberRoleStart),
  ]);
}
