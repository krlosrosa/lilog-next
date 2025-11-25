// src/modules/expedicao/services/buildTransportes.ts

import { CreateTransporteDto } from "@/_services/api/model";
import { ValidationSuccess } from "./validation/validateInputs";

interface BuildTransportesParams {
  transportesFaltantes: string[];
  validationSuccess: ValidationSuccess | null;
  selectedDate: Date;
  user: string
}

export function buildTransportes({
  transportesFaltantes,
  validationSuccess,
  selectedDate,
  user,
}: BuildTransportesParams): CreateTransporteDto[] {
  const arrayInput: CreateTransporteDto[] = [];

  for (const transporte of transportesFaltantes) {
    const findRoute = validationSuccess?.data.routes.find(
      (route) => route.transportId === transporte,
    );

    const findShipment = validationSuccess?.data.shipments.find(
      (shipment) => shipment.transportId === transporte,
    );

    arrayInput.push({
      numeroTransporte:
        findRoute?.transportId || findShipment?.transportId || "",
      status: "AGUARDANDO_SEPARACAO",
      nomeRota: findRoute?.rota || "",
      nomeTransportadora: findRoute?.transportadora || "",
      placa: findRoute?.placa || findShipment?.placa || "",
      dataExpedicao: selectedDate.toISOString(),
      centerId: user,
      obs: null,
      prioridade: 1,
      carregamento: "NAO_INICIADO",
      conferencia: "NAO_INICIADO",
      separacao: "NAO_INICIADO",
      cargaParada: false,
    });
  }

  return arrayInput;
}
