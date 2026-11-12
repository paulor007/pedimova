import {
  Boxes,
  ChartColumn,
  CreditCard,
  MailCheck,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import tracingVisual from "../../assets/tracing-visual.webp";
import { cn } from "../../lib/cn";
import { ScrollReveal } from "./ScrollReveal";
import { SectionMarker } from "./SectionMarker";
import { SectionTitle } from "./SectionTitle";

type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string;
  wide?: boolean;
};

// Benefits are based on the planned functional requirements.
const benefits: Benefit[] = [
  {
    // RF08, RF11, RN06-RN08
    icon: Boxes,
    title: "Estoque sempre em dia",
    description:
      "Os itens são reservados na criação do pedido quando há saldo disponível para todos. Se o pedido for cancelado, a reserva é liberada; a baixa do estoque acontece no envio.",
    tags: "reserva · liberação · baixa no envio",
    wide: true,
  },
  {
    // RF18-RF21
    icon: CreditCard,
    title: "Pagamento sob controle",
    description:
      "Na operação planejada, o PIX terá prazo de pagamento, e o cartão registrará aprovação ou recusa. O pedido seguirá para separação somente após a confirmação do pagamento.",
    tags: "PIX · cartão · prazo de validade",
  },
  {
    // RF24, RF25
    icon: MailCheck,
    title: "Avisos aos clientes",
    description:
      "A plataforma prevê avisos por e-mail quando o pedido for pago, enviado, entregue ou cancelado, com registro de cada envio.",
    tags: "pago · enviado · entregue · cancelado",
  },
  {
    // RF26
    icon: ChartColumn,
    title: "Números da operação",
    description:
      "O painel reunirá pedidos criados, pagamentos pendentes, faturamento, ticket médio (valor médio dos pedidos pagos) e produtos com estoque abaixo do mínimo.",
    tags: "faturamento · ticket médio · estoque mínimo",
  },
  {
    // RF16, RF22, RN10, RN11, RN15, RN16
    icon: ShieldCheck,
    title: "Cancelamentos com regras claras",
    description:
      "Cartão recusado, PIX vencido ou cancelamento antes do envio: cada situação segue regras para liberar reservas, registrar o motivo e, quando necessário, estornar pagamentos.",
    tags: "cancelamento com motivo · estorno · liberação da reserva",
    wide: true,
  },
];

export function BenefitsSection() {
  return (
    <section
      id="beneficios"
      aria-labelledby="beneficios-titulo"
      className="relative isolate overflow-hidden py-24 md:py-32"
    >
      {/* Background grid for the benefits section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-section-grid opacity-40" />

        <div className="absolute inset-0 bg-linear-to-b from-canvas via-transparent to-canvas" />
      </div>

      <div className="page-container">
        <SectionMarker sectionId="beneficios" />

        {/* Section heading */}

        <ScrollReveal className="mb-14 max-w-2xl">
          <SectionTitle
            id="beneficios-titulo"
            overline="Benefícios"
            lines={["Do pedido à entrega,", "sem nada se perder."]}
          />
        </ScrollReveal>

        {/* Responsive benefits grid */}
        <div className="grid gap-5 lg:grid-cols-3">
          {/* Order timeline illustration */}
          <ScrollReveal className="crosshair lg:row-span-2">
            <figure className="relative h-full min-h-64 overflow-hidden rounded-card border border-line">
              <img
                src={tracingVisual}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-canvas/95 via-canvas/20 to-transparent"
              />

              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <span className="block font-mono text-2xs tracking-overline text-accent uppercase">
                  Linha do tempo
                </span>

                <span className="mt-2 block text-xl font-semibold text-fg">
                  A história de cada pedido, com data, hora e responsável.
                </span>
              </figcaption>
            </figure>
          </ScrollReveal>

          {/* Business benefit cards */}
          {benefits.map(
            ({ icon: Icon, title, description, tags, wide }, index) => (
              <ScrollReveal
                key={title}
                delayMs={index * 100}
                className={cn("h-full", wide && "lg:col-span-2")}
              >
                <div className="flex h-full flex-col rounded-card border border-line bg-surface/80 p-6 backdrop-blur-sm transition duration-300 hover:border-accent/40 motion-safe:hover:-translate-y-1">
                  <div className="mb-4 flex size-11 items-center justify-center rounded-control bg-accent/10 text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>

                  <h3 className="text-lg font-semibold text-fg">{title}</h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
                    {description}
                  </p>

                  <p className="mt-4 border-t border-line pt-3 font-mono text-2xs text-accent">
                    {tags}
                  </p>
                </div>
              </ScrollReveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
