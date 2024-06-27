import React from "react";
import RenderTodos from "../todo/RenderTodos.tsx";
import { TODO_STATUS } from "../../constants/enum.constants.ts";

const DoneTodo = () => {
  return <RenderTodos status={TODO_STATUS.DONE} />;
};

export default DoneTodo;
