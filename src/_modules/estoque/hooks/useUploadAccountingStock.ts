"use client";

import { useState, useCallback } from "react";

/**
 * Hook para gestão do arquivo contábil (Saldo do Sistema).
 * Quando a API de upload estiver disponível, substituir o estado local
 * pela chamada ao endpoint (ex.: POST /api/estoque/upload-accounting).
 */
export function useUploadAccountingStock() {
  const [file, setFile] = useState<File | null>(null);

  const setAccountingFile = useCallback((newFile: File | null) => {
    setFile(newFile);
  }, []);

  const clearFile = useCallback(() => {
    setFile(null);
  }, []);

  return {
    accountingFile: file,
    setAccountingFile,
    clearFile,
    hasFile: !!file,
  };
}
