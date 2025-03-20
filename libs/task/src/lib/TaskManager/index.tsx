/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import TaskItem from "../TaskItem";

interface Task {
  id: string;
  title: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
}

const containerStyle = css`
  padding: 24px;
`;

const headingStyle = css`
  font-size: 20px;
  font-weight: bold;
`;

const inputContainer = css`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

const taskGrid = css`
  display: grid;
  gap: 16px;
  margin-top: 24px;
`;

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      status: "To Do",
      priority: priority as Task["priority"],
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const updateTaskStatus = (id: string, status: Task["status"]) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status } : task)));
  };

  return (
    <div css={containerStyle}>
      <h2 css={headingStyle}>Task Manager</h2>
      <div css={inputContainer}>
        <input
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="New task..."
          css={css`padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 200px;`}
        />
        <select value={priority} onChange={e => setPriority(e.target.value)} css={css`padding: 8px;`}>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button onClick={addTask} css={css`padding: 8px 16px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;`}>
          Add Task
        </button>
      </div>
      <div css={taskGrid}>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} updateTaskStatus={updateTaskStatus} />
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
