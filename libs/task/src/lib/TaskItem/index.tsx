
import { css } from "@emotion/react";
import { FC } from "react";


interface Task {
  id: string;
  title: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
}

interface TaskItemProps {
  task: Task;
  updateTaskStatus: (id: string, status: Task["status"]) => void;
}

const taskItemStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const selectStyle = css`
  padding: 6px;
`;

const TaskItem: FC<TaskItemProps> = ({ task, updateTaskStatus }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = (e.target as HTMLSelectElement).value; // ✅ Explicitly assert type
    updateTaskStatus(task.id, selectedValue as Task["status"]);
  };
  return (
    <div css={taskItemStyle}>
      <div>
        <strong>{task.title}</strong>
        <p>Priority: {task.priority}</p>
      </div>
      <select
        value={task.status}
        onChange={handleChange}
        css={selectStyle}
        name="task-status"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
};

export default TaskItem;
