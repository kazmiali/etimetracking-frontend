import { takeLatest, put, all, call } from 'redux-saga/effects';
import { firestore } from '../../firebase/firebase.utils';
import { linearAlertBottom } from '../../utils/swalMixins';
import generateUid from '../../utils/generateUid';

import CategoryActionTypes from './category.types';
import {
  addCategorySuccess,
  fetchCategoriesSuccess,
  removeCategorySuccess,
  fetchCategoriesFailure,
  removeCategoryFailure,
} from './category.actions';

export function* addCategory({ payload }) {
  try {
    const categoryId = yield call(generateUid);

    const categoryRef = firestore
      .collection('categories')
      .doc(categoryId);

    const categoryObj = {
      workspaceId: payload.workspaceId,
      categoryId,
      categoryName: payload.categoryName,
      createdAt: new Date(),
      createdBy: payload.userId,
    };

    yield categoryRef.set(categoryObj);

    yield put(addCategorySuccess(categoryObj));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Category Created',
    });
  } catch (error) {
    console.log(error);
    yield linearAlertBottom.fire({
      icon: 'danger',
      title: 'Category not created',
    });
  }
}

export function* removeCategory({ payload }) {
  try {
    const categoryId = payload;

    const categoryRef = firestore
      .collection('categories')
      .doc(categoryId);

    yield categoryRef.delete();

    yield put(removeCategorySuccess(categoryId));

    yield linearAlertBottom.fire({
      icon: 'success',
      title: 'Category Removed',
    });
  } catch (error) {
    console.log(error);
    yield put(removeCategoryFailure());
    yield linearAlertBottom.fire({
      icon: 'danger',
      title: 'Category not removed',
    });
  }
}

export function* fetchCategories({ payload }) {
  try {
    const workspaceId = payload;
    let allCategories = [];

    const categoriesRef = firestore
      .collection('categories')
      .where('workspaceId', '==', workspaceId);

    const categoriesSnapshot = yield categoriesRef.get();

    categoriesSnapshot.forEach((doc) => {
      allCategories.push(doc.data());
    });

    yield put(fetchCategoriesSuccess(allCategories));
  } catch (error) {
    console.log(error);
    yield put(fetchCategoriesFailure());
  }
}

export function* onAddCategoryStart() {
  yield takeLatest(
    CategoryActionTypes.ADD_CATEGORY_START,
    addCategory,
  );
}

export function* onRemoveCategoryStart() {
  yield takeLatest(
    CategoryActionTypes.REMOVE_CATEGORY_START,
    removeCategory,
  );
}

export function* onFetchCategoriesStart() {
  yield takeLatest(
    CategoryActionTypes.FETCH_CATEGORIES_START,
    fetchCategories,
  );
}

export function* categorySagas() {
  yield all([
    call(onAddCategoryStart),
    call(onRemoveCategoryStart),
    call(onFetchCategoriesStart),
  ]);
}
