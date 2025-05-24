import React, { useState } from "react";
import { isOverdue } from "../utils/dateUtils";

export default function TaskItem({
  task,
  onToggleComplete,
  onDelete,
  onStartEdit,
  onSaveEdit,
  editingId,
  editingText,
  setEditingText,
  onCancelEdit,
}) {
  const overdue = isOverdue(task.dueDate) && !task.completed;

  return (
    <li
      style={{
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        backgroundColor: overdue ? "#ffe6e6" : "transparent",
        padding: "6px 8px",
        borderRadius: 4,
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        style={{ marginRight: 12 }}
      />

      {editingId === task.id ? (
        <>
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            style={{ flexGrow: 1, marginRight: 8, padding: 6 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSaveEdit(task.id);
              if (e.key === "Escape") onCancelEdit();
            }}
          />
          <button onClick={() => onSaveEdit(task.id)} style={{ marginRight: 8 }}>
            Save
          </button>
          <button onClick={onCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <span
            onDoubleClick={() => onStartEdit(task)}
            style={{
              flexGrow: 1,
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
              color: overdue ? "red" : "inherit",
            }}
            title={
              overdue
                ? `Overdue: Due ${new Date(task.dueDate).toLocaleDateString()}`
                : task.dueDate
                ? `Due: ${new Date(task.dueDate).toLocaleDateString()}`
                : ""
            }
          >
            {task.text}
          </span>
          {task.dueDate && (
            <small style={{ marginLeft: 8, fontStyle: "italic", fontSize: 12 }}>
              (Due: {new Date(task.dueDate).toLocaleDateString()})
            </small>
          )}
          <button onClick={() => onStartEdit(task)} style={{ marginLeft: 8, marginRight: 8 }}>
            Edit
          </button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </>
      )}
    </li>
  );
}
