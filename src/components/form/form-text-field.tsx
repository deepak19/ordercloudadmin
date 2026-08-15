"use client";

import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";

interface FormTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps, "name" | "onChange"> {
  control: Control<T>;
  name: Path<T>;
  numeric?: boolean;
}

export function FormTextField<T extends FieldValues>({
  control,
  name,
  numeric,
  ...textFieldProps
}: FormTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          value={field.value ?? ""}
          onChange={
            numeric
              ? (e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
              : field.onChange
          }
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          fullWidth
          {...textFieldProps}
        />
      )}
    />
  );
}
