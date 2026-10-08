"use client";

import { useRouter } from "next/navigation";
import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";

import { readListQuery } from "@/lib/list-return";

/**
 * Returns to a list page, restoring its last-used query (search / filters /
 * sort / page) if one was saved. Falls back to the bare list path otherwise.
 */
export function BackButton({ href, label }: { href: string; label: string }) {
  const router = useRouter();

  return (
    <Button
      variant="text"
      size="small"
      startIcon={<ArrowBack />}
      onClick={() => {
        const query = readListQuery(href);
        router.push(query ? `${href}?${query}` : href);
      }}
    >
      {label}
    </Button>
  );
}
