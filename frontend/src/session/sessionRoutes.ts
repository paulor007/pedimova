import {
  data,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "react-router";
import { can, type Permission } from "../domain/permissions";
import { isUserProfile } from "../domain/userProfile";
import {
  endDemoSession,
  getDemoSession,
  startDemoSession,
  type DemoSession,
} from "./demoSession";

/*
 * Router side of the demo session: loaders read it before a screen renders,
 * actions change it. Screens never touch browser storage directly.
 */

/** Route id of the internal area; its loader data carries the session. */
export const APP_ROUTE_ID = "app";

const APP_HOME = "/app";

/** Query parameter that keeps the address a visitor was trying to open. */
const RETURN_PARAM = "destino";

/**
 * Keeps only addresses inside the internal area, so a crafted link such as
 * /entrar?destino=https://example.com cannot send the visitor off the site.
 */
export function safeReturnPath(value: unknown): string {
  if (typeof value !== "string") {
    return APP_HOME;
  }

  const isInternal =
    value === APP_HOME ||
    value.startsWith(`${APP_HOME}/`) ||
    value.startsWith(`${APP_HOME}?`);

  return isInternal ? value : APP_HOME;
}

/** Session of the visitor, or a redirect to the access page that comes back here. */
function requireSession(request: Request): DemoSession {
  const session = getDemoSession();

  if (session) {
    return session;
  }

  const url = new URL(request.url);
  const params = new URLSearchParams({
    [RETURN_PARAM]: url.pathname + url.search,
  });

  throw redirect(`/entrar?${params}`);
}

export type AppLoaderData = { session: DemoSession };

/** Internal area: every screen below it needs a session. */
export function appLoader({ request }: LoaderFunctionArgs): AppLoaderData {
  return { session: requireSession(request) };
}

/**
 * Loader of a screen that also checks the permission matrix. A profile
 * without the permission gets a 403, shown by the area's error page.
 */
export function requirePermission(permission: Permission) {
  return ({ request }: LoaderFunctionArgs) => {
    const session = requireSession(request);

    if (!can(session.profile, permission)) {
      throw data(null, { status: 403 });
    }

    return null;
  };
}

export type AccessLoaderData = {
  /** Session already open in this browser, if any. */
  session: DemoSession | null;
  /** Internal address to open after entering, when the visitor was sent here. */
  returnPath: string | null;
};

export function accessLoader({
  request,
}: LoaderFunctionArgs): AccessLoaderData {
  const requested = new URL(request.url).searchParams.get(RETURN_PARAM);

  return {
    session: getDemoSession(),
    returnPath: requested === null ? null : safeReturnPath(requested),
  };
}

export type AccessActionData = { error: string };

/** Enters with the profile of the button the visitor pressed. */
export async function accessAction({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const profile = form.get("profile");

  if (!isUserProfile(profile)) {
    return {
      error: "Escolha um dos perfis para entrar.",
    } satisfies AccessActionData;
  }

  try {
    startDemoSession(profile);
  } catch {
    return {
      error:
        "Não foi possível entrar. Verifique se o navegador permite que este site guarde dados e tente de novo.",
    } satisfies AccessActionData;
  }

  return redirect(safeReturnPath(form.get(RETURN_PARAM)));
}

/** Leaves the internal area and returns to the public home page. */
export function logoutAction() {
  endDemoSession();
  return redirect("/");
}
