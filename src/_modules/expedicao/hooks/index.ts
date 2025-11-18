'use client';
import { useState } from 'react';
import {
  FilesState,
  ValidarInputs,
  ValidationFailure,
  ValidationSuccess,
} from '../services/validateInputs';
import { useShipments } from '../others/providers/shipments.provider';

export function useExpedicao({
  setValueTab,
}: {
  setValueTab: (value: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { setValidationFailure, setValidationSuccess } = useShipments();

  const handleValidateInputs = async (input: FilesState) => {
    setIsLoading(true);
    const resultado = await ValidarInputs(input);
    if (resultado.error) {
      setValidationSuccess(null);
      setValidationFailure(resultado);
    } else {
      setValidationFailure(null);
      setValidationSuccess(resultado);
      setValueTab('validarTransporte');
    }
    setIsLoading(false);
  };
  return {
    isLoading,
    handleValidateInputs,
  };
}
