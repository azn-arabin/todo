import React from "react";
import {
  ToDo,
  updateStatusAction,
  updateTodoWarnAction,
} from "../../lib/redux/slices/todo.slice.ts";
import Modal, {
  ModalBody,
  ModalContent,
  ModalHeader,
} from "../global/modal/Modal.tsx";
import moment from "moment";
import {
  FormInputContainer,
  FormLabel,
} from "../global/form/FormComponents.tsx";
import { Button } from "../global/buttons/Buttons.tsx";
import { useAppDispatch } from "../../lib/redux/redux.store.ts";
import { showToast } from "../../lib/helpers/hooks/ui.helper.ts";

interface IRemainderTodoModalProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
  todo: ToDo;
}

const RemainderTodoModal = (props: IRemainderTodoModalProps) => {
  const dispatch = useAppDispatch();

  const now = moment();
  const duration = moment(props.todo.duration);
  const remainingMinutes = duration.diff(now, "minutes");

  return (
    <Modal modal={props.modal}>
      <ModalContent>
        <ModalHeader setModal={props.setModal}>
          {remainingMinutes >= 0
            ? `Reminder - Time duration of this task is about to finish in ${remainingMinutes} minutes.`
            : "Time duration of this task already finished!"}
        </ModalHeader>
        <ModalBody>
          <FormInputContainer>
            <FormLabel>Title</FormLabel>
            <p>{props.todo.title}</p>
          </FormInputContainer>

          <FormInputContainer>
            <FormLabel>Description</FormLabel>
            <p>{props.todo.description}</p>
          </FormInputContainer>
          <div className="flex flex-row gap-2 items-center">
            <FormInputContainer>
              <FormLabel>End Time</FormLabel>
              <p>
                {moment(new Date(props.todo.duration)).format(
                  "D MMM YYYY h:mm A",
                )}
              </p>
            </FormInputContainer>

            <FormInputContainer>
              <FormLabel>Creation Time</FormLabel>
              <p>
                {moment(new Date(props.todo.createdAt)).format(
                  "D MMM YYYY h:mm A",
                )}
              </p>
            </FormInputContainer>
          </div>

          <div className="flex flex-row gap-2 items-center self-end">
            <Button
              className="bg-secondary"
              onClick={() => {
                dispatch(updateTodoWarnAction(props.todo.id));
                props.setModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(
                  updateStatusAction({ id: props.todo.id, status: "done" }),
                );
                dispatch(updateTodoWarnAction(props.todo.id));
                showToast({
                  message: "The task has been marked as done",
                });
                props.setModal(false);
              }}
            >
              Mark as Done
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RemainderTodoModal;
