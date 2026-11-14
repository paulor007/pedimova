import {
  Headset,
  Landmark,
  PackageCheck,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router";
import { navigationFor } from "../components/app/appNavigation";
import { DemoBadge } from "../components/app/DemoBadge";
import { ButtonLink } from "../components/ui/ButtonLink";
import { buttonClasses } from "../components/ui/styles";
import { pageTitle } from "../config/brand";
import {
  USER_PROFILE,
  USER_PROFILES,
  type UserProfile,
} from "../domain/userProfile";
import { getDemoUserName } from "../session/demoSession";
import { cn } from "../lib/cn";
import type { accessAction, accessLoader } from "../session/sessionRoutes";

const PROFILE_ICON: Record<UserProfile, LucideIcon> = {
  ADMIN: ShieldCheck,
  ATTENDANT: Headset,
  STOCK_CLERK: PackageCheck,
  FINANCE: Landmark,
};

/** T02: the visitor enters by choosing one of the four demo profiles. */
export function AccessPage() {
  const { session, returnPath } = useLoaderData<typeof accessLoader>();
  const actionData = useActionData<typeof accessAction>();
  const navigation = useNavigation();

  const isEntering = navigation.state !== "idle";
  const enteringProfile = navigation.formData?.get("profile");

  return (
    <section className="page-container py-12 sm:py-16 lg:py-20">
      <title>{pageTitle("Acessar Plataforma")}</title>

      <div className="max-w-3xl">
        <p className="font-mono text-xs tracking-overline text-accent uppercase">
          Acessar Plataforma
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Escolha um perfil para entrar
        </h1>

        <p className="mt-4 text-fg-muted">
          Cada perfil mostra a plataforma do ponto de vista de uma função da
          equipe: o menu e as ações mudam conforme o que ela pode fazer. Você
          pode sair e entrar com outro perfil quando quiser.
        </p>

        <div className="mt-5">
          <DemoBadge />
        </div>
      </div>

      {session ? (
        <div className="mt-8 flex max-w-3xl flex-col gap-4 rounded-card border border-accent/30 bg-accent/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">
            Você já entrou como{" "}
            <strong className="font-semibold">
              {USER_PROFILE[session.profile].label}
            </strong>{" "}
            ({session.userName}). Para trocar, escolha outro perfil abaixo.
          </p>
          <ButtonLink to={returnPath ?? "/app"} className="shrink-0">
            Continuar na plataforma
          </ButtonLink>
        </div>
      ) : (
        returnPath && (
          <p className="mt-8 max-w-3xl rounded-card border border-line bg-surface p-4 text-sm text-fg-muted">
            Entre com um perfil para abrir a página que você pediu.
          </p>
        )
      )}

      {actionData?.error && (
        <p
          role="alert"
          className="mt-8 max-w-3xl rounded-card border border-danger/40 bg-danger/10 p-4 text-sm text-danger"
        >
          {actionData.error}
        </p>
      )}

      <Form method="post" className="mt-10">
        <input type="hidden" name="destino" value={returnPath ?? ""} />

        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {USER_PROFILES.map((profile) => {
            const Icon = PROFILE_ICON[profile];
            const { label, responsibility } = USER_PROFILE[profile];
            const areas = navigationFor(profile).flatMap(
              (group) => group.items,
            );
            const headingId = `perfil-${profile.toLowerCase()}`;

            return (
              <li key={profile}>
                <article
                  aria-labelledby={headingId}
                  className="flex h-full flex-col rounded-card border border-line bg-surface p-5 transition-colors focus-within:border-accent/50 hover:border-line-strong sm:p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-control bg-accent/10 text-accent">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <h2 id={headingId} className="text-lg font-semibold">
                        {label}
                      </h2>
                      <p className="text-xs text-fg-muted">
                        {getDemoUserName(profile)}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-fg-muted">{responsibility}</p>

                  <div className="mt-5 border-t border-line pt-4">
                    <h3 className="font-mono text-2xs tracking-overline text-fg-muted uppercase">
                      Áreas no menu
                    </h3>
                    <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                      {areas.map((item) => (
                        <li key={item.id}>{item.label}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Pushed to the bottom, so the buttons line up across cards. */}
                  <div className="mt-auto pt-6">
                    <button
                      type="submit"
                      name="profile"
                      value={profile}
                      disabled={isEntering}
                      className={cn(buttonClasses("secondary"), "w-full")}
                    >
                      {enteringProfile === profile
                        ? "Entrando…"
                        : `Entrar como ${label}`}
                    </button>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </Form>

      <p className="mt-8 max-w-3xl text-sm text-fg-muted">
        Nesta versão, o acesso é feito pela escolha do perfil, sem usuário e
        senha. A escolha fica guardada só neste navegador, até você sair.
      </p>
    </section>
  );
}
