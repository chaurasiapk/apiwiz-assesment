import { createContext, useMemo } from "react";
import {
  type Node,
  type Edge,
  MarkerType,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { useJson } from "../hooks/useJson";

// --------------------------------------------------
// Context: TreeContext
// Provides access to node/edge data and handlers
// used for rendering and managing the JSON tree.
// --------------------------------------------------
export const TreeContext = createContext<{
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (nodes: Node[]) => void;
  onEdgesChange: (edges: Edge[]) => void;
}>({
  nodes: [],
  edges: [],
  setNodes: () => {},
  setEdges: () => {},
  onNodesChange: () => {},
  onEdgesChange: () => {},
});

// --------------------------------------------------
// Interface: TreeNode
// Represents each node in the visualized tree.
// --------------------------------------------------
interface TreeNode {
  id: string;
  type: "default";
  position: { x: number; y: number };
  data: { label: string; path: string };
  style?: Record<string, any>;
}

// --------------------------------------------------
// Layout constants
// NODE_WIDTH: width of each node box
// HORIZONTAL_SPACING & VERTICAL_SPACING: spacing between nodes
// --------------------------------------------------
const NODE_WIDTH = 140;
const HORIZONTAL_SPACING = 180;
const VERTICAL_SPACING = 120;

// --------------------------------------------------
// Utility: getNodeColor
// Returns a color based on the value type
// --------------------------------------------------
const getNodeColor = (value: any): string => {
  if (typeof value === "string") return "#FCD34D"; // yellow
  if (typeof value === "number") return "#86EFAC"; // green
  if (typeof value === "boolean") return "#F9A8D4"; // pink
  if (value === null) return "#D1D5DB"; // gray
  if (Array.isArray(value)) return "#86EFAC"; // green
  return "#93C5FD"; // blue for objects
};

// --------------------------------------------------
// Provider: TreeProvider
// Builds and provides a visual tree structure
// from the JSON data using React Flow.
// --------------------------------------------------
export const TreeProvider = ({ children }: { children: React.ReactNode }) => {
  // ---------------------------
  // Initialize React Flow state
  // ---------------------------
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // ---------------------------
  // Read JSON data from context
  // ---------------------------
  const { json: rawJson = "" } = useJson();

  // ---------------------------
  // Safely parse the JSON string
  // ---------------------------
  const json = useMemo(() => {
    try {
      return JSON.parse(rawJson);
    } catch {
      return {}; // return empty if invalid JSON
    }
  }, [rawJson]);

  // ---------------------------
  // Build tree structure when JSON changes
  // ---------------------------
  useMemo(() => {
    const tempNodes: TreeNode[] = [];
    const tempEdges: Edge[] = [];
    let nodeId = 0;

    // ---------------------------------------
    // Helper: Calculate subtree width recursively
    // Used to space out child nodes properly
    // ---------------------------------------
    const calculateSubtreeWidth = (obj: any): number => {
      if (typeof obj !== "object" || obj === null) return 1;
      if (Array.isArray(obj)) return Math.max(obj.length, 1);

      const keys = Object.keys(obj);
      if (keys.length === 0) return 1;

      return keys.reduce(
        (width, key) => width + calculateSubtreeWidth(obj[key]),
        0
      );
    };

    // ---------------------------------------
    // Recursive function: traverse
    // Builds nodes and edges for each key/value pair
    // ---------------------------------------
    const traverse = (
      obj: any,
      key: string,
      parentId: string | null,
      depth: number,
      xOffset: number,
      path: string
    ): number => {
      const currentId = `node-${nodeId++}`;
      const currentPath = path ? `${path}.${key}` : key;

      // Determine label and color
      const nodeColor = getNodeColor(obj);
      const label =
        typeof obj !== "object" || obj === null
          ? `${key}\n:\n${JSON.stringify(obj)}`
          : key;

      // Create the node
      const node: TreeNode = {
        id: currentId,
        type: "default",
        position: { x: xOffset, y: depth * VERTICAL_SPACING },
        data: { label, path: currentPath },
        style: {
          background: nodeColor,
          color: "#1F2937",
          border: "2px solid rgba(0,0,0,0.1)",
          borderRadius: "8px",
          fontSize: "13px",
          fontWeight: "600",
          padding: "12px",
          width: NODE_WIDTH,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          wordBreak: "break-word",
        },
      };
      tempNodes.push(node);

      // Create edge to parent (if exists)
      if (parentId) {
        tempEdges.push({
          id: `edge-${parentId}-${currentId}`,
          source: parentId,
          target: currentId,
          type: "smoothstep",
          animated: false,
          style: { stroke: "#94A3B8", strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: "#94A3B8" },
        });
      }

      // Calculate children positions recursively
      let currentXOffset = xOffset;
      if (typeof obj === "object" && obj !== null) {
        const children = Array.isArray(obj)
          ? obj.map((v, i) => [i.toString(), v])
          : Object.entries(obj);

        for (const [childKey, childValue] of children) {
          const childWidth = calculateSubtreeWidth(childValue);
          const childX =
            currentXOffset + (childWidth - 1) * HORIZONTAL_SPACING * 0.5;
          traverse(
            childValue,
            childKey,
            currentId,
            depth + 1,
            childX,
            currentPath
          );
          currentXOffset += childWidth * HORIZONTAL_SPACING;
        }
      }

      return currentXOffset;
    };

    // ---------------------------------------
    // Build root-level nodes
    // ---------------------------------------
    const rootKeys = Object.keys(json);
    let startX = 0;

    rootKeys.forEach((key) => {
      const subtreeWidth = calculateSubtreeWidth(json[key]);
      const centerX = startX + (subtreeWidth - 1) * HORIZONTAL_SPACING * 0.5;
      traverse(json[key], key, null, 0, centerX, "");
      startX += subtreeWidth * HORIZONTAL_SPACING;
    });

    // ---------------------------------------
    // Update React Flow state after traversal
    // ---------------------------------------
    setNodes(tempNodes);
    setEdges(tempEdges);
  }, [json, setNodes, setEdges]);

  // ---------------------------
  // Provide all state + handlers
  // ---------------------------
  const value = {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
  };

  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};
