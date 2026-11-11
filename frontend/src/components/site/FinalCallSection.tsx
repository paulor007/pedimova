import { ButtonLink } from "../ui/ButtonLink";
import { ScrollReveal } from "./ScrollReveal";

export function FinalCallSection() {
  return (
    <section aria-labelledby="chamada-final-titulo" className="py-24 md:py-32">
      <div className="page-container">
        <ScrollReveal className="relative isolate overflow-hidden rounded-card border border-accent/30 bg-surface px-6 py-14 text-center shadow-glow sm:px-10 md:py-20">
          {/* Decorative grid and accent glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-section-grid opacity-40"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-accent/10 via-transparent to-canvas/60"
          />

          {/* Decorative corner marks */}
          <span
            aria-hidden="true"
            className="absolute top-3 left-4 font-mono text-xl text-accent"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute right-4 bottom-3 font-mono text-xl text-accent"
          >
            +
          </span>

          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="font-mono text-xs tracking-overline text-accent uppercase">
              Conheça a Pedimova
            </p>

            <h2
              id="chamada-final-titulo"
              className="mt-4 text-3xl font-bold tracking-tight text-balance text-fg sm:text-4xl md:text-5xl"
            >
              Um só lugar para acompanhar cada pedido.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg-muted">
              A Pedimova está em desenvolvimento para reunir pedidos, estoque,
              pagamentos e avisos aos clientes em uma operação mais clara e
              organizada.
            </p>

            <ButtonLink to="/entrar" className="mt-8">
              Acessar Plataforma
            </ButtonLink>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
