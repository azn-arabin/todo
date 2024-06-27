import React from "react";
import { TODO_STATUS } from "../../constants/enum.constants.ts";
import RenderTodos from "../todo/RenderTodos.tsx";

const NewTodo = () => {
  return <RenderTodos status={TODO_STATUS.NEW} />;
};

export default NewTodo;
