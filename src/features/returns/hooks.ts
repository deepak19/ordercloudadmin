"use client";

import { useQuery } from "@tanstack/react-query";

import { useOcList } from "@/hooks/use-oc-list";
import { useOcMutation } from "@/hooks/use-oc-mutation";
import {
  approveReturn,
  cancelReturn,
  completeReturn,
  declineReturn,
  getReturn,
  listReturns,
} from "@/features/returns/api";

const RETURNS_KEY = ["returns"];

export function useReturns() {
  return useOcList({ queryKey: RETURNS_KEY, listFn: listReturns });
}

export function useReturn(returnID: string) {
  return useQuery({
    queryKey: [...RETURNS_KEY, returnID],
    queryFn: () => getReturn(returnID),
    enabled: !!returnID,
  });
}

export function useApproveReturn() {
  return useOcMutation({
    mutationFn: approveReturn,
    queryKey: RETURNS_KEY,
    successMessage: "Return approved",
  });
}

export function useDeclineReturn() {
  return useOcMutation({
    mutationFn: declineReturn,
    queryKey: RETURNS_KEY,
    successMessage: "Return declined",
  });
}

export function useCancelReturn() {
  return useOcMutation({
    mutationFn: cancelReturn,
    queryKey: RETURNS_KEY,
    successMessage: "Return canceled",
  });
}

export function useCompleteReturn() {
  return useOcMutation({
    mutationFn: completeReturn,
    queryKey: RETURNS_KEY,
    successMessage: "Return completed",
  });
}
