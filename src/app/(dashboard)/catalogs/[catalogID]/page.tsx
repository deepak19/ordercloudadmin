"use client";

import { use, useState } from "react";
import Link from "next/link";
import { AccountTree, ArrowBack, Delete, MenuBook } from "@mui/icons-material";
import { Button, Card, CardContent, CircularProgress, Stack } from "@mui/material";

import {
  useCatalog,
  useDeleteCatalog,
  useUpdateCatalog,
} from "@/features/catalogs/hooks";
import { CatalogForm } from "@/features/catalogs/catalog-form";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { PageHeader } from "@/components/page-header";

export default function CatalogDetailPage({
  params,
}: {
  params: Promise<{ catalogID: string }>;
}) {
  const { catalogID } = use(params);
  const { data: catalog, isLoading } = useCatalog(catalogID);
  const updateCatalog = useUpdateCatalog();
  const deleteCatalog = useDeleteCatalog();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Button variant="text" size="small" startIcon={<ArrowBack />} component={Link} href="/catalogs">
          Back to catalogs
        </Button>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AccountTree />}
            component={Link}
            href={`/catalogs/${catalogID}/categories`}
          >
            Categories
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<Delete />}
            onClick={() => setConfirmOpen(true)}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
      <PageHeader
        icon={MenuBook}
        title={catalog?.Name || "Edit catalog"}
        description="Update this catalog's details."
        color="info"
      />
      {isLoading || !catalog ? (
        <CircularProgress size={24} />
      ) : (
        <Card>
          <CardContent>
            <CatalogForm
              mode="edit"
              defaultValues={catalog}
              isSubmitting={updateCatalog.isPending}
              onSubmit={(values) => updateCatalog.mutate({ catalogID, values })}
            />
          </CardContent>
        </Card>
      )}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this catalog?"
        description={`This action cannot be undone. This will permanently delete the catalog ${catalog?.Name ? `"${catalog.Name}"` : ""} and its categories.`}
        isPending={deleteCatalog.isPending}
        onConfirm={() => deleteCatalog.mutate(catalogID)}
      />
    </Stack>
  );
}
