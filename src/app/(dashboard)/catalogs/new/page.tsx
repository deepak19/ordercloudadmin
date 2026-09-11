"use client";

import { MenuBook } from "@mui/icons-material";
import { Card, CardContent, Stack } from "@mui/material";

import { BackButton } from "@/components/back-button";

import { useCreateCatalog } from "@/features/catalogs/hooks";
import { CatalogForm } from "@/features/catalogs/catalog-form";
import { PageHeader } from "@/components/page-header";

export default function NewCatalogPage() {
  const createCatalog = useCreateCatalog();

  return (
    <Stack spacing={2}>
      <BackButton href="/catalogs" label="Back to catalogs" />
      <PageHeader icon={MenuBook} title="New catalog" description="Create a new product catalog." color="info" />
      <Card>
        <CardContent>
          <CatalogForm
            mode="create"
            isSubmitting={createCatalog.isPending}
            onSubmit={(values) => createCatalog.mutate(values)}
          />
        </CardContent>
      </Card>
    </Stack>
  );
}
