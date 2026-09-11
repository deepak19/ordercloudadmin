"use client";

import { useState } from "react";
import type { Product } from "ordercloud-javascript-sdk";
import { Box, Card, CardContent, Dialog, Stack, Typography } from "@mui/material";
import { ImageNotSupported } from "@mui/icons-material";

import { getProductImages } from "@/features/products/images";

export function ProductImages({ product }: { product: Product }) {
  const images = getProductImages(product);
  const [active, setActive] = useState<string | null>(null);

  return (
    <Card>
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">
            Images{images.length ? ` (${images.length})` : ""}
          </Typography>

          {images.length === 0 ? (
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: "text.secondary", py: 1 }}>
              <ImageNotSupported fontSize="small" />
              <Typography variant="body2">No images for this product.</Typography>
            </Stack>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
                gap: 1.5,
              }}
            >
              {images.map((image, index) => (
                <Box
                  key={image.Url ?? index}
                  onClick={() => setActive(image.Url ?? null)}
                  title={image.Name ?? undefined}
                  sx={{
                    aspectRatio: "1 / 1",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: 1,
                    borderColor: "divider",
                    bgcolor: "action.hover",
                    cursor: "pointer",
                    transition: "border-color 0.15s ease",
                    "&:hover": { borderColor: "primary.main" },
                    "& img": { width: "100%", height: "100%", objectFit: "contain" },
                  }}
                >
                  <Box
                    component="img"
                    src={image.Url}
                    alt={image.Name ?? product.Name ?? ""}
                    loading="lazy"
                  />
                </Box>
              ))}
            </Box>
          )}
        </Stack>
      </CardContent>

      <Dialog open={!!active} onClose={() => setActive(null)} maxWidth="md">
        {active && (
          <Box
            component="img"
            src={active}
            alt=""
            sx={{ display: "block", maxWidth: "100%", maxHeight: "80vh", objectFit: "contain" }}
          />
        )}
      </Dialog>
    </Card>
  );
}
