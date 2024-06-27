"use client";

import React from "react";
import { BasicDropDown, OptionType } from "../form/DropDowns.tsx";
import cn from "../../../lib/utils/cn.ts";

interface DropDownButtonProps {
  children: React.ReactNode;
  options: OptionType[];
  optionClassName?: string;
  onSelect: (value: OptionType) => void;
  className?: string;
  optionContainerClassName?: string;
}

const DropDownButton = (props: DropDownButtonProps) => {
  return (
    <BasicDropDown
      OptionsComponent={
        <>
          {props.options.map((option, i) => (
            <div
              key={i}
              className={cn(
                "cursor-pointer hover:bg-hover p-3 capitalize flex flex-row items-center gap-1.5",
                {
                  "pointer-events-none opacity-80": option.disabled,
                },
                props.optionClassName,
                option.className,
              )}
              onClick={(e) => {
                props.onSelect(option);
                e.stopPropagation();
              }}
            >
              {option.icon}
              {option.label}
            </div>
          ))}
        </>
      }
      showIcon={false}
      className={cn("bg-primary ripple px-6 py-2 rounded-md", props.className)}
      optionContainerClassName={props.optionContainerClassName}
      notBorderOnFocus
    >
      {props.children}
    </BasicDropDown>
  );
};

export default DropDownButton;
