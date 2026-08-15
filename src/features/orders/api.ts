import { Orders, type Order, type OrderDirection } from "ordercloud-javascript-sdk";

export function listOrders({
  direction,
  page,
  pageSize,
  search,
}: {
  direction: OrderDirection;
  page: number;
  pageSize: number;
  search: string;
}) {
  return Orders.List<Order>(direction, {
    page,
    pageSize,
    search,
    sortBy: ["!DateSubmitted"],
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
