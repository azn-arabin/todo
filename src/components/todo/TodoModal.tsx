import React, { useEffect } from "react";
import {
  addTodoAction,
  ToDo,
  updateTodoAction,
} from "../../lib/redux/slices/todo.slice.ts";
import { useForm } from "react-hook-form";
import Modal, {
  ModalBody,
  ModalContent,
  ModalHeader,
} from "../global/modal/Modal.tsx";
import {
  DateInputWithLabel,
  FormInputWithLabel,
  FormTextAreaWithLabel,
} from "../global/form/FormComponents.tsx";
import { Button } from "../global/buttons/Buttons.tsx";
import { useAppDispatch } from "../../lib/redux/redux.store.ts";
import { showToast } from "../../lib/helpers/hooks/ui.helper.ts";

interface TaskModalProps {
  modal: boolean;
  setModal: (modal: boolean) => void;
  todo?: ToDo;
}

const TodoModal = (props: TaskModalProps) => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ToDo>();

  useEffect(() => {
    if (props.todo) {
      reset(props.todo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useAppDispatch();

  const onSubmit = (formData: ToDo) => {
    if (props.todo) {
      dispatch(
        updateTodoAction({
          ...formData,
          title: formData.title.trim(),
          description: formData.description.trim(),
          id: props.todo.id,
        }),
      );

      showToast({
        message: "Your todo was successfully updated!",
      });
    } else {
      dispatch(
        addTodoAction({
          ...formData,
          title: formData.title.trim(),
          description: formData.description.trim(),
        }),
      );

      showToast({
        message: "New todo was successfully added!",
      });
    }

    props.setModal(false);
  };

  return (
    <Modal modal={props.modal}>
      <ModalContent>
        <ModalHeader setModal={props.setModal}>
          {props.todo ? "Edit Task" : "Add Task"}
        </ModalHeader>
        <ModalBody>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormInputWithLabel
              label={"Title"}
              placeholder={"Enter todo title"}
              watch={watch}
              register={register}
              name={"title"}
              error={errors.title}
              validators={{
                required: "Please enter the todo title",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters long",
                },
                maxLength: {
                  value: 50,
                  message: "Title must be less than 50 characters long",
                },
              }}
            />

            <DateInputWithLabel
              label={"End Time"}
              control={control}
              name={"duration"}
              placeholder={"Enter end time"}
              error={errors.duration}
              rules={{
                required: "Please enter the todo end time",
              }}
              minDate={new Date()}
              dateFormat="dd MMM yyyy h:mm aa" // Adjust the format as needed
              showTimeSelect // Enable time selection
              timeIntervals={15} // Interval for time selection, in minutes
              timeFormat="HH:mm" // Adjust the time format
            />

            <FormTextAreaWithLabel
              label={"Description"}
              placeholder={"Enter description"}
              watch={watch}
              register={register}
              name={"description"}
              error={errors.description}
              validators={{
                required: "Please enter the todo description",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters long",
                },
                maxLength: {
                  value: 200,
                  message: "Description must be less than 200 characters long",
                },
              }}
            />

            <Button type="submit">Submit</Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TodoModal;
