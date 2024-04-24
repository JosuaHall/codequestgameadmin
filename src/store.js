import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

// Custom middleware to persist the event filter and home organization selection to AsyncStorage
const persistDataMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  return result;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, persistDataMiddleware],
});

export default store;
