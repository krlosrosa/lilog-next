import { useState, useCallback } from "react";

export type Group = {
  id: string;
  name: string;
  items: string[];
};

export type GroupType = "clientes" | "transportes" | "remessas";

export function useGroups() {
  const [grupoClientes, setGrupoClientes] = useState<Group[]>([]);
  const [grupoTransportes, setGrupoTransportes] = useState<Group[]>([]);
  const [grupoRemessas, setGrupoRemessas] = useState<Group[]>([]);

  // Mapa fixo para acessar cada grupo
  const groupsMap = {
    clientes: [grupoClientes, setGrupoClientes],
    transportes: [grupoTransportes, setGrupoTransportes],
    remessas: [grupoRemessas, setGrupoRemessas],
  } as const;

  const getState = useCallback(
    (tipo: GroupType) => groupsMap[tipo],
    [grupoClientes, grupoTransportes, grupoRemessas]
  );

  const addGroup = useCallback((tipo: GroupType) => {
    const [groups, setGroups] = getState(tipo);
    setGroups([
      ...groups,
      { id: Date.now().toString(), name: "", items: [] },
    ]);
  }, [getState]);

  const removeGroup = useCallback((tipo: GroupType, id: string) => {
    const [groups, setGroups] = getState(tipo);
    setGroups(groups.filter((g) => g.id !== id));
  }, [getState]);

  const updateGroupName = useCallback(
    (tipo: GroupType, id: string, name: string) => {
      const [groups, setGroups] = getState(tipo);
      setGroups(groups.map((g) => (g.id === id ? { ...g, name } : g)));
    },
    [getState]
  );

  const addItem = useCallback(
    (tipo: GroupType, groupId: string, item: string) => {
      const [groups, setGroups] = getState(tipo);
      setGroups(
        groups.map((g) =>
          g.id === groupId ? { ...g, items: [...g.items, item] } : g
        )
      );
    },
    [getState]
  );

  const removeItem = useCallback(
    (tipo: GroupType, groupId: string, itemIndex: number) => {
      const [groups, setGroups] = getState(tipo);
      setGroups(
        groups.map((g) =>
          g.id === groupId
            ? { ...g, items: g.items.filter((_, i) => i !== itemIndex) }
            : g
        )
      );
    },
    [getState]
  );

  return {
    // estados
    grupoClientes,
    grupoTransportes,
    grupoRemessas,

    // ações
    addGroup,
    removeGroup,
    updateGroupName,
    addItem,
    removeItem,
  };
}
