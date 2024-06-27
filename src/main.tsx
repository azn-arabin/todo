import "react-toastify/dist/ReactToastify.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./lib/redux/redux.store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NewTodo from "./components/route/NewTodo.tsx";
import OnGoingTodo from "./components/route/OnGoingTodo.tsx";
import DoneTodo from "./components/route/DoneTodo.tsx";
import ErrorPage from "./components/error-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NewTodo />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/ongoing",
    element: <OnGoingTodo />,
  },
  {
    path: "/done",
    element: <DoneTodo />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
