'use client';
import { useMemo } from 'react';
import useGetAllTransportes from "../hooks/useGetAllTransportes";
import { useTransporteFilter } from "../hooks/useTransporteFilter";
import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { StatusIcon } from "./table/columnsTransporte";
import { Package, ClipboardCheck, Truck } from "lucide-react";

type StatusType = 'NAO_INICIADO' | 'EM_PROGRESSO' | 'CONCLUIDO';

export default function CardDashboard() {
  const { filters } = useTransporteFilter();
  const { transportes, isLoading } = useGetAllTransportes(filters.dataRegistro);

  const resumos = useMemo(() => {
    if (!transportes) {
      return {
        separacao: { NAO_INICIADO: 0, EM_PROGRESSO: 0, CONCLUIDO: 0 },
        conferencia: { NAO_INICIADO: 0, EM_PROGRESSO: 0, CONCLUIDO: 0 },
        carregamento: { NAO_INICIADO: 0, EM_PROGRESSO: 0, CONCLUIDO: 0 },
      };
    }

    const separacao = { NAO_INICIADO: 0, EM_PROGRESSO: 0, CONCLUIDO: 0 };
    const conferencia = { NAO_INICIADO: 0, EM_PROGRESSO: 0, CONCLUIDO: 0 };
    const carregamento = { NAO_INICIADO: 0, EM_PROGRESSO: 0, CONCLUIDO: 0 };

    transportes.forEach((transporte) => {
      if (transporte.separacao) {
        const status = transporte.separacao as StatusType;
        if (status === 'NAO_INICIADO' || status === 'EM_PROGRESSO' || status === 'CONCLUIDO') {
          separacao[status]++;
        }
      } else {
        separacao.NAO_INICIADO++;
      }

      if (transporte.conferencia) {
        const status = transporte.conferencia as StatusType;
        if (status === 'NAO_INICIADO' || status === 'EM_PROGRESSO' || status === 'CONCLUIDO') {
          conferencia[status]++;
        }
      } else {
        conferencia.NAO_INICIADO++;
      }

      if (transporte.carregamento) {
        const status = transporte.carregamento as StatusType;
        if (status === 'NAO_INICIADO' || status === 'EM_PROGRESSO' || status === 'CONCLUIDO') {
          carregamento[status]++;
        }
      } else {
        carregamento.NAO_INICIADO++;
      }
    });

    return { separacao, conferencia, carregamento };
  }, [transportes]);

  const totalTransportes = transportes?.length || 0;

  const totalCargaParada = transportes?.filter((item) => item.cargaParada === true).length || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Card Separação */}
      <Card className="py-3">
        <CardHeader className="px-3 pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-5 w-5 text-blue-600" />
            Separação
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusIcon status="NAO_INICIADO" />
                <span className="text-sm text-muted-foreground">Não Iniciado</span>
              </div>
              <span className="text-lg font-semibold">{resumos.separacao.NAO_INICIADO}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusIcon status="EM_PROGRESSO" />
                <span className="text-sm text-muted-foreground">Em Progresso</span>
              </div>
              <span className="text-lg font-semibold">{resumos.separacao.EM_PROGRESSO}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusIcon status="CONCLUIDO" />
                <span className="text-sm text-muted-foreground">Concluído</span>
              </div>
              <span className="text-lg font-semibold">{resumos.separacao.CONCLUIDO}</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="text-lg font-bold">{totalTransportes}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Conferência */}
      <Card className="py-3">
        <CardHeader className="px-3 pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <ClipboardCheck className="h-5 w-5 text-purple-600" />
            Conferência
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusIcon status="NAO_INICIADO" />
                <span className="text-sm text-muted-foreground">Não Iniciado</span>
              </div>
              <span className="text-lg font-semibold">{resumos.conferencia.NAO_INICIADO}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusIcon status="EM_PROGRESSO" />
                <span className="text-sm text-muted-foreground">Em Progresso</span>
              </div>
              <span className="text-lg font-semibold">{resumos.conferencia.EM_PROGRESSO}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusIcon status="CONCLUIDO" />
                <span className="text-sm text-muted-foreground">Concluído</span>
              </div>
              <span className="text-lg font-semibold">{resumos.conferencia.CONCLUIDO}</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="text-lg font-bold">{totalTransportes}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Carregamento */}
      <Card className="py-3">
        <CardHeader className="px-3 pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Truck className="h-5 w-5 text-green-600" />
            Carregamento
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusIcon status="NAO_INICIADO" />
                <span className="text-sm text-muted-foreground">Não Iniciado</span>
              </div>
              <span className="text-lg font-semibold">{resumos.carregamento.NAO_INICIADO - totalCargaParada}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusIcon status="EM_PROGRESSO" />
                <span className="text-sm text-muted-foreground">Em Progresso</span>
              </div>
              <span className="text-lg font-semibold">{resumos.carregamento.EM_PROGRESSO}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StatusIcon status="CONCLUIDO" />
                <span className="text-sm text-muted-foreground">Concluído</span>
              </div>
              <span className="text-lg font-semibold">{resumos.carregamento.CONCLUIDO}</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="text-lg font-bold">{totalTransportes}</span>
              </div>
            </div>
            {totalCargaParada > 0 && (
              <div className="pt-2 border-t text-red-400 text-sm font-semibold">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Carga Parada</span>
                  <span className="font-bold">{totalCargaParada}</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}