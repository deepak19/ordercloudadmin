"use client";

import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import { InputAdornment, Stack, TextField } from "@mui/material";

interface OcDataGridToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  action?: React.ReactNode;
}

export function OcDataGridToolbar({
  search,
  onSearchChange,
  placeholder = "Search...",
  action,
}: OcDataGridToolbarProps) {
  const [value, setValue] = useState(search);
  const [prevSearch, setPrevSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setValue(search);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value !== search) onSearchChange(value);
    }, 400);
    return () => clearTimeout(timeout);
  }, [value, search, onSearchChange]);

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <TextField
        size="small"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        sx={{ maxWidth: 320, flex: 1 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" color="disabled" />
              </InputAdornment>
            ),
          },
        }}
      />
      {action}
    </Stack>
  );
}
