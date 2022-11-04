import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { workspaceSagas } from './workspace/workspace.sagas';
import { memberSagas } from './workspace/member.sagas';
import { categorySagas } from './category/category.sagas';
import { projectAndClientSagas } from './project-and-client/project-and-client.sagas';
import { operatingExpensesSagas } from './operating-expenses/operating-expenses.sagas';
import { timeEntrySagas } from './time-entry/time-entry.sagas';

export function* rootSaga() {
  yield all([
    call(userSagas),
    call(workspaceSagas),
    call(categorySagas),
    call(projectAndClientSagas),
    call(operatingExpensesSagas),
    call(memberSagas),
    call(timeEntrySagas),
  ]);
}
