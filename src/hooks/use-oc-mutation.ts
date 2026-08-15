"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { getErrorMessage } from "@/lib/ordercloud/errors";

interface UseOcMutationOptions<TVariables, TData> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  queryKey: unknown[];
  successMessage?: string;
  onSuccess?: (data: TData, variables: TVariables) => void;
}

export function useOcMutation<TVariables, TData>({
  mutationFn,
  queryKey,
  successMessage,
  onSuccess,
}: UseOcMutationOptions<TVariables, TData>) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey });
      if (successMessage) {
        enqueueSnackbar(successMessage, { variant: "success" });
      }
      onSuccess?.(data, variables);
    },
    onError: (error) => {
      enqueueSnackbar(getErrorMessage(error), { variant: "error" });
    },
  });
}
