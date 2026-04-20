export default function NodePanel({ node, updateNode }) {
  if (!node) return null;

  return (
    <div style={{ width: "100%" }}>
      <h3 style={{ marginBottom: 12, color: "#111" }}>
        {node.data.label}
      </h3>

      <input
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          background: "#fff",
          color: "#111",
          marginBottom: "10px",
          boxSizing: "border-box",   // 🔥 FIX
        }}
        placeholder="Enter title"
        value={node.data.title || ""}
        onChange={(e) =>
          updateNode(node.id, { title: e.target.value })
        }
      />

      <textarea
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          background: "#fff",
          color: "#111",
          boxSizing: "border-box",   // 🔥 FIX
        }}
        placeholder="Description"
        onChange={(e) =>
          updateNode(node.id, { desc: e.target.value })
        }
      />
    </div>
  );
}