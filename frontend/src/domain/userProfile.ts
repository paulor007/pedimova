/** Access profiles of the platform, as defined in the functional specification. */
export type UserProfile = "ADMIN" | "ATTENDANT" | "STOCK_CLERK" | "FINANCE";

/** Screen label and main responsibility of each access profile. */
export const USER_PROFILE: Record<
  UserProfile,
  { label: string; responsibility: string }
> = {
  ADMIN: {
    label: "Administrador",
    responsibility: "Acompanha e executa todas as atividades da operação.",
  },
  ATTENDANT: {
    label: "Atendente",
    responsibility:
      "Cadastra clientes, cria pedidos e acompanha o andamento de cada um.",
  },
  STOCK_CLERK: {
    label: "Estoquista",
    responsibility:
      "Ajusta o estoque, separa os itens, envia e confirma a entrega.",
  },
  FINANCE: {
    label: "Financeiro",
    responsibility:
      "Acompanha os pagamentos e cancela pedidos já pagos, com estorno.",
  },
};

/** Profile codes in display order. */
export const USER_PROFILES = Object.keys(USER_PROFILE) as UserProfile[];
