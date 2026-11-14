import { useEffect } from "react";
import {
  Outlet,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from "react-router";
import { AppSidebar } from "../components/app/AppSidebar";
import { AppTopBar } from "../components/app/AppTopBar";
import { useAppRouteHandle } from "../components/app/appRouteHandle";
import { SkipLink } from "../components/ui/SkipLink";
import { pageTitle } from "../config/brand";
import { DEMO_SESSION_KEY } from "../session/demoSession";
import type { appLoader } from "../session/sessionRoutes";

/** Shell of the internal area: side menu, top bar and the current screen. */
export function AppLayout() {
  const { session } = useLoaderData<typeof appLoader>();
  const title = useAppRouteHandle()?.title ?? "Painel";
  const { revalidate } = useRevalidator();

  // Entering or leaving in another tab reloads the session here too.
  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === null || event.key === DEMO_SESSION_KEY) {
        void revalidate();
      }
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [revalidate]);

  return (
    <div className="flex min-h-dvh">
      <title>{pageTitle(title)}</title>
      <SkipLink targetId="conteudo" />

      <AppSidebar profile={session.profile} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopBar title={title} session={session} />

        <main
          id="conteudo"
          tabIndex={-1}
          className="page-container flex-1 py-8 outline-none lg:py-10"
        >
          {/*
           * Keyed by profile: when another tab changes the profile, the
           * screen starts over instead of keeping an error or state that
           * belonged to the previous one.
           */}
          <Outlet key={session.profile} />
        </main>
      </div>

      <ScrollRestoration />
    </div>
  );
}
