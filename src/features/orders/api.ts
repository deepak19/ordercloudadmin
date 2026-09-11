import { Orders, type Order, type OrderDirection } from "ordercloud-javascript-sdk";

export function listOrders({
  direction,
  page,
  pageSize,
  search,
  sortBy,
  filters,
}: {
  direction: OrderDirection;
  page: number;
  pageSize: number;
  search: string;
  sortBy?: string;
  filters?: Record<string, string>;
}) {
  return Orders.List<Order>(direction, {
    page,
    pageSize,
    search,
    sortBy: sortBy ? [sortBy as never] : ["!DateSubmitted"],
    filters: filters?.status ? { Status: filters.status } : undefined,
  });
}

export function getOrder({
  direction,
  orderID,
}: {
  direction: OrderDirection;
  orderID: string;
}) {
  return Orders.Get<Order>(direction, orderID);
}

export function cancelOrder({
  direction,
  orderID,
}: {
  direction: OrderDirection;
  orderID: string;
}) {
  return Orders.Cancel<Order>(direction, orderID);
}

export function completeOrder({
  direction,
  orderID,
}: {
  direction: OrderDirection;
  orderID: string;
}) {
  return Orders.Complete<Order>(direction, orderID);
}
