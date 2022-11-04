import CategoryActionTypes from './category.types';

const INITIAL_STATE = {
  categories: [],
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoryActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };
    case CategoryActionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case CategoryActionTypes.REMOVE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.categoryId !== action.payload,
        ),
      };
    default:
      return state;
  }
};

export default categoryReducer;
