import { create } from "zustand";

export type Group = {
  id: string;
  name: string;
  items: string[];
};

export type GroupType = "clientes" | "transportes" | "remessas";

type GroupsState = {
  grupoClientes: Group[];
  grupoTransportes: Group[];
  grupoRemessas: Group[];
  _getStateByType: (
    tipo: GroupType
  ) => readonly [Group[], keyof Pick<
    GroupsState,
    "grupoClientes" | "grupoTransportes" | "grupoRemessas"
  >]
  clientesSegregados: string[];
  handleSegregedClientes: (clientes: string[]) => void;
  setClientesSegregados: (clientes: string[]) => void;
  addGroup: (tipo: GroupType) => void;
  removeGroup: (tipo: GroupType, id: string) => void;
  updateGroupName: (tipo: GroupType, id: string, name: string) => void;
  addItem: (tipo: GroupType, groupId: string, item: string) => void;
  removeItem: (tipo: GroupType, groupId: string, itemIndex: number) => void;
};

export const useAgrupamentoStore = create<GroupsState>((set, get) => ({
  clientesSegregados: [],
  setClientesSegregados: (clientes) => set({ clientesSegregados: clientes }),
  // estado inicial
  grupoClientes: [],
  grupoTransportes: [],
  grupoRemessas: [],

  // helper para acessar o tipo correto
  _getStateByType: (tipo: GroupType) => {
    const state = get();
    const map = {
      clientes: ["grupoClientes"] as const,
      transportes: ["grupoTransportes"] as const,
      remessas: ["grupoRemessas"] as const,
    } as const;

    const key = map[tipo][0];
    return [state[key], key] as const;
  },

  // Adicionar grupo
  addGroup: (tipo) => {
    const state = get();
    const [groups, key] = state._getStateByType(tipo);

    set({
      [key]: [
        ...groups,
        { id: Date.now().toString(), name: "", items: [] },
      ],
    } as any);
  },

  // Remover grupo
  removeGroup: (tipo, id) => {
    const state = get();
    const [groups, key] = state._getStateByType(tipo);

    set({
      [key]: groups.filter((g) => g.id !== id),
    } as any);
  },

  // Atualizar nome do grupo
  updateGroupName: (tipo, id, name) => {
    const state = get();
    const [groups, key] = state._getStateByType(tipo);

    set({
      [key]: groups.map((g) => (g.id === id ? { ...g, name } : g)),
    } as any);
  },

  // Adicionar item ao grupo
  addItem: (tipo, groupId, item) => {
    const state = get();
    const [groups, key] = state._getStateByType(tipo);

    set({
      [key]: groups.map((g) =>
        g.id === groupId
          ? { ...g, items: [...g.items, item] }
          : g
      ),
    } as any);
  },

  // Remover item do grupo
  removeItem: (tipo, groupId, itemIndex) => {
    const state = get();
    const [groups, key] = state._getStateByType(tipo);

    set({
      [key]: groups.map((g) =>
        g.id === groupId
          ? { ...g, items: g.items.filter((_, i) => i !== itemIndex) }
          : g
      ),
    } as any);
  },
  handleSegregedClientes: (clientes) => {
    const { clientesSegregados } = get();
    let dados: string[] = [];
    if (clientesSegregados && clientesSegregados.length > 0) {
      dados = [...clientesSegregados, ...clientes];
    } else {
      dados = [...clientes];
    }
    set({ clientesSegregados: dados });
  },
}));
