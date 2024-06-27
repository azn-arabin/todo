import React, { useEffect, useState } from "react";
import { IconButton } from "../global/buttons/Buttons.tsx";
import { PlusIcon } from "../icons/ToolsIcons.tsx";
import TodoModal from "./TodoModal.tsx";
import { ToDo, TodoStatus } from "../../lib/redux/slices/todo.slice.ts";
import { useAppSelector } from "../../lib/redux/redux.store.ts";
import { TODO_STATUS } from "../../constants/enum.constants.ts";
import PageLayout from "../global/PageLayout.tsx";
import {
  PageTitle,
  SearchBar,
  TodoPageContainer,
} from "../global/Components.tsx";
import TodoList from "./TodoList.tsx";
import noWorkImage from "../../assets/images/noWork.png";

const RenderTodos = ({ status }: { status: TodoStatus }) => {
  const [todosOfSpecificStatus, setTodosOfSpecificStatus] = useState<ToDo[]>(
    [],
  );
  const [filteredTodo, setFilteredTodo] = useState<ToDo[]>([]);

  const todos: ToDo[] = useAppSelector((state) => state.todo.todos);

  useEffect(() => {
    const filtered = todos
      .filter((todo) => todo.status === status)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    setTodosOfSpecificStatus(filtered);
    setFilteredTodo(filtered);
  }, [status, todos]);

  const handleSearch = (value: string) => {
    if (value) {
      const filtered = todosOfSpecificStatus.filter(
        (todo) =>
          todo.title.toLowerCase().indexOf(value.toLowerCase().trim()) >= 0 ||
          todo.description.toLowerCase().indexOf(value.toLowerCase().trim()) >=
            0,
      );
      setFilteredTodo(filtered);
    } else {
      setFilteredTodo(todosOfSpecificStatus);
    }
  };

  return (
    <PageLayout>
      <TodoPageContainer>
        <PageTitle className="capitalize">
          {status === TODO_STATUS.NEW
            ? "Your new Tasks"
            : status === TODO_STATUS.ONGOING
              ? "Your ongoing Task"
              : "Your Done Task"}
        </PageTitle>
        {todosOfSpecificStatus.length ? (
          <>
            <SearchBar onChangeSearch={handleSearch} />
            <TodoList todos={filteredTodo} />
          </>
        ) : (
          <div className="flex flex-col gap-2 text-center">
            <img
              src={noWorkImage}
              alt="no work"
              className="max-w-[500px] h-auto self-center justify-self-center"
            />
            <h6 className="font-semibold text-lg">You have no {status} task</h6>
          </div>
        )}
      </TodoPageContainer>

      {status === TODO_STATUS.NEW && <AddTodoButton />}
    </PageLayout>
  );
};

const AddTodoButton = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <IconButton
        className="bg-primary fixed bottom-[30px] xl:right-[20%] lg:right-[15%] right-[100px] text-light z-10"
        onClick={() => setModal(true)}
      >
        <PlusIcon />
      </IconButton>

      <TodoModal modal={modal} setModal={setModal} />
    </>
  );
};

export default RenderTodos;
