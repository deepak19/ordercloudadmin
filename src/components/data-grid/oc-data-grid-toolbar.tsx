"use client";

import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import {
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";

export interface GridFilter {
  /** URL param name this filter maps to (e.g. "status"). */
  key: string;
  label: string;
  options: { value: string; label: string }[];
  width?: number;
}

/** Reusable Active/Inactive status filter for entities with an `Active` boolean. */
export const ACTIVE_STATUS_FILTER: GridFilter = {
  key: "status",
  label: "Status",
  options: [
    { value: "", label: "All statuses" },
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ],
};

interface OcDataGridToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  action?: React.ReactNode;
  filters?: GridFilter[];
  filterValues?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
}

export function OcDataGridToolbar({
  search,
  onSearchChange,
  placeholder = "Search...",
  action,
  filters = [],
  filterValues = {},
  onFilterChange,
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
      spacing={1.5}
      sx={{ alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", rowGap: 1.5 }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 1.5, flex: 1 }}>
        <TextField
          size="small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          sx={{ maxWidth: 320, flex: 1, minWidth: 200 }}
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
        {filters.map((filter) => (
          <TextField
            key={filter.key}
            select
            size="small"
            label={filter.label}
            value={filterValues[filter.key] ?? ""}
            onChange={(e) => onFilterChange?.(filter.key, e.target.value)}
            sx={{ minWidth: filter.width ?? 160 }}
          >
            {filter.options.map((option) => (
              <MenuItem key={option.value || "all"} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        ))}
      </Stack>
      {action}
    </Stack>
  );
}
