import { AddDemandaDto } from "@/_services/api/model";
import { useAddDemandaDevolucao } from "@/_services/api/service/devolucao/devolucao";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useAddDemanda() {
  const queryClient = useQueryClient();
  const { mutateAsync: criarDemandaMutation, isPending: isCriandoDemanda } = useAddDemandaDevolucao({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['demandas'] });
      },
    },
  });

  return {
    criarDemandaMutation,
    isCriandoDemanda,
  }
}