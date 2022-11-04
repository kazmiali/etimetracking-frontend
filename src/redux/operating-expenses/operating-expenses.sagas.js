import { takeLatest, put, all, call } from 'redux-saga/effects';
import { firestore } from '../../firebase/firebase.utils';
import { linearAlertBottom } from '../../utils/swalMixins';
import generateUid from '../../utils/generateUid';
import OperatingExpensesActionTypes from './operating-expenses.types';
import {
  addOpeExpSuccess,
  removeOpeExpSuccess,
  removeOpeExpFailure,
  addOpeExpFailure,
  fetchOpeExpsSuccess,
  fetchOpeExpsFailure,
  addExpTypeSuccess,
  addExpTypeFailure,
  removeExpTypeFailure,
  removeExpTypeSuccess,
  fetchExpTypesSuccess,
  fetchExpTypesFailure,
  addMatExpSuccess,
  addMatExpFailure,
  removeMatExpSuccess,
  removeMatExpFailure,
  fetchMatExpsSuccess,
  fetchMatExpsFailure,
} from './operating-expenses.actions';

export function* addOpeExp({ payload }) {
  try {
    const opeExpData = payload;
    const opeExpId = yield call(generateUid);
    const opeExpRef = firestore.collection('opeExps').doc(opeExpId);
    const opeExpObj = {
      opeExpId,
      createdAt: new Date(),
      ...opeExpData,
    };

    yield opeExpRef.set(opeExpObj);
    yield put(addOpeExpSuccess(opeExpObj));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Operating Expense Created',
    });
  } catch (error) {
    console.log(error);
    yield put(addOpeExpFailure());
    yield linearAlertBottom.fire({
      icon: 'danger',
      title: 'Operating Expense not created',
    });
  }
}

export function* removeOpeExp({ payload }) {
  try {
    const opeExpId = payload;

    const opeExpRef = firestore.collection('opeExps').doc(opeExpId);

    yield opeExpRef.delete();

    yield put(removeOpeExpSuccess(opeExpId));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Operating Expense Removed',
    });
  } catch (error) {
    console.log(error);
    yield put(removeOpeExpFailure());
    yield linearAlertBottom.fire({
      icon: 'danger',
      title: 'Operating Expense not removed',
    });
  }
}

export function* fetchOpeExps({ payload }) {
  try {
    const workspaceId = payload;
    let allOpeExps = [];

    const opeExpRef = firestore
      .collection('opeExps')
      .where('workspaceId', '==', workspaceId);

    const opeExpSnapshot = yield opeExpRef.get();

    opeExpSnapshot.forEach((doc) => {
      allOpeExps.push(doc.data());
    });

    yield put(fetchOpeExpsSuccess(allOpeExps));
  } catch (error) {
    console.log(error);
    yield put(fetchOpeExpsFailure());
  }
}

// Exp Type sagas

export function* addExpType({ payload }) {
  try {
    const expTypeData = payload;
    const expTypeId = yield call(generateUid);
    const expTypeRef = firestore
      .collection('expTypes')
      .doc(expTypeId);
    const expTypeObj = {
      expTypeId,
      createdAt: new Date(),
      ...expTypeData,
    };

    yield expTypeRef.set(expTypeObj);
    yield put(addExpTypeSuccess(expTypeObj));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Expense Type Created',
    });
  } catch (error) {
    console.log(error);
    yield put(addExpTypeFailure());
    yield linearAlertBottom.fire({
      icon: 'danger',
      title: 'Expense Type not created',
    });
  }
}

export function* removeExpType({ payload }) {
  try {
    const expTypeId = payload;

    const expTypeRef = firestore
      .collection('expTypes')
      .doc(expTypeId);

    yield expTypeRef.delete();

    yield put(removeExpTypeSuccess(expTypeId));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Expense Type Removed',
    });
  } catch (error) {
    console.log(error);
    yield put(removeExpTypeFailure());
    yield linearAlertBottom.fire({
      icon: 'danger',
      title: 'Expense Type not removed',
    });
  }
}

