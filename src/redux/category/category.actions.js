import CategoryActionTypes from './category.types';

export const addCategoryStart = (payload) => ({
  type: CategoryActionTypes.ADD_CATEGORY_START,
  payload,
});

export const addCategorySuccess = (payload) => ({
  type: CategoryActionTypes.ADD_CATEGORY_SUCCESS,
  payload,
});

export const addCategoryFailure = () => ({
  type: CategoryActionTypes.ADD_CATEGORY_FAILURE,
});

export const removeCategoryStart = (payload) => ({
  type: CategoryActionTypes.REMOVE_CATEGORY_START,
  payload,
});

export const removeCategorySuccess = (categoryId) => ({
  type: CategoryActionTypes.REMOVE_CATEGORY_SUCCESS,
  payload: categoryId,
});

export const removeCategoryFailure = () => ({
  type: CategoryActionTypes.REMOVE_CATEGORY_FAILURE,
});

export const fetchCategoriesStart = (workspaceId) => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_START,
  payload: workspaceId,
});

export const fetchCategoriesSuccess = (payload) => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
  payload,
});

export const fetchCategoriesFailure = () => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE,
});
