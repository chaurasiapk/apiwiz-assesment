import { useCallback, useState, type FC } from "react";
import { isValidJson } from "../utils/JsonParser";
import { useJson } from "../hooks/useJson";
import { useThyme } from "../hooks/useThyme";
import { X } from "lucide-react";

interface IJsonInput {
  isMenuOpen: boolean;
  handleMenuOpen: () => void;
}

/* ===========================================================================
   Component: JsonInput
   Description: Handles JSON input, validation, and updates the shared context.
   =========================================================================== */
export const JsonInput: FC<IJsonInput> = ({ isMenuOpen, handleMenuOpen }) => {
  /* ------------------------------- State ---------------------------------- */
  const [json, setJson] = useState<string>(""); // Local JSON input text

  /* ------------------------------ Contexts -------------------------------- */
  const { setJson: setJsonContext } = useJson(); // Global JSON setter
  const { isDarkThyme } = useThyme(); // Theme mode (dark/light)

  /* ----------------------------- Handlers --------------------------------- */
  // Validate JSON and update global context
  const handleGenerateTree = useCallback(() => {
    if (isValidJson(json)) {
      setJsonContext(json);
      if (isMenuOpen) handleMenuOpen(); // Close menu on small devices
    } else {
      alert("Invalid JSON");
      setJsonContext("");
    }
  }, [handleMenuOpen, isMenuOpen, json, setJsonContext]);

  // Update local JSON text as user types
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setJson(e.target.value);
    },
    []
  );

  /* ------------------------------- Render --------------------------------- */
  return (
    <div className="flex flex-col gap-1 h-full">
      {/* --------------------------- Header Bar ----------------------------- */}
      <div className="flex items-center justify-between">
        <h1
          className={`font-bold ${isDarkThyme ? "text-white" : "text-black"}`}
        >
          JSON Input
        </h1>

        {/* Close button (visible only in mobile sidebar mode) */}
        {isMenuOpen && (
          <button
            onClick={handleMenuOpen}
            className={`p-2 rounded-md transition-all duration-300 ${
              isDarkThyme ? "hover:bg-gray-600" : "hover:bg-gray-200"
            }`}
          >
            <X
              className={`w-6 h-6 cursor-pointer ${
                isDarkThyme ? "text-white" : "text-black"
              }`}
            />
          </button>
        )}
      </div>

      {/* -------------------------- JSON Text Area -------------------------- */}
      <textarea
        className={`w-full h-full border rounded-md p-2 min-h-[200px] 
          max-h-[calc(100vh-200px)] overflow-y-auto roboto ${
            isDarkThyme
              ? "text-white border-gray-600 bg-gray-900"
              : "text-black border-gray-300 bg-gray-100"
          }`}
        value={json}
        onChange={handleInputChange}
      />

      {/* ------------------------ Generate Button --------------------------- */}
      <button
        onClick={handleGenerateTree}
        className="mt-2 w-full px-4 py-3 sm:py-3.5 
        bg-gradient-to-r from-blue-600 to-blue-700 
        hover:from-blue-700 hover:to-blue-800 text-white 
        font-semibold rounded-lg transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:ring-offset-2 shadow-md hover:shadow-lg active:scale-[0.98]"
      >
        Generate Tree
      </button>
    </div>
  );
};
