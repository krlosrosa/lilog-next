'use client';

import useGetAllTransportes from "@/_modules/transporte/hooks/useGetAllTransportes";
import { columnsTrocaData } from "./table/columnsTrocaData";
import { DataTableTrocaData } from "./table/data-table-troca-data";
import { FilterTable } from "./table/filterTable";
import { useState } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
import useGetAllTransporteSwitchData from "../../hooks/queries/useGetAllTransporteSwitchData";
import { Button } from "@/_shared/_components/ui/button";
import { Input } from "@/_shared/_components/ui/input";
import { RowSelectionState } from "@tanstack/react-table";
import ModalConfirmacaoTrocarDataExpedicao from "./modalConfirmacao";
import useUserTrocarDataExpedicao from "../../hooks/userTrocarDataExpedicao";
import { Label } from "@/_shared/_components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/_shared/_components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/_shared/_components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/_components/ui/card";

const parseDateString = (dateString: string): Date | undefined => {
  if (!dateString) return undefined;
  const [year, month, day] = dateString.split('-').map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return undefined;
  return new Date(year, month - 1, day);
};

export default function TrocarDataTransporte() {
  const [dataExpedicao, setDataExpedicao] = useState<string>('');
  const [novaDataExpedicao, setNovaDataExpedicao] = useState<string>('');
  const [globalFilter, setGlobalFilter] = useState('');
  const { transportes, isLoading, setCargaParada, cargaParada } = useGetAllTransporteSwitchData(dataExpedicao);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [selectedTransportes, setSelectedTransportes] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const { trocarDataExpedicao, isPending } = useUserTrocarDataExpedicao({
    dataExpedicao: novaDataExpedicao,
    selectedTransportes: selectedTransportes,
  })

  return (
    <div className="space-y-6 p-6">
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <Button 
              onClick={() => setOpen(true)}
              disabled={selectedTransportes.length === 0}
            >
              Trocar Data de Expedição
            </Button>
            <Button 
              onClick={() => setCargaParada(!cargaParada)}
              variant={cargaParada ? "default" : "outline"}
            >
              {cargaParada ? 'Mostrar Todos' : 'Filtrar por Carga Parada'}
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
              <CardDescription>
                Configure os filtros para buscar os transportes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-medium">Data do Processo</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal transition-all duration-200',
                        !dataExpedicao && 'text-muted-foreground',
                        dataExpedicao && 'border-primary/50 bg-primary/5',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dataExpedicao && parseDateString(dataExpedicao)
                        ? format(parseDateString(dataExpedicao)!, 'dd/MM/yyyy', { locale: ptBR })
                        : 'Selecione uma data'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={parseDateString(dataExpedicao)}
                      onSelect={(date) => setDataExpedicao(format(date as Date, 'yyyy-MM-dd', { locale: ptBR }))}
                      locale={ptBR}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transportes</CardTitle>
              <CardDescription>
                Selecione os transportes para alterar a data de expedição
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FilterTable globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
              <DataTableTrocaData 
                selectedTransportes={selectedTransportes} 
                setSelectedTransportes={setSelectedTransportes} 
                rowSelection={rowSelection} 
                setRowSelection={setRowSelection} 
                columns={columnsTrocaData} 
                data={transportes ?? []} 
                globalFilter={globalFilter} 
                setGlobalFilter={setGlobalFilter} 
              />
            </CardContent>
          </Card>

          <ModalConfirmacaoTrocarDataExpedicao 
            open={open} 
            setOpen={setOpen} 
            onConfirm={() => trocarDataExpedicao()} 
            dataExpedicao={novaDataExpedicao} 
            setDataExpedicao={setNovaDataExpedicao} 
          />
        </>
      )}
    </div>
  )
}