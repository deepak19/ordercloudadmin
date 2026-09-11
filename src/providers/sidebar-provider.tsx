"use client";

import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";

import { useIsMobile } from "@/hooks/use-mobile";

export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_WIDTH_COLLAPSED = 64;

interface SidebarContextValue {
  /** Desktop: rail collapsed to icons. */
  collapsed: boolean;
  /** Mobile: temporary drawer open. */
  mobileOpen: boolean;
  isMobile: boolean;
  /** Context-aware: toggles the mobile drawer on mobile, the desktop rail otherwise. */
  toggle: () => void;
  closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  // Close the mobile drawer whenever the route changes (render-phase adjustment).
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  const toggle = () =>
    isMobile ? setMobileOpen((v) => !v) : setCollapsed((v) => !v);

  return (
    <SidebarContext.Provider
      value={{ collapsed, mobileOpen, isMobile, toggle, closeMobile: () => setMobileOpen(false) }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
