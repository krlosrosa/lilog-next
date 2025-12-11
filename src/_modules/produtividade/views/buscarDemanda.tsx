'use client';
import { Input } from "@/_shared/_components/ui/input";
import { useState, useEffect } from "react";
import useDemanda from "../hooks/useDemanda";
import { Button } from "@/_shared/_components/ui/button";
import { DataTablePaleteDemanda } from "../components/demanda/table/data-table-palete-demanda";
import { columnsPaletesDemanda } from "../components/demanda/table/palete-demanda";
import { Search, Loader2, Trash2 } from "lucide-react";
import { formatDate } from "date-fns";

export default function BuscarDemanda() {
  const { demanda, isBuscandoDemanda, setId, centerId, handleExcluirDemanda } = useDemanda();
  const [searchId, setSearchId] = useState<string>('');
  
  const demandaNaoEncontrada = centerId !== demanda?.centerId;
  const semPaletes = demanda?.paletes?.length === 0;
  const podeExcluir = demanda && semPaletes && !isBuscandoDemanda;
  const podeBuscar = searchId.trim() && !isBuscandoDemanda;

  const handleBuscar = () => {
    if (searchId.trim()) {
      setId(searchId.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && podeBuscar) {
      handleBuscar();
    }
  };

  const handleExcluir = () => {
    alert(demanda?.idDemanda?.toString());
    handleExcluirDemanda(demanda?.idDemanda?.toString() as string);
  };

  return (
    <div className="p-6 w-full space-y-6">
      <h1 className="text-2xl font-bold">Buscar Demanda</h1>

      {/* Barra de busca */}
      <div className="flex gap-2">
        <Input
          placeholder="Digite o ID da demanda"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyPress={handleKeyPress}
          className="max-w-md"
        />
        <Button 
          onClick={handleBuscar} 
          disabled={!podeBuscar}
        >
          {isBuscandoDemanda ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Search className="h-4 w-4 mr-2" />
          )}
          Buscar
        </Button>
      </div>

      {/* Estado: Demanda não encontrada */}
      {demandaNaoEncontrada && (
        <div className="text-center p-6 border rounded-lg">
          <h1 className="text-2xl font-bold mb-2">Demanda não encontrada</h1>
          <p className="text-gray-500">Verifique o ID e tente novamente</p>
        </div>
      )}

      {/* Estado: Carregando */}
      {isBuscandoDemanda && (
        <div className="text-center py-8 border rounded-lg">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
          <p>Buscando demanda...</p>
        </div>
      )}

      {/* Estado: Demanda encontrada */}
      {demanda && !isBuscandoDemanda && !demandaNaoEncontrada && (
        <div className="space-y-6">
          {/* Cabeçalho da demanda */}
          <div className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <h2 className="font-bold text-lg">Demanda #{demanda.idDemanda}</h2>
                <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
                  {demanda.status}
                </span>
                <span className="px-2 py-1 text-sm font-bold">
                  {formatDate(demanda.dataExpedicao?.toString() || '', 'dd/MM/yyyy')}
                </span>
              </div>
              {podeExcluir && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleExcluir}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir Demanda
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <InfoItem label="Processo" value={demanda.processo} />
              <InfoItem label="Funcionário" value={demanda.funcionarioId} />
              <InfoItem 
                label="Paletes" 
                value={demanda.paletes.length.toString()} 
                highlight 
              />
            </div>
          </div>

          {/* Lista de paletes */}
          <div>
            <h3 className="font-bold mb-3 text-lg">
              Paletes ({demanda.paletes.length})
            </h3>
            
            {demanda.paletes.length > 0 ? (
              <DataTablePaleteDemanda 
                columns={columnsPaletesDemanda} 
                data={demanda.paletes} 
              />
            ) : (
              <div className="text-center p-6 border rounded-lg">
                <p className="text-gray-500">Nenhum palete encontrado</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Estado: Inicial (sem busca) */}
      {!demanda && !isBuscandoDemanda && !demandaNaoEncontrada && (
        <div className="text-center p-12 border rounded-lg">
          <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">Digite um ID e clique em "Buscar" para ver os detalhes</p>
        </div>
      )}
    </div>
  );
}

// Componente auxiliar para informações
function InfoItem({ label, value, highlight = false }: { 
  label: string; 
  value: string; 
  highlight?: boolean; 
}) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className={`font-medium ${highlight ? 'text-blue-600' : ''}`}>
        {value}
      </p>
    </div>
  );
}