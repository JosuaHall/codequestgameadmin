import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import questionReducer from "./questionReducer";
import submissionReducer from "./submissionReducer";
import distractorLinesReducer from "./distractorLinesReducer";

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  questionsReducer: questionReducer,
  submissions: submissionReducer,
  distractorLines: distractorLinesReducer,
});
