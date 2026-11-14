import { Check } from "lucide-react";
import { APP_MODULES } from "../../components/app/appModules";
import { useAppRouteHandle } from "../../components/app/appRouteHandle";
import { Card } from "../../components/ui/Card";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { can } from "../../domain/permissions";
import { USER_PROFILE } from "../../domain/userProfile";
import { useDemoSession } from "../../session/useDemoSession";

/**
 * Introduction of a module whose screen is not built yet. Each module
 * replaces it with its own page in the stage that builds it.
 */
export function UpcomingModulePage() {
  const session = useDemoSession();
  const moduleId = useAppRouteHandle()?.module;

  if (!moduleId) {
    throw new Error("UpcomingModulePage needs a route handle with a module.");
  }

  const appModule = APP_MODULES[moduleId];
  const granted = appModule.capabilities.filter((capability) =>
    can(session.profile, capability.permission),
  );

  return (
    <Card className="max-w-3xl">
      <StatusBadge tone="info">Em preparação</StatusBadge>

      <h2 className="mt-4 text-xl font-semibold">O que esta área vai reunir</h2>
      <p className="mt-2 text-fg-muted">{appModule.summary}</p>

      <h3 className="mt-6 text-sm font-semibold">
        Com o perfil {USER_PROFILE[session.profile].label}, você poderá:
      </h3>
      <ul className="mt-3 grid gap-2 text-sm">
        {granted.map((capability) => (
          <li key={capability.permission} className="flex gap-2">
            <Check
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-accent"
            />
            {capability.label}
          </li>
        ))}
      </ul>
    </Card>
  );
}
