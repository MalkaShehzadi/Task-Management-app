import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, dueDate) => {
    setTasks([
      ...tasks,
      { id: Date.now(), text, completed: false, dueDate },
    ]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, text: editingText.trim() } : t
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1>Task Management / To-Do List</h1>

      <TaskInput onAdd={addTask} />

      <FilterButtons currentFilter={filter} onChange={setFilter} />

      <TaskList
        tasks={tasks}
        filter={filter}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
        onStartEdit={startEdit}
        onSaveEdit={saveEdit}
        editingId={editingId}
        editingText={editingText}
        setEditingText={setEditingText}
        onCancelEdit={cancelEdit}
      />
    </div>
  );
}
