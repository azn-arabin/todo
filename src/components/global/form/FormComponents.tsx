import {
  Control,
  Controller,
  FieldError,
  FieldValue,
  RegisterOptions,
  UseFormRegister,
  UseFormWatch,
  ValidationRule,
} from "react-hook-form";
import cn from "../../../lib/utils/cn.ts";
import React from "react";
import DatePicker from "react-datepicker";

export interface FormInputProps {
  className?: string;
  type?: string;
  placeholder: string;
  validators?: RegisterOptions;
  error?: FieldError;
  watch: UseFormWatch<any>;
  disabled?: boolean;
  register: UseFormRegister<any>; // Define the type for register  name: string;
  step?: string;
  name: string;
}

export const FormInput = ({ type = "text", ...props }: FormInputProps) => (
  <input
    type={type}
    placeholder={props.disabled ? "" : props.placeholder}
    className={cn(
      `py-4 px-4 bg-background placeholder:text-placeholder
      border border-solid border-border text-text-primary rounded-md focus:outline-primary transition-all`,
      {
        "focus:outline-danger border-danger": props.error,
      },
      props.className,
    )}
    {...props.register(props.name, props.validators)}
    defaultValue={props.watch(props.name)}
    step={props.step}
    disabled={props.disabled}
  />
);

interface FormTextareaProps extends Omit<FormInputProps, "step" | "type"> {}

export const FormTextArea = (props: FormTextareaProps) => (
  <textarea
    placeholder={props.disabled ? "" : props.placeholder}
    className={cn(
      `py-4 px-4 bg-background placeholder:text-placeholder h-36
      border border-solid border-border text-text rounded-md focus:outline-primary transition-all`,
      {
        "focus:outline-danger border-danger": props.error,
      },
      props.className,
    )}
    {...props.register(props.name, props.validators)}
    defaultValue={props.watch(props.name)}
    disabled={props.disabled}
  ></textarea>
);

interface DateInputProps {
  rules?: RegisterOptions;
  control: Control<FieldValue<any>>;
  name: string;
  error?: FieldError;
  className?: string;
  placeholder: string;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
  dateFormat?: string;
  timeFormat?: string;
  timeIntervals?: number;
  showTimeSelect?: boolean;
}

export const DateInput = ({
  dateFormat = "dd MMM yyyy",
  timeFormat = "HH:mm",
  ...props
}: DateInputProps) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      render={({ field }) => (
        <DatePicker
          className={cn(
            `py-4 px-4 bg-background placeholder:text-placeholder w-full
      border border-solid border-border text-text rounded-md focus:outline-primary transition-all`,
            {
              "focus:outline-danger border-danger": props.error,
            },
            props.className,
          )}
          selected={field.value ? new Date(field.value) : field.value}
          maxDate={props.maxDate}
          minDate={props.minDate}
          fixedHeight
          placeholderText={props.placeholder}
          onSelect={() => {}}
          onChange={(date) => field.onChange(date)}
          dateFormat={dateFormat} // Adjust the format as needed
          showTimeSelect={props.showTimeSelect} // Enable time selection
          timeIntervals={props.timeIntervals} // Interval for time selection, in minutes
          timeFormat={timeFormat}
          disabled={props.disabled}
        />
      )}
    />
  );
};

interface FormType {
  children: React.ReactNode;
  className?: string;
}

export const FormInputContainer = ({ children, className }: FormType) => (
  <div className={cn("flex flex-col gap-2", className)}>{children}</div>
);

export const FormErrorMessage = ({ children, className }: FormType) => (
  <span className={cn("text-danger -mt-1", className)}>{children}</span>
);

interface LabelProps extends FormType {
  htmlFor?: string;
  required?: ValidationRule<boolean>;
}

export const FormLabel = (props: LabelProps) => (
  <label
    className={cn("font-medium text-dark-teal text-sm", props.className)}
    htmlFor={props.htmlFor}
  >
    {props.children}{" "}
    {!!props.required && <span className="text-danger text-base">*</span>}
  </label>
);

export interface InputContainerProps extends FormInputProps {
  containerClassName?: string;
  inputClassName?: string;
  label: string;
}

export const FormInputWithLabel = (props: InputContainerProps) => (
  <FormInputContainer className={props.containerClassName}>
    <FormLabel htmlFor={props.name} required={!!props.validators?.required}>
      {props.label}
    </FormLabel>
    <FormInput
      name={props.name}
      className={props.inputClassName}
      watch={props.watch}
      disabled={props.disabled}
      type={props.type}
      error={props.error}
      register={props.register}
      validators={props.validators}
      placeholder={props.placeholder}
      step={props.step}
    />
    {props.error && <FormErrorMessage>{props.error.message}</FormErrorMessage>}
  </FormInputContainer>
);

export interface TextAreaContainerProps extends FormTextareaProps {
  containerClassName?: string;
  inputClassName?: string;
  label: string;
}

export const FormTextAreaWithLabel = (props: TextAreaContainerProps) => (
  <FormInputContainer className={props.containerClassName}>
    <FormLabel htmlFor={props.name} required={!!props.validators?.required}>
      {props.label}
    </FormLabel>
    <FormTextArea
      name={props.name}
      className={props.inputClassName}
      watch={props.watch}
      disabled={props.disabled}
      error={props.error}
      register={props.register}
      validators={props.validators}
      placeholder={props.placeholder}
    />
    {props.error && <FormErrorMessage>{props.error.message}</FormErrorMessage>}
  </FormInputContainer>
);

interface DateContainerProps extends DateInputProps {
  containerClassName?: string;
  label: string;
}

export const DateInputWithLabel = (props: DateContainerProps) => (
  <FormInputContainer className={props.containerClassName}>
    <FormLabel htmlFor={props.name} required={!!props.rules?.required}>
      {props.label}
    </FormLabel>
    <DateInput
      name={props.name}
      className={props.className}
      disabled={props.disabled}
      error={props.error}
      placeholder={props.placeholder}
      rules={props.rules}
      control={props.control}
      minDate={props.minDate}
      maxDate={props.maxDate}
      dateFormat={props.dateFormat}
      showTimeSelect={props.showTimeSelect}
      timeFormat={props.timeFormat}
      timeIntervals={props.timeIntervals}
    />
    {props.error && <FormErrorMessage>{props.error.message}</FormErrorMessage>}
  </FormInputContainer>
);
