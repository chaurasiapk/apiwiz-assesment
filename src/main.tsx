// Core
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// App
import { App } from "./App";

// Contexts
import { JsonProvider } from "./contexts/JsonContext";
import { ThymeProvider } from "./contexts/ThemeContext";
import { TreeProvider } from "./contexts/TreeContext";

// Styles
import "./index.css";

// Mount React app with global providers
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* JSON context */}
    <JsonProvider>
      {/* Theme context */}
      <ThymeProvider>
        {/* Tree/Flow context */}
        <TreeProvider>
          {/* Main app */}
          <App />
        </TreeProvider>
      </ThymeProvider>
    </JsonProvider>
  </StrictMode>
);
