import TimeEntryActionTypes from './time-entry.types';

const INITIAL_STATE = {
  timeEntries: [],
  caTimeEntries: [],
};

const timeEntryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TimeEntryActionTypes.ADD_TIME_ENTRY_SUCCESS:
      return {
        ...state,
        timeEntries: [action.payload, ...state.timeEntries],
      };
    case TimeEntryActionTypes.ADD_CA_TIME_ENTRY_SUCCESS:
      return {
        ...state,
        caTimeEntries: [action.payload, ...state.caTimeEntries],
      };
    case TimeEntryActionTypes.FETCH_TIME_ENTRIES_SUCCESS:
      if (action.payload.path === 'timeEntries') {
        return {
          ...state,
          timeEntries: action.payload.entries,
        };
      } else {
        return {
          ...state,
          caTimeEntries: action.payload.entries,
        };
      }
    case TimeEntryActionTypes.REMOVE_TIME_ENTRY_SUCCESS:
      if (action.payload.path === 'timeEntries') {
        return {
          ...state,
          timeEntries: state.timeEntries.filter(
            (timeEntry) =>
              timeEntry.timeEntryId !== action.payload.entryId,
          ),
        };
      } else {
        return {
          ...state,
          caTimeEntries: state.caTimeEntries.filter(
            (timeEntry) =>
              timeEntry.timeEntryId !== action.payload.entryId,
          ),
        };
      }

    default:
      return state;
  }
};

export default timeEntryReducer;
