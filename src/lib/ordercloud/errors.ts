import type { OrderCloudError } from "ordercloud-javascript-sdk";

export function isOrderCloudError(error: unknown): error is OrderCloudError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isOrderCloudError" in error &&
    (error as { isOrderCloudError?: boolean }).isOrderCloudError === true
  );
}

export function getErrorMessage(error: unknown): string {
  if (isOrderCloudError(error)) {
    return error.errors?.[0]?.Message ?? error.message ?? "Something went wrong";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Something went wrong";
}
