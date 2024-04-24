import {
  CREATE_QUESTION_REQUEST,
  CREATE_QUESTION_SUCCESS,
  CREATE_QUESTION_FAILURE,
  FETCH_QUESTIONS_REQUEST,
  FETCH_QUESTIONS_SUCCESS,
  FETCH_QUESTIONS_FAILURE,
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  UPDATE_QUESTION_REQUEST,
  UPDATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_FAILURE,
  DELETE_QUESTION_REQUEST,
  DELETE_QUESTION_SUCCESS,
  DELETE_QUESTION_FAILURE,
} from "../actions/types"; // Import the action types

const initialState = {
  loading: false,
  error: null,
  question: null,
  questionsByChapter: {},
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        question: action.payload,
      };

    case CREATE_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_QUESTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        questionsByChapter: action.payload,
      };
    case FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_QUESTION_REQUEST:
    case UPDATE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_QUESTION_SUCCESS:
    case UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        question: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_QUESTION_FAILURE:
    case UPDATE_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_QUESTION_SUCCESS:
      const updatedQuestionsByChapter = { ...state.questionsByChapter };

      // Remove the deleted question from the state
      Object.keys(updatedQuestionsByChapter).forEach((chapter) => {
        updatedQuestionsByChapter[chapter] = updatedQuestionsByChapter[
          chapter
        ].filter((question) => question._id !== action.payload);
      });

      return {
        ...state,
        loading: false,
        error: null,
        questionsByChapter: updatedQuestionsByChapter,
      };
    case DELETE_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default questionReducer;
