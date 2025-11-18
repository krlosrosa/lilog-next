'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  ValidationSuccess,
  ValidationFailure,
} from '../../services/validateInputs';
import { ConfiguracaoImpressa } from '../types/configuracaoImpressa';

export interface Group {
  id: string;
  name: string;
  items: string[];
}

interface ShipmentsContextType {
  validationSuccess: ValidationSuccess | null;
  setValidationSuccess: Dispatch<SetStateAction<ValidationSuccess | null>>;
  validationFailure: ValidationFailure | null;
  setValidationFailure: Dispatch<SetStateAction<ValidationFailure | null>>;
  configuracaoImpressa: ConfiguracaoImpressa | null;
  setConfiguracaoImpressa: Dispatch<
    SetStateAction<ConfiguracaoImpressa | null>
  >;
  clientesSegregados: string[];
  setClientesSegregados: Dispatch<SetStateAction<string[]>>;
  grupoClientes: Group[];
  setGrupoClientes: Dispatch<SetStateAction<Group[]>>;
  grupoTransportes: Group[];
  setGrupoTransportes: Dispatch<SetStateAction<Group[]>>;
  grupoRemessas: Group[];
  setGrupoRemessas: Dispatch<SetStateAction<Group[]>>;
  clearValidation: () => void;
  handleSegregedClientes: (clientes: string[]) => void;
}

const ShipmentsContext = createContext<ShipmentsContextType | undefined>(
  undefined,
);

interface ShipmentsProviderProps {
  children: ReactNode;
}

export const ShipmentsProvider = ({ children }: ShipmentsProviderProps) => {
  const [validationSuccess, setValidationSuccess] =
    useState<ValidationSuccess | null>(null);
  const [validationFailure, setValidationFailure] =
    useState<ValidationFailure | null>(null);
  const [configuracaoImpressa, setConfiguracaoImpressa] =
    useState<ConfiguracaoImpressa | null>(null);
  const [clientesSegregados, setClientesSegregados] = useState<string[]>([]);
  const [grupoClientes, setGrupoClientes] = useState<Group[]>([]);
  const [grupoTransportes, setGrupoTransportes] = useState<Group[]>([]);
  const [grupoRemessas, setGrupoRemessas] = useState<Group[]>([]);

  const clearValidation = () => {
    setValidationSuccess(null);
    setValidationFailure(null);
  };

  function handleSegregedClientes(clientes: string[]) {
    let dados: string[] = [];
    if (clientesSegregados) {
      dados = [...clientesSegregados, ...clientes];
    } else {
      dados = [...clientes];
    }
    setClientesSegregados(dados);
  }

  return (
    <ShipmentsContext.Provider
      value={{
        validationSuccess,
        setValidationSuccess,
        validationFailure,
        setValidationFailure,
        configuracaoImpressa,
        setConfiguracaoImpressa,
        clientesSegregados,
        setClientesSegregados,
        grupoClientes,
        setGrupoClientes,
        grupoTransportes,
        setGrupoTransportes,
        grupoRemessas,
        setGrupoRemessas,
        clearValidation,
        handleSegregedClientes,
      }}
    >
      {children}
    </ShipmentsContext.Provider>
  );
};

export const useShipments = () => {
  const context = useContext(ShipmentsContext);
  if (!context) {
    throw new Error(
      'useShipments deve ser usado dentro de um ShipmentsProvider',
    );
  }
  return context;
};
