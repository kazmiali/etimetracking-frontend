import ProjectAndClientActionTypes from './project-and-client.types';

const INITIAL_STATE = {
  clients: [],
  projects: [],
};

const projectAndClientReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProjectAndClientActionTypes.ADD_CLIENT_SUCCESS:
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };
    case ProjectAndClientActionTypes.REMOVE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.filter(
          (client) => client.clientId !== action.payload,
        ),
      };
    case ProjectAndClientActionTypes.FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.payload,
      };
    case ProjectAndClientActionTypes.ADD_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case ProjectAndClientActionTypes.REMOVE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.projectId !== action.payload,
        ),
      };
    case ProjectAndClientActionTypes.FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
      };
    case ProjectAndClientActionTypes.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.map((project, i) =>
          project.projectId === action.payload.projectId
            ? { ...project, active: action.payload.status }
            : project,
        ),
      };
    default:
      return state;
  }
};

export default projectAndClientReducer;
