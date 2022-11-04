import ProjectAndClientActionTypes from './project-and-client.types';

////////////////////Client Actions////////////////////////

export const addClientStart = (payload) => ({
  type: ProjectAndClientActionTypes.ADD_CLIENT_START,
  payload,
});

export const addClientSuccess = (payload) => ({
  type: ProjectAndClientActionTypes.ADD_CLIENT_SUCCESS,
  payload,
});

export const addClientFailure = () => ({
  type: ProjectAndClientActionTypes.ADD_CLIENT_FAILURE,
});

export const removeClientStart = (clientId) => ({
  type: ProjectAndClientActionTypes.REMOVE_CLIENT_START,
  payload: clientId,
});

export const removeClientSuccess = (clientId) => ({
  type: ProjectAndClientActionTypes.REMOVE_CLIENT_SUCCESS,
  payload: clientId,
});

export const removeClientFailure = () => ({
  type: ProjectAndClientActionTypes.REMOVE_CLIENT_FAILURE,
});

export const fetchClientsStart = (workspaceId) => ({
  type: ProjectAndClientActionTypes.FETCH_CLIENTS_START,
  payload: workspaceId,
});

export const fetchClientsSuccess = (payload) => ({
  type: ProjectAndClientActionTypes.FETCH_CLIENTS_SUCCESS,
  payload,
});

export const fetchClientsFailure = () => ({
  type: ProjectAndClientActionTypes.FETCH_CLIENTS_FAILURE,
});

////////////////////Project Actions////////////////////////

export const addProjectStart = (payload) => ({
  type: ProjectAndClientActionTypes.ADD_PROJECT_START,
  payload,
});

export const addProjectSuccess = (payload) => ({
  type: ProjectAndClientActionTypes.ADD_PROJECT_SUCCESS,
  payload,
});

export const addProjectFailure = () => ({
  type: ProjectAndClientActionTypes.ADD_PROJECT_FAILURE,
});

export const removeProjectStart = (projectId) => ({
  type: ProjectAndClientActionTypes.REMOVE_PROJECT_START,
  payload: projectId,
});

export const removeProjectSuccess = (projectId) => ({
  type: ProjectAndClientActionTypes.REMOVE_PROJECT_SUCCESS,
  payload: projectId,
});

export const removeProjectFailure = () => ({
  type: ProjectAndClientActionTypes.REMOVE_PROJECT_FAILURE,
});

export const fetchProjectsStart = (workspaceId) => ({
  type: ProjectAndClientActionTypes.FETCH_PROJECTS_START,
  payload: workspaceId,
});

export const fetchProjectsSuccess = (payload) => ({
  type: ProjectAndClientActionTypes.FETCH_PROJECTS_SUCCESS,
  payload,
});

export const fetchProjectsFailure = () => ({
  type: ProjectAndClientActionTypes.FETCH_PROJECTS_FAILURE,
});

export const updateProjectStart = (payload) => ({
  type: ProjectAndClientActionTypes.UPDATE_PROJECT_START,
  payload: payload,
});

export const updateProjectSuccess = (payload) => ({
  type: ProjectAndClientActionTypes.UPDATE_PROJECT_SUCCESS,
  payload,
});

export const updateProjectFailure = () => ({
  type: ProjectAndClientActionTypes.UPDATE_PROJECT_FAILURE,
});
