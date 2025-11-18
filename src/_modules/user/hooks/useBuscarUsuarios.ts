import { useListarUsuarios } from "@/_services/api/service/user/user";
import { useUpdateSearchParam } from "@/_shared/hooks/useUpdateSearchParams";
import { useUser } from "@/_shared/providers/UserContext";
import { useEffect, useState } from "react";

export const useBuscarUsuarios = () => {
  const { user } = useUser();
  const { setValue: setSearch, value: search } = useUpdateSearchParam('search');
  const { setValue: setRole, value: role } = useUpdateSearchParam('role');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { data: listUsers, isLoading: isLoadingUsers } = useListarUsuarios(user?.centerSelect as string, {
      search,
      role: role as 'FUNCIONARIO' | 'USER' | 'ADMIN' | 'MASTER' | null,
  }, {
    query: {
      enabled: !!user?.centerSelect,
      queryKey: ['users', user?.centerSelect],
    },
  });

  return {
    listUsers,
    isLoadingUsers,
    setSearch,
    setRole,
    search,
    role,
    isMounted,
  };
};