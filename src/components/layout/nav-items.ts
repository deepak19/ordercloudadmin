import type { SvgIconComponent } from "@mui/icons-material";
import {
  Dashboard,
  People,
  Business,
  Inventory2,
  MenuBook,
  ShoppingCart,
  AssignmentReturn,
  LocalOffer,
  Settings,
  Storefront,
  BugReport,
} from "@mui/icons-material";

export interface NavItem {
  title: string;
  href: string;
  icon: SvgIconComponent;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { title: "Dashboard", href: "/", icon: Dashboard },
  { title: "Buyers", href: "/buyers", icon: People },
  { title: "Suppliers", href: "/suppliers", icon: Business },
  { title: "My Supplier", href: "/mysupplier", icon: Storefront },
  { title: "Products", href: "/products", icon: Inventory2 },
  { title: "Catalogs", href: "/catalogs", icon: MenuBook },
  { title: "Orders", href: "/orders", icon: ShoppingCart },
  {
    title: "Promotions",
    href: "/promotions",
    icon: LocalOffer,
    children: [{ title: "Promotion Debug", href: "/promotions/debug", icon: BugReport }],
  },
  { title: "Returns", href: "/returns", icon: AssignmentReturn },
  { title: "Settings", href: "/settings", icon: Settings },
];

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Returns the nav trail (parent, or [parent, child]) for the given pathname,
 * for driving the header breadcrumb.
 */
export function findBreadcrumbTrail(pathname: string): NavItem[] {
  for (const item of navItems) {
    if (item.children) {
      const child = item.children.find((c) => isActivePath(pathname, c.href));
      if (child) return [item, child];
    }
    if (item.href !== "/" && isActivePath(pathname, item.href)) {
      return [item];
    }
  }
  return [];
}
