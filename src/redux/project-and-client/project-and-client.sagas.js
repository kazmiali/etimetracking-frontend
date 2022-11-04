import { takeLatest, put, all, call } from 'redux-saga/effects';
import { firestore } from '../../firebase/firebase.utils';
import { linearAlertBottom } from '../../utils/swalMixins';
import generateUid from '../../utils/generateUid';
import ProjectAndClientActionTypes from './project-and-client.types';

import {
  addClientSuccess,
  fetchClientsSuccess,
  fetchClientsFailure,
  removeClientFailure,
  removeClientSuccess,
  addProjectSuccess,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  removeProjectFailure,
  removeProjectSuccess,
  updateProjectFailure,
  updateProjectSuccess,
} from './project-and-client.actions';

export function* addClient({ payload }) {
  try {
    const clientData = payload;
    const clientId = yield call(generateUid);
    const clientRef = firestore.collection('clients').doc(clientId);
    const clientObj = {
      clientId,
      createdAt: new Date(),
      ...clientData,
    };

    yield clientRef.set(clientObj);
    yield put(addClientSuccess(clientObj));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Client Created',
    });
  } catch (error) {
    console.log(error);
    yield linearAlertBottom.fire({
      icon: 'danger',
      title: 'Client not created',
    });
  }
}

export function* addProject({ payload }) {
  try {
    const projectData = payload;
    const projectId = yield call(generateUid);
    const projectRef = firestore
      .collection('projects')
      .doc(projectId);
    const projectObj = {
      projectId,
      createdAt: new Date(),
      ...projectData,
    };

    yield projectRef.set(projectObj);
    yield put(addProjectSuccess(projectObj));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Project Created',
    });
  } catch (error) {
    console.log(error);
    yield linearAlertBottom.fire({
      icon: 'danger',
      title: 'Project not created',
    });
  }
}

export function* removeClient({ payload }) {
  try {
    const clientId = payload;

    const clientRef = firestore.collection('clients').doc(clientId);

    yield clientRef.delete();

    yield put(removeClientSuccess(clientId));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Client Removed',
    });
  } catch (error) {
    console.log(error);
    yield put(removeClientFailure());
    yield linearAlertBottom.fire({
      icon: 'danger',
      title: 'Client not removed',
    });
  }
}

export function* removeProject({ payload }) {
  try {
    const projectId = payload;

    const projectRef = firestore
      .collection('projects')
      .doc(projectId);

    yield projectRef.delete();

    yield put(removeProjectSuccess(projectId));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Project Removed',
    });
  } catch (error) {
    console.log(error);
    yield put(removeProjectFailure());
    yield linearAlertBottom.fire({
      icon: 'danger',
      title: 'Project not removed',
    });
  }
}

export function* fetchClients({ payload }) {
  try {
    const workspaceId = payload;
    let allClients = [];

    const clientsRef = firestore
      .collection('clients')
      .where('workspaceId', '==', workspaceId);

    const clientsSnapshot = yield clientsRef.get();

    clientsSnapshot.forEach((doc) => {
      allClients.push(doc.data());
    });

    yield put(fetchClientsSuccess(allClients));
  } catch (error) {
    console.log(error);
    yield put(fetchClientsFailure());
  }
}

export function* fetchProjects({ payload }) {
  try {
    const workspaceId = payload;
    let allProjects = [];

    const projectRef = firestore
      .collection('projects')
      .where('workspaceId', '==', workspaceId);

    const projectSnapshot = yield projectRef.get();

    projectSnapshot.forEach((doc) => {
      allProjects.push(doc.data());
    });

    yield put(fetchProjectsSuccess(allProjects));
  } catch (error) {
    console.log(error);
    yield put(fetchProjectsFailure());
  }
}

export function* updateProject({ payload }) {
  try {
    const { projectId, status } = payload;

    const projectRef = firestore
      .collection('projects')
      .doc(projectId);

    yield projectRef.update({
      active: status,
    });

    yield put(updateProjectSuccess(payload));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Project Status Updated',
    });
  } catch (error) {
    console.log(error);
    yield put(updateProjectFailure());
  }
}

export function* onAddClientStart() {
  yield takeLatest(
    ProjectAndClientActionTypes.ADD_CLIENT_START,
    addClient,
  );
}

export function* onAddProjectStart() {
  yield takeLatest(
    ProjectAndClientActionTypes.ADD_PROJECT_START,
    addProject,
  );
}

export function* onRemoveClientStart() {
  yield takeLatest(
    ProjectAndClientActionTypes.REMOVE_CLIENT_START,
    removeClient,
  );
}

export function* onRemoveProjectStart() {
  yield takeLatest(
    ProjectAndClientActionTypes.REMOVE_PROJECT_START,
    removeProject,
  );
}

export function* onFetchClientStart() {
  yield takeLatest(
    ProjectAndClientActionTypes.FETCH_CLIENTS_START,
    fetchClients,
  );
}

export function* onFetchProjectsStart() {
  yield takeLatest(
    ProjectAndClientActionTypes.FETCH_PROJECTS_START,
    fetchProjects,
  );
}

export function* onUpdateProjectsStart() {
  yield takeLatest(
    ProjectAndClientActionTypes.UPDATE_PROJECT_START,
    updateProject,
  );
}

export function* projectAndClientSagas() {
  yield all([
    call(onAddClientStart),
    call(onAddProjectStart),
    call(onFetchClientStart),
    call(onFetchProjectsStart),
    call(onRemoveClientStart),
    call(onRemoveProjectStart),
    call(onUpdateProjectsStart),
  ]);
}
