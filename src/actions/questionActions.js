import axios from "axios";
import {
  CREATE_QUESTION_REQUEST,
  CREATE_QUESTION_FAILURE,
  CREATE_QUESTION_SUCCESS,
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
  FETCH_SUBMISSIONS_REQUEST,
  FETCH_SUBMISSIONS_SUCCESS,
  FETCH_SUBMISSIONS_FAILURE,
  DELETE_SUBMISSIONS_REQUEST,
  DELETE_SUBMISSIONS_SUCCESS,
  DELETE_SUBMISSIONS_FAILURE,
  FETCH_DISTRACTOR_LINES_REQUEST,
  FETCH_DISTRACTOR_LINES_SUCCESS,
  FETCH_DISTRACTOR_LINES_FAILURE,
} from "./types";
import { proxy } from "../../package.json";

export const createQuestion = (questionData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_QUESTION_REQUEST });

    try {
      const response = await axios.post(
        `${proxy}/api/questions/create/question`,
        questionData
      ); // Adjust the endpoint URL accordingly
      dispatch({
        type: CREATE_QUESTION_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_QUESTION_FAILURE,
        payload: error.response ? error.response.data : "Network error",
      });
    }
  };
};

export const fetchQuestions = (chapter) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_QUESTIONS_REQUEST });

    try {
      const response = await axios.get(
        `${proxy}/api/questions/chapter/${chapter}`
      );

      dispatch({
        type: FETCH_QUESTIONS_SUCCESS,
        payload: {
          chapter,
          questions: response.data,
        },
      });
    } catch (error) {
      dispatch({
        type: FETCH_QUESTIONS_FAILURE,
        payload: error.response ? error.response.data : "Network error",
      });
    }
  };
};

export const fetchQuestionsByChapter = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_QUESTIONS_REQUEST });

    try {
      const response = await axios.get(
        `${proxy}/api/questions/questions-by-chapter`
      );

      dispatch({
        type: FETCH_QUESTIONS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_QUESTIONS_FAILURE,
        payload: error.response ? error.response.data : "Network error",
      });
    }
  };
};

// Action to fetch a single question by ID
export const fetchQuestionById = (chapterId, problemId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_QUESTION_REQUEST });

    try {
      const response = await axios.get(
        `${proxy}/api/questions/chapter/${chapterId}/problem/${problemId}`
      );
      dispatch({
        type: FETCH_QUESTION_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_QUESTION_FAILURE,
        payload: error.response ? error.response.data : "Network error",
      });
    }
  };
};

// Action to update a question
export const updateQuestion = (problemId, updatedQuestionData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_QUESTION_REQUEST });

    try {
      const response = await axios.put(
        `${proxy}/api/questions/${problemId}`,
        updatedQuestionData
      );
      dispatch({
        type: UPDATE_QUESTION_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_QUESTION_FAILURE,
        payload: error.response ? error.response.data : "Network error",
      });
    }
  };
};

export const deleteQuestion = (problemId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_QUESTION_REQUEST });

    try {
      // Make API request to delete the question
      await axios.delete(`${proxy}/api/questions/${problemId}`);

      dispatch({
        type: DELETE_QUESTION_SUCCESS,
        payload: problemId, // Send the deleted question's ID to the reducer
      });
    } catch (error) {
      dispatch({
        type: DELETE_QUESTION_FAILURE,
        payload: error.response ? error.response.data : "Network error",
      });
    }
  };
};

export const fetchSubmissions = (chapter) => async (dispatch) => {
  dispatch({ type: FETCH_SUBMISSIONS_REQUEST });

  try {
    const response = await axios.get(
      `${proxy}/api/questions/submissions?chapter=${chapter}`
    );

    dispatch({
      type: FETCH_SUBMISSIONS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SUBMISSIONS_FAILURE,
      payload: error.message,
    });
  }
};

// Define your action creator function
export const resetSubmissionsOfChapter = (chapter) => async (dispatch) => {
  // Dispatch DELETE_SUBMISSIONS_REQUEST action to indicate the start of the delete operation
  dispatch({ type: DELETE_SUBMISSIONS_REQUEST });

  try {
    // Send a DELETE request to your server endpoint with the specified chapter parameter
    const response = await axios.delete(
      `${proxy}/api/questions/delete/submissions?chapter=${chapter}`
    );

    // If the request is successful, dispatch DELETE_SUBMISSIONS_SUCCESS with response data
    dispatch({
      type: DELETE_SUBMISSIONS_SUCCESS,
      payload: response.data, // Assuming the response data contains relevant information
    });
  } catch (error) {
    // If an error occurs during the request, dispatch DELETE_SUBMISSIONS_FAILURE with the error message
    dispatch({
      type: DELETE_SUBMISSIONS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchDistractorLines = () => async (dispatch) => {
  dispatch({ type: FETCH_DISTRACTOR_LINES_REQUEST });
  try {
    const response = await axios.get(
      `${proxy}/api/questions/get/all/distractors`
    ); // Assuming your server API endpoint
    dispatch({
      type: FETCH_DISTRACTOR_LINES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DISTRACTOR_LINES_FAILURE,
      payload: error.message,
    });
  }
};
