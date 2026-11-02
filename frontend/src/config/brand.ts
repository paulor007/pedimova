/**
 * Public brand of the platform. Every place that shows the product name reads
 * it from here; the symbol, colors and typography live in the Logo component
 * and the design tokens. index.html is static and keeps its own copy.
 */
export const BRAND = {
  name: "Pedimova",
  /** The wordmark is split in two: the second part uses the accent color. */
  wordmark: { lead: "Pedi", accent: "mova" },
  /** Short description used in the home page title. */
  descriptor: "Gestão de pedidos e operações",
} as const;

/** Browser tab title for the home page or an internal page. */
export function pageTitle(page?: string) {
  return page
    ? `${page} — ${BRAND.name}`
    : `${BRAND.name} — ${BRAND.descriptor}`;
}
