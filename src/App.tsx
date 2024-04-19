import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Task } from "./interfaces/Task";

import "./App.css";
import TodoList from "./pages/TodoList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskDetail from "./pages/TaskDetail";
import { read, update } from "./services/apiServices";

function App() {
  const apiUrl = `${process.env.REACT_APP_BASE_URL || ""}/api/todos`;

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await read("/api/todos");
        console.log("response: ", response);

        setTasks(response.data); // Assuming your API returns an array of tasks
      } catch (error) {
        console.error(error);
        // Handle errors appropriately, e.g., display error message to user
      }
    };

    fetchTasks();
  }, [apiUrl]);

  const getPageTitle = (path: string) => {
    if (path.includes("/todos/")) {
      return "Fungtech - Task Detail";
    } else {
      return "Fungtech - Todo List";
    }
  };

  const updateTask = async (id: number, newTask: Task) => {
    try {
      await update(`/api/todos/${id}`, newTask);
    } catch (error) {
      console.error(error);
      // Handle errors appropriately, e.g., display error message to user
    }
  };

  return (
    <BrowserRouter>
      <Helmet>
        <title>{getPageTitle(window.location.pathname)}</title>
        <link rel="icon" href="/new-favicon.ico" />
      </Helmet>
      <Routes>
        <Route path="/" element={<TodoList tasks={tasks} />} />
        <Route
          path="/todos/:id"
          element={<TaskDetail tasks={tasks} updateTask={updateTask} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
