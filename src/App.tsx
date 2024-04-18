import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Todo } from "./components/Todo";

import "./App.css";
import TodoList from "./pages/TodoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoDetail from "./pages/TodoDetail";

function App() {
  const apiUrl = `${process.env.REACT_APP_BASE_URL || ""}/api/todos`;

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log("response: ", response);

        setTodos(response.data); // Assuming your API returns an array of todos
      } catch (error) {
        console.error(error);
        // Handle errors appropriately, e.g., display error message to user
      }
    };

    fetchTodos();
  }, [apiUrl]);

  const getPageTitle = (path: string) => {
    console.log("path: ", path);
    if (path.includes("/todos/")) {
      return "Fungtech - Todo Detail";
    } else {
      return "Fungtech - Todo List";
    }
  };

  return (
    <BrowserRouter>
      <Helmet>
        <title>{getPageTitle(window.location.pathname)}</title>
        <link rel="icon" href="/new-favicon.ico" />
      </Helmet>
      <Routes>
        <Route path="/" element={<TodoList todos={todos} />} />
        <Route path="/todos/:id" element={<TodoDetail todos={todos} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
