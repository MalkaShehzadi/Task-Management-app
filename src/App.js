import React, { useState, useEffect } from "react";

function App() {
  // Load tasks from localStorage or start with empty array
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // all, completed, pending
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask.trim(), completed: false },
    ]);
    setNewTask("");
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, completed: !task.completed} : task
      )
    );
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditingText(task.text);
  };

  // Save edited task
  const saveEditing = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, text: editingText.trim()} : task
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
      <h1>Task Management / To-Do List</h1>

      {/* Input to add new task */}
      <input
        type="text"
        placeholder="Enter new task"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        onKeyDown={e => e.key === "Enter" && addTask()}
        style={{ width: "70%", padding: 8, marginRight: 8 }}
      />
      <button onClick={addTask} style={{ padding: "8px 16px" }}>Add Task</button>

      {/* Filters */}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setFilter("all")}
          style={{ marginRight: 8, fontWeight: filter === "all" ? "bold" : "normal" }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          style={{ marginRight: 8, fontWeight: filter === "pending" ? "bold" : "normal" }}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{ fontWeight: filter === "completed" ? "bold" : "normal" }}
        >
          Completed
        </button>
      </div>

      {/* Task List */}
      <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
        {filteredTasks.length === 0 && <li>No tasks to show.</li>}

        {filteredTasks.map(task => (
          <li key={task.id} style={{ marginBottom: 12, display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              style={{ marginRight: 12 }}
            />

            {/* Edit mode */}
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={e => setEditingText(e.target.value)}
                  style={{ flexGrow: 1, marginRight: 8, padding: 6 }}
                  onKeyDown={e => {
                    if (e.key === "Enter") saveEditing(task.id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                />
                <button onClick={() => saveEditing(task.id)} style={{ marginRight: 8 }}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  onDoubleClick={() => startEditing(task)}
                  style={{
                    flexGrow: 1,
                    textDecoration: task.completed ? "line-through" : "none",
                    cursor: "pointer"
                  }}
                  title="Double click to edit"
                >
                  {task.text}
                </span>
                <button onClick={() => startEditing(task)} style={{ marginRight: 8 }}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
