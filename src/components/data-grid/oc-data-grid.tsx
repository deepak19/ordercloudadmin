"use client";

import {
  DataGrid,
  type GridColDef,
  type GridSortModel,
  type GridValidRowModel,
} from "@mui/x-data-grid";
import { alpha } from "@mui/material/styles";
import type { Meta } from "ordercloud-javascript-sdk";

import { EmptyState, ErrorState, NoSearchResults } from "@/components/empty-state";
import { PAGE_SIZE_OPTIONS } from "@/hooks/use-oc-list";

interface OcDataGridProps<T extends GridValidRowModel> {
  columns: GridColDef<T>[];
  data: T[];
  rowKey: (row: T) => string;
  isLoading?: boolean;
  isFetching?: boolean;
  error?: unknown;
  onRetry?: () => void;
  meta?: Meta;
  page: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onRowClick?: (row: T) => void;
  /** OrderCloud sortBy string, e.g. "Name" or "!Name". Enables server-side sorting. */
  sortBy?: string;
  onSortChange?: (sortBy: string) => void;
  search?: string;
  onClearSearch?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
}

function toSortModel(sortBy?: string): GridSortModel {
  if (!sortBy) return [];
  const desc = sortBy.startsWith("!");
  return [{ field: desc ? sortBy.slice(1) : sortBy, sort: desc ? "desc" : "asc" }];
}

function fromSortModel(model: GridSortModel): string {
  if (!model.length) return "";
  const { field, sort } = model[0];
  return sort === "desc" ? `!${field}` : field;
}

export function OcDataGrid<T extends GridValidRowModel>({
  columns,
  data,
  rowKey,
  isLoading,
  isFetching,
  error,
  onRetry,
  meta,
  page,
  pageSize = 20,
  onPageChange,
  onPageSizeChange,
  onRowClick,
  sortBy,
  onSortChange,
  search,
  onClearSearch,
  emptyTitle,
  emptyDescription,
  emptyAction,
}: OcDataGridProps<T>) {
  const sortingEnabled = !!onSortChange;

  return (
    <DataGrid
      autoHeight
      disableColumnMenu
      disableColumnSorting={!sortingEnabled}
      rows={error ? [] : data}
      columns={columns}
      getRowId={rowKey}
      loading={isLoading || isFetching}
      paginationMode="server"
      rowCount={meta?.TotalCount ?? 0}
      paginationModel={{ page: page - 1, pageSize }}
      onPaginationModelChange={(model) => {
        if (model.pageSize !== pageSize) {
          onPageSizeChange?.(model.pageSize);
        } else {
          onPageChange(model.page + 1);
        }
      }}
      pageSizeOptions={onPageSizeChange ? PAGE_SIZE_OPTIONS : [pageSize]}
      sortingMode="server"
      sortModel={sortingEnabled ? toSortModel(sortBy) : undefined}
      onSortModelChange={
        sortingEnabled ? (model) => onSortChange(fromSortModel(model)) : undefined
      }
      onRowClick={onRowClick ? (params) => onRowClick(params.row as T) : undefined}
      slots={{
        noRowsOverlay: () =>
          error ? (
            <ErrorState onRetry={onRetry} />
          ) : search ? (
            <NoSearchResults search={search} onClear={onClearSearch} />
          ) : (
            <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
          ),
      }}
      sx={{
        border: "none",
        "--DataGrid-overlayHeight": "300px",
        "& .MuiDataGrid-columnHeaders": {
          bgcolor: (theme) => alpha(theme.palette.text.primary, 0.03),
        },
        "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 600 },
        // Vertically center cell content (default is top-aligned block layout).
        "& .MuiDataGrid-cell": {
          display: "flex",
          alignItems: "center",
        },
        "& .MuiDataGrid-row": {
          cursor: onRowClick ? "pointer" : "default",
        },
        "& .MuiDataGrid-row:hover": {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
        },
        "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": { outline: "none" },
        "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
          outline: "none",
        },
      }}
    />
  );
}
