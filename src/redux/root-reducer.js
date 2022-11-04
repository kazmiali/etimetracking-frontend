import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import workspaceReducer from './workspace/workspace.reducer';
import categoryReducer from './category/category.reducer';
import projectAndClientReducer from './project-and-client/project-and-client.reducer';
import operatingExpensesReducer from './operating-expenses/operating-expenses.reducer';
import timeEntryReducer from './time-entry/time-entry.reducer';

const persistConfig = {
  key: 'root',
  storage,
  // the reducer we want to persist
  // whitelist: ['cart'],
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
  workspace: workspaceReducer,
  category: categoryReducer,
  projectAndClient: projectAndClientReducer,
  opeExp: operatingExpensesReducer,
  timeEntry: timeEntryReducer,
});

export default persistReducer(persistConfig, rootReducer);
