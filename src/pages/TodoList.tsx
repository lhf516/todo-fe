import React from "react";
import { Task } from "../interfaces/Task";

interface TodoListProps {
  tasks: Task[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <a href={`todos/${task.id}`}>{task.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
