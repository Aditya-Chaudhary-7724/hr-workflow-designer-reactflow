import React, { useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MarkerType,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

/* ================= MOCK API ================= */
const mockAPI = {
  getAutomations: async () => [
    { id: "send_email", label: "Send Email" },
    { id: "generate_doc", label: "Generate Doc" },
  ],
  simulate: async (workflow) =>
    workflow.nodes.map((n, i) => ({
      step: i + 1,
      message: `${n.data.label} executed`,
    })),
};

/* ================= NODE ================= */
const CustomNode = ({ data }) => (
  <div
    style={{
      padding: 16,
      borderRadius: 12,
      background: "#fff",
      border: "2px solid #6366f1",
      minWidth: 160,
      textAlign: "center",
    }}
  >
    <Handle type="target" position={Position.Top} />
    <strong>{data.label}</strong>
    <div style={{ fontSize: 12 }}>
      {data.title || "No config"}
    </div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

const nodeTypes = { custom: CustomNode };

/* ================= APP ================= */
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selected, setSelected] = useState(null);
  const [logs, setLogs] = useState([]);
  const [automations, setAutomations] = useState([]);

  useEffect(() => {
    mockAPI.getAutomations().then(setAutomations);
  }, []);

  /* ADD NODE */
  const addNode = (type) => {
    const node = {
      id: Date.now().toString(),
      type: "custom",
      position: {
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2 - 100,
      },
      data: { label: type },
    };
    setNodes((n) => [...n, node]);
  };

  /* UPDATE */
  const updateNode = (data) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selected.id ? { ...n, data: { ...n.data, ...data } } : n
      )
    );
  };

  /* CONNECT */
  const onConnect = (params) =>
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          markerEnd: { type: MarkerType.ArrowClosed },
          type: "smoothstep",
        },
        eds
      )
    );

  /* RUN */
  const run = async () => {
    const res = await mockAPI.simulate({ nodes, edges });
    setLogs(res);
  };

  /* EXPORT */
  const exportJSON = () => {
    const data = JSON.stringify({ nodes, edges }, null, 2);
    const blob = new Blob([data]);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "workflow.json";
    a.click();
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      {/* 🔥 TOOLBAR */}
      <div
        style={{
          position: "fixed",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#fff",
          padding: 10,
          borderRadius: 10,
          display: "flex",
          gap: 8,
          zIndex: 100,
        }}
      >
        {["Start", "Task", "Approval", "Automated", "End"].map((t) => (
          <button key={t} onClick={() => addNode(t)}>
            + {t}
          </button>
        ))}
        <button onClick={run}>▶ Run</button>
        <button onClick={exportJSON}>💾 Export</button>
      </div>

      {/* 🔥 CANVAS */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(e, n) => setSelected(n)}
        onPaneClick={() => setSelected(null)}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        panOnDrag={false}
        panOnScroll={false}
        minZoom={0.8}
        maxZoom={1.5}
      >
        <Background />
        <Controls />
      </ReactFlow>

      {/* 🔥 RIGHT PANEL */}
      {selected && (
        <div
          style={{
            position: "fixed",
            right: 20,
            top: 80,
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            width: 260,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          }}
        >
          <h3>{selected.data.label}</h3>

          <input
            placeholder="Title"
            value={selected.data.title || ""}
            onChange={(e) =>
              updateNode({ title: e.target.value })
            }
            style={{ width: "100%", marginBottom: 10 }}
          />

          {selected.data.label === "Task" && (
            <>
              <input
                placeholder="Description"
                onChange={(e) =>
                  updateNode({ description: e.target.value })
                }
                style={{ width: "100%", marginBottom: 10 }}
              />
              <input
                placeholder="Assignee"
                onChange={(e) =>
                  updateNode({ assignee: e.target.value })
                }
                style={{ width: "100%" }}
              />
            </>
          )}

          {selected.data.label === "Automated" && (
            <select
              onChange={(e) =>
                updateNode({ action: e.target.value })
              }
              style={{ width: "100%" }}
            >
              {automations.map((a) => (
                <option key={a.id}>{a.label}</option>
              ))}
            </select>
          )}
        </div>
      )}

      {/* 🔥 LOG */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          background: "#111",
          color: "white",
          padding: 10,
          width: 280,
          maxHeight: 200,
          overflow: "auto",
        }}
      >
        <h4>Execution Log</h4>
        {logs.map((l, i) => (
          <div key={i}>{l.message}</div>
        ))}
      </div>
    </div>
  );
}