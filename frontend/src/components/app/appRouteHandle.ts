import { useMatches } from "react-router";
import type { AppModuleId } from "./appNavigation";

/** Data an internal route declares for the layout through its handle. */
export type AppRouteHandle = {
  /** Screen title, shown in the top bar and the browser tab. */
  title: string;
  /** Module the screen belongs to, when it has one. */
  module?: AppModuleId;
};

function isAppRouteHandle(handle: unknown): handle is AppRouteHandle {
  return (
    typeof handle === "object" &&
    handle !== null &&
    "title" in handle &&
    typeof handle.title === "string"
  );
}

/** Handle of the deepest matched route that declares one. */
export function useAppRouteHandle(): AppRouteHandle | undefined {
  return useMatches()
    .map((match) => match.handle)
    .filter(isAppRouteHandle)
    .at(-1);
}
