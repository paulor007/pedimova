import { Database, EyeOff, Users } from "lucide-react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router";

import { AccessSteps } from "../components/access/AccessSteps";
import { ProfileCard } from "../components/access/ProfileCard";
import { DemoBadge } from "../components/app/DemoBadge";
import { LogoMark } from "../components/brand/Logo";
import { ScrollReveal } from "../components/site/ScrollReveal";
import { ButtonLink } from "../components/ui/ButtonLink";
import { StatusBadge } from "../components/ui/StatusBadge";

import { pageTitle } from "../config/brand";
import { USER_PROFILE, USER_PROFILES } from "../domain/userProfile";
import type { accessAction, accessLoader } from "../session/sessionRoutes";

const NOTES = [
  {
    icon: EyeOff,
    title: "O que não pode, não aparece",
    text: "Menus e botões sem permissão não são exibidos para o perfil.",
  },
  {
    icon: Users,
    title: "Quatro funções da equipe",
    text: "Administração, atendimento, estoque e financeiro, cada uma com seu menu.",
  },
  {
    icon: Database,
    title: "Dados de exemplo",
    text: "Clientes, produtos e pedidos pertencem a uma distribuidora fictícia.",
  },
];

export function AccessPage() {
  const { session, returnPath } = useLoaderData<typeof accessLoader>();
  const actionData = useActionData<typeof accessAction>();
  const navigation = useNavigation();

  const isEntering = navigation.state !== "idle";
  const enteringProfile = navigation.formData?.get("profile");

  return (
    <section className="relative isolate overflow-hidden">
      <title>{pageTitle("Acessar Plataforma")}</title>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-section-grid opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/4 -z-10 h-96 w-[40rem] max-w-full rounded-full bg-accent/10 blur-3xl"
      />

      <div className="page-container py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] xl:items-center xl:gap-16">
          <div>
            <div aria-hidden="true" className="flex items-center gap-3">
              <LogoMark className="size-5 text-accent" />

              <span className="font-mono text-2xs tracking-overline text-accent uppercase">
                Acessar Plataforma
              </span>

              <span className="h-px max-w-48 flex-1 bg-line" />
            </div>

            <h1 className="mt-6 text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.1] font-bold tracking-tight text-fg">
              <span className="block">Escolha um perfil.</span>
              <span className="mt-1 block text-accent text-shadow-glow">
                Veja o que ele pode fazer.
              </span>
            </h1>

            <p className="mt-6 max-w-xl leading-relaxed text-fg-muted sm:text-lg">
              Quatro usuários de exemplo, cada um com uma função na operação da
              distribuidora. O menu e as ações mudam conforme as permissões do
              perfil.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <StatusBadge tone="success">4 perfis de acesso</StatusBadge>
              <DemoBadge />
            </div>
          </div>

          <AccessSteps />
        </div>

        {session ? (
          <div className="mt-12 flex flex-col gap-4 rounded-card border border-accent/30 bg-accent/5 p-5 sm:flex-row sm:items-center sm:justify-between">
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
            <p className="mt-12 rounded-card border border-line bg-surface p-4 text-sm text-fg-muted">
              Entre com um perfil para abrir a página que você pediu.
            </p>
          )
        )}

        {actionData?.error && (
          <p
            role="alert"
            className="mt-6 rounded-card border border-danger/40 bg-danger/10 p-4 text-sm text-danger"
          >
            {actionData.error}
          </p>
        )}

        <Form method="post" className="mt-12">
          <input type="hidden" name="destino" value={returnPath ?? ""} />

          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {USER_PROFILES.map((profile, index) => (
              <li key={profile}>
                <ScrollReveal delayMs={index * 100} className="h-full">
                  <ProfileCard
                    profile={profile}
                    position={index + 1}
                    isCurrent={session?.profile === profile}
                    isEntering={isEntering}
                    isChosen={enteringProfile === profile}
                  />
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </Form>

        <ul className="mt-14 grid gap-6 border-t border-line pt-10 md:grid-cols-3">
          {NOTES.map((note) => (
            <li key={note.title} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-control bg-accent/10 text-accent">
                <note.icon aria-hidden="true" className="size-5" />
              </span>

              <div>
                <p className="font-semibold text-fg">{note.title}</p>

                <p className="mt-1 text-sm text-fg-muted">{note.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
