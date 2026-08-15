"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExpandLess, ExpandMore, Inventory2 } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

import { navItems, isActivePath, type NavItem } from "@/components/layout/nav-items";
import { useAuth } from "@/providers/auth-provider";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED, useSidebar } from "@/providers/sidebar-provider";

function hasActiveDescendant(item: NavItem, pathname: string): boolean {
  if (isActivePath(pathname, item.href)) return true;
  return item.children?.some((child) => isActivePath(pathname, child.href)) ?? false;
}

function NavEntry({ item, pathname, collapsed }: { item: NavItem; pathname: string; collapsed: boolean }) {
  const [expanded, setExpanded] = useState(() => hasActiveDescendant(item, pathname));

  const itemSx = { mx: 1, mb: 0.5, "&:not(.Mui-selected) .MuiListItemIcon-root": { color: "text.secondary" } };

  if (item.children) {
    return (
      <>
        <Tooltip title={collapsed ? item.title : ""} placement="right">
          <ListItemButton
            onClick={() => setExpanded((v) => !v)}
            selected={isActivePath(pathname, item.href)}
            sx={itemSx}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <item.icon />
            </ListItemIcon>
            {!collapsed && (
              <>
                <ListItemText primary={item.title} />
                {expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
              </>
            )}
          </ListItemButton>
        </Tooltip>
        <Collapse in={expanded && !collapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <ListItemButton
                key={child.href}
                component={Link}
                href={child.href}
                selected={isActivePath(pathname, child.href)}
                sx={{ ...itemSx, pl: 4 }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <child.icon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={child.title} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <Tooltip title={collapsed ? item.title : ""} placement="right">
      <ListItemButton component={Link} href={item.href} selected={isActivePath(pathname, item.href)} sx={itemSx}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          <item.icon />
        </ListItemIcon>
        {!collapsed && <ListItemText primary={item.title} />}
      </ListItemButton>
    </Tooltip>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { brand } = useAuth();
  const { collapsed } = useSidebar();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH,
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: (theme) => theme.transitions.create("width"),
        "& .MuiDrawer-paper": {
          width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH,
          overflowX: "hidden",
          transition: (theme) => theme.transitions.create("width"),
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        component={Link}
        href="/"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2,
          height: 64,
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            flexShrink: 0,
            borderRadius: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === "dark" ? 0.24 : 0.12),
            color: "primary.main",
          }}
        >
          <Inventory2 fontSize="small" />
        </Box>
        {!collapsed && (
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
            {brand ? `${brand.name} Admin` : "OrderCloud Admin"}
          </Typography>
        )}
      </Box>
      <List component="nav" sx={{ px: 1 }}>
        {navItems.map((item) => (
          <NavEntry key={item.href} item={item} pathname={pathname} collapsed={collapsed} />
        ))}
      </List>
    </Drawer>
  );
}
