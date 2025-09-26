import { useEffect, useState, useCallback } from "react";
import { WhyChooseUsScrollState } from "./types";
import { SCROLL_CONFIG } from "./constants";

export const useInfiniteScroll = (): WhyChooseUsScrollState & {
  getTransform: () => React.CSSProperties;
} => {
  const [totalOffset, setTotalOffset] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    setTotalOffset((prev) => prev + scrollDelta * SCROLL_CONFIG.SCROLL_MULTIPLIER);
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const getTransform = useCallback(
    (): React.CSSProperties => ({
      transform: `translateX(${SCROLL_CONFIG.BASE_OFFSET + totalOffset}px)`,
      transition: "none",
    }),
    [totalOffset]
  );

  return {
    totalOffset,
    lastScrollY,
    getTransform,
  };
};
