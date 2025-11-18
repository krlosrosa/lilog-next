'use client';
import { CardDashBoard } from './cardDashProdutividade';
import {
  CheckCheck,
  Package,
  ChartNoAxesCombined,
  Boxes,
  Loader,
} from 'lucide-react';
import { useGetProdutividade } from '../hooks/queries/useGetProdutividade';

export function OverView() {
  const { overViewProdutividade, filters } = useGetProdutividade();

  if (filters.dataRegistro === '' || filters.processo === '') {
    return null;
  }

  const formatNumber = (value: string | number | undefined | null): string => {
    if (value === undefined || value === null) return '0';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(numValue) ? '0' : numValue.toLocaleString('pt-BR');
  };

  return (
    <div className="grid grid-cols-2 gap-3 p-1 lg:grid-cols-5">
      <CardDashBoard
        type="totalProcessos"
        title="Total de processos"
        value={formatNumber(overViewProdutividade?.processos) || 0}
        icon={<Boxes className="h-8 w-8 text-blue-400" />}
      />
      <CardDashBoard
        type="emAndamento"
        title="Em Andamento"
        value={formatNumber(overViewProdutividade?.emAndamento) || 0}
        icon={<Loader className="h-8 w-8 animate-spin text-amber-400" />}
      />
      <CardDashBoard
        type="concluidos"
        title="Concluidos"
        value={formatNumber(overViewProdutividade?.concluidos) || 0}
        icon={<CheckCheck className="h-8 w-8 text-emerald-400" />}
      />
      <CardDashBoard
        type="totalCaixas"
        title="Total de Caixas"
        value={formatNumber(overViewProdutividade?.totalCaixas) || 0}
        icon={<Package className="h-8 w-8 text-violet-400" />}
      />
      <CardDashBoard
        type="produtividade"
        title="Produtividade"
        value={formatNumber(overViewProdutividade?.produtividade) || 0}
        icon={<ChartNoAxesCombined className="h-8 w-8 text-blue-400" />}
      />
    </div>
  );
}
