import { useCallback, useState } from "react";
import { RefreshCcw, Search } from "lucide-react";

import { useThyme } from "../hooks/useThyme";
import { useTree } from "../hooks/useTree";
import { normalizePath } from "../utils/common";
import { useIsSmallDevice } from "../hooks/useRecursiveMenu";

// -----------------------------------------------------------
// Component: SearchInput
// Purpose: Allows users to search for JSON tree nodes by path.
// Highlights matched nodes and dims unmatched ones.
// -----------------------------------------------------------
export const SearchInput = () => {
  // ---------------------------
  // Local state for search query
  // ---------------------------
  const [search, setSearch] = useState("");

  // ---------------------------
  // Hooks: Retrieve theme, device size, and tree data
  // ---------------------------
  const { isDarkThyme } = useThyme();
  const isSmallDevice = useIsSmallDevice();
  const { nodes, setNodes } = useTree();

  // -----------------------------------------------------------
  // Function: handleReset
  // Resets search input and restores all node opacity.
  // -----------------------------------------------------------
  const handleReset = useCallback(() => {
    setSearch("");
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        style: { ...node.style, opacity: 1 },
      }))
    );
  }, [setNodes]);

  // -----------------------------------------------------------
  // Function: handleSearch
  // Filters nodes based on the search term (path-based match).
  // Dims unmatched nodes and highlights matched ones.
  // -----------------------------------------------------------
  const handleSearch = useCallback(() => {
    if (!nodes.length) {
      alert("No nodes found");
      return;
    }

    // Reset opacity if search is empty
    if (!search.trim()) {
      setNodes((nodes) =>
        nodes.map((node) => ({
          ...node,
          style: { ...node.style, opacity: 1 },
        }))
      );
      return;
    }

    const normalizedSearch = normalizePath(search);
    let isFound = false;

    // Highlight matching nodes
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        const match =
          node?.data?.path === normalizedSearch ||
          node?.data?.path.includes(normalizedSearch);

        if (match) isFound = true;

        return {
          ...node,
          style: {
            ...node.style,
            opacity: match ? 1 : 0.3,
          },
        };
      })
    );

    // Show alert if no node matches the query
    if (!isFound) {
      alert("No match found");
    }
  }, [nodes, search, setNodes]);

  // -----------------------------------------------------------
  // Render: Search input with action buttons (Search & Reset)
  // -----------------------------------------------------------
  return (
    <div className="flex items-center gap-2 w-full relative">
      {/* Search icon inside input */}
      <Search
        className={`w-6 h-6 absolute left-4 pointer-events-none ${
          isDarkThyme ? "text-white" : "text-gray-500"
        }`}
      />

      {/* Input field */}
      <input
        type="text"
        placeholder="user.address.city"
        className={`w-full border rounded-lg py-2.5 sm:py-3 px-4 pl-12 transition-colors ${
          isDarkThyme
            ? "border-gray-600 text-white bg-gray-900"
            : "border-gray-300 text-black bg-white"
        }`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Search button */}
      <button
        onClick={handleSearch}
        className="px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg active:scale-[0.98]"
      >
        {isSmallDevice ? (
          <Search className="w-6 h-6 text-white" />
        ) : (
          "Search"
        )}
      </button>

      {/* Reset button */}
      <button
        onClick={handleReset}
        className="px-4 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg active:scale-[0.98]"
      >
        {isSmallDevice ? (
          <RefreshCcw className="w-6 h-6 text-white" />
        ) : (
          "Reset"
        )}
      </button>
    </div>
  );
};
