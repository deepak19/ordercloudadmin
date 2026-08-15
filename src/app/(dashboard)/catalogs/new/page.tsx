"use client";

import Link from "next/link";
import { ArrowBack, MenuBook } from "@mui/icons-material";
import { Button, Card, CardContent, Stack } from "@mui/material";

import { useCreateCatalog } from "@/features/catalogs/hooks";
import { CatalogForm } from "@/features/catalogs/catalog-form";
import { PageHeader } from "@/components/page-header";

export default function NewCatalogPage() {
  const createCatalog = useCreateCatalog();

  return (
    <Stack spacing={2}>
      <Button
        variant="text"
        size="small"
        startIcon={<ArrowBack />}
        component={Link}
        href="/catalogs"
        sx={{ width: "fit-content" }}
      >
        Back to catalogs
      </Button>
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
