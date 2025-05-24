import React from "react";

export default function FilterButtons({ currentFilter, onChange }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {["all", "pending", "completed", "overdue"].map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          style={{
            marginRight: 8,
            fontWeight: currentFilter === f ? "bold" : "normal",
          }}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
