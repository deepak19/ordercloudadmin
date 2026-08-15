"use client";

import Link from "next/link";
import { ArrowBack, Inventory2 } from "@mui/icons-material";
import { Button, Card, CardContent, Stack } from "@mui/material";

import { useCreateProduct } from "@/features/products/hooks";
import { ProductForm } from "@/features/products/product-form";
import { PageHeader } from "@/components/page-header";

export default function NewProductPage() {
  const createProduct = useCreateProduct();

  return (
    <Stack spacing={2}>
      <Button
        variant="text"
        size="small"
        startIcon={<ArrowBack />}
        component={Link}
        href="/products"
        sx={{ width: "fit-content" }}
      >
        Back to products
      </Button>
      <PageHeader icon={Inventory2} title="New product" description="Add a new product to your catalog." color="success" />
      <Card>
        <CardContent>
          <ProductForm
            mode="create"
            isSubmitting={createProduct.isPending}
            onSubmit={(values) => createProduct.mutate(values)}
          />
        </CardContent>
      </Card>
    </Stack>
  );
}
