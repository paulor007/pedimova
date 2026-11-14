import {
  Boxes,
  CreditCard,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";
import { can, type Permission } from "../../domain/permissions";
import type { UserProfile } from "../../domain/userProfile";

/** Business modules of the internal area. */
export type AppModuleId =
  "dashboard" | "orders" | "customers" | "products" | "inventory" | "payments";

export type AppNavigationItem = {
  id: AppModuleId;
  label: string;
  /** Absolute route of the screen. */
  to: string;
  icon: LucideIcon;
  /** Permission required to see the item and open the screen. */
  permission: Permission;
};

export type AppNavigationGroup = {
  id: string;
  label: string;
  items: readonly AppNavigationItem[];
};

/** Side menu of the internal area, in display order. */
export const APP_NAVIGATION: readonly AppNavigationGroup[] = [
  {
    id: "operacao",
    label: "Operação",
    items: [
      {
        id: "dashboard",
        label: "Painel",
        to: "/app",
        icon: LayoutDashboard,
        permission: "dashboard:view",
      },
      {
        id: "orders",
        label: "Pedidos",
        to: "/app/pedidos",
        icon: ShoppingCart,
        permission: "orders:view",
      },
      {
        id: "customers",
        label: "Clientes",
        to: "/app/clientes",
        icon: Users,
        permission: "customers:view",
      },
      {
        id: "products",
        label: "Produtos",
        to: "/app/produtos",
        icon: Package,
        permission: "products:view",
      },
      {
        id: "inventory",
        label: "Estoque",
        to: "/app/estoque",
        icon: Boxes,
        permission: "inventory:view",
      },
      {
        id: "payments",
        label: "Pagamentos",
        to: "/app/pagamentos",
        icon: CreditCard,
        permission: "payments:view",
      },
    ],
  },
];

/** The same menu items, looked up by module. */
export const APP_NAVIGATION_ITEM = Object.fromEntries(
  APP_NAVIGATION.flatMap((group) => group.items).map((item) => [item.id, item]),
) as Record<AppModuleId, AppNavigationItem>;

/** Menu a profile sees: items without permission and empty groups are left out. */
export function navigationFor(
  profile: UserProfile,
): readonly AppNavigationGroup[] {
  return APP_NAVIGATION.map((group) => ({
    ...group,
    items: group.items.filter((item) => can(profile, item.permission)),
  })).filter((group) => group.items.length > 0);
}
