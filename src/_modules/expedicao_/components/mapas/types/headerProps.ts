import { ImpressaoMapaHeader } from "@/_modules/expedicao_/others/types/items";

export interface HeaderSeparacaoProps {
  mapa: ImpressaoMapaHeader;
  tipo?: "CLIENTE" | "TRANSPORTE";
  exibirCliente?: "PRIMEIRO" | "TODOS" | "NENHUM";
  segregados?: string[];
}
