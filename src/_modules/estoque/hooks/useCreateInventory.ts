"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateInventario,
  getGetInventariosByCenterAndDataQueryKey,
} from "@/_services/api/service/estoque/estoque";
import toast from "react-hot-toast";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import type { InventarioDto } from "@/_services/api/model";
import type { InventoryFormValues } from "../schemas/inventory-form.schema";

const STATUS_CRIADO = "CRIADO";

function formValuesToInventarioDto(values: InventoryFormValues): Omit<InventarioDto, "id"> & { id: number } {
  return {
    id: 0,
    centerId: "", // preenchido no hook com centerId do contexto
    descricao: values.nome || null,
    tipo: values.tipoFiltro,
    status: STATUS_CRIADO,
  };
}

export function useCreateInventory(centerId: string | null) {
  const queryClient = useQueryClient();
  const { mutateAsync: createInventario, isPending: isCreating } = useCreateInventario({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetInventariosByCenterAndDataQueryKey(),
        });
      },
    },
  });

  async function handleCreateInventory(values: InventoryFormValues) {
    if (!centerId) {
      toast.error("Selecione um centro antes de criar o inventário.");
      return Promise.reject(new Error("centerId obrigatório"));
    }
    const dto = formValuesToInventarioDto(values) as InventarioDto;
    const promise = createInventario({ centerId, data: dto });
    toast.promise(promise, {
      loading: "Criando ordem de inventário...",
      success: "Ordem de inventário criada com sucesso!",
      error: (err: unknown) =>
        `${getAxiosErrorMessage(err) || "Erro ao criar inventário. Tente novamente."}`,
    });
    return promise;
  }

  return {
    handleCreateInventory,
    isCreating,
  };
}
