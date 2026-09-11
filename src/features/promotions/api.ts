import { Promotions, type Promotion } from "ordercloud-javascript-sdk";

import type { OcListParams } from "@/hooks/use-oc-list";
import type { PromotionFormValues } from "@/features/promotions/schema";

export function listPromotions({ page, pageSize, search, sortBy, filters }: OcListParams) {
  return Promotions.List<Promotion>({
    page,
    pageSize,
    search,
    sortBy: sortBy ? [sortBy as never] : undefined,
    filters: statusFilter(filters.status),
  });
}

/** Maps the generic "status" filter value ("true"/"false") to an OrderCloud Active filter. */
export function statusFilter(status: string | undefined) {
  if (status === "true") return { Active: true };
  if (status === "false") return { Active: false };
  return undefined;
}

export function getPromotion(promotionID: string) {
  return Promotions.Get<Promotion>(promotionID);
}

export function createPromotion(values: PromotionFormValues) {
  const { ID, ...rest } = values;
  return Promotions.Create<Promotion>({ ID: ID || undefined, ...rest });
}

export function updatePromotion({
  promotionID,
  values,
}: {
  promotionID: string;
  values: PromotionFormValues;
}) {
  return Promotions.Save<Promotion>(promotionID, values);
}

export function deletePromotion(promotionID: string) {
  return Promotions.Delete(promotionID);
}
