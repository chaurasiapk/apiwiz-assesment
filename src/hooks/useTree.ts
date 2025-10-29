// ==============================
// Imports
// ==============================
import { useContext } from "react";
import { TreeContext } from "../contexts/TreeContext";

// ==============================
// Custom Hook: useTree
// ==============================
// Provides access to tree nodes, edges, and their handlers from context
export const useTree = () => {
  // Get tree data and updater functions
  const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange } =
    useContext(TreeContext);

  // Return context values
  return { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange };
};
