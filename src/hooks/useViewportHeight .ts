"use client";

import { useEffect } from "react";

export const useViewportHeight = () => {
  useEffect(() => {
    const updateViewportHeight = () => {
      const vh = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${vh * 0.01}px`);
    };

    window.visualViewport?.addEventListener("resize", updateViewportHeight);
    updateViewportHeight(); // Set on initial load

    return () => {
      window.visualViewport?.removeEventListener(
        "resize",
        updateViewportHeight
      );
    };
  }, []);
};
