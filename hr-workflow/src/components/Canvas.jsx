import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MarkerType
} from "reactflow";
import "reactflow/dist/style.css";

export default function Canvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  setEdges,
  setSelectedNode,
  nodeTypes,
}) {
  const onConnect = (params) =>
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: "smoothstep",
          markerEnd: { type: MarkerType.ArrowClosed },
        },
        eds
      )
    );

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#f8fafc" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(e, node) => setSelectedNode(node)}
        fitView
      >
        <Background color="#d1d5db" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
}