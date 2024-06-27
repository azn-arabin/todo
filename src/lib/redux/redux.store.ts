import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import rootReducer from "./rootReducer.ts";

export const KEY = "todo-store";

export type RootState = ReturnType<typeof rootReducer>;

// Load state from local storage
function loadFromLocalStorage(): RootState | undefined {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log("Nothing loaded");
    return undefined;
  }
}

// Save state to local storage
function saveToLocalStorage(state: RootState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore or handle the error
    console.error("Failed to save state to localStorage:", e);
  }
}

const preloadedState = loadFromLocalStorage(); // Load the state from localStorage

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

// Subscribe to store changes to save to local storage
store.subscribe(() => saveToLocalStorage(store.getState()));

export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
