import { Link, Outlet, ScrollRestoration, useMatch } from "react-router";
import { Logo } from "../components/brand/Logo";
import { HeaderNav } from "../components/site/HeaderNav";
import { MobileMenu } from "../components/site/MobileMenu";
import { ButtonLink } from "../components/ui/ButtonLink";
import { BRAND } from "../config/brand";

const CURRENT_YEAR = new Date().getFullYear();

export function PublicLayout() {
  const isAccessPage = useMatch("/entrar") !== null;
  const isHomePage = useMatch("/") !== null;

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-20 focus:rounded-control focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-accent"
      >
        Pular para o conteúdo
      </a>

      <header className="sticky top-0 z-10 border-b border-line bg-canvas">
        <div className="page-container flex h-16 items-center justify-between gap-2 sm:gap-4">
          <Link
            to="/"
            aria-label={`${BRAND.name}, página inicial`}
            className="inline-flex min-h-11 shrink-0 items-center rounded-control"
          >
            <Logo />
          </Link>

          {isAccessPage ? (
            <ButtonLink
              to="/"
              variant="secondary"
              className="shrink-0 whitespace-nowrap"
            >
              Voltar ao início
            </ButtonLink>
          ) : isHomePage ? (
            <div className="flex items-center gap-3">
              <HeaderNav />

              <div className="hidden sm:block">
                <ButtonLink to="/entrar" className="shrink-0 whitespace-nowrap">
                  Acessar Plataforma
                </ButtonLink>
              </div>

              <MobileMenu />
            </div>
          ) : (
            <ButtonLink
              to="/"
              variant="secondary"
              className="hidden shrink-0 whitespace-nowrap sm:inline-flex"
            >
              Voltar ao início
            </ButtonLink>
          )}
        </div>
      </header>

      <main id="conteudo" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>

      <footer className="border-t border-line">
        <div className="page-container flex flex-col gap-6 py-8 text-sm text-fg-muted sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Logo />
            <p className="mt-2">
              Gestão de pedidos, estoque e pagamentos em uma só plataforma.
            </p>
          </div>

          <p>
            © {CURRENT_YEAR} {BRAND.name}
          </p>
        </div>
      </footer>

      <ScrollRestoration />
    </div>
  );
}
