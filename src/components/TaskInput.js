import React, { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    if (text.trim() === "") return;
    onAdd(text.trim(), dueDate || null);
    setText("");
    setDueDate("");
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Enter new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: 8, width: "50%", marginRight: 8 }}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ padding: 8, marginRight: 8 }}
      />
      <button onClick={handleAdd} style={{ padding: "8px 16px" }}>
        Add Task
      </button>
    </div>
  );
}
