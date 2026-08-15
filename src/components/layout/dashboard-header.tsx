"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme as useNextTheme } from "next-themes";
import {
  DarkMode,
  LightMode,
  Logout,
  Menu as MenuIcon,
  NavigateNext,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Breadcrumbs,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import { findBreadcrumbTrail } from "@/components/layout/nav-items";
import { useAuth } from "@/providers/auth-provider";
import { useSidebar } from "@/providers/sidebar-provider";

export function DashboardHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { toggle } = useSidebar();
  const { theme, setTheme } = useNextTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const trail = findBreadcrumbTrail(pathname);
  const displayName =
    user?.FirstName || user?.LastName
      ? `${user?.FirstName ?? ""} ${user?.LastName ?? ""}`.trim()
      : (user?.Username ?? "Account");
  const initials =
    ((user?.FirstName?.[0] ?? "") + (user?.LastName?.[0] ?? "")).trim() ||
    (user?.Username?.slice(0, 2).toUpperCase() ?? "?");

  return (
    <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Toolbar sx={{ gap: 1 }}>
        <IconButton edge="start" onClick={toggle} size="small">
          <MenuIcon />
        </IconButton>
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ flex: 1 }}>
          {trail.length === 0 ? (
            <Typography variant="body2" color="text.primary">
              Dashboard
            </Typography>
          ) : (
            trail.map((item, index) => {
              const isLast = index === trail.length - 1;
              return isLast ? (
                <Typography key={item.href} variant="body2" color="text.primary">
                  {item.title}
                </Typography>
              ) : (
                <Typography
                  key={item.href}
                  component={Link}
                  href={item.href}
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                >
                  {item.title}
                </Typography>
              );
            })
          )}
        </Breadcrumbs>
        <IconButton onClick={() => setTheme(theme === "dark" ? "light" : "dark")} size="small">
          {theme === "dark" ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
        </IconButton>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
          <Avatar sx={{ width: 32, height: 32, fontSize: "0.8125rem", bgcolor: "primary.main" }}>
            {initials}
          </Avatar>
        </IconButton>
        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {displayName}
            </Typography>
          </Box>
          <Divider />
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              logout();
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Log out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
