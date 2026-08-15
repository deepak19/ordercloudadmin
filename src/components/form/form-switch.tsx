"use client";

import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { FormControlLabel, Switch, type SwitchProps } from "@mui/material";

interface FormSwitchProps<T extends FieldValues> extends Omit<SwitchProps, "name" | "checked" | "onChange"> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export function FormSwitch<T extends FieldValues>({
  control,
  name,
  label,
  ...switchProps
}: FormSwitchProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={
            <Switch
              {...switchProps}
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          }
        />
      )}
    />
  );
}
