import { useState } from "react";
import useTrocarDataExpedicaoService from "./mutatation/trocarDataExpedicao";

type UserTrocarDataExpedicaoProps = {
  dataExpedicao: string;
  selectedTransportes: string[];
}

export default function useUserTrocarDataExpedicao(props: UserTrocarDataExpedicaoProps) {
  const { trocarDataExpedicaoMutation, isPending } = useTrocarDataExpedicaoService()

  function trocarDataExpedicao() {
    trocarDataExpedicaoMutation(props.dataExpedicao, props.selectedTransportes)
  }

  return {
    trocarDataExpedicao,
    isPending,
  }
}