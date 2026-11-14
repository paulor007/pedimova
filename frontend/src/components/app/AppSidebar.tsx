import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { BRAND } from "../../config/brand";
import type { UserProfile } from "../../domain/userProfile";
import { cn } from "../../lib/cn";
import { Logo, LogoMark } from "../brand/Logo";
import { AppNavList } from "./AppNavList";

/** Remembers the menu width per browser; a convenience, never required. */
const COLLAPSED_KEY = "pedimova:sidebar-collapsed";

function readCollapsed(): boolean {
  try {
    return window.localStorage.getItem(COLLAPSED_KEY) === "true";
  } catch {
    return false;
  }
}

function saveCollapsed(collapsed: boolean) {
  try {
    window.localStorage.setItem(COLLAPSED_KEY, String(collapsed));
  } catch {
    // The preference is simply not kept.
  }
}

/** Side menu of the internal area, on large screens. */
export function AppSidebar({ profile }: { profile: UserProfile }) {
  const [collapsed, setCollapsed] = useState(readCollapsed);

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    saveCollapsed(next);
  }

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-line bg-canvas lg:flex",
        "motion-safe:transition-[width] motion-safe:duration-200",
        collapsed ? "w-18" : "w-64",
      )}
    >
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-line",
          collapsed ? "justify-center" : "px-5",
        )}
      >
        <Link
          to="/app"
          aria-label={`${BRAND.name}, painel`}
          className="inline-flex min-h-11 items-center rounded-control"
        >
          {collapsed ? <LogoMark className="size-7 text-accent" /> : <Logo />}
        </Link>
      </div>

      <nav
        id="menu-lateral"
        aria-label="Menu principal"
        className="flex-1 overflow-y-auto p-3"
      >
        <AppNavList profile={profile} collapsed={collapsed} />
      </nav>

      <div className="shrink-0 border-t border-line p-3">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={!collapsed}
          aria-controls="menu-lateral"
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          title={collapsed ? "Expandir menu" : "Recolher menu"}
          className={cn(
            "flex min-h-11 w-full items-center gap-3 rounded-control px-3 text-sm font-medium text-fg-muted transition-colors hover:bg-surface hover:text-fg",
            collapsed && "justify-center px-0",
          )}
        >
          {collapsed ? (
            <PanelLeftOpen aria-hidden="true" className="size-5 shrink-0" />
          ) : (
            <PanelLeftClose aria-hidden="true" className="size-5 shrink-0" />
          )}
          {!collapsed && <span>Recolher menu</span>}
        </button>
      </div>
    </aside>
  );
}
