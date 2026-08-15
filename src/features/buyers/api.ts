import { Buyers, type Buyer } from "ordercloud-javascript-sdk";

import type { OcListParams } from "@/hooks/use-oc-list";
import type { BuyerFormValues } from "@/features/buyers/schema";

export function listBuyers({ page, pageSize, search }: OcListParams) {
  return Buyers.List<Buyer>({ page, pageSize, search });
}

export function getBuyer(buyerID: string) {
  return Buyers.Get<Buyer>(buyerID);
}

export function createBuyer(values: BuyerFormValues) {
  const { ID, ...rest } = values;
  return Buyers.Create<Buyer>({ ID: ID || undefined, ...rest });
}

export function updateBuyer({
  buyerID,
  values,
}: {
  buyerID: string;
  values: BuyerFormValues;
}) {
  return Buyers.Save<Buyer>(buyerID, values);
}

export function deleteBuyer(buyerID: string) {
  return Buyers.Delete(buyerID);
}
