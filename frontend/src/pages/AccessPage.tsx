import { pageTitle } from "../config/brand";

export function AccessPage() {
  return (
    <section className="page-container py-16 sm:py-24">
      <title>{pageTitle("Acessar Plataforma")}</title>

      <p className="font-mono text-xs tracking-overline text-accent uppercase">
        Acesso em preparação
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Acessar Plataforma
      </h1>

      <p className="mt-4 max-w-2xl text-fg-muted">
        A Pedimova ainda está em desenvolvimento. Em uma próxima etapa, esta
        página permitirá escolher um dos quatro perfis de demonstração para
        conhecer a operação. O acesso ainda não está disponível nesta versão.
      </p>
    </section>
  );
}
