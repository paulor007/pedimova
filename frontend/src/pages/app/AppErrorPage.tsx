import { ShieldAlert, TriangleAlert } from "lucide-react";
import { isRouteErrorResponse, useRouteError } from "react-router";
import { useAppRouteHandle } from "../../components/app/appRouteHandle";
import { ScreenMessage } from "../../components/app/ScreenMessage";
import { Button } from "../../components/ui/Button";
import { ButtonLink } from "../../components/ui/ButtonLink";
import { TextLink } from "../../components/ui/TextLink";
import { USER_PROFILE } from "../../domain/userProfile";
import { useDemoSession } from "../../session/useDemoSession";
import { AppNotFoundPage } from "./AppNotFoundPage";

/** Short reference the visitor can report, without exposing internals. */
function errorCode(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    return `HTTP ${error.status}`;
  }

  return error instanceof Error ? error.name : "UnknownError";
}

/**
 * Error page of the internal screens. It renders inside the layout, so the
 * menu and the top bar stay available.
 */
export function AppErrorPage() {
  const error = useRouteError();
  const session = useDemoSession();
  const screen = useAppRouteHandle()?.title;

  if (isRouteErrorResponse(error) && error.status === 403) {
    return (
      <ScreenMessage
        icon={ShieldAlert}
        overline="Acesso negado"
        title="Seu perfil não tem acesso a esta área"
        actions={
          <>
            <ButtonLink to="/app">Ir para o Painel</ButtonLink>
            <TextLink to="/entrar">Entrar com outro perfil</TextLink>
          </>
        }
      >
        <p>
          O perfil {USER_PROFILE[session.profile].label} não inclui{" "}
          {screen ?? "esta área"}. As áreas do seu perfil estão no menu.
        </p>
      </ScreenMessage>
    );
  }

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <AppNotFoundPage />;
  }

  return (
    <ScreenMessage
      icon={TriangleAlert}
      overline="Erro inesperado"
      title="Algo deu errado nesta tela"
      actions={
        <>
          <Button onClick={() => window.location.reload()}>
            Recarregar a página
          </Button>
          <ButtonLink to="/app" variant="secondary">
            Voltar ao Painel
          </ButtonLink>
        </>
      }
    >
      <p>
        Recarregue para tentar de novo. Se o problema continuar, volte ao
        Painel.
      </p>
      <p className="mt-3 font-mono text-xs">
        Código para referência: {errorCode(error)}
      </p>
    </ScreenMessage>
  );
}
