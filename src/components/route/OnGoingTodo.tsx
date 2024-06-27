import React from "react";
import RenderTodos from "../todo/RenderTodos.tsx";
import { TODO_STATUS } from "../../constants/enum.constants.ts";

const OnGoingTodo = () => {
  return <RenderTodos status={TODO_STATUS.ONGOING} />;
};

export default OnGoingTodo;
