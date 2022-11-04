import OperatingExpensesActionTypes from './operating-expenses.types';

const INITIAL_STATE = {
  opeExps: [],
  expTypes: [],
  matExps: [],
};

const operatingExpensesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Operating Expenses switch cases

    case OperatingExpensesActionTypes.ADD_OPEEXP_SUCCESS:
      return {
        ...state,
        opeExps: [...state.opeExps, action.payload],
      };
    case OperatingExpensesActionTypes.REMOVE_OPEEXP_SUCCESS:
      return {
        ...state,
        opeExps: state.opeExps.filter(
          (opeExp) => opeExp.opeExpId !== action.payload,
        ),
      };
    case OperatingExpensesActionTypes.FETCH_OPEEXPS_SUCCESS:
      return {
        ...state,
        opeExps: action.payload,
      };

    // Exp Type switch cases

    case OperatingExpensesActionTypes.ADD_EXPTYPE_SUCCESS:
      return {
        ...state,
        expTypes: [...state.expTypes, action.payload],
      };
    case OperatingExpensesActionTypes.REMOVE_EXPTYPE_SUCCESS:
      return {
        ...state,
        expTypes: state.expTypes.filter(
          (expType) => expType.expTypeId !== action.payload,
        ),
      };
    case OperatingExpensesActionTypes.FETCH_EXPTYPES_SUCCESS:
      return {
        ...state,
        expTypes: action.payload,
      };

    // Material Expenses switch cases

    case OperatingExpensesActionTypes.ADD_MATEXP_SUCCESS:
      return {
        ...state,
        matExps: [...state.matExps, action.payload],
      };
    case OperatingExpensesActionTypes.REMOVE_MATEXP_SUCCESS:
      return {
        ...state,
        matExps: state.matExps.filter(
          (matExp) => matExp.matExpId !== action.payload,
        ),
      };
    case OperatingExpensesActionTypes.FETCH_MATEXPS_SUCCESS:
      return {
        ...state,
        matExps: action.payload,
      };

    default:
      return state;
  }
};

export default operatingExpensesReducer;
