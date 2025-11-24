import { Button } from "@/_shared/_components/ui/button";
import { TableErrorExpedicao } from "../components/upload/tableError";
import { TitleUpload } from "../components/upload/title";
import { UploadFiles } from "../components/upload/uploadFiles";
import { useShipmentStore } from "../others/stores/shipment.store";
import { useUpload } from "../hooks/useUpload";
import { Loader2, Upload } from "lucide-react";
import { ProdNaoEncontrado } from "../components/upload/produtoNaoEncontrado";
import { TitleTabs } from "../components/title";
import { ErroDivergenciaConversao } from "../components/upload/erroDivergenciaConversao";

type UploadTabProps = {
  setValueTab: (value: string) => void;
}

export function UploadTab({ setValueTab }: UploadTabProps) {
  const { handleValidateInputs, setItensUpload, itensUpload, isLoading } = useUpload(setValueTab)
  const { validationFailure, validationSuccess } = useShipmentStore()
  return (
    <div className="space-y-4">
      <TitleTabs
        title="Upload de Arquivos e Validação"
        description="Upload os arquivos de transporte e validação."
        icon={<Upload className="h-4 w-4" />}      
      />
      <UploadFiles itensUpload={itensUpload} setItensUpload={setItensUpload} />
      <div className="flex justify-end my-4">
        <Button disabled={isLoading || itensUpload.shipments === null || itensUpload.products === null} onClick={handleValidateInputs}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Processar Arquivos'}
        </Button>
      </div>
      {validationFailure && validationFailure.errors.length > 0 && <TableErrorExpedicao errors={validationFailure?.errors} />}
      {validationFailure?.produtosNaoEncontrados
        && validationFailure.produtosNaoEncontrados.length > 0
        && <ProdNaoEncontrado produto={validationFailure.produtosNaoEncontrados} />}
      {validationFailure?.divergenciaConversao
        && validationFailure.divergenciaConversao.length > 0
        &&
        <div className=" mt-4">
          <h2 className="text-lg font-semibold">Divergências de Conversão</h2>
          <div className="space-y-2">
            {validationFailure.divergenciaConversao.map((divergencia) => (
              <ErroDivergenciaConversao key={divergencia.codItem} item={divergencia} />
            ))}
          </div>
        </div>
      }
    </div>
  )
}