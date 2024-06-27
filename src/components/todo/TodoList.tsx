import React, { useState } from "react";
import {
  deleteTodoAction,
  ToDo,
  TodoStatus,
  updateStatusAction,
} from "../../lib/redux/slices/todo.slice.ts";
import {
  DangerIcon,
  DeleteIcon,
  PenIcon,
  SyncIcon,
  TickIcon,
} from "../icons/ActionIcons.tsx";
import { IconButton } from "../global/buttons/Buttons.tsx";
import TodoModal from "./TodoModal.tsx";
import { TODO_STATUS } from "../../constants/enum.constants.ts";
import { OptionType } from "../global/form/DropDowns.tsx";
import { StarIcon, WatchIcon } from "../icons/ToolsIcons.tsx";
import DropDownButton from "../global/buttons/DropDownButton.tsx";
import { useAppDispatch } from "../../lib/redux/redux.store.ts";
import cn from "../../lib/utils/cn.ts";
import moment from "moment";
import { showToast } from "../../lib/helpers/hooks/ui.helper.ts";
import ConfirmationModal from "../global/modal/ConfirmationModal.tsx";

interface TodoListProps {
  todos: ToDo[];
  className?: string;
  status?: TodoStatus;
}

const TodoList = (props: TodoListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {props.todos.map((todo) => (
        <div
          className="py-2 px-6 flex flex-row gap-4 items-center bg-light rounded-md shadow-md"
          key={todo.id}
        >
          <StatusButton status={todo.status} todoId={todo.id} />
          <div className="flex flex-col flex-1 gap-1">
            <div className="flex flex-row gap-2 items-center justify-between">
              <h4 className="text-base font-semibold line-clamp-1 flex-1">
                {todo.title}
              </h4>

              <div className="flex flex-row gap-2 items-center font-title">
                <div
                  className={cn(
                    "bg-primary text-light uppercase p-2 rounded-md",
                    {
                      "bg-success": todo.status === TODO_STATUS.ONGOING,
                    },
                    {
                      "bg-danger": todo.status === TODO_STATUS.DONE,
                    },
                  )}
                >
                  {todo.status}
                </div>
                {todo.status === TODO_STATUS.NEW ? (
                  <EditTodo todo={todo} />
                ) : (
                  todo.status === TODO_STATUS.DONE && (
                    <DeleteTodo todoId={todo.id} />
                  )
                )}
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center justify-between">
              <p className="line-clamp-1 flex-1">{todo.description}</p>
              <div className="flex flex-row gap-2 items-center">
                <WatchIcon className="w-5 h-5" />
                <p>
                  {moment(new Date(todo.duration)).format("D MMM YYYY h:mm A")}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const StatusButton = ({
  status,
  todoId,
}: {
  status: TodoStatus;
  todoId: string;
}) => {
  const options: OptionType[] = [
    {
      icon: <StarIcon className="w-5 h-5" />,
      label: "Mark as new",
      value: TODO_STATUS.NEW,
      disabled: status === TODO_STATUS.NEW,
      className: "text-primary",
    },
    {
      icon: <SyncIcon className="w-5 h-5" />,
      label: "Mark as ongoing",
      value: TODO_STATUS.ONGOING,
      disabled: status === TODO_STATUS.ONGOING,
      className: "text-success",
    },
    {
      icon: <TickIcon className="w-5 h-5" />,
      label: "Mark as done",
      value: TODO_STATUS.DONE,
      disabled: status === TODO_STATUS.DONE,
      className: "text-danger",
    },
  ];

  const dispatch = useAppDispatch();

  return (
    <DropDownButton
      options={options}
      onSelect={(option) => {
        dispatch(
          updateStatusAction({
            id: todoId,
            status: option.value as TodoStatus,
          }),
        );
        showToast({
          message: "The todo has been marked as " + option.value,
        });
      }}
      className={cn(
        "bg-primary p-1 rounded-md text-light",
        {
          "bg-success": status === TODO_STATUS.ONGOING,
        },
        {
          "bg-danger": status === TODO_STATUS.DONE,
        },
      )}
    >
      {status === TODO_STATUS.NEW ? (
        <StarIcon className="w-5 h-5 fill-light" />
      ) : status === TODO_STATUS.DONE ? (
        <TickIcon className="w-5 h-5" />
      ) : (
        <SyncIcon className="w-5 h-5" />
      )}
    </DropDownButton>
  );
};

const EditTodo = ({ todo }: { todo: ToDo }) => {
  const [todoModal, setTodoModal] = useState(false);

  return (
    <>
      <IconButton onClick={() => setTodoModal(true)}>
        <PenIcon className="w-5 h-5" />
      </IconButton>

      <TodoModal modal={todoModal} setModal={setTodoModal} todo={todo} />
    </>
  );
};

const DeleteTodo = ({ todoId }: { todoId: string }) => {
  const [confirmationModal, setConfirmationModal] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <>
      <IconButton
        className="text-danger"
        onClick={() => setConfirmationModal(true)}
      >
        <DeleteIcon className="w-5 h-5" />
      </IconButton>

      <ConfirmationModal
        modal={confirmationModal}
        setModal={setConfirmationModal}
        onConfirm={() => {
          dispatch(deleteTodoAction(todoId));
          showToast({
            message: "The todo was successfully deleted!",
          });
        }}
      >
        <DangerIcon className="w-20 h-20 self-center text-danger" />
        <p className="text-center">Once deleted, It can not be undone</p>
      </ConfirmationModal>
    </>
  );
};

export default TodoList;
