import {
  takeLatest,
  put,
  all,
  call,
  select,
} from 'redux-saga/effects';

import WorkspaceActionTypes from './workspace.types';

import {
  updateSelectedWorkspaceDataStart,
  updateSelectedWorkspaceDataSuccess,
  updateSelectedWorkspaceDataFailure,
  addWorkspaceSuccess,
  addWorkspaceFailure,
  removeWorkspaceFailure,
  removeWorkspaceSuccess,
  updateLogoSuccess,
  updateLogoFailure,
  updateWorkspaceSettingsSuccess,
  updateWorkspaceSettingsFailure,
  abcNew,
} from './workspace.actions';

import { firestore } from '../../firebase/firebase.utils';
import generateUid from '../../utils/generateUid';
import { linearAlertBottom } from '../../utils/swalMixins';
import uploadImageToStorage from '../../utils/uploadImageToStorage';

export function* fetchWorkspaceData() {
  yield put(updateSelectedWorkspaceDataStart());
  try {
    const getWorkspaceId = (state) =>
      state.workspace.selectedWorkspace.workspaceId;

    let workspaceId = yield select(getWorkspaceId);

    const workspaceRef = firestore
      .collection('workspaces')
      .doc(workspaceId);

    const workspaceSnapshot = yield workspaceRef.get();

    const workspaceData = yield workspaceSnapshot.data();

    yield put(updateSelectedWorkspaceDataSuccess(workspaceData));
  } catch (error) {
    console.log(error);
    put(updateSelectedWorkspaceDataFailure);
  }
}

export function* createWorkspace({ payload }) {
  try {
    let {
      workspaceName,
      userId,
      workspacesList,
      customerNumber,
    } = payload;

    const getCurrentUser = (state) => state.user.currentUser;

    let currentUser = yield select(getCurrentUser);

    const workspaceId = yield call(generateUid);

    const userRef = firestore.collection('users').doc(userId);
    const workspaceRef = firestore
      .collection('workspaces')
      .doc(workspaceId);

    yield workspaceRef.set({
      createdAt: new Date(),
      billableRate: 0,
      workspaceId,
      customerNumber,
      workspaceName: workspaceName,
      workspaceOwnerId: userId,
      logoURL: null,
      whoCategories: 'admin',
      whoProjects: 'admin',
      whoClients: 'admin',
      workspaceMembers: [
        {
          role: 'owner',
          userId: currentUser.userId,
          employeeNumber: 0,
          displayName: currentUser.displayName,
          email: currentUser.email,
          address: currentUser.address ? currentUser.address : null,
          phoneNumber: currentUser.phoneNumber
            ? currentUser.phoneNumber
            : null,
          invitationAccepted: true,
        },
      ],
    });

    const workspaceObjToAdd = {
      userRole: 'owner',
      workspaceId,
      workspaceName,
    };

    yield workspacesList.push(workspaceObjToAdd);

    yield userRef.update({
      workspacesList,
    });

    yield put(addWorkspaceSuccess(workspaceObjToAdd));
    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Workspace Created',
    });
  } catch (error) {
    console.log(error);
    yield put(addWorkspaceFailure());
  }
}

export function* removeWorkspace({ payload }) {
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

export function* updateLogo({ payload }) {
  try {
    const { image, workspaceId } = payload;
    const imageURL = yield uploadImageToStorage(
      image,
      '/workspaceLogos',
    );

    const workspaceRef = firestore
      .collection('workspaces')
      .doc(workspaceId);
    yield workspaceRef.update({
      logoURL: imageURL,
    });

    yield put(updateLogoSuccess(imageURL));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Company logo updated',
    });
  } catch (error) {
    console.log(error);
    yield put(updateLogoFailure());
  }
}

export function* updateWorkspaceSettings({ payload }) {
  try {
    const {
      whoProjects,
      whoCategories,
      whoClients,
      workspaceId,
      billableRate,
    } = payload;

    const workspaceRef = firestore
      .collection('workspaces')
      .doc(workspaceId);

    let objectToUpdate;

    if (billableRate) {
      objectToUpdate = {
        whoProjects,
        whoCategories,
        whoClients,
        billableRate,
      };
    } else {
      objectToUpdate = {
        whoProjects,
        whoCategories,
        whoClients,
      };
    }

    yield workspaceRef.update(objectToUpdate);

    if (billableRate) {
      yield put(abcNew(billableRate));
    } else {
      yield put(updateWorkspaceSettingsSuccess(objectToUpdate));
    }

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Workspace Settings updated',
    });
  } catch (error) {
    console.log(error);
    yield put(updateWorkspaceSettingsFailure());
  }
}

export function* onChangeSelectedWorkspace() {
  yield takeLatest(
    WorkspaceActionTypes.CHANGE_SELECTED_WORKSPACE,
    fetchWorkspaceData,
  );
}

export function* onAddWorkspaceStart() {
  yield takeLatest(
    WorkspaceActionTypes.ADD_WORKSPACE_START,
    createWorkspace,
  );
}

export function* onRemoveWorkspaceStart() {
  yield takeLatest(
    WorkspaceActionTypes.REMOVE_WORKSPACE_START,
    removeWorkspace,
  );
}

export function* onUpdateLogoStart() {
  yield takeLatest(
    WorkspaceActionTypes.UPDATE_LOGO_START,
    updateLogo,
  );
}

export function* onUpdateWorkspaceSettingsStart() {
  yield takeLatest(
    WorkspaceActionTypes.UPDATE_WORKSPACE_SETTINGS_START,
    updateWorkspaceSettings,
  );
}

export function* workspaceSagas() {
  yield all([
    call(onChangeSelectedWorkspace),
    call(onAddWorkspaceStart),
    call(onRemoveWorkspaceStart),
    call(onUpdateLogoStart),
    call(onUpdateWorkspaceSettingsStart),
  ]);
}
