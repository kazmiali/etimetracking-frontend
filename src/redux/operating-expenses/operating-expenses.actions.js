import OperatingExpensesActionTypes from './operating-expenses.types';

////////////////Operating Expenses Action/////////////////////////

export const addOpeExpStart = (payload) => ({
  type: OperatingExpensesActionTypes.ADD_OPEEXP_START,
  payload,
});

export const addOpeExpSuccess = (payload) => ({
  type: OperatingExpensesActionTypes.ADD_OPEEXP_SUCCESS,
  payload,
});

export const addOpeExpFailure = () => ({
  type: OperatingExpensesActionTypes.ADD_OPEEXP_FAILURE,
});

export const removeOpeExpStart = (clientId) => ({
  type: OperatingExpensesActionTypes.REMOVE_OPEEXP_START,
  payload: clientId,
});

export const removeOpeExpSuccess = (id) => ({
  type: OperatingExpensesActionTypes.REMOVE_OPEEXP_SUCCESS,
  payload: id,
});

export const removeOpeExpFailure = () => ({
  type: OperatingExpensesActionTypes.REMOVE_OPEEXP_FAILURE,
});

export const fetchOpeExpsStart = (workspaceId) => ({
  type: OperatingExpensesActionTypes.FETCH_OPEEXPS_START,
  payload: workspaceId,
});

export const fetchOpeExpsSuccess = (payload) => ({
  type: OperatingExpensesActionTypes.FETCH_OPEEXPS_SUCCESS,
  payload,
});

export const fetchOpeExpsFailure = () => ({
  type: OperatingExpensesActionTypes.FETCH_OPEEXPS_FAILURE,
});

///////////////////////Exp Types Action///////////////////////////

export const addExpTypeStart = (payload) => ({
  type: OperatingExpensesActionTypes.ADD_EXPTYPE_START,
  payload,
});

export const addExpTypeSuccess = (payload) => ({
  type: OperatingExpensesActionTypes.ADD_EXPTYPE_SUCCESS,
  payload,
});

export const addExpTypeFailure = () => ({
  type: OperatingExpensesActionTypes.ADD_EXPTYPE_FAILURE,
});

export const removeExpTypeStart = (clientId) => ({
  type: OperatingExpensesActionTypes.REMOVE_EXPTYPE_START,
  payload: clientId,
});

export const removeExpTypeSuccess = (id) => ({
  type: OperatingExpensesActionTypes.REMOVE_EXPTYPE_SUCCESS,
  payload: id,
});

export const removeExpTypeFailure = () => ({
  type: OperatingExpensesActionTypes.REMOVE_EXPTYPE_FAILURE,
});

export const fetchExpTypesStart = (workspaceId) => ({
  type: OperatingExpensesActionTypes.FETCH_EXPTYPES_START,
  payload: workspaceId,
});

export const fetchExpTypesSuccess = (payload) => ({
  type: OperatingExpensesActionTypes.FETCH_EXPTYPES_SUCCESS,
  payload,
});

export const fetchExpTypesFailure = () => ({
  type: OperatingExpensesActionTypes.FETCH_EXPTYPES_FAILURE,
});

////////////////Material Expenses Action/////////////////////////

export const addMatExpStart = (payload) => ({
  type: OperatingExpensesActionTypes.ADD_MATEXP_START,
  payload,
});

export const addMatExpSuccess = (payload) => ({
  type: OperatingExpensesActionTypes.ADD_MATEXP_SUCCESS,
  payload,
});

export const addMatExpFailure = () => ({
  type: OperatingExpensesActionTypes.ADD_MATEXP_FAILURE,
});

export const removeMatExpStart = (id) => ({
  type: OperatingExpensesActionTypes.REMOVE_MATEXP_START,
  payload: id,
});

export const removeMatExpSuccess = (id) => ({
  type: OperatingExpensesActionTypes.REMOVE_MATEXP_SUCCESS,
  payload: id,
});

export const removeMatExpFailure = () => ({
  type: OperatingExpensesActionTypes.REMOVE_MATEXP_FAILURE,
});

export const fetchMatExpsStart = (workspaceId) => ({
  type: OperatingExpensesActionTypes.FETCH_MATEXPS_START,
  payload: workspaceId,
});

export const fetchMatExpsSuccess = (payload) => ({
  type: OperatingExpensesActionTypes.FETCH_MATEXPS_SUCCESS,
  payload,
});

export const fetchMatExpsFailure = () => ({
  type: OperatingExpensesActionTypes.FETCH_MATEXPS_FAILURE,
});
