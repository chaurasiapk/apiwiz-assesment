// ==============================
// Imports
// ==============================
import { useContext } from "react";
import { JsonContext } from "../contexts/JsonContext";

// ==============================
// Custom Hook: useJson
// ==============================
// Provides access to JSON data and its updater from context
export const useJson = () => {
  // Get JSON state and setter
  const { json, setJson } = useContext(JsonContext);

  // Return context values
  return { json, setJson };
};
