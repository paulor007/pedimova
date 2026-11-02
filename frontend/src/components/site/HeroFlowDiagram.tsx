import type { CSSProperties } from "react";
import { DOMAIN_BY_ID, type DomainId } from "./domains";

/*
 * One order moving through the operation, in a 600 x 200 viewBox.
 * The orders area announces each stage of the order (left), the update hub
 * passes it on (center) and every area that reacts to orders does its part
 * (right). Registrations only send product updates, so they are left out.
 */
const SOURCE = { x: 20, y: 74, width: 124, height: 52 };
const HUB = { left: 196, right: 300 };
const TARGET = { x: 404, width: 176, height: 44 };
const CENTER_Y = 100;

const reactions: { id: DomainId; y: number; action: string }[] = [
  { id: "inventory", y: 46, action: "reserva os itens" },
  { id: "payments", y: 100, action: "gera a cobrança" },
  { id: "notifications", y: 154, action: "avisa o cliente" },
];

const source = DOMAIN_BY_ID.orders;
const sourcePath = `M ${SOURCE.x + SOURCE.width} ${CENTER_Y} H ${HUB.left}`;

/** Horizontal S-curve from the hub to one area. */
function curveTo(y: number) {
  const middle = (HUB.right + TARGET.x) / 2;
  return `M ${HUB.right} ${CENTER_Y} C ${middle} ${CENTER_Y}, ${middle} ${y}, ${TARGET.x} ${y}`;
}

/** Moves a dot along a path; a negative delay starts it midway. */
function travelStyle(path: string, delay: number) {
  return {
    offsetPath: `path("${path}")`,
    animationDelay: `${delay}s`,
  } satisfies CSSProperties;
}

export function HeroFlowDiagram() {
  return (
    <div aria-hidden="true" className="crosshair hidden sm:block">
      <div className="overflow-hidden rounded-card border border-line bg-canvas/95 shadow-overlay">
        <p className="px-4 py-2.5 font-mono text-2xs tracking-overline text-fg-muted uppercase">
          Um pedido, todas as áreas
        </p>

        <svg viewBox="0 0 600 200" className="block w-full">
          <defs>
            <filter
              id="hero-flow-glow"
              x="-200%"
              y="-200%"
              width="500%"
              height="500%"
            >
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Orders to the hub */}
          <g style={{ color: source.color }}>
            <path
              d={sourcePath}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              className="motion-safe:animate-flow-dash"
            />
            <circle
              r="3.5"
              fill="currentColor"
              filter="url(#hero-flow-glow)"
              className="opacity-0 motion-safe:animate-message-travel"
              style={travelStyle(sourcePath, 0)}
            />
          </g>

          {/* Hub to each area that reacts */}
          {reactions.map(({ id, y }, index) => {
            const path = curveTo(y);

            return (
              <g key={`path-${id}`} style={{ color: DOMAIN_BY_ID[id].color }}>
                <path
                  d={path}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.55"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  className="motion-safe:animate-flow-dash"
                />
                <circle
                  r="3.5"
                  fill="currentColor"
                  filter="url(#hero-flow-glow)"
                  className="opacity-0 motion-safe:animate-message-travel"
                  style={travelStyle(path, -(index + 1) * 1.1)}
                />
              </g>
            );
          })}

          {/* Orders area */}
          <g style={{ color: source.color }}>
            <rect
              {...SOURCE}
              rx="8"
              stroke="currentColor"
              strokeOpacity="0.6"
              className="fill-surface"
            />
            <circle
              cx={SOURCE.x + 14}
              cy={CENTER_Y - 8}
              r="3.5"
              fill="currentColor"
            />
            <text
              x={SOURCE.x + 26}
              y={CENTER_Y - 4}
              fontSize="12"
              fontWeight="600"
              className="fill-fg font-sans"
            >
              {source.name}
            </text>
            <text
              x={SOURCE.x + 14}
              y={CENTER_Y + 13}
              fontSize="9.5"
              className="fill-fg-muted font-mono"
            >
              avisa cada etapa
            </text>
          </g>

          {/* Update hub */}
          <path
            d={`M ${HUB.left + 14} ${CENTER_Y - 28} H ${HUB.right - 14} L ${HUB.right} ${CENTER_Y} L ${HUB.right - 14} ${CENTER_Y + 28} H ${HUB.left + 14} L ${HUB.left} ${CENTER_Y} Z`}
            strokeWidth="1.5"
            className="fill-accent/10 stroke-accent"
          />
          <text
            x={(HUB.left + HUB.right) / 2}
            y={CENTER_Y - 3}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            className="fill-accent font-sans"
          >
            Central
          </text>
          <text
            x={(HUB.left + HUB.right) / 2}
            y={CENTER_Y + 12}
            textAnchor="middle"
            fontSize="9"
            className="fill-fg-muted font-mono"
          >
            de atualizações
          </text>

          {/* Areas that react */}
          {reactions.map(({ id, y, action }) => {
            const area = DOMAIN_BY_ID[id];

            return (
              <g key={`area-${id}`} style={{ color: area.color }}>
                <rect
                  x={TARGET.x}
                  y={y - TARGET.height / 2}
                  width={TARGET.width}
                  height={TARGET.height}
                  rx="8"
                  stroke="currentColor"
                  strokeOpacity="0.6"
                  className="fill-surface"
                />
                <circle
                  cx={TARGET.x + 14}
                  cy={y - 6}
                  r="3.5"
                  fill="currentColor"
                />
                <text
                  x={TARGET.x + 26}
                  y={y - 2}
                  fontSize="12"
                  fontWeight="600"
                  className="fill-fg font-sans"
                >
                  {area.name}
                </text>
                <text
                  x={TARGET.x + 14}
                  y={y + 14}
                  fontSize="9.5"
                  fill="currentColor"
                  className="font-mono"
                >
                  {action}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
