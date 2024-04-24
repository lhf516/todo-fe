import { UUID } from "crypto";
import { Task } from "../interfaces/Task";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { deleteData } from "../services/apiServices";

interface DeleteTaskDialogProps {
  openDeleteDialog: boolean;
  id: UUID | null;
  handleCloseDeleteDialog: () => void;
  fetchTasks: () => void;
}

const DeleteTaskDialog: React.FC<DeleteTaskDialogProps> = ({
  openDeleteDialog,
  id,
  handleCloseDeleteDialog,
  fetchTasks,
}) => {
  const deleteTask = async (id: UUID | null) => {
    console.log("id: " + id);
    try {
      if (!!id) {
        await deleteData(`/api/todos/${id}`);
      }
    } catch (error) {
      console.error(error);
      // Handle errors appropriately, e.g., display error message to user
    }
  };

  const confirmDeleteTask = async (id: UUID | null) => {
    await deleteTask(id);
    fetchTasks();
    handleCloseDeleteDialog();
  };

  return (
    <Dialog open={openDeleteDialog}>
      <DialogTitle>Delete Task</DialogTitle>
      <DialogContent>Are you sure you want to delete this task?</DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
        <Button onClick={() => confirmDeleteTask(id || null)}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskDialog;
