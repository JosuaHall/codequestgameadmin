import {
  FETCH_SUBMISSIONS_REQUEST,
  FETCH_SUBMISSIONS_SUCCESS,
  FETCH_SUBMISSIONS_FAILURE,
  DELETE_SUBMISSIONS_REQUEST,
  DELETE_SUBMISSIONS_SUCCESS,
  DELETE_SUBMISSIONS_FAILURE,
} from "../actions/types";

const initialState = {
  loading: false,
  submissions: [],
  error: null,
  deletedSubmissions: [],
};

const submissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBMISSIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUBMISSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        submissions: action.payload,
        error: null,
      };
    case FETCH_SUBMISSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_SUBMISSIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_SUBMISSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        deletedSubmissions: action.payload,
        error: null,
      };
    case DELETE_SUBMISSIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default submissionReducer;
