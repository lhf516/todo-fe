import React, { useEffect, useState } from "react";
import { Task } from "../interfaces/Task";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import TaskDetail from "./TaskDetail";
import { read } from "../services/apiServices";

const TodoList: React.FC = () => {
  const apiUrl = `${process.env.REACT_APP_BASE_URL || ""}/api/todos`;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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

  useEffect(() => {
    fetchTasks();
  }, [apiUrl]);

  const handleOpen = (task: Task | null) => {
    setOpen(true);
    if (task) setSelectedTask(task);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  return (
    <Grid
      container
      alignContent="center"
      sx={{ minHeight: "100vh" }}
      display="flex"
      flexDirection="column"
    >
      <Typography variant="h3">MY TODO LIST</Typography>
      <List sx={{ bgcolor: "background.paper" }} aria-label="contacts">
        {tasks.map((task) => (
          <ListItem disablePadding key={task.id}>
            <ListItemButton onClick={() => handleOpen(task)}>
              <ListItemText primary={task.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <TaskDetail
        open={open}
        selectedTask={selectedTask}
        handleClose={handleClose}
        fetchTasks={fetchTasks}
      />
    </Grid>
  );
};

export default TodoList;
