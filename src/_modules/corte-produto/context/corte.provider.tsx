'use client';

import { AugmentedZodDto } from "@/_services/api/model";
import { Dispatch, SetStateAction, useState, createContext, useContext, ReactNode } from "react";

interface CorteContextType {
  selectedProdutos: AugmentedZodDto[];
  motivoCorte: string;
  setMotivoCorte: Dispatch<SetStateAction<string>>;
  setSelectedProdutos: Dispatch<SetStateAction<AugmentedZodDto[]>>;
  handleInserirItemCorte: (item: AugmentedZodDto) => void;
}

const CorteContext = createContext<CorteContextType | undefined>(undefined);

export function useCorteContext() {
  const context = useContext(CorteContext);
  if (context === undefined) {
    throw new Error('useCorteContext deve ser usado dentro de um CorteProvider');
  }
  return context;
}

export default function CorteProvider({ children }: { children: ReactNode }) {
  const [selectedProdutos, setSelectedProdutos] = useState<AugmentedZodDto[]>([]);
  const [motivoCorte, setMotivoCorte] = useState<string>('');

  const handleInserirItemCorte = (item: AugmentedZodDto) => {
    setSelectedProdutos((prev) => [...prev, item]);
  };

  return (
    <CorteContext.Provider value={{ selectedProdutos, setSelectedProdutos, handleInserirItemCorte, motivoCorte, setMotivoCorte }}>
      {children}
    </CorteContext.Provider>
  );
}

export function useCorte() {
  const context = useContext(CorteContext);
  if (context === undefined) {
    throw new Error('useCorte deve ser usado dentro de um CorteProvider');
  }
  return context;
}
