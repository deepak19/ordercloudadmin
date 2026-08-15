"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Buyers, Orders, Products, Suppliers } from "ordercloud-javascript-sdk";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Business, Inventory2, People, ShoppingCart } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { StatCard } from "@/components/stat-card";
import type { AccentColor } from "@/components/page-header";

function useCount(key: string, fn: () => Promise<{ Meta?: { TotalCount?: number } }>) {
  return useQuery({
    queryKey: ["dashboard", "count", key],
    queryFn: async () => (await fn()).Meta?.TotalCount ?? 0,
  });
}

const statusChipColor: Record<string, "success" | "warning" | "error" | "default"> = {
  Open: "success",
  Completed: "success",
  Unsubmitted: "default",
  AwaitingApproval: "warning",
  Declined: "error",
  Canceled: "error",
};

export default function DashboardPage() {
  const theme = useTheme();
  const buyerCount = useCount("buyers", () => Buyers.List({ pageSize: 1 }));
  const supplierCount = useCount("suppliers", () => Suppliers.List({ pageSize: 1 }));
  const productCount = useCount("products", () => Products.List({ pageSize: 1 }));
  const orderCount = useCount("orders", () => Orders.List("All", { pageSize: 1 }));

  const recentOrders = useQuery({
    queryKey: ["dashboard", "recent-orders"],
    queryFn: () =>
      Orders.List("All", { pageSize: 50, sortBy: ["!DateSubmitted"] }),
  });

  const statusCounts = (recentOrders.data?.Items ?? []).reduce<Record<string, number>>(
    (acc, order) => {
      const status = order.Status ?? "Unknown";
      acc[status] = (acc[status] ?? 0) + 1;
      return acc;
    },
    {}
  );
  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));

  const stats: {
    label: string;
    href: string;
    icon: typeof People;
    color: AccentColor;
    query: ReturnType<typeof useCount>;
  }[] = [
    { label: "Buyers", href: "/buyers", icon: People, color: "primary", query: buyerCount },
    { label: "Suppliers", href: "/suppliers", icon: Business, color: "secondary", query: supplierCount },
    { label: "Products", href: "/products", icon: Inventory2, color: "success", query: productCount },
    { label: "Orders", href: "/orders", icon: ShoppingCart, color: "info", query: orderCount },
  ];

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h6">Overview</Typography>
        <Typography variant="body2" color="text.secondary">
          A snapshot of your marketplace activity.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        {stats.map((stat) => (
          <Grid key={stat.label} size={{ xs: 12, sm: 6, lg: 3 }}>
            <StatCard
              icon={stat.icon}
              label={stat.label}
              color={stat.color}
              href={stat.href}
              value={
                stat.query.isLoading ? (
                  <Skeleton
                    variant="text"
                    width={56}
                    height={36}
                    sx={{ bgcolor: "rgba(255,255,255,0.35)" }}
                  />
                ) : (
                  stat.query.data
                )
              }
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              title="Recent orders by status"
              subheader={`Based on the ${recentOrders.data?.Items?.length ?? 0} most recently submitted orders.`}
            />
            <CardContent>
              {recentOrders.isLoading ? (
                <Skeleton variant="rounded" height={220} />
              ) : chartData.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No orders yet.
                </Typography>
              ) : (
                <Box sx={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid vertical={false} stroke={theme.palette.divider} />
                      <XAxis dataKey="status" tickLine={false} axisLine={false} />
                      <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 10,
                          border: `1px solid ${theme.palette.divider}`,
                          backgroundColor: theme.palette.background.paper,
                        }}
                      />
                      <Bar dataKey="count" fill={theme.palette.primary.main} radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: "100%" }}>
            <CardHeader title="Recent orders" />
            <CardContent>
              <Stack spacing={1}>
                {recentOrders.isLoading ? (
                  <Skeleton variant="rounded" height={220} />
                ) : (recentOrders.data?.Items ?? []).length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No orders yet.
                  </Typography>
                ) : (
                  (recentOrders.data?.Items ?? []).slice(0, 5).map((order) => (
                    <Stack
                      key={order.ID}
                      component={Link}
                      href={`/orders/${order.ID}`}
                      direction="row"
                      sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderRadius: 2,
                        px: 1.5,
                        py: 1,
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {order.ID}
                      </Typography>
                      <Chip size="small" label={order.Status} color={statusChipColor[order.Status ?? ""]} />
                    </Stack>
                  ))
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
