"use client";

import React, { MouseEvent } from "react";
import cn from "../../../lib/utils/cn.ts";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  spinnerColor?: string;
  loadingText?: string;
}

export const Button = ({
  type = "button",
  spinnerColor = "var(--sc-text-1)",
  loading = false,
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(
      "ripple rounded-md bg-primary text-light py-3 px-6 flex flex-row gap-2 drop-shadow " +
        "items-center justify-center font-poppins font-medium transition-all active:opacity-80",
      props.className,
      {
        "pointer-events-none opacity-80": props.disabled || loading,
      },
    )}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {loading && props.loadingText ? props.loadingText : props.children}

    {/*<ClipLoader loading={loading} size={22} color={spinnerColor} />*/}
  </button>
);

export const IconButton = ({
  type = "button",
  spinnerColor = "var(--sc-primary)",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(
      "ripple rounded-full p-3 transition-all active:opacity-80 drop-shadow cursor-pointer",
      props.className,
      {
        "pointer-events-none opacity-80": props.disabled || props.loading,
      },
    )}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {!props.loading && props.children}
    {/*{props.loading && (*/}
    {/*  // <ClipLoader loading={props.loading} size={22} color={spinnerColor} />*/}
    {/*)}*/}
  </button>
);

export const TransParentButton = ({
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(
      "ripple rounded-md text-text py-3 px-6 flex flex-col gap-2 border border-solid border-primary hover:bg-primary hover:text-text-1 " +
        "flex flex-row items-center justify-center font-poppins font-medium transition-all active:opacity-80",
      props.className,
      {
        "pointer-events-none opacity-80": props.disabled || props.loading,
      },
    )}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);
