// ==============================
// Imports
// ==============================
import { createContext, useState } from "react";

// ==============================
// Context: JsonContext
// ==============================
// Holds JSON data and its setter function
export const JsonContext = createContext<{
  json: string;
  setJson: (json: string) => void;
}>({
  json: "",
  setJson: () => {},
});

// ==============================
// Provider: JsonProvider
// ==============================
// Wraps components with JSON state context
export const JsonProvider = ({ children }: { children: React.ReactNode }) => {
  // Local JSON state
  const [json, setJson] = useState<string>("");

  // Shared context value
  const value = { json, setJson };

  // Provide context to child components
  return <JsonContext.Provider value={value}>{children}</JsonContext.Provider>;
};
