"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowBack, Delete, Inventory2 } from "@mui/icons-material";
import { Button, Card, CardContent, CircularProgress, Stack } from "@mui/material";

import {
  useDeleteProduct,
  useProduct,
  useUpdateProduct,
} from "@/features/products/hooks";
import { ProductForm } from "@/features/products/product-form";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { PageHeader } from "@/components/page-header";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ productID: string }>;
}) {
  const { productID } = use(params);
  const { data: product, isLoading } = useProduct(productID);
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Button variant="text" size="small" startIcon={<ArrowBack />} component={Link} href="/products">
          Back to products
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
      <PageHeader
        icon={Inventory2}
        title={product?.Name || "Edit product"}
        description="Update this product's details."
        color="success"
      />
      {isLoading || !product ? (
        <CircularProgress size={24} />
      ) : (
        <Card>
          <CardContent>
            <ProductForm
              mode="edit"
              defaultValues={product}
              isSubmitting={updateProduct.isPending}
              onSubmit={(values) => updateProduct.mutate({ productID, values })}
            />
          </CardContent>
        </Card>
      )}
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete this product?"
        description={`This action cannot be undone. This will permanently delete the product ${product?.Name ? `"${product.Name}"` : ""}.`}
        isPending={deleteProduct.isPending}
        onConfirm={() => deleteProduct.mutate(productID)}
      />
    </Stack>
  );
}
