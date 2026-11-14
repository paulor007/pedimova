import { can, type Permission } from "../../domain/permissions";
import type { UserProfile } from "../../domain/userProfile";
import type { AppModuleId } from "./appNavigation";

export type AppModuleCapability = {
  /** Permission that grants the capability (permission matrix, RF02). */
  permission: Permission;
  label: string;
  shortLabel: string;
};

export type AppModule = {
  /** What the screen gathers, in one sentence. */
  summary: string;
  /** What a profile can do there; each screen shows only the granted ones. */
  capabilities: readonly AppModuleCapability[];
};

/**
 * Planned content of each module, from the functional specification
 * (requirements in the comments). Screens that are not built yet show it.
 */
export const APP_MODULES: Record<AppModuleId, AppModule> = {
  // RF26
  dashboard: {
    summary:
      "Indicadores do período, pedidos por situação, o que precisa de atenção hoje e os últimos pedidos.",
    capabilities: [
      {
        permission: "dashboard:view",
        label: "Acompanhar os indicadores e o que precisa de atenção",
        shortLabel: "ver",
      },
    ],
  },
  // RF12-RF16
  orders: {
    summary:
      "Pedidos com busca por número, filtros por situação, período e cliente, e o detalhe de cada um com a linha do tempo.",
    capabilities: [
      {
        permission: "orders:view",
        label: "Consultar os pedidos e o histórico de cada um",
        shortLabel: "ver",
      },
      {
        permission: "orders:create",
        label: "Registrar novos pedidos",
        shortLabel: "criar",
      },
      {
        permission: "orders:fulfill",
        label: "Iniciar a separação, marcar o envio e confirmar a entrega",
        shortLabel: "expedir",
      },
      {
        permission: "orders:cancel-unpaid",
        label: "Cancelar pedidos antes do pagamento, com motivo",
        shortLabel: "cancelar antes do pagamento",
      },
      {
        permission: "orders:cancel-paid",
        label: "Cancelar pedidos já pagos, com estorno automático",
        shortLabel: "cancelar pedidos pagos",
      },
    ],
  },
  // RF03-RF05
  customers: {
    summary:
      "Clientes pessoa física e jurídica, com busca por nome ou documento e o histórico de pedidos de cada um.",
    capabilities: [
      {
        permission: "customers:view",
        label: "Consultar clientes e o histórico de pedidos",
        shortLabel: "ver",
      },
      {
        permission: "customers:manage",
        label: "Cadastrar, editar, ativar e desativar clientes",
        shortLabel: "cadastrar e editar",
      },
    ],
  },
  // RF06, RF07
  products: {
    summary:
      "Catálogo com SKU, categoria, preço e estoque mínimo, com busca e filtros por categoria e situação.",
    capabilities: [
      {
        permission: "products:view",
        label: "Consultar o catálogo de produtos",
        shortLabel: "ver",
      },
      {
        permission: "products:manage",
        label: "Cadastrar, editar, ativar e desativar produtos",
        shortLabel: "cadastrar e editar",
      },
    ],
  },
  // RF08-RF11
  inventory: {
    summary:
      "Saldo físico, reservado e disponível de cada produto, alertas de estoque mínimo e o histórico de movimentações.",
    capabilities: [
      {
        permission: "inventory:view",
        label: "Consultar saldos e movimentações",
        shortLabel: "ver",
      },
      {
        permission: "inventory:adjust",
        label: "Registrar ajustes de estoque, com motivo",
        shortLabel: "ajustar",
      },
    ],
  },
  // RF18-RF23
  payments: {
    summary:
      "Cobranças por PIX e cartão de cada pedido, com a situação, o histórico de cada cobrança e os estornos.",
    capabilities: [
      {
        permission: "payments:view",
        label: "Acompanhar cobranças, pagamentos e estornos",
        shortLabel: "ver",
      },
    ],
  },
};
const accessList = new Intl.ListFormat("pt-BR", {
  type: "conjunction",
});

export function describeModuleAccess(
  profile: UserProfile,
  moduleId: AppModuleId,
): string {
  const { capabilities } = APP_MODULES[moduleId];

  const granted = capabilities.filter((capability) =>
    can(profile, capability.permission),
  );

  if (granted.length === 0) {
    return "Sem acesso";
  }

  if (capabilities.length > 1 && granted.length === capabilities.length) {
    return "Tudo";
  }

  const summary = accessList.format(
    granted.map((capability) => capability.shortLabel),
  );

  return summary.charAt(0).toUpperCase() + summary.slice(1);
}
