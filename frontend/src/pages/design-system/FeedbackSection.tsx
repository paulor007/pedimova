import { RotateCw } from "lucide-react";

import { Alert } from "../../components/ui/Alert";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useToast } from "../../components/ui/toast/useToast";

/** Demonstrates persistent banners and quick messages. */
export function FeedbackSection() {
  const toast = useToast();

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold">Avisos e mensagens</h2>

      <p className="mt-1 text-sm text-fg-muted">
        A faixa fica enquanto a situação dura; a mensagem rápida confirma o
        resultado de uma ação.
      </p>

      <Card className="mt-6 grid gap-4">
        <h3 className="text-lg font-semibold">Faixa de aviso</h3>

        <Alert tone="info" title="Ambiente de demonstração">
          Os pedidos desta conta são de exemplo e podem ser alterados à vontade.
        </Alert>

        <Alert
          tone="warning"
          title="Estoque indisponível agora"
          action={
            <Button variant="secondary">
              <RotateCw aria-hidden="true" className="size-4" />
              Tentar de novo
            </Button>
          }
        >
          A coluna Disponível volta a ser atualizada assim que o estoque
          responder. O pedido ainda pode ser confirmado.
        </Alert>

        <Alert tone="danger" title="Não foi possível carregar os pedidos.">
          Confira a conexão e tente de novo. Os filtros escolhidos continuam
          aplicados.
        </Alert>

        <h3 className="mt-4 text-lg font-semibold">Mensagem rápida</h3>

        <div className="flex flex-wrap gap-3">
          <Button onClick={() => toast.success("Pedido cancelado.")}>
            Mostrar sucesso
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              toast.error("Não foi possível cancelar o pedido. Tente de novo.")
            }
          >
            Mostrar erro
          </Button>
        </div>

        <p className="text-sm text-fg-muted">
          A de sucesso fecha sozinha em 5 segundos, e o tempo para enquanto o
          mouse ou o foco estão sobre ela; a de erro fica até ser fechada.
        </p>
      </Card>
    </section>
  );
}
