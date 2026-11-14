import { SearchX } from "lucide-react";
import { ScreenMessage } from "../../components/app/ScreenMessage";
import { ButtonLink } from "../../components/ui/ButtonLink";

/** Address inside the internal area that matches no screen. */
export function AppNotFoundPage() {
  return (
    <ScreenMessage
      icon={SearchX}
      overline="Erro 404"
      title="Não encontramos esta página"
      actions={
        <>
          <ButtonLink to="/app">Ir para o Painel</ButtonLink>
          <ButtonLink to="/app/pedidos" variant="secondary">
            Ver pedidos
          </ButtonLink>
        </>
      }
    >
      <p>
        O endereço pode ter sido digitado errado, ou a página não existe mais.
      </p>
    </ScreenMessage>
  );
}
