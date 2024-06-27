import React, { useEffect, useState } from "react";
import cn from "../../lib/utils/cn.ts";
import Header from "./Header.tsx";
import { Container } from "./Components.tsx";
import { ToastContainer } from "react-toastify";
import { TOAST } from "../../constants/ui.constant.ts";
import Footer from "./Footer.tsx";
import { useAppSelector } from "../../lib/redux/redux.store.ts";
import RemainderTodoModal from "../todo/RemainderTodoModal.tsx";
import { ToDo } from "../../lib/redux/slices/todo.slice.ts";
import { TODO_STATUS } from "../../constants/enum.constants.ts";

interface PageLayoutProps {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}

const checkDuration = (duration: string): boolean => {
  const now = new Date();
  const todoTime = new Date(duration);
  const timeDifference = (todoTime.getTime() - now.getTime()) / 1000 / 60; // Convert to minutes
  return timeDifference <= 5;
};

const PageLayout = (props: PageLayoutProps) => {
  const todos = useAppSelector((state) => state.todo.todos);
  const [reminderTodos, setReminderTodos] = useState<ToDo[]>([]);

  useEffect(() => {
    const checkTodos = () => {
      const todosToRemind = todos.filter(
        (todo) =>
          checkDuration(todo.duration) &&
          !todo.warned &&
          todo.status !== TODO_STATUS.DONE,
      );
      setReminderTodos(todosToRemind);
    };

    // Initial check
    checkTodos();

    // Check every 5 minutes
    const interval = setInterval(
      () => {
        checkTodos();
      },
      5 * 60 * 1000,
    ); // 5 minutes in milliseconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [todos]);

  return (
    <main
      className={cn(
        "w-screen h-screen flex flex-col",
        props.containerClassName,
      )}
    >
      <Header />
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        <Container
          className={cn(
            "flex flex-col items-center justify-center flex-1",
            props.className,
          )}
        >
          {props.children}
        </Container>
        <Footer />
      </div>

      <ToastContainer autoClose={TOAST.AUTO_CLOSE} />
      {reminderTodos.map((todo) => (
        <RenderRemainders todo={todo} key={todo.id} />
      ))}
    </main>
  );
};

export const RenderRemainders = ({ todo }: { todo: ToDo }) => {
  const [modal, setModal] = useState(true);

  return <RemainderTodoModal modal={modal} setModal={setModal} todo={todo} />;
};

export default PageLayout;
