import { ValidarInputs } from "@/_modules/expedicao/services/validateInputs";
import { FilesState } from "../others/services/validation/validateInputs";
import { useShipmentStore } from "../others/stores/shipment.store";
import { useState } from "react";

export function useUpload(setValueTab: (value: string) => void) {

  const [isLoading, setIsLoading] = useState(false);
  const [itensUpload, setItensUpload] = useState<FilesState>({
    shipments: null,
    products: null,
    routes: null,
  });

  const { setValidationFailure, setValidationSuccess } = useShipmentStore();

  const handleValidateInputs = async () => {
    setIsLoading(true);
    const resultado = await ValidarInputs(itensUpload);
    if (resultado.error) {
      setValidationFailure(resultado);
      setValidationSuccess(null);
    } else {
      setValidationFailure(null);
      setValidationSuccess(resultado);
      setValueTab('validarTransporte');
    }
    setIsLoading(false);
  }
  return {
    handleValidateInputs,
    setItensUpload,
    itensUpload,
    isLoading,
  }
}

