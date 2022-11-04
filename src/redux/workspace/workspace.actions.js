import WorkspaceActionTypes from './workspace.types';

export const AddWorkspacesList = (payload) => ({
  type: WorkspaceActionTypes.ADD_WORKSPACES_LIST,
  payload,
});

export const changeSelectedWorkspace = (workspaceObj) => ({
  type: WorkspaceActionTypes.CHANGE_SELECTED_WORKSPACE,
  payload: workspaceObj,
});

export const updateSelectedWorkspaceDataStart = () => ({
  type: WorkspaceActionTypes.UPDATE_SELECTED_WORKSPACE_DATA_START,
});

export const updateSelectedWorkspaceDataSuccess = (
  workspaceObjData,
) => ({
  type: WorkspaceActionTypes.UPDATE_SELECTED_WORKSPACE_DATA_SUCCESS,
  payload: workspaceObjData,
});

export const updateSelectedWorkspaceDataFailure = () => ({
  type: WorkspaceActionTypes.UPDATE_SELECTED_WORKSPACE_DATA_FAILURE,
});

export const addWorkspaceStart = (payload) => ({
  type: WorkspaceActionTypes.ADD_WORKSPACE_START,
  payload,
});

export const addWorkspaceSuccess = (payload) => ({
  type: WorkspaceActionTypes.ADD_WORKSPACE_SUCCESS,
  payload,
});

export const addWorkspaceFailure = () => ({
  type: WorkspaceActionTypes.ADD_WORKSPACE_FAILURE,
});

export const removeWorkspaceStart = (payload) => ({
  type: WorkspaceActionTypes.REMOVE_WORKSPACE_START,
  payload,
});

export const removeWorkspaceSuccess = (payload) => ({
  type: WorkspaceActionTypes.REMOVE_WORKSPACE_SUCCESS,
  payload,
});

export const removeWorkspaceFailure = () => ({
  type: WorkspaceActionTypes.REMOVE_WORKSPACE_FAILURE,
});

export const addMemberStart = (payload) => ({
  type: WorkspaceActionTypes.ADD_MEMBER_START,
  payload,
});

export const addMemberSuccess = (payload) => ({
  type: WorkspaceActionTypes.ADD_MEMBER_SUCCESS,
  payload,
});

export const addMemberFailure = () => ({
  type: WorkspaceActionTypes.ADD_MEMBER_FAILURE,
});

export const acceptInvitationStart = (payload) => ({
  type: WorkspaceActionTypes.ACCEPT_INVITATION_START,
  payload,
});

export const acceptInvitationSuccess = (payload) => ({
  type: WorkspaceActionTypes.ACCEPT_INVITATION_SUCCESS,
  payload,
});

export const acceptInvitationFailure = () => ({
  type: WorkspaceActionTypes.ACCEPT_INVITATION_FAILURE,
});

export const declineInvitationStart = (payload) => ({
  type: WorkspaceActionTypes.DECLINE_INVITATION_START,
  payload,
});

export const declineInvitationSuccess = (payload) => ({
  type: WorkspaceActionTypes.DECLINE_INVITATION_SUCCESS,
  payload,
});

export const declineInvitationFailure = () => ({
  type: WorkspaceActionTypes.DECLINE_INVITATION_FAILURE,
});

export const updateLogoStart = (payload) => ({
  type: WorkspaceActionTypes.UPDATE_LOGO_START,
  payload,
});

export const updateLogoSuccess = (payload) => ({
  type: WorkspaceActionTypes.UPDATE_LOGO_SUCCESS,
  payload,
});

export const updateLogoFailure = () => ({
  type: WorkspaceActionTypes.UPDATE_LOGO_FAILURE,
});

export const changeMemberRoleStart = (payload) => ({
  type: WorkspaceActionTypes.CHANGE_MEMBER_ROLE_START,
  payload,
});

export const changeMemberRoleSuccess = (payload) => ({
  type: WorkspaceActionTypes.CHANGE_MEMBER_ROLE_SUCCESS,
  payload,
});

export const changeMemberRoleFailure = () => ({
  type: WorkspaceActionTypes.CHANGE_MEMBER_ROLE_FAILURE,
});

export const updateWorkspaceSettingsStart = (payload) => ({
  type: WorkspaceActionTypes.UPDATE_WORKSPACE_SETTINGS_START,
  payload,
});

export const updateWorkspaceSettingsSuccess = (payload) => ({
  type: WorkspaceActionTypes.UPDATE_WORKSPACE_SETTINGS_SUCCESS,
  payload,
});

export const updateWorkspaceSettingsFailure = () => ({
  type: WorkspaceActionTypes.UPDATE_WORKSPACE_SETTINGS_FAILURE,
});

export const abcNew = (payload) => ({
  type: WorkspaceActionTypes.NEW,
  payload,
});
