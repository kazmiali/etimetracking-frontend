import TimeEntryActionTypes from './time-entry.types';

export const addTimeEntryStart = (payload) => ({
  type: TimeEntryActionTypes.ADD_TIME_ENTRY_START,
  payload,
});

export const addTimeEntrySuccess = (payload) => ({
  type: TimeEntryActionTypes.ADD_TIME_ENTRY_SUCCESS,
  payload,
});

export const addTimeEntryFailure = (payload) => ({
  type: TimeEntryActionTypes.ADD_TIME_ENTRY_FAILURE,
  payload,
});

export const removeTimeEntryStart = (payload) => ({
  type: TimeEntryActionTypes.REMOVE_TIME_ENTRY_START,
  payload,
});

export const removeTimeEntrySuccess = (payload) => ({
  type: TimeEntryActionTypes.REMOVE_TIME_ENTRY_SUCCESS,
  payload,
});

export const removeTimeEntryFailure = () => ({
  type: TimeEntryActionTypes.REMOVE_TIME_ENTRY_FAILURE,
});

export const fetchTimeEntriesStart = (payload) => ({
  type: TimeEntryActionTypes.FETCH_TIME_ENTRIES_START,
  payload,
});

export const fetchTimeEntriesSuccess = (payload) => ({
  type: TimeEntryActionTypes.FETCH_TIME_ENTRIES_SUCCESS,
  payload,
});

export const fetchTimeEntriesFailure = (payload) => ({
  type: TimeEntryActionTypes.FETCH_TIME_ENTRIES_FAILURE,
  payload,
});

export const addCATimeEntrySuccess = (payload) => ({
  type: TimeEntryActionTypes.ADD_CA_TIME_ENTRY_SUCCESS,
  payload,
});
