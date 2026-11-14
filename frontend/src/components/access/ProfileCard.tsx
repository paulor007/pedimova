import { LogIn } from "lucide-react";
import type { CSSProperties } from "react";
import { describeModuleAccess } from "../app/appModules";
import { APP_NAVIGATION } from "../app/appNavigation";
import { PROFILE_APPEARANCE } from "../app/profileAppearance";
import { Button } from "../ui/Button";
import { StatusBadge } from "../ui/StatusBadge";
import { USER_PROFILE, type UserProfile } from "../../domain/userProfile";
import { cn } from "../../lib/cn";
import { getDemoUserName } from "../../session/demoSession";

type ProfileCardProps = {
  profile: UserProfile;
  position: number;
  isCurrent: boolean;
  isEntering: boolean;
  isChosen: boolean;
};
const MODULES = APP_NAVIGATION.flatMap((group) => group.items);

export function ProfileCard({
  profile,
  position,
  isCurrent,
  isEntering,
  isChosen,
}: ProfileCardProps) {
  const { label, responsibility } = USER_PROFILE[profile];
  const { icon: Icon, color } = PROFILE_APPEARANCE[profile];
  const headingId = `perfil-${profile.toLowerCase()}`;

  return (
    <article
      aria-labelledby={headingId}
      style={{ "--domain": color } as CSSProperties}
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface p-6 transition duration-300 focus-within:border-(--domain)/40 hover:border-(--domain)/40 hover:glow-domain motion-safe:hover:-translate-y-1"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-(--domain) to-transparent opacity-50 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-3">
        <span className="flex size-11 items-center justify-center rounded-control bg-(--domain)/10 text-(--domain)">
          <Icon aria-hidden="true" className="size-5" />
        </span>

        {isCurrent ? (
          <StatusBadge tone="success">Em uso</StatusBadge>
        ) : (
          <span className="font-mono text-2xs tracking-overline text-fg-muted uppercase">
            Perfil {String(position).padStart(2, "0")}
          </span>
        )}
      </div>

      <h2 id={headingId} className="mt-5 text-xl font-semibold text-fg">
        {label}
      </h2>

      <p className="mt-0.5 font-mono text-2xs text-(--domain)">
        {getDemoUserName(profile)}
      </p>

      <p className="mt-3 text-sm leading-relaxed text-fg-muted">
        {responsibility}
      </p>

      <h3 className="mt-6 font-mono text-2xs tracking-overline text-fg-muted uppercase">
        Permissões por área
      </h3>

      <dl className="mt-2 divide-y divide-line border-t border-line text-sm">
        {MODULES.map((item) => {
          const access = describeModuleAccess(profile, item.id);
          const hasAccess = access !== "Sem acesso";

          return (
            <div
              key={item.id}
              className="flex items-baseline justify-between gap-4 py-2"
            >
              <dt className="text-fg-muted">{item.label}</dt>

              <dd
                className={cn(
                  "text-right",
                  hasAccess
                    ? "font-medium text-fg"
                    : "font-mono text-2xs text-fg-muted",
                )}
              >
                {hasAccess ? access : "sem acesso"}
              </dd>
            </div>
          );
        })}
      </dl>

      <div className="mt-auto pt-6">
        <Button
          type="submit"
          name="profile"
          value={profile}
          disabled={isEntering && !isChosen}
          loading={isChosen}
          loadingText="Entrando…"
          className="w-full"
        >
          <LogIn aria-hidden="true" className="size-4" />
          Entrar como {label}
        </Button>
      </div>
    </article>
  );
}
