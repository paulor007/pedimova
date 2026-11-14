import type { UserProfile } from "./userProfile";

/**
 * What a profile may see or do, written as "area:action".
 * Source: permission matrix of the functional specification (RF02).
 */
export type Permission =
  | "dashboard:view"
  | "orders:view"
  | "orders:create"
  | "orders:cancel-unpaid"
  | "orders:cancel-paid"
  | "orders:fulfill"
  | "customers:view"
  | "customers:manage"
  | "products:view"
  | "products:manage"
  | "inventory:view"
  | "inventory:adjust"
  | "payments:view";

/** Permissions granted to each profile. Anything not listed is denied. */
const PROFILE_PERMISSIONS: Record<UserProfile, readonly Permission[]> = {
  ADMIN: [
    "dashboard:view",
    "orders:view",
    "orders:create",
    "orders:cancel-unpaid",
    "orders:cancel-paid",
    "orders:fulfill",
    "customers:view",
    "customers:manage",
    "products:view",
    "products:manage",
    "inventory:view",
    "inventory:adjust",
    "payments:view",
  ],
  ATTENDANT: [
    "dashboard:view",
    "orders:view",
    "orders:create",
    "orders:cancel-unpaid",
    "customers:view",
    "customers:manage",
    "products:view",
    "inventory:view",
    "payments:view",
  ],
  STOCK_CLERK: [
    "dashboard:view",
    "orders:view",
    "orders:fulfill",
    "products:view",
    "inventory:view",
    "inventory:adjust",
  ],
  FINANCE: [
    "dashboard:view",
    "orders:view",
    "orders:cancel-paid",
    "customers:view",
    "products:view",
    "payments:view",
  ],
};

/** Tells whether a profile holds a permission. */
export function can(profile: UserProfile, permission: Permission): boolean {
  return PROFILE_PERMISSIONS[profile].includes(permission);
}
