import React from "react";
import { useParams } from "react-router-dom";
import { Todo } from "../components/Todo";

interface TodoDetailProps {
  todos: Todo[];
}

const TodoDetail: React.FC<TodoDetailProps> = ({ todos }) => {
  const { id } = useParams<{ id: string }>(); // Get id from URL
  const selectedTodo = todos.find((todo) => {
    return Number(todo.id) === parseInt(id ?? "");
  });
  console.log("todos", todos);
  console.log("selectedTodo", selectedTodo);

  if (!selectedTodo) {
    return <p>Todo not found!</p>;
  }

  return (
    <div>
      <h2>{selectedTodo.title}</h2>
      <p>{selectedTodo.detail}</p>
      {/* Add buttons to mark complete/edit */}
    </div>
  );
};

export default TodoDetail;
