import React from "react";
import { Todo } from "../components/Todo";

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <a href={`todos/${todo.id}`}>{todo.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
