import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { ButtonLink } from "../ui/ButtonLink";
import { LANDING_SECTIONS } from "./landingSections";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the menu when the user clicks outside or presses Escape.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative xl:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((previous) => !previous)}
        className="inline-flex size-11 items-center justify-center rounded-control border border-line text-fg transition-colors hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {isOpen ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      <nav
        id={panelId}
        aria-label="Menu de navegação"
        hidden={!isOpen}
        className="absolute top-full right-0 z-30 mt-2 max-h-[calc(100dvh-5rem)] w-[calc(100vw-2rem)] max-w-80 overflow-y-auto rounded-card border border-line bg-canvas p-2 shadow-overlay"
      >
        <ul className="grid gap-1">
          {LANDING_SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={closeMenu}
                className="flex min-h-11 items-center rounded-control px-3 text-sm font-medium text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-2 border-t border-line pt-2 sm:hidden">
          <ButtonLink to="/entrar" onClick={closeMenu} className="w-full">
            Acessar Plataforma
          </ButtonLink>
        </div>
      </nav>
    </div>
  );
}