export function* fetchExpTypes({ payload }) {
  try {
    const workspaceId = payload;
    let allExpTypes = [];

    const expTypeRef = firestore
      .collection('expTypes')
      .where('workspaceId', '==', workspaceId);

    const expTypeSnapshot = yield expTypeRef.get();

    expTypeSnapshot.forEach((doc) => {
      allExpTypes.push(doc.data());
    });

    yield put(fetchExpTypesSuccess(allExpTypes));
  } catch (error) {
    console.log(error);
    yield put(fetchExpTypesFailure());
  }
}

// Material Expenses Saga Functions

export function* addMatExp({ payload }) {
  try {
    const matExpData = payload;
    const matExpId = yield call(generateUid);
    const matExpRef = firestore.collection('matExps').doc(matExpId);
    const matExpObj = {
      matExpId,
      createdAt: new Date(),
      ...matExpData,
    };

    yield matExpRef.set(matExpObj);
    yield put(addMatExpSuccess(matExpObj));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Material Expense Created',
    });
  } catch (error) {
    console.log(error);
    yield put(addMatExpFailure());
    yield linearAlertBottom.fire({
      icon: 'danger',
      title: 'Material Expense not created',
    });
  }
}

export function* removeMatExp({ payload }) {
  try {
    const matExpId = payload;

    const matExpRef = firestore.collection('matExps').doc(matExpId);

    yield matExpRef.delete();

    yield put(removeMatExpSuccess(matExpId));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Material Expense Removed',
    });
  } catch (error) {
    console.log(error);
    yield put(removeMatExpFailure());
    yield linearAlertBottom.fire({
      icon: 'danger',
      title: 'Material Expense not removed',
    });
  }
}

export function* fetchMatExps({ payload }) {
  try {
    const workspaceId = payload;
    let allMatExps = [];

    const matExpRef = firestore
      .collection('matExps')
      .where('workspaceId', '==', workspaceId);

    const matExpSnapshot = yield matExpRef.get();

    matExpSnapshot.forEach((doc) => {
      allMatExps.push(doc.data());
    });

    yield put(fetchMatExpsSuccess(allMatExps));
  } catch (error) {
    console.log(error);
    yield put(fetchMatExpsFailure());
  }
}

// Operating Expenses Saga Listeners

export function* onAddOpeExpStart() {
  yield takeLatest(
    OperatingExpensesActionTypes.ADD_OPEEXP_START,
    addOpeExp,
  );
}

export function* onRemoveOpeExpStart() {
  yield takeLatest(
    OperatingExpensesActionTypes.REMOVE_OPEEXP_START,
    removeOpeExp,
  );
}

export function* onFetchOpeExpStart() {
  yield takeLatest(
    OperatingExpensesActionTypes.FETCH_OPEEXPS_START,
    fetchOpeExps,
  );
}

// Exp Types Saga Listeners

export function* onAddExpTypeStart() {
  yield takeLatest(
    OperatingExpensesActionTypes.ADD_EXPTYPE_START,
    addExpType,
  );
}

export function* onRemoveExpTypeStart() {
  yield takeLatest(
    OperatingExpensesActionTypes.REMOVE_EXPTYPE_START,
    removeExpType,
  );
}

export function* onFetchExpTypeStart() {
  yield takeLatest(
    OperatingExpensesActionTypes.FETCH_EXPTYPES_START,
    fetchExpTypes,
  );
}

// Material Expenses Saga Listeners

export function* onAddMatExpStart() {
  yield takeLatest(
    OperatingExpensesActionTypes.ADD_MATEXP_START,
    addMatExp,
  );
}

export function* onRemoveMatExpStart() {
  yield takeLatest(
    OperatingExpensesActionTypes.REMOVE_MATEXP_START,
    removeMatExp,
  );
}

export function* onFetchMatExpStart() {
  yield takeLatest(
    OperatingExpensesActionTypes.FETCH_MATEXPS_START,
    fetchMatExps,
  );
}

export function* operatingExpensesSagas() {
  yield all([
    // Operating Expenses Sagas
    call(onAddOpeExpStart),
    call(onFetchOpeExpStart),
    call(onRemoveOpeExpStart),
    // Expenses Types Sagas
    call(onAddExpTypeStart),
    call(onFetchExpTypeStart),
    call(onRemoveExpTypeStart),
    // Material Expenses Sagas
    call(onAddMatExpStart),
    call(onFetchMatExpStart),
    call(onRemoveMatExpStart),
  ]);
}
