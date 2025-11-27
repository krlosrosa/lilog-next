import { useState } from "react";
import { usePaletesEmabertoQuery } from "./queries/usePaletesEmaberto";

export const usePaletesEmAberto = () => {
  const [data, setData] = useState<string>('');
  const [processo, setProcesso] = useState<string>('');
  const { paletesEmAberto, isBuscandoPaletesEmAberto } = usePaletesEmabertoQuery(data, processo);

  return {
    data,
    setData,
    processo,
    setProcesso,
    paletesEmAberto,
    isBuscandoPaletesEmAberto,
  }
}