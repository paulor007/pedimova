import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";
import { DOMAIN_BY_ID, type DomainId } from "./domains";

// Stages of one order, in the order they happen (spec, section 4).
const steps: { text: string; area: DomainId }[] = [
  { text: "Pedido criado", area: "orders" },
  { text: "Itens reservados no estoque", area: "inventory" },
  { text: "Cobrança PIX gerada", area: "payments" },
  { text: "Pagamento aprovado", area: "payments" },
  { text: "Cliente avisado: pedido pago", area: "notifications" },
  { text: "Separação iniciada", area: "orders" },
  { text: "Pedido enviado", area: "orders" },
  { text: "Baixa no estoque", area: "inventory" },
  { text: "Cliente avisado: pedido enviado", area: "notifications" },
];

const VISIBLE_ROWS = 4;
const STEP_INTERVAL_MS = 2600;
const FIRST_ORDER_NUMBER = 1045;

// The visible window slides from the first stages to the last ones; then the
// next order starts, so stages of different orders never share the list.
const WINDOWS_PER_ORDER = steps.length - VISIBLE_ROWS + 1;

type HeroOrderTimelineProps = {
  isRunning: boolean;
  onToggle: () => void;
};

export function HeroOrderTimeline({
  isRunning,
  onToggle,
}: HeroOrderTimelineProps) {
  const [tick, setTick] = useState(0);

  // Shows the next stage at a steady pace while the preview is running.
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = window.setInterval(() => {
      setTick((previous) => previous + 1);
    }, STEP_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [isRunning]);

  const orderNumber = FIRST_ORDER_NUMBER + Math.floor(tick / WINDOWS_PER_ORDER);
  const firstStep = tick % WINDOWS_PER_ORDER;
  const rows = steps.slice(firstStep, firstStep + VISIBLE_ROWS);

  // A new order replaces the whole list, so every row enters together.
  const isNewOrder = firstStep === 0 && tick > 0;

  return (
    <div className="crosshair">
      <div className="overflow-hidden rounded-card border border-line bg-canvas/95 shadow-overlay">
        {/* Window bar */}
        <div
          aria-hidden="true"
          className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-line bg-surface px-3 py-2.5"
        >
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-danger/70" />
            <span className="size-2.5 rounded-full bg-warning/70" />
            <span className="size-2.5 rounded-full bg-accent/70" />
          </div>

          <span className="font-mono text-2xs whitespace-nowrap text-fg-muted">
            pedido #{orderNumber}
          </span>

          <span className="flex items-center justify-end gap-1.5 font-mono text-2xs whitespace-nowrap text-accent">
            <span className="size-1.5 rounded-full bg-accent motion-safe:animate-pulse-dot" />
            em andamento
          </span>
        </div>

        {/* Latest stages, oldest first */}
        <ol aria-hidden="true" className="space-y-1 px-4 py-2.5">
          {rows.map((step, index) => {
            const area = DOMAIN_BY_ID[step.area];

            return (
              <li
                key={`${orderNumber}-${step.text}`}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-control bg-surface/80 px-4 py-3.5",
                  (isNewOrder || index === VISIBLE_ROWS - 1) &&
                    "motion-safe:animate-rise",
                )}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className="size-2 shrink-0 rounded-full"
                    style={{ backgroundColor: area.color }}
                  />
                  <span className="truncate font-mono text-xs font-medium text-fg">
                    {step.text}
                  </span>
                </span>

                <span className="hidden shrink-0 font-mono text-2xs text-fg-muted sm:block">
                  {area.name}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Footer and motion control */}
        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2">
          <span aria-hidden="true" className="font-mono text-2xs text-fg-muted">
            exemplo ilustrativo
          </span>

          <button
            type="button"
            onClick={onToggle}
            aria-label={
              isRunning
                ? "Pausar animação da prévia"
                : "Retomar animação da prévia"
            }
            title={isRunning ? "Pausar animação" : "Retomar animação"}
            className="relative inline-flex size-8 items-center justify-center rounded-control border border-line text-fg-muted transition after:absolute after:-inset-1.5 hover:border-accent/40 hover:text-accent motion-reduce:hidden"
          >
            {isRunning ? (
              <Pause className="size-3.5" />
            ) : (
              <Play className="size-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
