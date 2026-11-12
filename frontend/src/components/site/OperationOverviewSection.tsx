import { OperationPanelPreview } from "./OperationPanelPreview";
import { ScrollReveal } from "./ScrollReveal";
import { SectionMarker } from "./SectionMarker";
import { SectionTitle } from "./SectionTitle";

export function OperationOverviewSection() {
  return (
    <section
      id="visao-da-operacao"
      aria-labelledby="visao-da-operacao-titulo"
      className="relative py-24 md:py-32"
    >
      <div className="page-container">
        <SectionMarker sectionId="visao-da-operacao" />

        <ScrollReveal className="mb-14 max-w-2xl">
          <SectionTitle
            id="visao-da-operacao-titulo"
            overline="Visão da operação"
            lines={["Cada pedido, visível.", "Cada real, contado."]}
          />

          <p className="mt-4 text-lg text-fg-muted">
            O painel da Pedimova reúne, em uma única visão, os principais
            indicadores da operação: pedidos criados, pagamentos pendentes,
            faturamento e ticket médio (valor médio dos pedidos pagos). O
            histórico de cada pedido e os alertas ajudam a identificar o que
            exige atenção. Os dados da demonstração abaixo são ilustrativos.
          </p>
        </ScrollReveal>

        <ScrollReveal delayMs={120}>
          <OperationPanelPreview />
        </ScrollReveal>
      </div>
    </section>
  );
}
