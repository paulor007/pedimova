import { Pencil, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { APP_NAVIGATION } from "../components/app/appNavigation";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ExternalLink } from "../components/ui/ExternalLink";
import { IconButton } from "../components/ui/IconButton";
import { StatusBadge } from "../components/ui/StatusBadge";
import { useToast } from "../components/ui/toast/useToast";
import { TextLink } from "../components/ui/TextLink";

import { BRAND, pageTitle } from "../config/brand";
import { ORDER_STATUS } from "../domain/orderStatus";
import { PAYMENT_STATUS } from "../domain/paymentStatus";
import { can } from "../domain/permissions";
import { USER_PROFILE, USER_PROFILES } from "../domain/userProfile";

import { FeedbackSection } from "./design-system/FeedbackSection";
import { FormattedFieldsSection } from "./design-system/FormattedFieldsSection";
import { FormFieldsSection } from "./design-system/FormFieldsSection";

const colorTokens = [
  { name: "canvas", className: "bg-canvas", use: "Fundo da página" },
  { name: "surface", className: "bg-surface", use: "Cartões e painéis" },
  {
    name: "surface-raised",
    className: "bg-surface-raised",
    use: "Elementos elevados e hover",
  },
  { name: "fg", className: "bg-fg", use: "Texto principal" },
  { name: "fg-muted", className: "bg-fg-muted", use: "Texto secundário" },
  { name: "line", className: "bg-line", use: "Divisórias" },
  {
    name: "line-strong",
    className: "bg-line-strong",
    use: "Bordas de campos",
  },
  { name: "accent", className: "bg-accent", use: "Ação principal e foco" },
  { name: "on-accent", className: "bg-on-accent", use: "Texto sobre accent" },
  { name: "success", className: "bg-success", use: "Situação: sucesso" },
  { name: "warning", className: "bg-warning", use: "Situação: atenção" },
  { name: "danger", className: "bg-danger", use: "Situação: perigo" },
  { name: "info", className: "bg-info", use: "Situação: informação" },
];

const typeRoles = [
  {
    role: "Destaque da apresentação",
    classes: "text-4xl font-bold tracking-tight sm:text-6xl",
    sample: "Gestão de pedidos",
  },
  {
    role: "Título de tela",
    classes: "text-2xl font-semibold",
    sample: "Detalhe do pedido #1043",
  },
  {
    role: "Título de seção ou cartão",
    classes: "text-lg font-semibold",
    sample: "Itens do pedido",
  },
  {
    role: "Texto corrido",
    classes: "text-base",
    sample: "O pedido foi criado e o estoque está sendo reservado.",
  },
  {
    role: "Tabelas, formulários e botões",
    classes: "text-sm",
    sample: "Papelaria Ponto Final Ltda · 3 itens",
  },
  {
    role: "Legendas e informações auxiliares",
    classes: "text-xs text-fg-muted",
    sample: "Atualizado às 14:30",
  },
  {
    role: "Rótulo acima de títulos",
    classes: "font-mono text-xs tracking-overline text-accent uppercase",
    sample: "Etapa 2 · Design system",
  },
  {
    role: "Identificadores e dados técnicos",
    classes: "font-mono text-sm",
    sample: "pay_a1d743 · OrderCreated",
  },
];

const orderTotals = [1463.5, 1111.1, 658, 424.8, 222.5];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Status vocabularies shown as badges, straight from the domain. */
const statusGroups = [
  { title: "Pedido", statuses: Object.values(ORDER_STATUS) },
  { title: "Pagamento", statuses: Object.values(PAYMENT_STATUS) },
];

function ColorSection() {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold">Cores</h2>

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {colorTokens.map((token) => (
          <li
            key={token.name}
            className="rounded-card border border-line bg-surface p-4"
          >
            <div
              className={`h-14 rounded-control border border-line ${token.className}`}
            />
            <p className="mt-3 font-mono text-sm">{token.name}</p>
            <p className="text-sm text-fg-muted">{token.use}</p>
          </li>
        ))}
      </ul>

      <Card className="mt-6">
        <h3 className="text-lg font-semibold">Pares de leitura</h3>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span className="rounded-control bg-accent px-3 py-1.5 font-semibold text-on-accent">
            Texto sobre accent
          </span>
          <span className="text-success">Pago</span>
          <span className="text-warning">Aguardando pagamento</span>
          <span className="text-danger">Cancelado</span>
          <span className="text-info">Em separação</span>
        </div>
      </Card>
    </section>
  );
}

