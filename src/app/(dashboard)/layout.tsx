"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Skeleton, Stack } from "@mui/material";

import { useAuth } from "@/providers/auth-provider";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { SidebarProvider } from "@/providers/sidebar-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <Stack spacing={2} sx={{ minHeight: "100vh", p: 4 }}>
        <Skeleton variant="rounded" width={192} height={40} />
        <Skeleton variant="rounded" height={256} />
        <Skeleton variant="rounded" height={256} />
      </Stack>
    );
  }

  return (
    <SidebarProvider>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <AppSidebar />
        <Box component="main" sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <DashboardHeader />
          <Box sx={{ flex: 1, p: 2 }}>{children}</Box>
        </Box>
      </Box>
    </SidebarProvider>
  );
}
