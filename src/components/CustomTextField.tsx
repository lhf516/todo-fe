import { Box, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import React from "react";

interface CustomTextFieldProps {
  control: Control;
  defaultValue: string;
  name: string;
  label: string;
  isMultiline?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  control,
  defaultValue,
  name,
  label,
  isMultiline = false,
}) => {
  return (
    <Box my={2} flex={{ xs: 1 }}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            variant="outlined"
            style={{ width: "100%" }}
            multiline={isMultiline}
            minRows={isMultiline ? 2 : 1}
            maxRows={isMultiline ? 10 : 1}
          />
        )}
      />
    </Box>
  );
};

export default CustomTextField;