function TypographySection() {
  return (
    <section id="tipografia" className="mt-12">
      <h2 className="text-xl font-semibold">Tipografia</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-xs text-fg-muted">Interface · font-sans</p>
          <p className="mt-2 text-3xl">Space Grotesk</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-lg">
            <span className="font-normal">Regular 400</span>
            <span className="font-medium">Medium 500</span>
            <span className="font-semibold">Semibold 600</span>
            <span className="font-bold">Bold 700</span>
          </div>
        </Card>

        <Card>
          <p className="text-xs text-fg-muted">Dados técnicos · font-mono</p>
          <p className="mt-2 font-mono text-3xl">JetBrains Mono</p>
          <p className="mt-3 font-mono text-sm text-fg-muted">
            0123456789 · traceId 4bf92f35
          </p>
        </Card>
      </div>

      <ul className="mt-6 divide-y divide-line rounded-card border border-line bg-surface">
        {typeRoles.map((item) => (
          <li key={item.role} className="p-4 sm:p-6">
            <p className="text-xs text-fg-muted">{item.role}</p>
            <p className={`mt-1 ${item.classes}`}>{item.sample}</p>
            <code className="mt-2 block font-mono text-xs text-fg-muted">
              {item.classes}
            </code>
          </li>
        ))}
      </ul>

      <Card className="mt-6">
        <h3 className="text-lg font-semibold">Números em colunas</h3>
        <div className="mt-4 grid max-w-md grid-cols-2 gap-8">
          <div>
            <p className="text-xs text-fg-muted">Proporcionais (padrão)</p>
            <ul className="mt-2 text-right text-lg">
              {orderTotals.map((total) => (
                <li key={total}>{currencyFormatter.format(total)}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs text-fg-muted">Tabulares</p>
            <ul className="mt-2 text-right text-lg tabular-nums">
              {orderTotals.map((total) => (
                <li key={total}>{currencyFormatter.format(total)}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
}

/** Simulates a two-second save and confirms it with a quick message. */
function LoadingButtonDemo() {
  const toast = useToast();

  const [isSaving, setIsSaving] = useState(false);
  const [saveCount, setSaveCount] = useState(0);

  useEffect(() => {
    if (!isSaving) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsSaving(false);
      toast.success("Cliente salvo.");
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [isSaving, toast]);

  function handleSave() {
    setSaveCount((count) => count + 1);
    setIsSaving(true);
  }

  return (
    <div className="mt-2 flex flex-wrap items-center gap-4">
      <Button loading={isSaving} loadingText="Salvando…" onClick={handleSave}>
        <Save aria-hidden="true" className="size-4" />
        Salvar cliente
      </Button>

      <p className="text-sm text-fg-muted" aria-live="polite">
        Salvamentos registrados: {saveCount}
      </p>
    </div>
  );
}

function ComponentsSection() {
  const [lastClicked, setLastClicked] = useState("nenhum");

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold">Componentes</h2>

      <Card className="mt-4">
        <h3 className="text-lg font-semibold">Botões</h3>

        <div className="mt-4 flex flex-wrap gap-3">
          <Button onClick={() => setLastClicked("primário")}>Primário</Button>

          <Button
            variant="secondary"
            onClick={() => setLastClicked("secundário")}
          >
            Secundário
          </Button>

          <Button variant="danger" onClick={() => setLastClicked("perigo")}>
            Perigo
          </Button>

          <Button variant="ghost" onClick={() => setLastClicked("discreto")}>
            Discreto
          </Button>

          <Button disabled>Desativado</Button>
        </div>

        <p className="mt-3 text-sm text-fg-muted" aria-live="polite">
          Último botão clicado: {lastClicked}
        </p>

        <h4 className="mt-6 text-sm text-fg-muted">Com ícone</h4>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Button>
            <Plus aria-hidden="true" className="size-4" />
            Novo pedido
          </Button>

          <IconButton icon={Pencil} label="Editar cliente" />

          <IconButton icon={Trash2} label="Remover item" tone="danger" />
        </div>

        <h4 className="mt-6 text-sm text-fg-muted">Carregando</h4>

        <LoadingButtonDemo />
      </Card>

      <Card className="mt-6">
        <h3 className="text-lg font-semibold">Etiquetas de situação</h3>
        {statusGroups.map((group) => (
          <div key={group.title} className="mt-4">
            <h4 className="text-sm text-fg-muted">{group.title}</h4>
            <ul className="mt-2 flex flex-wrap gap-2">
              {group.statuses.map((status) => (
                <li key={status.label}>
                  <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Card>

      <Card className="mt-6">
        <h3 className="text-lg font-semibold">Links</h3>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <TextLink to="#tipografia">Voltar para Tipografia</TextLink>
          <ExternalLink href="https://github.com/paulor007/pedimova">
            Código no GitHub
          </ExternalLink>
        </div>
      </Card>
    </section>
  );
}

function InteractionSection() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold">Camadas e interação</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-card border border-line bg-surface p-4">
          <p className="font-mono text-sm">surface</p>
          <p className="text-sm text-fg-muted">Cartões e painéis</p>
        </div>
        <div className="rounded-card border border-line bg-surface-raised p-4">
          <p className="font-mono text-sm">surface-raised</p>
          <p className="text-sm text-fg-muted">Destaque e hover</p>
        </div>
        <div className="rounded-card border border-line bg-surface-raised p-4 shadow-overlay">
          <p className="font-mono text-sm">shadow-overlay</p>
          <p className="text-sm text-fg-muted">Menus, janelas e avisos</p>
        </div>
      </div>

      <Card className="mt-6">
        <h3 className="text-lg font-semibold">Navegação por teclado</h3>
        <p className="mt-1 text-sm text-fg-muted">
          Use Tab e Shift+Tab: cada elemento mostra o contorno de foco.
        </p>

        <div className="mt-4 flex flex-wrap items-end gap-4">
          <TextLink to="#tipografia" className="text-sm">
            Ir para Tipografia
          </TextLink>

          <div>
            <label
              htmlFor="order-search"
              className="block text-xs text-fg-muted"
            >
              Buscar pedido
            </label>
            <input
              id="order-search"
              type="search"
              placeholder="#1043"
              className="mt-1 w-40 rounded-control border border-line-strong bg-canvas px-3 py-2 text-sm placeholder:text-fg-muted"
            />
          </div>

          <Button
            aria-expanded={isOverlayOpen}
            aria-controls="demo-overlay"
            onClick={() => setIsOverlayOpen((isOpen) => !isOpen)}
          >
            {isOverlayOpen ? "Ocultar camada" : "Mostrar camada"}
          </Button>

          <Button variant="secondary" disabled>
            Indisponível
          </Button>
        </div>

        {isOverlayOpen && (
          <div
            id="demo-overlay"
            className="mt-4 rounded-card border border-line bg-surface-raised p-4 shadow-overlay"
          >
            <p className="text-sm">
              Camada flutuante: fica acima do conteúdo e projeta sombra.
            </p>
          </div>
        )}
      </Card>
    </section>
  );
}

function AccessSection() {
  const items = APP_NAVIGATION.flatMap((group) => group.items);

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold">Perfis e permissões</h2>
      <p className="mt-1 text-sm text-fg-muted">
        Itens do menu que cada perfil vê, calculados a partir da matriz de
        permissões.
      </p>

      <Card className="mt-6 overflow-x-auto">
        <table className="w-full min-w-xl text-left text-sm">
          <caption className="sr-only">
            Itens do menu visíveis para cada perfil de acesso
          </caption>

          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-2 pr-4 font-semibold">
                Item do menu
              </th>
              {USER_PROFILES.map((profile) => (
                <th
                  key={profile}
                  scope="col"
                  className="px-3 py-2 font-semibold"
                >
                  {USER_PROFILE[profile].label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item.to}
                className="border-b border-line last:border-b-0"
              >
                <th scope="row" className="py-2 pr-4 font-medium">
                  <span className="flex items-center gap-2">
                    <item.icon
                      aria-hidden="true"
                      className="size-4 text-fg-muted"
                    />
                    {item.label}
                  </span>
                  <span className="font-mono text-xs font-normal text-fg-muted">
                    {item.to}
                  </span>
                </th>
                {USER_PROFILES.map((profile) => (
                  <td key={profile} className="px-3 py-2">
                    {can(profile, item.permission) ? (
                      <StatusBadge tone="success">Vê</StatusBadge>
                    ) : (
                      <StatusBadge tone="neutral">Não vê</StatusBadge>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="mt-6">
        <h3 className="text-lg font-semibold">Responsabilidades</h3>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          {USER_PROFILES.map((profile) => (
            <div key={profile}>
              <dt className="text-sm font-semibold">
                {USER_PROFILE[profile].label}
              </dt>
              <dd className="mt-1 text-sm text-fg-muted">
                {USER_PROFILE[profile].responsibility}
              </dd>
            </div>
          ))}
        </dl>
      </Card>
    </section>
  );
}

export function DesignSystemPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8">
      <title>{pageTitle("Design system")}</title>

      <header className="border-b border-line pb-6">
        <p className="font-mono text-xs tracking-overline text-accent uppercase">
          {BRAND.name}
        </p>

        <h1 className="mt-2 text-3xl font-bold">Design system</h1>
        <p className="mt-2 text-fg-muted">
          Fundamentos visuais da interface: cores, tipografia, componentes e
          interação.
        </p>
      </header>

      <ColorSection />
      <TypographySection />
      <ComponentsSection />
      <FormFieldsSection />
      <FormattedFieldsSection />
      <FeedbackSection />
      <InteractionSection />
      <AccessSection />
    </div>
  );
}
