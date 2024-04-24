// reducers/distractorLinesReducer.js

import {
  FETCH_DISTRACTOR_LINES_REQUEST,
  FETCH_DISTRACTOR_LINES_SUCCESS,
  FETCH_DISTRACTOR_LINES_FAILURE,
} from "../actions/types";

const initialState = {
  loading: false,
  distractorLines: [],
  error: null,
};

const distractorLinesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DISTRACTOR_LINES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DISTRACTOR_LINES_SUCCESS:
      return {
        ...state,
        loading: false,
        distractorLines: action.payload,
        error: null,
      };
    case FETCH_DISTRACTOR_LINES_FAILURE:
      return {
        ...state,
        loading: false,
        distractorLines: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default distractorLinesReducer;
