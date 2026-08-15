import { OrderReturns, type OrderReturn } from "ordercloud-javascript-sdk";

import type { OcListParams } from "@/hooks/use-oc-list";

export function listReturns({ page, pageSize, search }: OcListParams) {
  return OrderReturns.List<OrderReturn>({ page, pageSize, search });
}

export function getReturn(returnID: string) {
  return OrderReturns.Get<OrderReturn>(returnID);
}

export function approveReturn(returnID: string) {
  return OrderReturns.Approve<OrderReturn>(returnID, {});
}

export function declineReturn(returnID: string) {
  return OrderReturns.Decline<OrderReturn>(returnID, {});
}

export function cancelReturn(returnID: string) {
  return OrderReturns.Cancel<OrderReturn>(returnID);
}

export function completeReturn(returnID: string) {
  return OrderReturns.Complete<OrderReturn>(returnID);
}
