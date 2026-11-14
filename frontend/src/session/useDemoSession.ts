import { useRouteLoaderData } from "react-router";
import type { DemoSession } from "./demoSession";
import { APP_ROUTE_ID, type appLoader } from "./sessionRoutes";

/** Session of the visitor, for components rendered inside the internal area. */
export function useDemoSession(): DemoSession {
  const loaderData = useRouteLoaderData<typeof appLoader>(APP_ROUTE_ID);

  if (!loaderData) {
    throw new Error("useDemoSession must be used inside the internal area.");
  }

  return loaderData.session;
}
