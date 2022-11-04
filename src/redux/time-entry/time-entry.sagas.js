import { takeLatest, put, all, call } from 'redux-saga/effects';
import { firestore } from '../../firebase/firebase.utils';
import generateUid from '../../utils/generateUid';
import { linearAlertBottom } from '../../utils/swalMixins';

import TimeEntryActionTypes from './time-entry.types';

import {
  addTimeEntrySuccess,
  addTimeEntryFailure,
  addCATimeEntrySuccess,
  fetchTimeEntriesSuccess,
  fetchTimeEntriesFailure,
  removeTimeEntrySuccess,
  removeTimeEntryFailure,
} from './time-entry.actions';

export function* addTimeEntry({ payload }) {
  try {
    const { entry, path } = payload;
    const timeEntryId = yield call(generateUid);

    const timeEntry = {
      ...entry,
      timeEntryId,
    };

    const entryRef = firestore.collection(path).doc(timeEntryId);

    yield entryRef.set(timeEntry);

    if (path === 'timeEntries') {
      yield put(addTimeEntrySuccess(timeEntry));
    } else if (path === 'caTimeEntries') {
      yield put(addCATimeEntrySuccess(timeEntry));
    }

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Entry Added Successfully',
    });
  } catch (error) {
    console.log(error);
    yield put(addTimeEntryFailure());
  }
}

export function* removeTimeEntry({ payload }) {
  try {
    const { entryId, path } = payload;

    const entryRef = firestore.collection(path).doc(entryId);

    yield entryRef.delete();

    yield put(removeTimeEntrySuccess({ entryId, path }));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Entry Removed Successfully',
    });
  } catch (error) {
    console.log(error);
    yield put(removeTimeEntryFailure());
  }
}

export function* fetchTimeEntries({ payload }) {
  try {
    let { workspaceId, userId, path, start, end } = payload;
    let entries = [];
    let ref;
    if (start) {
      start = new Date(start);
      end = new Date(end);
      if (userId) {
        ref = firestore
          .collection(path)
          .orderBy('startTime')
          .where('workspaceId', '==', workspaceId)
          .where('createdBy', '==', userId)
          .where('startTime', '>', start)
          .where('startTime', '<', end);
      } else {
        ref = firestore
          .collection(path)
          .orderBy('startTime')
          .where('workspaceId', '==', workspaceId)
          .where('startTime', '>', start)
          .where('startTime', '<', end);
      }

      const snap = yield ref.get();

      snap.forEach((doc) => {
        entries.push(doc.data());
      });

      yield put(fetchTimeEntriesSuccess({ entries, path }));

      return;
    }

    if (userId) {
      ref = firestore
        .collection(path)
        .orderBy('createdAt')
        .where('workspaceId', '==', workspaceId)
        .where('createdBy', '==', userId);
    } else {
      ref = firestore
        .collection(path)
        .orderBy('createdAt')
        .where('workspaceId', '==', workspaceId);
    }

    const snap = yield ref.get();

    snap.forEach((doc) => {
      entries.push(doc.data());
    });

    yield put(fetchTimeEntriesSuccess({ entries, path }));
  } catch (error) {
    console.log(error);
    yield put(fetchTimeEntriesFailure());
  }
}

export function* onAddTimeEntryStart() {
  yield takeLatest(
    TimeEntryActionTypes.ADD_TIME_ENTRY_START,
    addTimeEntry,
  );
}

export function* onRemoveTimeEntryStart() {
  yield takeLatest(
    TimeEntryActionTypes.REMOVE_TIME_ENTRY_START,
    removeTimeEntry,
  );
}

export function* onFetchTimeEntriesStart() {
  yield takeLatest(
    TimeEntryActionTypes.FETCH_TIME_ENTRIES_START,
    fetchTimeEntries,
  );
}

export function* timeEntrySagas() {
  yield all([
    call(onAddTimeEntryStart),
    call(onRemoveTimeEntryStart),
    call(onFetchTimeEntriesStart),
  ]);
}
