"use client";

import { useState } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { SnackbarProvider } from "notistack";

import { emitUnauthorized } from "@/lib/ordercloud/auth-events";
import { isOrderCloudError } from "@/lib/ordercloud/errors";
import { AuthProvider } from "@/providers/auth-provider";
import { ThemeBrandProvider } from "@/providers/theme-brand-provider";

function handleQueryError(error: unknown) {
  if (isOrderCloudError(error) && error.status === 401) {
    emitUnauthorized();
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
        queryCache: new QueryCache({ onError: handleQueryError }),
        mutationCache: new MutationCache({ onError: handleQueryError }),
      })
  );

  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeBrandProvider>
              <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                {children}
              </SnackbarProvider>
            </ThemeBrandProvider>
          </AuthProvider>
        </QueryClientProvider>
      </NextThemesProvider>
    </AppRouterCacheProvider>
  );
}
