import React from "react";
import TaskItem from "./TaskItem";
import { isOverdue } from "../utils/dateUtils";

export default function TaskList({
  tasks,
  filter,
  onToggleComplete,
  onDelete,
  onStartEdit,
  onSaveEdit,
  editingId,
  editingText,
  setEditingText,
  onCancelEdit,
}) {
  let filteredTasks = tasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter((t) => t.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter((t) => !t.completed);
  } else if (filter === "overdue") {
    filteredTasks = tasks.filter((t) => isOverdue(t.dueDate) && !t.completed);
  }

  if (filteredTasks.length === 0) return <p>No tasks to show.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onStartEdit={onStartEdit}
          onSaveEdit={onSaveEdit}
          editingId={editingId}
          editingText={editingText}
          setEditingText={setEditingText}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </ul>
  );
}
