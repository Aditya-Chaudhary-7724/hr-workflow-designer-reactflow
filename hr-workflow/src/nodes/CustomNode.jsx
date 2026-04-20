import { Handle, Position } from "reactflow";

export default function CustomNode({ data }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 14,
        background: "#ffffff",
        border: "2px solid #4f46e5",
        minWidth: 160,
        textAlign: "center",
        boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Handle type="target" position={Position.Top} />

      <div style={{ fontWeight: "600", fontSize: 16, color: "#111" }}>
        {data.label}
      </div>

      <div style={{ fontSize: 13, color: "#555", marginTop: 6 }}>
        {data.title || "No config"}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}