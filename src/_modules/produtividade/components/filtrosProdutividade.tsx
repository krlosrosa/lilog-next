'use client';

import { Input } from '@/_shared/_components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shared/_components/ui/select';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { segmentos } from '../consts/segmento';
import { statusOptions } from '../consts/status';
import { empresaOptions } from '../consts/empresa';
import { useProdutividadeFilter } from '../hooks/useProdutividadeFilter';
import { useUpdateSearchParam } from '@/_shared/hooks/useUpdateSearchParams';

export default function FiltrosProdutividade() {
  const { filters, setFilters } = useProdutividadeFilter();
  const { setValue: setSearch, value: search } = useUpdateSearchParam('search');
  const [status, setStatus] = useState(filters.status || 'TODOS');
  const [empresa, setEmpresa] = useState(filters.empresa || 'TODOS');
  const [segmento, setSegmento] = useState(filters.segmento || 'TODOS');

  useEffect(() => {
    setFilters({
      status: status === 'TODOS' ? '' : status,
      empresa: empresa === 'TODOS' ? '' : empresa,
      segmento: segmento === 'TODOS' ? '' : segmento,
    });
  }, [status, empresa, segmento, setFilters]);

  return (
    <div className="bg-card flex flex-wrap items-center gap-3 rounded-sm border p-1 shadow-sm">
      {/* Input de Busca */}
      <div className="relative min-w-[200px] flex-1">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors" />
        <Input
          id="busca"
          type="text"
          placeholder="Funcionário, Transporte, Demanda ID ou ID Palete"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 transition-all"
        />
      </div>

      {/* Separador Visual */}
      <div className="bg-border hidden h-6 w-px sm:block" />

      {/* Selects de Filtro */}
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger id="status" className="w-[150px] transition-all">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={empresa} onValueChange={setEmpresa}>
        <SelectTrigger id="empresa" className="w-[120px] transition-all">
          <SelectValue placeholder="Empresa" />
        </SelectTrigger>
        <SelectContent>
          {empresaOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={segmento} onValueChange={setSegmento}>
        <SelectTrigger id="segmento" className="w-[140px] transition-all">
          <SelectValue placeholder="Segmento" />
        </SelectTrigger>
        <SelectContent>
          {segmentos.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
