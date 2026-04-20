import React, { useState } from "react";
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
import html2canvas from "html2canvas";

/* NODE */
const CustomNode = ({ data }) => (
  <div
    style={{
      padding: 16,
      borderRadius: 10,
      background: "#ffffff",
      border: "2px solid #6366f1",
      minWidth: 180,
      textAlign: "center",
    }}
  >
    <Handle type="target" position={Position.Top} />
    <div style={{ fontWeight: 600 }}>{data.label}</div>
    <div style={{ fontSize: 13, color: "#555" }}>
      {data.title || "No config"}
    </div>
    <Handle type="source" position={Position.Bottom} />
  </div>
);

const nodeTypes = { custom: CustomNode };

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selected, setSelected] = useState(null);
  const [logs, setLogs] = useState([]);
  const [counter, setCounter] = useState(0);

  /* ADD NODE (SPREAD POSITION) */
  const addNode = (type) => {
    const newNode = {
      id: Date.now().toString(),
      type: "custom",
      position: {
        x: 100 + (counter % 5) * 200,
        y: 100 + Math.floor(counter / 5) * 150,
      },
      data: { label: type, title: "" },
    };

    setCounter((c) => c + 1);
    setNodes((n) => [...n, newNode]);
  };

  /* CONNECT */
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

  /* RUN */
  const run = () => {
    if (!nodes.find((n) => n.data.label === "Start")) {
      alert("Add Start node first");
      return;
    }

    const result = nodes.map((n, i) => ({
      step: i + 1,
      message: `${n.data.label} executed`,
    }));

    setLogs(result);
  };

  /* EXPORT JSON */
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ nodes, edges }, null, 2)]);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "workflow.json";
    a.click();
  };

  /* EXPORT IMAGE */
  const exportImage = () => {
    const el = document.querySelector(".react-flow");
    html2canvas(el).then((canvas) => {
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "workflow.png";
      a.click();
    });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0f172a",
        overflow: "hidden",
      }}
    >
      {/* TOOLBAR */}
      <div
        style={{
          position: "absolute",
          top: 15,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#1e293b",
          padding: 10,
          borderRadius: 10,
          display: "flex",
          gap: 8,
          zIndex: 100,
        }}
      >
        {["Start", "Task", "Approval", "Automated", "End"].map((t) => (
          <button
            key={t}
            onClick={() => addNode(t)}
            style={{
              padding: "6px 10px",
              background: "#334155",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {t}
          </button>
        ))}

        <button onClick={run} style={{ background: "#4f46e5", color: "white" }}>
          Run
        </button>

        <button onClick={exportJSON}>JSON</button>
        <button onClick={exportImage}>JPG</button>
      </div>

      {/* CANVAS */}
      <ReactFlow
        style={{ width: "100%", height: "100%" }}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(e, n) => setSelected(n)}
        onPaneClick={() => setSelected(null)}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView={false}
      >
        <Background />
        <Controls />
      </ReactFlow>

      {/* CONFIG PANEL */}
      {selected && (
        <div
          style={{
            position: "absolute",
            right: 20,
            top: 80,
            background: "#1e293b",
            padding: 15,
            borderRadius: 10,
            width: 240,
            color: "white",
          }}
        >
          <h3>{selected.data.label}</h3>

          <input
            value={selected.data.title}
            onChange={(e) => {
              const val = e.target.value;

              setNodes((nds) =>
                nds.map((n) =>
                  n.id === selected.id
                    ? { ...n, data: { ...n.data, title: val } }
                    : n
                )
              );

              setSelected((prev) => ({
                ...prev,
                data: { ...prev.data, title: val },
              }));
            }}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "none",
            }}
          />
        </div>
      )}

      {/* LOG */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          background: "#020617",
          color: "white",
          padding: 10,
          width: 240,
        }}
      >
        <strong>Execution Log</strong>
        {logs.map((l, i) => (
          <div key={i}>{l.message}</div>
        ))}
      </div>
    </div>
  );
}