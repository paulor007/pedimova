import type { Permission } from "../../domain/permissions";
import type { AppModuleId } from "./appNavigation";

export type AppModuleCapability = {
  /** Permission that grants the capability (permission matrix, RF02). */
  permission: Permission;
  label: string;
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
      },
      { permission: "orders:create", label: "Registrar novos pedidos" },
      {
        permission: "orders:fulfill",
        label: "Iniciar a separação, marcar o envio e confirmar a entrega",
      },
      {
        permission: "orders:cancel-unpaid",
        label: "Cancelar pedidos antes do pagamento, com motivo",
      },
      {
        permission: "orders:cancel-paid",
        label: "Cancelar pedidos já pagos, com estorno automático",
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
      },
      {
        permission: "customers:manage",
        label: "Cadastrar, editar, ativar e desativar clientes",
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
      },
      {
        permission: "products:manage",
        label: "Cadastrar, editar, ativar e desativar produtos",
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
      },
      {
        permission: "inventory:adjust",
        label: "Registrar ajustes de estoque, com motivo",
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
      },
    ],
  },
};
