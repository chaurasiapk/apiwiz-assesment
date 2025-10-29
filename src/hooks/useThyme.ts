// ==============================
// Imports
// ==============================
import { useContext } from "react";
import { ThymeContext } from "../contexts/ThemeContext";

// ==============================
// Custom Hook: useThyme
// ==============================
export const useThyme = () => {
  // Access theme state and toggle function from context
  const { thyme, toggleThyme } = useContext(ThymeContext);

  // Return theme status and toggler
  return { isDarkThyme: thyme, toggleThyme };
};
