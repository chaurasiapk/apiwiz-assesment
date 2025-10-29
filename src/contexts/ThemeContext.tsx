import { createContext, useCallback, useEffect, useState } from "react";

// ----------------------------------------------------
// Context: ThymeContext
// Provides a boolean `thyme` value and a `toggleThyme`
// function to switch between true/false (e.g., theme mode).
// ----------------------------------------------------
export const ThymeContext = createContext<{
  thyme: boolean;
  toggleThyme: () => void;
}>({
  thyme: false,
  toggleThyme: () => {},
});

// ----------------------------------------------------
// Provider: ThymeProvider
// Wraps the app and manages thyme state persistence
// using localStorage for consistent user experience.
// ----------------------------------------------------
export const ThymeProvider = ({ children }: { children: React.ReactNode }) => {
  // --------------------------------------------
  // State: Tracks thyme mode (true = on, false = off)
  // --------------------------------------------
  const [thyme, setThyme] = useState<boolean>(false);

  // --------------------------------------------
  // On mount: Initialize thyme state from localStorage
  // --------------------------------------------
  useEffect(() => {
    const storedValue = localStorage.getItem("thyme");
    if (storedValue !== null) {
      setThyme(storedValue === "true");
    } else {
      localStorage.setItem("thyme", "false");
    }
  }, []);

  // --------------------------------------------
  // Toggle function: Switch thyme state & update storage
  // --------------------------------------------
  const toggleThyme = useCallback(() => {
    setThyme((prev) => {
      const newValue = !prev;
      localStorage.setItem("thyme", newValue.toString());
      return newValue;
    });
  }, []);

  // --------------------------------------------
  // Context value to be provided to child components
  // --------------------------------------------
  const value = { thyme, toggleThyme };

  return <ThymeContext.Provider value={value}>{children}</ThymeContext.Provider>;
};
