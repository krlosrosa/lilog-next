import { ReturnInfoGeralRavexNotasItem } from "@/_services/api/model";
import NfItem from "../addDemanda/nfItem";

type ListarNfsRavexProps = {
  notas: ReturnInfoGeralRavexNotasItem[];
  idViagemRavex: string;
}
export default function ListarNfsRavex({ notas, idViagemRavex }: ListarNfsRavexProps) {
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