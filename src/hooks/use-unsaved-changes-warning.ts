"use client";

import { useEffect } from "react";

/**
 * Warns the user before leaving the page (refresh / close / hard navigation)
 * while a form has unsaved changes. Uses the native beforeunload prompt.
 */
export function useUnsavedChangesWarning(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Legacy requirement for the native confirmation prompt to show.
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [enabled]);
}
