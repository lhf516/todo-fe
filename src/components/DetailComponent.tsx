import { Box, Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Task } from "../interfaces/Task";
import CustomTextField from "./CustomTextField";

interface DetailComponentProps {
  selectedTask: Task | null;
  onSubmit: (data: any) => void;
  handleClose: () => void;
}

const DetailComponent: React.FC<DetailComponentProps> = ({
  selectedTask,
  onSubmit,
  handleClose,
}) => {
  const { control, handleSubmit } = useForm();

  return (
    <Grid container alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box width="50vw" display="flex" flexDirection="column">
          <CustomTextField
            control={control}
            defaultValue={selectedTask?.title || ""}
            name="title"
            label="Title"
          />
          <CustomTextField
            control={control}
            defaultValue={selectedTask?.detail || ""}
            name="detail"
            label="Detail"
            isMultiline={true}
          />

          <Box my={2} flex={{ xs: 1 }}>
            <FormControlLabel
              control={
                <Controller
                  name="completed"
                  control={control}
                  defaultValue={selectedTask?.completed || false}
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
          </Box>

          <Box my={2} width="100%" display="flex">
            <Box my={2} flex={{ xs: 1 }} textAlign="center">
              <Button variant="contained" color="primary" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
            <Box my={2} flex={{ xs: 1 }} textAlign="center">
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Grid>
  );
};

export default DetailComponent;
