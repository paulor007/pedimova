import { Menu, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { BRAND } from "../../config/brand";
import { USER_PROFILE } from "../../domain/userProfile";
import type { DemoSession } from "../../session/demoSession";
import { Logo } from "../brand/Logo";
import { AppNavList } from "./AppNavList";
import { DemoBadge } from "./DemoBadge";

/** Width from which the side menu is always visible (Tailwind lg). */
const SIDE_MENU_QUERY = "(min-width: 64rem)";

/**
 * Menu of the internal area on phones and tablets, as a modal panel.
 * The native dialog keeps focus inside while open, closes on Escape and
 * returns focus to the button that opened it.
 */
export function AppMobileNav({ session }: { session: DemoSession }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { pathname } = useLocation();

  function open() {
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  // A route change from outside the menu, such as Back, also closes it.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  // Once the side menu is visible, the panel is no longer needed.
  useEffect(() => {
    const query = window.matchMedia(SIDE_MENU_QUERY);

    function handleChange(event: MediaQueryListEvent) {
      if (event.matches) {
        dialogRef.current?.close();
      }
    }

    query.addEventListener("change", handleChange);

    return () => {
      query.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        aria-controls="menu-movel"
        className="-ml-2 inline-flex size-11 shrink-0 items-center justify-center rounded-control text-fg transition-colors hover:bg-surface-raised lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        id="menu-movel"
        aria-label="Menu"
        // A click on the backdrop reaches the dialog itself.
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            close();
          }
        }}
        className="m-0 h-dvh max-h-none w-80 max-w-[calc(100vw-3rem)] border-r border-line bg-canvas p-0 text-fg backdrop:bg-canvas/70 motion-safe:open:animate-drawer-in"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line pr-3 pl-5">
            <Link
              to="/app"
              onClick={close}
              aria-label={`${BRAND.name}, painel`}
              className="inline-flex min-h-11 items-center rounded-control"
            >
              <Logo />
            </Link>

            <button
              type="button"
              onClick={close}
              aria-label="Fechar menu"
              className="inline-flex size-11 items-center justify-center rounded-control text-fg transition-colors hover:bg-surface-raised"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <nav
            aria-label="Menu principal"
            className="flex-1 overflow-y-auto p-3"
          >
            <AppNavList profile={session.profile} onNavigate={close} />
          </nav>

          <div className="shrink-0 border-t border-line p-5">
            <p className="text-sm font-medium">{session.userName}</p>
            <p className="text-xs text-fg-muted">
              {USER_PROFILE[session.profile].label}
            </p>
            <div className="mt-3">
              <DemoBadge />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
