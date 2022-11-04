import WorkspaceActionTypes from './workspace.types';

const INITIAL_STATE = {
  selectedWorkspace: {},
  workspacesLimit: null,
  selectedWorkspaceData: {},
  workspacesList: [],
};

const workspaceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WorkspaceActionTypes.CHANGE_SELECTED_WORKSPACE:
      return {
        ...state,
        selectedWorkspace: action.payload,
      };
    case WorkspaceActionTypes.UPDATE_SELECTED_WORKSPACE_DATA_SUCCESS:
      return {
        ...state,
        selectedWorkspaceData: action.payload,
      };
    case WorkspaceActionTypes.ADD_WORKSPACES_LIST:
      return {
        ...state,
        workspacesList: action.payload.workspacesList,
        workspacesLimit: action.payload.workspacesLimit,
      };
    case WorkspaceActionTypes.REMOVE_WORKSPACE_SUCCESS:
      return {
        ...state,
        workspacesList: state.workspacesList.filter(
          (item) => item.workspaceId !== action.payload.workspaceId,
        ),
      };
    case WorkspaceActionTypes.ADD_MEMBER_SUCCESS:
      return {
        ...state,
        selectedWorkspaceData: {
          ...state.selectedWorkspaceData,
          workspaceMembers: [
            ...state.selectedWorkspaceData.workspaceMembers,
            [action.payload],
          ],
        },
      };
    case WorkspaceActionTypes.REMOVE_MEMBER_SUCCESS:
      return {
        ...state,
        selectedWorkspaceData: {
          ...state.selectedWorkspaceData,
          workspaceMembers: state.selectedWorkspaceData.workspaceMembers.filter(
            (item) => item.email !== action.payload.email,
          ),
        },
      };
    case WorkspaceActionTypes.ACCEPT_INVITATION_SUCCESS:
      return {
        ...state,
        workspacesList: [
          ...state.workspacesList,
          { ...action.payload.addToWorkspacesList },
        ],
      };
    case WorkspaceActionTypes.UPDATE_LOGO_SUCCESS:
      return {
        ...state,
        selectedWorkspaceData: {
          ...state.selectedWorkspaceData,
          logoURL: action.payload,
        },
      };
    case WorkspaceActionTypes.CHANGE_MEMBER_ROLE_SUCCESS:
      return {
        ...state,
        selectedWorkspaceData: {
          ...state.selectedWorkspaceData,
          workspaceMembers: [...action.payload.workspaceMembers],
        },
      };
    case WorkspaceActionTypes.UPDATE_SELECTED_WORKSPACE_DATA_SUCCESS:
      return {
        ...state,
        selectedWorkspaceData: {
          ...state.selectedWorkspaceData,
          whoProjects: action.payload.whoProjects,
          whoCategories: action.payload.whoCategories,
          whoClients: action.payload.whoClients,
        },
      };
    case WorkspaceActionTypes.NEW:
      return {
        ...state,
        selectedWorkspaceData: {
          ...state.selectedWorkspaceData,
          billableRate: action.payload,
        },
      };
    default:
      return state;
  }
};

export default workspaceReducer;
