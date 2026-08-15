import { alpha, createTheme, type Theme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

import type { Brand } from "@/config/brands";

const CARD_RADIUS = 16;

function cardShadow(mode: "light" | "dark") {
  return mode === "dark"
    ? "0 2px 10px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.3)"
    : "0 2px 12px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.04)";
}

export function createAppTheme(brand: Brand | null, mode: "light" | "dark"): Theme {
  const palette = brand?.theme[mode];

  return createTheme({
    cssVariables: false,
    palette: {
      mode,
      ...(palette && {
        primary: { main: palette.primary, contrastText: palette.primaryForeground },
      }),
      secondary: { main: "#ec4899" },
      info: { main: "#6366f1" },
      success: { main: "#22c55e" },
      warning: { main: "#f59e0b" },
      error: { main: "#ef4444" },
      background:
        mode === "dark"
          ? { default: "#0f1115", paper: "#171a21" }
          : { default: "#f4f5f9", paper: "#ffffff" },
    },
    typography: {
      fontFamily: "var(--font-geist-sans), sans-serif",
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      subtitle1: { fontWeight: 600 },
      subtitle2: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
            "&.Mui-selected": {
              backgroundColor: alpha(theme.palette.primary.main, 0.12),
              color: theme.palette.primary.main,
              "& .MuiListItemIcon-root": { color: theme.palette.primary.main },
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.18),
              },
            },
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: CARD_RADIUS,
            boxShadow: cardShadow(theme.palette.mode),
            backgroundImage: "none",
          }),
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          title: { fontSize: "1rem", fontWeight: 700 },
          subheader: { fontSize: "0.8125rem" },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: "none",
            "&.MuiPaper-elevation1, &.MuiPaper-elevation2, &.MuiPaper-elevation3": {
              boxShadow: cardShadow(theme.palette.mode),
            },
          }),
          rounded: { borderRadius: CARD_RADIUS },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600, borderRadius: 999 },
        },
        variants: (
          ["primary", "secondary", "success", "warning", "info", "error"] as const
        ).map((color) => ({
          props: { variant: "filled" as const, color },
          style: ({ theme }: { theme: Theme }) => ({
            backgroundColor: alpha(theme.palette[color].main, theme.palette.mode === "dark" ? 0.24 : 0.14),
            color: theme.palette.mode === "dark" ? theme.palette[color].light : theme.palette[color].dark,
          }),
        })),
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 10, boxShadow: "none" },
          contained: {
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: cardShadow(theme.palette.mode),
            borderBottom: "none",
          }),
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundImage: "none",
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: { borderRadius: 10 },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: "none",
            borderRadius: CARD_RADIUS,
            boxShadow: cardShadow(theme.palette.mode),
            backgroundColor: theme.palette.background.paper,
            "--DataGrid-rowBorderColor": theme.palette.divider,
          }),
          columnHeaders: ({ theme }) => ({
            backgroundColor: alpha(theme.palette.text.primary, 0.03),
            borderRadius: 0,
          }),
        },
      },
    },
  });
}
