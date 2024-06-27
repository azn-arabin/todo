import cn from "../../lib/utils/cn.ts";
import React, { useEffect, useState } from "react";
import { APP_NAME } from "../../constants/ui.constant.ts";
import { TodoIcon } from "../icons/ToolsIcons.tsx";
import { Link } from "react-router-dom";
import { SearchIcon } from "../icons/ActionIcons.tsx";
import { useAppSelector } from "../../lib/redux/redux.store.ts";

export const Container = ({
  className,
  children,
  containerRef,
}: {
  className?: string;
  children: React.ReactNode;
  containerRef?: React.RefObject<any>;
}) => (
  <div className={cn("sm:px-16 px-8", className)} ref={containerRef}>
    {children}
  </div>
);

export const AppLogo = ({ className }: { className?: string }) => (
  <Link
    to="/"
    className={cn("flex flex-row gap-2 items-center text-base", className)}
  >
    <TodoIcon className="w-6 h-6" />
    <h6 className="font-semibold">{APP_NAME}</h6>
  </Link>
);

export const TodoPageContainer = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "md:w-[750px] pb-12 pt-4 flex-1 w-full flex flex-col gap-3",
      className,
    )}
  >
    {children}
  </div>
);

export const PageTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <h2 className={cn("font-semibold text-lg", className)}>{children}</h2>;

interface SearchBarProps {
  onChangeSearch: (search: string) => void;
}

export const SearchBar = (props: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const todo = useAppSelector((state) => state.todo.todos);

  useEffect(() => {
    setSearchTerm("");
  }, [todo]);

  return (
    <div
      className="rounded-lg border-solid border-border border flex
      px-3 py-2.5 flex-row gap-2 focus-within:shadow-md"
    >
      <SearchIcon />

      <input
        type="search"
        className="border-none outline-none placeholder:text-placeholder flex-1"
        placeholder="Search your task"
        onChange={(e) => {
          props.onChangeSearch(e.target.value);
          setSearchTerm(e.target.value);
        }}
        value={searchTerm}
      />
    </div>
  );
};
