import type { Product } from "ordercloud-javascript-sdk";

export interface ProductImage {
  Url?: string;
  Position?: number;
  Name?: string;
}

/** Product images from xp.Images, ordered by Position, with empty URLs removed. */
export function getProductImages(product: Product): ProductImage[] {
  const images = (product.xp as { Images?: ProductImage[] } | undefined)?.Images;
  if (!images?.length) return [];
  return images
    .filter((image) => !!image?.Url)
    .sort((a, b) => (a.Position ?? 0) - (b.Position ?? 0));
}

export function firstImageUrl(product: Product): string | undefined {
  return getProductImages(product)[0]?.Url;
}
