import {
  CreateUserDtoRole,
  CreateUserDtoTurno,
  ListarUsuariosParams,
} from '@/_services/api/model';
import { convertXlsxToArrayUser } from '../utils/parseUserXlsx';
import { appendFilialToPermissions } from '../utils/appendFilialToPermissions';
import { Dispatch, SetStateAction } from 'react';
import {
  useCriarUsuario,
  useCriarUsuarioEmMassa,
  useDeletarUsuario,
  useAtualizarUsuario,
  useResetarSenha,
  useListarUsuarios,
} from '@/_services/api/service/user/user';

export const useUserOperations = () => {
  // Adicionar novo usuario
  const { mutate: addUser, isPending: isCreating } = useCriarUsuario();
  const { mutate: addUserBatch, isPending: isCreatingUserBatch } =
    useCriarUsuarioEmMassa();
  const { mutate: deleteUser, isPending: isDeleteUser } = useDeletarUsuario();
  const { mutate: editarUser, isPending: isEditarUser } = useAtualizarUsuario();
  const { mutate: resetPassword, isPending: isResetPassword } =
    useResetarSenha();
  // Adicionar Usuarios em massa
  async function addUserBatchFunction(
    centerId: string,
    file: File,
    setOpen: Dispatch<SetStateAction<boolean>>,
  ) {
    const users = await convertXlsxToArrayUser(file);
    const usersAddCenter = users.map((item) => ({
      ...item,
      centerId,
      turno: item.turno as CreateUserDtoTurno,
      role: item.role as CreateUserDtoRole,
      roles: appendFilialToPermissions(centerId, item.roles),
    }));
    addUserBatch(
      { data: usersAddCenter },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  }

  //Buscar Usuarios
  function useBuscarUsuarios(centerId: string, params?: ListarUsuariosParams) {
    return useListarUsuarios(centerId, params, {
      query: { enabled: !!centerId },
    });
  }

  const operations = {
    buscarUsers: useBuscarUsuarios,
    addUser,
    addUserBatchFunction,
    deleteUser,
    editarUser,
    resetPassword,
  };

  return {
    operations,
    isLoading:
      isCreating ||
      isCreatingUserBatch ||
      isDeleteUser ||
      isEditarUser ||
      isResetPassword,
  };
};
