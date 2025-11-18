import {
  criarRole,
  useCriarRole,
  useGetRoles,
} from '@/_services/api/service/user/user';

export const useRoleOperations = () => {
  const { mutate: addRole, isPending: isCreating } = useCriarRole();
  const { data: getAllroles, isLoading } = useGetRoles();

  const operations = {
    buscarRoles: getAllroles,
    addRole: addRole,
  };

  return {
    operations,
    isLoading: isLoading || isCreating,
  };
};
