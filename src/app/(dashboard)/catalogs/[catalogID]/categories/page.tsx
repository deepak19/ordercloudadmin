"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowBack, Add, AccountTree, Delete } from "@mui/icons-material";
import type { Category } from "ordercloud-javascript-sdk";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Drawer,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/features/categories/hooks";
import { CategoryForm } from "@/features/categories/category-form";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";

export default function CategoriesPage({
  params,
}: {
  params: Promise<{ catalogID: string }>;
}) {
  const { catalogID } = use(params);
  const { items, isLoading } = useCategories(catalogID);
  const createCategory = useCreateCategory(catalogID);
  const updateCategory = useUpdateCategory(catalogID);
  const deleteCategory = useDeleteCategory(catalogID);

  const [editing, setEditing] = useState<Category | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function openCreate() {
    setEditing(null);
    setDrawerOpen(true);
  }

  function openEdit(category: Category) {
    setEditing(category);
    setDrawerOpen(true);
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Button
          variant="text"
          size="small"
          startIcon={<ArrowBack />}
          component={Link}
          href={`/catalogs/${catalogID}`}
        >
          Back to catalog
        </Button>
        <Button variant="contained" size="small" startIcon={<Add />} onClick={openCreate}>
          New Category
        </Button>
      </Stack>
      <PageHeader
        icon={AccountTree}
        title="Categories"
        description="Organize this catalog's categories."
        color="info"
      />

      {isLoading ? (
        <CircularProgress size={24} />
      ) : items.length === 0 ? (
        <EmptyState
          title="No categories"
          description="Create the first category for this catalog."
        />
      ) : (
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Parent</TableCell>
                  <TableCell>List Order</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell width={48} />
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((category) => (
                  <TableRow
                    key={category.ID}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => openEdit(category)}
                  >
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {category.Name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {category.ID}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{category.ParentID ?? "—"}</TableCell>
                    <TableCell>{category.ListOrder ?? "—"}</TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={category.Active ? "Active" : "Inactive"}
                        color={category.Active ? "primary" : "default"}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (category.ID) {
                            deleteCategory.mutate({ catalogID, categoryID: category.ID });
                          }
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 380, p: 3 }}>
          <Typography variant="h6">{editing ? "Edit category" : "New category"}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {editing
              ? "Update this category's details."
              : "Add a new category to this catalog."}
          </Typography>
          <CategoryForm
            mode={editing ? "edit" : "create"}
            defaultValues={editing ?? undefined}
            isSubmitting={createCategory.isPending || updateCategory.isPending}
            onSubmit={(values) => {
              if (editing?.ID) {
                updateCategory.mutate(
                  { catalogID, categoryID: editing.ID, values },
                  { onSuccess: () => setDrawerOpen(false) }
                );
              } else {
                createCategory.mutate(
                  { catalogID, values },
                  { onSuccess: () => setDrawerOpen(false) }
                );
              }
            }}
          />
        </Box>
      </Drawer>
    </Stack>
  );
}
