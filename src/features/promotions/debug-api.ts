import {
  Orders,
  type EligiblePromotion,
  type OrderPromotion,
  type RefreshPromosResponse,
} from "ordercloud-javascript-sdk";

export function listAppliedPromotions(orderID: string) {
  return Orders.ListPromotions<OrderPromotion>("All", orderID);
}

export function listEligiblePromotions(orderID: string) {
  return Orders.ListEligiblePromotions<EligiblePromotion>("All", orderID);
}

export function refreshPromotions(orderID: string) {
  return Orders.RefreshPromotions<RefreshPromosResponse>("All", orderID);
}
