import { useState } from "react";
import { useCadastrarDemandaFaltaDevolucao } from "@/_services/api/service/devolucao/devolucao";
import { getAxiosErrorMessage } from "@/_shared/utils/axios.error";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export function useCadastrarDemandaFaltaReturn() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { mutateAsync: cadastrarDemandaFaltaMutation, isPending: isCadastrandoDemandaFalta } =
    useCadastrarDemandaFaltaDevolucao();

  const [open, setOpen] = useState(false);

  function handleCadastrarDemandaFalta(demandaId: string) {
    const promise = cadastrarDemandaFaltaMutation({ demandaId });

    promise.then(() => {
      queryClient.invalidateQueries({ queryKey: ["demandas"] });
      queryClient.invalidateQueries({ queryKey: ["demanda", "demandas", id] });
      setOpen(false);
    });

    toast.promise(promise, {
      loading: "Cadastrando demanda de falta...",
      success: () => "Demanda de falta registrada com sucesso.",
      error: (err: unknown) =>
        `${getAxiosErrorMessage(err) || "Erro ao cadastrar demanda de falta. Tente novamente."}`,
    });
  }

  return {
    open,
    setOpen,
    handleCadastrarDemandaFalta,
    isCadastrandoDemandaFalta,
  };
}
