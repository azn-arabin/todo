import { combineReducers, PayloadAction } from "@reduxjs/toolkit";
import todoReducer from "./slices/todo.slice.ts";

const appReducer = combineReducers({
  todo: todoReducer,
});

const rootReducer = (state: any, action: PayloadAction<any>) => {
  return appReducer(state, action);
};

export default rootReducer;
