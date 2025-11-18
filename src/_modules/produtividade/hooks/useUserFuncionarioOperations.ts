import {
  CreateUserDto,
  CreateUserDtoTurno,
  ListarUsuariosParams,
} from '@/_services/api/model';
import { Dispatch, SetStateAction } from 'react';
import { convertXlsxToArrayUser } from '@/_modules/user/utils/parseUserXlsx';
import {
  useAtualizarUsuario,
  useCriarUsuario,
  useCriarUsuarioEmMassa,
  useDeletarUsuario,
  useListarUsuarios,
} from '@/_services/api/service/user/user';

export const useUserFuncionarioOperations = () => {
  const { mutate: addUserBatch, isPending: isCreatingUserBatch } =
    useCriarUsuarioEmMassa();
  const { mutate: deleteFuncionario, isPending: isDeleteUser } =
    useDeletarUsuario();
  const { mutate: editarFuncionario, isPending: isEditarUser } =
    useAtualizarUsuario();

  //Buscar Usuarios
  function useBuscarUsuarios(centerId: string, params?: ListarUsuariosParams) {
    return useListarUsuarios(centerId, params, {
      query: {
        queryKey: ['funcionarios',`/api/user/userid/${centerId}`],
        enabled: !!centerId,
      },
    });
  }

  // Adicionar Usuarios em massa
  async function addUserBatchFunction(
    centerId: string,
    file: File,
    setOpen: Dispatch<SetStateAction<boolean>>,
  ) {
    const users = await convertXlsxToArrayUser(file);
    const usersAddCenter: CreateUserDto[] = users.map((item) => ({
      centerId: centerId,
      empresa: item.empresa,
      id: item.id,
      name: item.name,
      role: 'FUNCIONARIO',
      processo: item.processo,
      turno: item.turno as CreateUserDtoTurno,
    }));

    addUserBatch(
      {
        data: usersAddCenter,
      },
      {
        onSuccess: () => setOpen(false),
      },
    );
  }

  const operations = {
    buscarUsers: useBuscarUsuarios,
    addUserBatchFunction,
    deleteFuncionario,
    editarFuncionario,
  };

  return {
    operations,
    isLoading: isCreatingUserBatch || isDeleteUser || isEditarUser
  };
};
