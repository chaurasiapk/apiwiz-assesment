import ReactFlow, {
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import { useTree } from "../hooks/useTree";
import { useThyme } from "../hooks/useThyme";

// ------------------------------------------------------------
// Component: TreeVisualizer
// Purpose: Renders the visual representation of the JSON tree
// using React Flow with zoom controls and background styling.
// ------------------------------------------------------------
export const TreeVisualizer = () => {
  // ---------------------------------------
  // Hooks: Retrieve nodes, edges, and change handlers
  // from TreeContext + theme mode from ThymeContext.
  // ---------------------------------------
  const { nodes, edges, onNodesChange, onEdgesChange } = useTree();
  const { isDarkThyme } = useThyme();

  // ---------------------------------------
  // Render: ReactFlow tree graph with background & controls
  // ---------------------------------------
  return (
    <div className="h-full w-full">
      <ReactFlow
        // Graph data
        nodes={nodes as Node[]}
        edges={edges as Edge[]}
        // Zoom limits
        minZoom={0.1}
        maxZoom={4}
        // Auto fit view
        fitView
        // Handlers: propagate node/edge updates
        onNodesChange={(changes: NodeChange[]) =>
          onNodesChange(changes as any)
        }
        onEdgesChange={(changes: EdgeChange[]) =>
          onEdgesChange(changes as any)
        }
      >
        {/* Background grid — adapts to theme */}
        <Background
          className={isDarkThyme ? "bg-gray-900" : "bg-gray-100"}
          gap={16}
          size={1}
        />

        {/* Zoom and pan controls — styled per theme */}
        <Controls
          className={
            isDarkThyme
              ? "bg-gray-800 border-gray-700 [&>button]:bg-gray-700 [&>button]:border-gray-600 [&>button:hover]:bg-gray-600"
              : ""
          }
        />
      </ReactFlow>
    </div>
  );
};
