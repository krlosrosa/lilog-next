'use client';
import { useParams, useSearchParams } from "next/navigation";
import FormAddDemanda from "../components/addDemanda/form-add-demanda";
import ListarDemandas from "../components/listarDemandas";
import { useDevolucao } from "../hooks/usedevolucao";
import { useEffect } from "react";

export default function DemandaDevolucao() {
  return (
    <div>
      <ListarDemandas/>
      <FormAddDemanda/>
    </div>
  )
}