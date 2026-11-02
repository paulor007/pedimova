import { useState } from "react";
import { prefersReducedMotion } from "../../lib/motion";
import { HeroFlowDiagram } from "./HeroFlowDiagram";
import { HeroOrderTimeline } from "./HeroOrderTimeline";

/** Illustrative preview next to the hero text; one control pauses all of it. */
export function HeroPreview() {
  const [isRunning, setIsRunning] = useState(() => !prefersReducedMotion());

  return (
    <figure
      data-motion={isRunning ? "running" : "paused"}
      className="w-full space-y-4.5"
    >
      <figcaption className="sr-only">
        Exemplo ilustrativo: a área de Pedidos avisa cada etapa do pedido pela
        central de atualizações, e Estoque, Pagamentos e Notificações fazem a
        sua parte. Abaixo, a linha do tempo de um pedido, de criado até o aviso
        de envio ao cliente.
      </figcaption>

      <HeroFlowDiagram />

      <HeroOrderTimeline
        isRunning={isRunning}
        onToggle={() => setIsRunning((running) => !running)}
      />
    </figure>
  );
}
