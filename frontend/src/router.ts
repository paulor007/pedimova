import { createBrowserRouter, redirect, type RouteObject } from "react-router";
import {
  APP_NAVIGATION_ITEM,
  type AppModuleId,
} from "./components/app/appNavigation";
import type { AppRouteHandle } from "./components/app/appRouteHandle";
import { AppLayout } from "./layouts/AppLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { AppErrorPage } from "./pages/app/AppErrorPage";
import { AppNotFoundPage } from "./pages/app/AppNotFoundPage";
import { DashboardPage } from "./pages/app/DashboardPage";
import { UpcomingModulePage } from "./pages/app/UpcomingModulePage";
import { AccessPage } from "./pages/AccessPage";
import { DesignSystemPage } from "./pages/DesignSystemPage";
import { ErrorPage } from "./pages/ErrorPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import {
  APP_ROUTE_ID,
  accessAction,
  accessLoader,
  appLoader,
  logoutAction,
  requirePermission,
} from "./session/sessionRoutes";

// Development-only tools: they never reach the production build.
const developmentRoutes: RouteObject[] = import.meta.env.DEV
  ? [{ path: "design-system", Component: DesignSystemPage }]
  : [];

/**
 * Access check and title of a module screen, both read from its menu item,
 * so the menu and the address bar always agree on who may open it.
 */
function moduleScreen(id: AppModuleId) {
  const item = APP_NAVIGATION_ITEM[id];
  const handle: AppRouteHandle = { title: item.label, module: id };

  return { loader: requirePermission(item.permission), handle };
}

// Loaders here read local data in a moment; nothing needs to show meanwhile.
function renderNothing() {
  return null;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    ErrorBoundary: ErrorPage,
    HydrateFallback: renderNothing,
    children: [
      { index: true, Component: HomePage },
      {
        path: "entrar",
        Component: AccessPage,
        loader: accessLoader,
        action: accessAction,
      },
      ...developmentRoutes,
      { path: "*", Component: NotFoundPage },
    ],
  },
  {
    id: APP_ROUTE_ID,
    path: "/app",
    Component: AppLayout,
    ErrorBoundary: ErrorPage,
    HydrateFallback: renderNothing,
    loader: appLoader,
    children: [
      {
        // Errors of a screen render inside the layout, keeping the menu.
        ErrorBoundary: AppErrorPage,
        children: [
          {
            index: true,
            Component: DashboardPage,
            ...moduleScreen("dashboard"),
          },
          {
            path: "pedidos",
            Component: UpcomingModulePage,
            ...moduleScreen("orders"),
          },
          {
            path: "clientes",
            Component: UpcomingModulePage,
            ...moduleScreen("customers"),
          },
          {
            path: "produtos",
            Component: UpcomingModulePage,
            ...moduleScreen("products"),
          },
          {
            path: "estoque",
            Component: UpcomingModulePage,
            ...moduleScreen("inventory"),
          },
          {
            path: "pagamentos",
            Component: UpcomingModulePage,
            ...moduleScreen("payments"),
          },
          {
            path: "*",
            Component: AppNotFoundPage,
            handle: { title: "Página não encontrada" } satisfies AppRouteHandle,
          },
        ],
      },
    ],
  },
  {
    // Action only: the Sair button posts here. A typed address goes home.
    path: "/sair",
    loader: () => redirect("/"),
    action: logoutAction,
  },
]);
