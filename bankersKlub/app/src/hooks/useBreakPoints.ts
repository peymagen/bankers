"use client";
import { useState, useEffect } from "react";

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

const useBreakpoint = (size: keyof typeof breakpoints) => {
  const [breakpoint, setBreakpoint] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= breakpoints[size];
    }
    return false; // Default to false during SSR
  });

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure it's running on the client

    const handleResize = () => {
      setBreakpoint(window.innerWidth <= breakpoints[size]);
    };

    handleResize(); // Run once on mount

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size]);

  return breakpoint;
};

export default useBreakpoint;
