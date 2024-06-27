import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uniqueId } from "uuid";
import { TODO_STATUS } from "../../../constants/enum.constants.ts";

export type TodoStatus = (typeof TODO_STATUS)[keyof typeof TODO_STATUS];

export interface ToDo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
  duration: string;
  warned?: boolean;
}

export interface ToDoState {
  todos: ToDo[];
}

const initialState: ToDoState = {
  todos: [],
};

const getCurrentTimestamp = (): string => new Date().toISOString();

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodoAction: (
      state,
      action: PayloadAction<
        Omit<ToDo, "id" | "createdAt" | "updatedAt" | "status">
      >,
    ) => {
      const currentTime = getCurrentTimestamp();
      const newTodo: ToDo = {
        ...action.payload,
        id: uniqueId(),
        createdAt: currentTime,
        updatedAt: currentTime,
        status: "new",
      };
      state.todos.push(newTodo);
    },
    updateStatusAction: (
      state,
      action: PayloadAction<{ id: string; status: TodoStatus }>,
    ) => {
      const { id, status } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.status = status;
        todo.updatedAt = getCurrentTimestamp();
      }
    },
    updateTodoAction: (
      state,
      action: PayloadAction<Omit<ToDo, "createdAt">>,
    ) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id,
      );
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          ...action.payload,
          createdAt: state.todos[index].createdAt, // preserve original createdAt
          updatedAt: getCurrentTimestamp(),
          warned: false,
        };
      }
    },
    deleteTodoAction: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodoWarnAction: (state, action: PayloadAction<string>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          warned: true,
        };
      }
    },
  },
});

export const {
  addTodoAction,
  updateStatusAction,
  updateTodoAction,
  deleteTodoAction,
  updateTodoWarnAction,
} = todoSlice.actions;

const todoReducer = todoSlice.reducer;
export default todoReducer;
