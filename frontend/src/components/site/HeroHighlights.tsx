import { useCountUp } from "../../lib/useCountUp";

// Product facts from the approved scope: the five business areas, the four
// access profiles (RF02) and the two payment methods (RF12).
const highlights = [
  { value: 5, label: "áreas integradas" },
  { value: 4, label: "perfis de acesso" },
  { value: 2, label: "formas de pagamento" },
];

function Highlight({ value, label }: { value: number; label: string }) {
  const { ref, value: current } = useCountUp<HTMLSpanElement>(value);

  return (
    <li>
      <p className="font-mono text-2xl font-semibold text-fg tabular-nums md:text-3xl">
        {/* Screen readers get the final number once, not every frame */}
        <span ref={ref} aria-hidden="true">
          {current}
        </span>
        <span className="sr-only">{value}</span>
      </p>
      <p className="mt-1 font-mono text-2xs tracking-wide text-fg-muted uppercase">
        {label}
      </p>
    </li>
  );
}

export function HeroHighlights() {
  return (
    <ul className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
      {highlights.map((highlight) => (
        <Highlight key={highlight.label} {...highlight} />
      ))}
    </ul>
  );
}
