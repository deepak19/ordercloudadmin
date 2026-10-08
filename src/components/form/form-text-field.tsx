"use client";

import { useState } from "react";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { IconButton, InputAdornment, TextField, type TextFieldProps } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps, "name" | "onChange"> {
  control: Control<T>;
  name: Path<T>;
  numeric?: boolean;
  /** Renders a show/hide toggle for password fields. */
  revealable?: boolean;
}

export function FormTextField<T extends FieldValues>({
  control,
  name,
  numeric,
  revealable,
  type,
  slotProps,
  ...textFieldProps
}: FormTextFieldProps<T>) {
  const [reveal, setReveal] = useState(false);
  const effectiveType = revealable ? (reveal ? "text" : "password") : type;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          value={field.value ?? ""}
          type={effectiveType}
          onChange={
            numeric
              ? (e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
              : field.onChange
          }
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          fullWidth
          slotProps={{
            ...slotProps,
            input: {
              ...slotProps?.input,
              ...(revealable && {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={reveal ? "Hide password" : "Show password"}
                      onClick={() => setReveal((v) => !v)}
                      edge="end"
                      size="small"
                    >
                      {reveal ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }),
            },
          }}
          {...textFieldProps}
        />
      )}
    />
  );
}
