<div
  style={{
    position: "absolute",
    top: "50%",
    left: 0,
    transform: "translateY(-50%)",
    zIndex: 10
  }}
>
  <div
    style={{
      width: 40,
      height: 120,
      background: "#6366f1",
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      cursor: "pointer"
    }}
  ></div>

  <div
    style={{
      position: "absolute",
      left: 40,
      top: 0,
      background: "#ffffff",
      padding: 12,
      borderRadius: 12,
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
      display: "none"
    }}
    className="hover-panel"
  >
    {["Start", "Task", "Approval", "Automated", "End"].map((type) => (
      <button
        key={type}
        onClick={() => addNode(type)}
        style={{
          display: "block",
          margin: "6px 0",
          padding: "8px 12px",
          borderRadius: 8,
          border: "none",
          background: "#6366f1",
          color: "white",
          cursor: "pointer"
        }}
      >
        + {type}
      </button>
    ))}
  </div>
</div>