import type {
  GetAvariaDto,
  ResultadoDemandaDto,
  ResultadoDemandaDtoItensItem,
} from "@/_services/api/model";

export type AnomalyTableItem = {
  id: string;
  codigo: string;
  descricao: string;
  tipoAnomalia: string;
  quantidade: string;
  photos: { id: string; url: string; description: string }[];
};

export type ConferenceTableItem = {
  id: string;
  codigo: string;
  descricao: string;
  caixasConferida: number;
  caixasContabil: number;
  unidadesConferida: number;
  unidadesContabil: number;
};

type TimelineStep = {
  id: string;
  label: string;
  date: string | null;
  completed: boolean;
};

type TransporteInfo = {
  placa: string;
  transportadora: string;
  motorista: string;
  viagemId: string;
  transporte: string;
};

type ConferenciaInfo = {
  cargaSegregada: boolean;
  doca: string;
  tempBau: string;
  tempProduto: string;
};

type ResponsaveisInfo = {
  cadastradoPor: string;
  conferidoPor: string;
};

export type InfoCardsData = {
  transporte: TransporteInfo;
  conferencia: ConferenciaInfo;
  responsaveis: ResponsaveisInfo;
};

function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function mapResultadoToInfoCards(data: ResultadoDemandaDto): InfoCardsData {
  return {
    transporte: {
      placa: data.placa ?? "—",
      transportadora: data.transportadora ?? "—",
      motorista: data.motorista ?? "—",
      viagemId: String(data.demandaId),
      transporte: data.transporte ?? "—",
    },
    conferencia: {
      cargaSegregada: !data.FechouComAnomalia,
      doca: data.doca ?? "—",
      tempBau: String(data.temperaturaBau ?? "—"),
      tempProduto: String(data.temperaturaProduto ?? "—"),
    },
    responsaveis: {
      cadastradoPor: data.criadoPor ?? "—",
      conferidoPor: data.conferente ?? "—",
    },
  };
}

export function mapResultadoToTimelineSteps(data: ResultadoDemandaDto): TimelineStep[] {
  const steps = [
    { id: "cadastrado", label: "Cadastrado", date: data.criadoEm },
    { id: "iniciou_conferencia", label: "Início da Conferência", date: data.InicioConferenciaEm },
    { id: "terminou_conferencia", label: "Fim da Conferência", date: data.FimConferenciaEm },
    { id: "finalizado", label: "Finalizado", date: data.FinalizadoEm },
  ] as const;

  return steps.map((step) => ({
    id: step.id,
    label: step.label,
    date: formatDate(step.date),
    completed: Boolean(step.date),
  }));
}

export function mapResultadoItensToConferenceTable(
  itens: ResultadoDemandaDtoItensItem[]
): ConferenceTableItem[] {
  return itens.map((item, index) => ({
    id: `${item.sku}-${index}`,
    codigo: item.sku ?? "—",
    descricao: item.descricao ?? "—",
    caixasConferida: item.quantidadeCaixasFisico ?? 0,
    caixasContabil: item.quantidadeCaixasContabil ?? 0,
    unidadesConferida: item.quantidadeUnidadesFisico ?? 0,
    unidadesContabil: item.quantidadeUnidadesContabil ?? 0,
  }));
}

export function mapAvariasToAnomalies(avarias: GetAvariaDto[] | undefined): AnomalyTableItem[] {
  if (!avarias?.length) return [];
  return avarias.map((avaria) => ({
    id: String(avaria.id),
    codigo: avaria.sku ?? "—",
    descricao: avaria.descricao ?? "—",
    tipoAnomalia: avaria.avaria ?? "—",
    quantidade: `${avaria.quantidadeCaixas} cx | ${avaria.quantidadeUnidades} un`,
    photos: (avaria.urls ?? []).map((url, i) => ({
      id: `${avaria.id}-${i}`,
      url,
      description: `Foto ${i + 1}`,
    })),
  }));
}
