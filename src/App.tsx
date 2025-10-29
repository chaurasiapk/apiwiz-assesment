// ==============================
// Imports
// ==============================
import { JsonTreeVisualizer } from "./components/JsonTreeVisualizer";
import { useThyme } from "./hooks/useThyme";

// ==============================
// App Component
// ==============================
export const App = () => {
  // Theme state (light/dark)
  const { isDarkThyme } = useThyme();

  // Render main layout
  return (
    <div
      className={`w-full h-screen ${
        isDarkThyme ? "bg-[#1f2937]" : "bg-white"
      }`}
    >
      {/* JSON Tree visualizer */}
      <JsonTreeVisualizer />
    </div>
  );
};
