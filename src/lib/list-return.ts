/**
 * Persists a list view's current query string (search / filters / sort / page)
 * so a detail page can return to the exact same filtered view. Keyed by the
 * list's pathname.
 */
const KEY_PREFIX = "oc-list:";

export function writeListQuery(pathname: string, query: string) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(`${KEY_PREFIX}${pathname}`, query);
  } catch {
    // ignore storage errors (private mode, quota, etc.)
  }
}

export function readListQuery(pathname: string): string {
  if (typeof window === "undefined") return "";
  try {
    return sessionStorage.getItem(`${KEY_PREFIX}${pathname}`) ?? "";
  } catch {
    return "";
  }
}
