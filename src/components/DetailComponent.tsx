import { Box, Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Task } from "../interfaces/Task";
import CustomTextField from "./CustomTextField";

interface DetailComponentProps {
  selectedTask: Task | null;
  onSubmit: (data: any) => void;
}

const DetailComponent: React.FC<DetailComponentProps> = ({
  selectedTask,
  onSubmit,
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

          <Box my={2} alignSelf="center" width="50%">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ width: "100%" }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </form>
    </Grid>
  );
};

export default DetailComponent;
