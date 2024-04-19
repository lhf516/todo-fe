import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { Task, UpdateTask } from "../interfaces/Task";

interface TaskDetailProps {
  tasks: Task[];
  updateTask: (id: number, newTask: Task) => void;
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "white",
    },
  },
});

const TaskDetail: React.FC<TaskDetailProps> = ({ tasks, updateTask }) => {
  const { id } = useParams<{ id: string }>(); // Get id from URL
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [updatedTask, setUpdatedTask] = useState<UpdateTask>({
    title: "",
    detail: "",
    completed: false,
  });

  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (id && tasks.length > 0) {
      const selectedTask = tasks.find((task) => {
        return Number(task.id) === parseInt(id ?? "");
      });
      setSelectedTask(selectedTask || null);
      console.log("selectedTask: ", selectedTask);
      if (selectedTask) {
        setUpdatedTask({
          title: selectedTask.title,
          detail: selectedTask.detail,
          completed: selectedTask.completed,
        });
      }
    }
  }, [id, tasks]);

  const onSubmit = async (data: any) => {
    console.log("data: ", data);
    if (selectedTask) {
      const updatedTask: Task = {
        ...selectedTask,
        title: data.title,
        detail: data.detail,
        completed: data.completed,
      };
      updateTask(selectedTask.id, updatedTask);
      reset(updatedTask);
    }
  };

  const DetailComponent = styled("div")(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  }));

  if (!selectedTask) {
    return <p>Todo not found!</p>;
  }

  return (
    <DetailComponent theme={customTheme}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue={updatedTask.title}
          render={({ field }) => (
            <TextField {...field} label="Title" variant="outlined" />
          )}
        />
        <Controller
          name="detail"
          control={control}
          defaultValue={updatedTask.detail}
          render={({ field }) => (
            <TextField {...field} label="Detail" variant="outlined" />
          )}
        />
        <FormControlLabel
          control={
            <Controller
              name="completed"
              control={control}
              defaultValue={updatedTask.completed}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          }
          label="Completed"
        />
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </form>
    </DetailComponent>
  );
};

export default TaskDetail;
