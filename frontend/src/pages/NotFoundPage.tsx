import { TextLink } from "../components/ui/TextLink";
import { pageTitle } from "../config/brand";

export function NotFoundPage() {
  return (
    <section className="page-container py-16 sm:py-24">
      <title>{pageTitle("Página não encontrada")}</title>

      <p className="font-mono text-xs tracking-overline text-accent uppercase">
        Erro 404
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Página não encontrada
      </h1>

      <p className="mt-4 max-w-2xl text-fg-muted">
        O endereço pode ter sido digitado errado, ou a página não existe mais.
      </p>

      <p className="mt-6">
        <TextLink to="/">Voltar ao início</TextLink>
      </p>
    </section>
  );
}
