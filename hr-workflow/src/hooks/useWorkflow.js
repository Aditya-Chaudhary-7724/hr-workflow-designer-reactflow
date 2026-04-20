import { useNodesState, useEdgesState } from "reactflow";

export default function useWorkflow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const addNode = (type) => {
    if (!type) return;

    const newNode = {
      id: Date.now().toString(),
      type: "custom",
      position: {
        x: 200 + Math.random() * 200,
        y: 200 + Math.random() * 200,
      },
      data: { label: type },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const updateNode = (id, data) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n
      )
    );
  };

  return {
    nodes,
    edges,
    setEdges,
    onNodesChange,
    onEdgesChange,
    addNode,
    updateNode,
  };
}