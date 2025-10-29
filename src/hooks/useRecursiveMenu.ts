// ==============================
// Imports
// ==============================
import { useEffect, useState } from "react";

// ==============================
// Custom Hook: useIsSmallDevice
// ==============================
// Detects if the current device width is below the given breakpoint
export const useIsSmallDevice = (breakpoint: number = 768) => {
  // Initial state based on window width
  const [isSmallDevice, setIsSmallDevice] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    // Update state on resize
    const handleResize = () => {
      setIsSmallDevice(window.innerWidth < breakpoint);
    };

    // Run once on mount
    handleResize();

    // Add listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, [breakpoint]);

  // Return current device state
  return isSmallDevice;
};
