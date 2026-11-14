import {
  Headset,
  PackageCheck,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import type { UserProfile } from "../../domain/userProfile";

export type ProfileAppearance = {
  icon: LucideIcon;
  color: string;
};

export const PROFILE_APPEARANCE: Record<UserProfile, ProfileAppearance> = {
  ADMIN: {
    icon: ShieldCheck,
    color: "var(--color-accent)",
  },

  ATTENDANT: {
    icon: Headset,
    color: "var(--color-domain-orders)",
  },

  STOCK_CLERK: {
    icon: PackageCheck,
    color: "var(--color-domain-inventory)",
  },

  FINANCE: {
    icon: Wallet,
    color: "var(--color-domain-payments)",
  },
};
