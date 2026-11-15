import type { CSSProperties } from "react";
import { Link } from "react-router";

import { APP_MODULES } from "../../components/app/appModules";
import {
  navigationFor,
  type AppModuleId,
} from "../../components/app/appNavigation";
import { PROFILE_APPEARANCE } from "../../components/app/profileAppearance";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { USER_PROFILE } from "../../domain/userProfile";
import { useDemoSession } from "../../session/useDemoSession";

const MODULE_COLORS: Record<AppModuleId, string> = {
  dashboard: "var(--color-accent)",
  orders: "var(--color-domain-orders)",
  customers: "var(--color-domain-masterdata)",
  products: "var(--color-domain-masterdata)",
  inventory: "var(--color-domain-inventory)",
  payments: "var(--color-domain-payments)",
};

/** Starting point of every profile; indicators arrive with the panel module. */
export function DashboardPage() {
  const session = useDemoSession();
  const profile = USER_PROFILE[session.profile];
  const { color: profileColor } = PROFILE_APPEARANCE[session.profile];
  const [firstName] = session.userName.split(" ");
  const areas = navigationFor(session.profile)
    .flatMap((group) => group.items)
    .filter((item) => item.id !== "dashboard");

  return (
    <div className="grid gap-10">
      <section
        aria-labelledby="painel-boas-vindas"
        style={{ "--domain": profileColor } as CSSProperties}
        className="relative isolate overflow-hidden rounded-card border border-line bg-surface p-6 sm:p-8"
      >
        {/* Background grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-section-grid opacity-50"
        />

        {/* Soft glow in the profile color */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 -z-10 size-64 rounded-full bg-(--domain)/10 blur-3xl"
        />

        {/* Greeting */}
        <p className="font-mono text-2xs tracking-overline text-(--domain) uppercase">
          {profile.label}
        </p>

        <h2
          id="painel-boas-vindas"
          className="mt-3 text-2xl font-semibold tracking-tight text-fg"
        >
          Olá, {firstName}.
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
          {profile.responsibility}
        </p>
      </section>

      <section aria-labelledby="painel-areas">
        <h2 id="painel-areas" className="text-lg font-semibold">
          Suas áreas
        </h2>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {areas.map((item) => (
            <li
              key={item.id}
              style={
                {
                  "--domain": MODULE_COLORS[item.id],
                } as CSSProperties
              }
              className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface p-5 transition duration-300 focus-within:border-(--domain)/40 hover:border-(--domain)/40 hover:glow-domain motion-safe:hover:-translate-y-1"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 bg-(--domain) opacity-40 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
              />

              <item.icon
                aria-hidden="true"
                className="size-5 text-(--domain)"
              />

              <h3 className="mt-4 font-semibold">
                <Link
                  to={item.to}
                  className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
                >
                  {item.label}
                </Link>
              </h3>

              <p className="mt-2 text-sm text-fg-muted">
                {APP_MODULES[item.id].summary}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="painel-indicadores"
        className="rounded-card border border-dashed border-line p-5 sm:p-6"
      >
        <StatusBadge tone="info">Em preparação</StatusBadge>
        <h2 id="painel-indicadores" className="mt-3 text-lg font-semibold">
          Indicadores da operação
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-fg-muted">
          {APP_MODULES.dashboard.summary}
        </p>
      </section>
    </div>
  );
}
