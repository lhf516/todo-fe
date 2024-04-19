import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, createTheme } from "@mui/material";
import { styled } from "@mui/system";
import { Todo } from "../components/Todo";

interface TodoDetailProps {
  todos: Todo[];
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      contrastText: 'white',
    },
  },
});

const TodoDetail: React.FC<TodoDetailProps> = ({ todos }) => {
  const { id } = useParams<{ id: string }>(); // Get id from URL
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (id && todos.length > 0) {
      const selectedTodo = todos.find((todo) => {
        return Number(todo.id) === parseInt(id ?? "");
      });
      setSelectedTodo(selectedTodo || null);
    }
  }, [id, todos]);

  const DetailComponent = styled('div')(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  }));

  if (!selectedTodo) {
    return <p>Todo not found!</p>;
  }

  return (
    <DetailComponent theme={customTheme}>
      <h2>{selectedTodo.title}</h2>
      <p>{selectedTodo.detail}</p>
      <Button variant="contained" color="primary">
        Mark as complete
      </Button>
      <Button variant="contained" color="secondary">
        Edit
      </Button>
    </DetailComponent>
  );
};

export default TodoDetail;
