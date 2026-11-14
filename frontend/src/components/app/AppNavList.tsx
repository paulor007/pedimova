import { NavLink } from "react-router";
import type { UserProfile } from "../../domain/userProfile";
import { cn } from "../../lib/cn";
import { navigationFor } from "./appNavigation";

type AppNavListProps = {
  profile: UserProfile;
  /** Icons only; labels stay available to screen readers and as tooltips. */
  collapsed?: boolean;
  /** Called after an item is chosen, so a floating menu can close. */
  onNavigate?: () => void;
};

/** Menu items the profile may open, grouped as in the side menu. */
export function AppNavList({
  profile,
  collapsed = false,
  onNavigate,
}: AppNavListProps) {
  return (
    <div className="grid gap-6">
      {navigationFor(profile).map((group) => {
        const labelId = `menu-grupo-${group.id}`;

        return (
          <div key={group.id}>
            <p
              id={labelId}
              className={cn(
                "mb-2 px-3 font-mono text-2xs tracking-overline text-fg-muted uppercase",
                collapsed && "sr-only",
              )}
            >
              {group.label}
            </p>

            <ul aria-labelledby={labelId} className="grid gap-1">
              {group.items.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.to}
                    // The panel path is a prefix of every other one.
                    end={item.id === "dashboard"}
                    onClick={onNavigate}
                    title={collapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      cn(
                        "relative flex min-h-11 items-center gap-3 rounded-control px-3 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-surface-raised text-fg"
                          : "text-fg-muted hover:bg-surface hover:text-fg",
                        collapsed && "justify-center px-0",
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-y-2.5 left-0 w-0.5 rounded-full bg-accent"
                          />
                        )}
                        <item.icon
                          aria-hidden="true"
                          className={cn(
                            "size-5 shrink-0",
                            isActive && "text-accent",
                          )}
                        />
                        <span className={collapsed ? "sr-only" : "truncate"}>
                          {item.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
