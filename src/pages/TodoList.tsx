import React, { useEffect, useState } from "react";
import { Task } from "../interfaces/Task";
import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskDetail from "./TaskDetail";
import { read } from "../services/apiServices";
import DeleteTaskDialog from "../components/DeleteTaskDialog";
import { UUID } from "crypto";

const TodoList: React.FC = () => {
  const apiUrl = `${process.env.REACT_APP_BASE_URL || ""}/api/todos`;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

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
    else {
      const newTask = {
        title: "",
        detail: "",
        completed: false,
      };
      setSelectedTask(newTask);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  const handleOpenDeleteDialog = (task: Task | null) => {
    console.log("task: ", task);
    setOpenDeleteDialog(true);
    if (task) setSelectedTask(task);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
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
      <Typography variant="h3">My Todo List</Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpen(null)}
      >
        New Task
      </Button>

      <List sx={{ bgcolor: "background.paper" }} aria-label="task">
        {tasks.map((task) => (
          <ListItem disablePadding key={task.id}>
            <ListItemButton onClick={() => handleOpen(task)}>
              <ListItemText primary={task.title} />
            </ListItemButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => {
                handleOpenDeleteDialog(task);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <TaskDetail
        open={open}
        selectedTask={selectedTask}
        handleClose={handleClose}
        fetchTasks={fetchTasks}
      />

      <DeleteTaskDialog
        openDeleteDialog={openDeleteDialog}
        id={selectedTask?.id || null}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        fetchTasks={fetchTasks}
      />
    </Grid>
  );
};

export default TodoList;
