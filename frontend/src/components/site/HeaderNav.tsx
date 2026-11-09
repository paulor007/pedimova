import { LANDING_SECTIONS } from "./landingSections";

export function HeaderNav() {
  return (
    <nav aria-label="Seções da página" className="hidden xl:block">
      <ul className="flex items-center gap-5">
        {LANDING_SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="rounded-control px-1 py-3 text-sm font-medium whitespace-nowrap text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
