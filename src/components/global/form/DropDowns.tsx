import React, { useEffect, useRef, useState } from "react";
import cn from "../../../lib/utils/cn.ts";
import { createPortal } from "react-dom";
import useClickOutSide from "../../../lib/helpers/hooks/useClickOutSide.tsx";
import { RightArrowIcon } from "../../icons/ToolsIcons.tsx";

export interface BasicDropDownProps {
  children: React.ReactNode;
  OptionsComponent: React.JSX.Element;
  className?: string;
  optionContainerClassName?: string;
  showIcon?: boolean;
  disabled?: boolean;
  disableOptionClick?: boolean;
  visible?: boolean;
  setVisibleWrapper?: (value: boolean) => void;
  containerClassName?: string;
  notBorderOnFocus?: boolean;
  trackVisibility?: (value: boolean) => void;
  searchTerm?: string;
}

export const BasicDropDown = ({
  showIcon = true,
  visible = true,
  ...props
}: BasicDropDownProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const { containerRef: dropdownRef } = useClickOutSide({
    callback: setDropdownVisible,
  });

  useEffect(() => {
    if (props.trackVisibility) {
      props.trackVisibility(dropdownVisible);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownVisible, props.trackVisibility]);

  const calculateDropdownPosition = () => {
    if (triggerRef.current && dropdownRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = triggerRect.bottom;
      let left = triggerRect.left;
      let width = triggerRect.width;

      // Check if there's enough space to the right
      if (left + dropdownRect.width > viewportWidth) {
        left = viewportWidth - dropdownRect.width;
      }

      // Check if there's enough space at the bottom
      if (top + dropdownRect.height > viewportHeight) {
        top = triggerRect.top - dropdownRect.height;
      }

      // Adjust width based on trigger width
      if (triggerRect.width < dropdownRect.width) {
        width = dropdownRect.width;
      }

      dropdownRef.current.style.top = `${top}px`;
      dropdownRef.current.style.left = `${left}px`;
      dropdownRef.current.style.width = `${width}px`;
    }
  };

  useEffect(() => {
    if (dropdownVisible && visible) {
      calculateDropdownPosition();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownVisible, visible, props.searchTerm]);

  const DropDownContent = (
    <div
      ref={dropdownRef}
      className={cn(
        "absolute z-10 bg-light text-text drop-shadow-lg max-h-[300px] rounded-md overflow-y-auto",
        props.optionContainerClassName,
      )}
    >
      {props.OptionsComponent}
    </div>
  );

  return (
    <div className={cn("relative w-auto h-auto", props.containerClassName)}>
      <div
        className={cn(
          `cursor-pointer px-4 py-4 shadow-md bg-background-3 gap-3
          border border-solid border-border rounded-md flex flex-row items-center justify-between`,
          props.className,
          {
            "outline-primary outline outline-1":
              dropdownVisible && !props.notBorderOnFocus,
          },
          {
            "pointer-events-none opacity-80": props.disabled,
          },
        )}
        onClick={(e) => {
          setDropdownVisible(true);
          if (props.setVisibleWrapper) {
            props.setVisibleWrapper(true);
          }
          e.stopPropagation();
        }}
        ref={triggerRef}
      >
        {props.children}
        {showIcon && (
          <RightArrowIcon
            className={cn("transition-all w-2 mr-2 rotate-90", {
              "-rotate-90": dropdownVisible,
            })}
          />
        )}
      </div>
      {dropdownVisible &&
        visible &&
        createPortal(DropDownContent, document.body)}
    </div>
  );
};

export interface SelectedOptionType {
  label?: string;
  value?: string | number;
  icon?: React.JSX.Element;
  value2?: string | number;
}

export interface OptionType {
  label: string;
  value: string | number;
  icon?: React.JSX.Element;
  className?: string;
  value2?: string | number;
  disabled?: boolean;
}
