import { Moon, Sun } from "lucide-react";
import { useThyme } from "../hooks/useThyme";

// ------------------------------------------------------
// Component: ThymeToggle
// Purpose: Provides a smooth toggle switch UI
// to switch between dark and light thyme (theme) modes.
// ------------------------------------------------------
export const ThymeToggle = () => {
  // ---------------------------------------
  // Hook: Access thyme mode and toggle function
  // ---------------------------------------
  const { isDarkThyme, toggleThyme } = useThyme();

  // ---------------------------------------
  // Render: Animated toggle button with icon
  // ---------------------------------------
  return (
    <button
      onClick={toggleThyme}
      aria-label="Toggle theme"
      className={`
        relative inline-flex h-8 w-16 sm:w-[4.5rem] items-center
        rounded-full transition-all duration-300 shadow-md
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        bg-blue-600
      `}
    >
      {/* Sliding knob */}
      <span
        className={`
          inline-flex items-center justify-center h-5 w-7 sm:h-6 sm:w-8
          transform rounded-full bg-white transition-all duration-300 shadow-lg
          ${isDarkThyme ? "translate-x-8 sm:translate-x-9" : "translate-x-1"}
        `}
      >
        {/* Dynamic icon based on theme */}
        {isDarkThyme ? (
          <Moon className="w-4 h-4 text-blue-600" />
        ) : (
          <Sun className="w-4 h-4 text-blue-500" />
        )}
      </span>
    </button>
  );
};
