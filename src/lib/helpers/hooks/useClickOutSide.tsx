"use client";

import { useEffect, useRef } from "react";

interface UseClickOutSideProps {
  callback: (value: boolean) => void;
}

const useClickOutSide = (props: UseClickOutSideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      props.callback(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { containerRef };
};

export default useClickOutSide;
