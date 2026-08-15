"use client";

import { DataGrid, type GridColDef, type GridValidRowModel } from "@mui/x-data-grid";
import type { Meta } from "ordercloud-javascript-sdk";

import { EmptyState } from "@/components/empty-state";

interface OcDataGridProps<T extends GridValidRowModel> {
  columns: GridColDef<T>[];
  data: T[];
  rowKey: (row: T) => string;
  isLoading?: boolean;
  meta?: Meta;
  page: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onRowClick?: (row: T) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function OcDataGrid<T extends GridValidRowModel>({
  columns,
  data,
  rowKey,
  isLoading,
  meta,
  page,
  pageSize = 20,
  onPageChange,
  onRowClick,
  emptyTitle,
  emptyDescription,
}: OcDataGridProps<T>) {
  return (
    <DataGrid
      autoHeight
      disableColumnMenu
      rows={data}
      columns={columns}
      getRowId={rowKey}
      loading={isLoading}
      paginationMode="server"
      rowCount={meta?.TotalCount ?? 0}
      paginationModel={{ page: page - 1, pageSize }}
      onPaginationModelChange={(model) => onPageChange(model.page + 1)}
      pageSizeOptions={[pageSize]}
      onRowClick={onRowClick ? (params) => onRowClick(params.row as T) : undefined}
      slots={{
        noRowsOverlay: () => <EmptyState title={emptyTitle} description={emptyDescription} />,
      }}
      sx={{
        cursor: onRowClick ? "pointer" : undefined,
        border: "none",
      }}
    />
  );
}
