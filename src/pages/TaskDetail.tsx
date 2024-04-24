import React from "react";
import { useForm } from "react-hook-form";
import { Task } from "../interfaces/Task";
import DetailComponent from "../components/DetailComponent";
import { UUID } from "crypto";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { create, update } from "../services/apiServices";

interface TaskDetailProps {
  open: boolean;
  selectedTask: Task | null;
  handleClose: () => void;
  fetchTasks: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({
  open,
  selectedTask,
  handleClose,
  fetchTasks,
}) => {
  const { reset } = useForm();

  const createTask = async (newTask: Task) => {
    try {
      await create(`/api/todos`, newTask);
    } catch (error) {
      console.error(error);
      // Handle errors appropriately, e.g., display error message to user
    }
  };

  const updateTask = async (id: UUID, newTask: Task) => {
    try {
      await update(`/api/todos/${id}`, newTask);
    } catch (error) {
      console.error(error);
      // Handle errors appropriately, e.g., display error message to user
    }
  };

  const onSubmit = async (data: any) => {
    console.log("data: ", data);
    if (selectedTask) {
      const updatedTask: Task = {
        ...selectedTask,
        title: data.title,
        detail: data.detail,
        completed: data.completed,
      };
      if (selectedTask.id) {
        await updateTask(selectedTask.id, updatedTask);
      } else {
        await createTask(updatedTask);
      }
      reset(updatedTask);

      fetchTasks();

      handleClose();
    }
  };

  return (
    selectedTask && (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>My Task</DialogTitle>
        <DialogContent>
          <DetailComponent
            selectedTask={selectedTask}
            onSubmit={onSubmit}
            handleClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    )
  );
};

export default TaskDetail;
