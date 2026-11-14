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

export type AppNavigationItem = {
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
        label: "Painel",
        to: "/app",
        icon: LayoutDashboard,
        permission: "dashboard:view",
      },
      {
        label: "Pedidos",
        to: "/app/pedidos",
        icon: ShoppingCart,
        permission: "orders:view",
      },
      {
        label: "Clientes",
        to: "/app/clientes",
        icon: Users,
        permission: "customers:view",
      },
      {
        label: "Produtos",
        to: "/app/produtos",
        icon: Package,
        permission: "products:view",
      },
      {
        label: "Estoque",
        to: "/app/estoque",
        icon: Boxes,
        permission: "inventory:view",
      },
      {
        label: "Pagamentos",
        to: "/app/pagamentos",
        icon: CreditCard,
        permission: "payments:view",
      },
    ],
  },
];

/** Menu a profile sees: items without permission and empty groups are left out. */
export function navigationFor(
  profile: UserProfile,
): readonly AppNavigationGroup[] {
  return APP_NAVIGATION.map((group) => ({
    ...group,
    items: group.items.filter((item) => can(profile, item.permission)),
  })).filter((group) => group.items.length > 0);
}
