import { useCallback, useEffect, useState } from "react";
import { useThyme } from "../hooks/useThyme";
import { JsonInput } from "./JsonInput";
import { SearchInput } from "./SearchInput";
import { ThymeToggle } from "./ThymeToggle";
import { TreeVisualizer } from "./TreeVisualizer";
import { MenuIcon } from "lucide-react";
import { useJson } from "../hooks/useJson";
import { useIsSmallDevice } from "../hooks/useRecursiveMenu";

export const JsonTreeVisualizer = () => {
  /* ---------------------------- Hooks & States ---------------------------- */
  const { isDarkThyme } = useThyme();         // Theme mode (dark/light)
  const { json } = useJson();                 // Global JSON state
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Sidebar (JSON input) visibility
  const isSmallDevice = useIsSmallDevice();   // Check for mobile device

  /* --------------------------- Responsive Behavior ------------------------ */
  // Automatically open JSON input on small devices when no JSON is present
  useEffect(() => {
    setIsMenuOpen(window.innerWidth < 768 && json === "");
  }, [json]);

  /* ---------------------------- Handlers ---------------------------------- */
  // Toggle JSON input panel (used in mobile view)
  const handleMenuOpen = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  /* ------------------------------ JSX ------------------------------------- */
  return (
    <div className="flex flex-col w-full h-full">
      {/* -------------------------- Header Section -------------------------- */}
      <div
        className={`p-4 flex justify-between items-center border-b ${
          isDarkThyme ? "border-gray-600" : "border-gray-300"
        }`}
      >
        <div
          className={`text-2xl font-bold ${
            isDarkThyme ? "text-white" : "text-black"
          }`}
        >
          JSON <span className="text-green-600">Tree</span> Visualizer
        </div>
        <ThymeToggle />
      </div>

      {/* -------------------------- Main Content ---------------------------- */}
      <div className="flex h-full relative">
        {/* ------------------------ JSON Input Panel ------------------------ */}
        <div
          className={`flex-1 border-r ${
            isDarkThyme
              ? "border-gray-600 bg-[#1f2937]"
              : "border-gray-300 bg-white"
          } ${
            isSmallDevice
              ? isMenuOpen
                ? "absolute left-0 w-full h-full z-50"
                : "absolute left-[-100%] transition-all duration-300"
              : ""
          } p-2`}
        >
          <JsonInput
            isMenuOpen={isSmallDevice && isMenuOpen}
            handleMenuOpen={handleMenuOpen}
          />
        </div>

        {/* -------------------------- Tree Area ----------------------------- */}
        <div className="flex-3 relative">
          {/* Search + Menu toggle (mobile view) */}
          <div className="absolute z-10 w-full flex items-center gap-2 p-2">
            {isSmallDevice && (
              <button
                onClick={handleMenuOpen}
                className={`p-2 rounded-md transition-all duration-300 ${
                  isDarkThyme ? "hover:bg-gray-600" : "hover:bg-gray-200"
                }`}
              >
                <MenuIcon
                  className={`w-6 h-6 cursor-pointer ${
                    isDarkThyme ? "text-white" : "text-black"
                  }`}
                />
              </button>
            )}
            <SearchInput />
          </div>

          {/* JSON Tree Visual Representation */}
          <div className="flex h-[calc(100%-80px)]">
            <TreeVisualizer />
          </div>
        </div>
      </div>
    </div>
  );
};
