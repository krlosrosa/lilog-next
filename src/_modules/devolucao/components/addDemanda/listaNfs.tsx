import { ReturnInfoGeralRavexNotasItem } from "@/_services/api/model";
import NfItem from "./nfItem";

type ListaNfsProps = {
  notas: ReturnInfoGeralRavexNotasItem[];
  idViagemRavex: string;
}

export default function ListaNfs({ notas, idViagemRavex }: ListaNfsProps) {
  return (
    <div>
      <h1>ListaNfs</h1>
      <div className="flex flex-col gap-2" >
      {notas.map((nota) => (
          <NfItem idViagemRavex={idViagemRavex} key={nota.notaFiscal + nota.notaFiscalParcial} nota={nota} />
        ))}
        </div>
    </div>
  )
}