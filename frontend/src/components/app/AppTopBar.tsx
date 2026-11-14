import { LogOut } from "lucide-react";
import { Form } from "react-router";
import { USER_PROFILE } from "../../domain/userProfile";
import type { DemoSession } from "../../session/demoSession";
import { Button } from "../ui/Button";
import { AppMobileNav } from "./AppMobileNav";
import { DemoBadge } from "./DemoBadge";

type AppTopBarProps = {
  title: string;
  session: DemoSession;
};

/** Top bar of the internal area: screen title, who is signed in and Sair. */
export function AppTopBar({ title, session }: AppTopBarProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-canvas">
      <div className="page-container flex h-16 items-center gap-3">
        <AppMobileNav session={session} />

        <h1 className="min-w-0 truncate text-base font-semibold sm:text-lg">
          {title}
        </h1>

        <div className="ml-auto flex shrink-0 items-center gap-4">
          <div className="hidden sm:block">
            <DemoBadge />
          </div>

          <p className="hidden text-right leading-tight md:block">
            <span className="block text-sm font-medium">
              {session.userName}
            </span>
            <span className="block text-xs text-fg-muted">
              {USER_PROFILE[session.profile].label}
            </span>
          </p>

          <Form method="post" action="/sair">
            <Button type="submit" variant="secondary">
              <LogOut aria-hidden="true" className="size-4" />
              Sair
            </Button>
          </Form>
        </div>
      </div>
    </header>
  );
}
