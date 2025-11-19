import { CorteMercadoriaGetDto } from "@/_services/api/model";
import { useBuscarTodosOsCortesDeProduto } from "@/_services/api/service/corte-produto/corte-produto";
import { useUser } from "@/_shared/providers/UserContext";
import { useEffect, useState } from "react";
import { groupCortesPorTransporte } from "../../utils/groupCortesPorTransporte";

export const useBuscarCortesPendentesOp = () => {
  const { user } = useUser();
  const [ groupedCortes, setGroupedCortes ] = useState<Record<string, CorteMercadoriaGetDto[]>>({});
  const [ open, setOpen ] = useState(false);

  const { data: cortesPendentesOp, isLoading: isBuscandoCortesPendentesOp } = useBuscarTodosOsCortesDeProduto(user?.centerSelect as string, {
      realizado: false,
      direcao: 'ADMINISTRATIVO',
    },
    {
      query: {
        queryKey: [
          'buscarCortesPendentesOp',
          `/api/corte-produto/buscar-todos-os-cortes-de-produto/${user?.centerSelect}`,
          user?.centerSelect,
        ],
        refetchInterval: 10000,
      },
    },
  );

  useEffect(() => {
    if (cortesPendentesOp) {
      setGroupedCortes(groupCortesPorTransporte(cortesPendentesOp));
    }
  }, [cortesPendentesOp]);

  return {
    cortesPendentesOp,
    isBuscandoCortesPendentesOp,
    groupedCortes,
    open,
    setOpen,
  }
}