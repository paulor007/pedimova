import { Link } from "react-router";
import { APP_MODULES } from "../../components/app/appModules";
import { navigationFor } from "../../components/app/appNavigation";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { USER_PROFILE } from "../../domain/userProfile";
import { useDemoSession } from "../../session/useDemoSession";

/** Starting point of every profile; indicators arrive with the panel module. */
export function DashboardPage() {
  const session = useDemoSession();
  const profile = USER_PROFILE[session.profile];
  const [firstName] = session.userName.split(" ");
  const areas = navigationFor(session.profile)
    .flatMap((group) => group.items)
    .filter((item) => item.id !== "dashboard");

  return (
    <div className="grid gap-10">
      <section aria-labelledby="painel-boas-vindas">
        <p className="font-mono text-xs tracking-overline text-accent uppercase">
          {profile.label}
        </p>
        <h2
          id="painel-boas-vindas"
          className="mt-2 text-2xl font-semibold tracking-tight"
        >
          Olá, {firstName}.
        </h2>
        <p className="mt-2 max-w-2xl text-fg-muted">{profile.responsibility}</p>
      </section>

      <section aria-labelledby="painel-areas">
        <h2 id="painel-areas" className="text-lg font-semibold">
          Suas áreas
        </h2>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {areas.map((item) => (
            <li
              key={item.id}
              className="relative flex h-full flex-col rounded-card border border-line bg-surface p-5 transition-colors focus-within:border-accent/50 hover:border-accent/40"
            >
              <item.icon aria-hidden="true" className="size-5 text-accent" />
              <h3 className="mt-4 font-semibold">
                {/* The link covers the whole card; its name stays short. */}
                <Link
                  to={item.to}
                  className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none"
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
