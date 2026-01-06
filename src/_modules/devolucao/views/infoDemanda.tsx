'use client';
import { useParams } from "next/navigation";
import { useDevolucao } from "../hooks/usedevolucao";
import { useEffect } from "react";
import InfoDemandaHeader from "../components/infoDemandaHeader";
import { Button } from "@/_shared/_components/ui/button";
import Link from "next/link";
import { DataTableNfsCadastradas } from "../components/nfsCadatradas/data-table-Nf-cadastradas";
import useGetNfCadastradas from "../hooks/queries/getNfCadastradas";
import { columnsNfsCadatradas } from "../components/nfsCadatradas/columnsNfsCadatradas";

export default function InfoDemanda() {
  const { id } = useParams();
  const { setDemandaId, demanda } = useDevolucao();
  const { data: nfCadastradas, isLoading: isLoadingNfCadastradas } = useGetNfCadastradas(id as string);
  useEffect(() => {
    setDemandaId(id as string);
  }, [id]);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Info Demanda</h1>
        <Button>
          <Link href={`/devolucao/demanda/${id}/adicionar`}>
            Adicionar Nota Fiscal
          </Link>
        </Button>
      </div>
      <div className="space-y-4">

      <InfoDemandaHeader demanda={demanda} />
      <DataTableNfsCadastradas columns={columnsNfsCadatradas} data={nfCadastradas ?? []} />
      </div>
    </div>
  )
}