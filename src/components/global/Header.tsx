import React, { useState } from "react";
import { AppLogo, Container } from "./Components.tsx";
import cn from "../../lib/utils/cn.ts";
import { Link, useLocation } from "react-router-dom";
import useClickOutSide from "../../lib/helpers/hooks/useClickOutSide.tsx";
import { motion } from "framer-motion";
import { MenuIcon, PlusIcon } from "../icons/ToolsIcons.tsx";
import { IconButton } from "./buttons/Buttons.tsx";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { containerRef } = useClickOutSide({
    callback: setIsVisible,
  });

  return (
    <div
      className="bg-primary text-light font-title flex flex-col"
      ref={containerRef}
    >
      <Container className="flex flex-row justify-between gap-2 items-center py-3">
        <AppLogo className="sm:mt-0 mt-2" />

        <HeaderMenus className="hidden sm:flex" />

        <div />

        <IconButton
          className="sm:hidden bg-background py-3 px-4 rounded-md text-text-primary "
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? (
            <PlusIcon className="rotate-45 -m-1" />
          ) : (
            <MenuIcon className="w-6" />
          )}
        </IconButton>
      </Container>
      <Container>
        <div className="flex sm:hidden flex-col gap-2 items-end">
          <motion.div
            animate={isVisible ? "open" : "closed"}
            variants={{
              open: { opacity: 1, x: 0 },
              closed: { opacity: 0, x: "-100%" },
            }}
            onClick={(e) => {
              setIsVisible(false);
              e.stopPropagation();
            }}
          >
            {isVisible && <HeaderMenus className="sm:hidden flex flex-col" />}
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export const HeaderMenus = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-row gap-2 items-center", className)}>
    <HeaderMenu href="/">New</HeaderMenu>
    <HeaderMenu href="/ongoing">Ongoing</HeaderMenu>
    <HeaderMenu href="/done">Done</HeaderMenu>
  </div>
);

export const HeaderMenu = ({
  className,
  children,
  href,
}: {
  className?: string;
  children: React.ReactNode;
  href: string;
}) => {
  const location = useLocation();

  return (
    <Link
      to={href}
      className={cn(
        "px-6 py-3 font-semibold text-base rounded-3xl hover:bg-secondary transition-all",
        {
          "bg-info": location.pathname === href,
        },
        className,
      )}
    >
      {children}
    </Link>
  );
};

export default Header;
