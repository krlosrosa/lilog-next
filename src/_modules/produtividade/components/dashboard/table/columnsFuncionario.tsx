'use client';

import { ProdutividadeDiaDiaGetDataDtoListaProdutividadePorFuncionarioItem } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';

export const columnsFuncionarioDashboard: ColumnDef<ProdutividadeDiaDiaGetDataDtoListaProdutividadePorFuncionarioItem>[] = [
  {
    accessorKey: 'funcionarioid',
    header: 'Funcionário',
    cell: ({ row }) => {
      return (
        <div className="text-foreground font-medium">
          {row.getValue('funcionarioid')}
        </div>
      );
    },
  },
  {
    accessorKey: 'funcionarionome',
    header: 'Funcionário',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
          {row.getValue('funcionarionome')}
        </div>
      );
    },
  },
  {
    accessorKey: 'processo',
    header: 'Processo',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('processo')}</div>;
    },
  },
  {
    accessorKey: 'centerid',
    header: 'Centro',
    cell: ({ row }) => {
      const centerid = row.getValue('centerid') as string;
      return (
        <div className="bg-muted inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
          {centerid}
        </div>
      );
    },
  },
  {
    accessorKey: 'periodoInicio',
    header: 'Período Início',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('periodoInicio')}</div>;
    },
  },
  {
    accessorKey: 'periodoFim',
    header: 'Período Fim',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('periodoFim')}</div>;
    },
  },
  {
    accessorKey: 'totalTempoPausa',
    header: 'Tempo Pausa',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('totalTempoPausa')}</div>;
    },
  },
  {
    accessorKey: 'totalCaixas',
    header: 'Total Caixas',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('totalCaixas')}</div>;
    },
  },
  {
    accessorKey: 'tempoTotal',
    header: 'Tempo Total',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('tempoTotal')}</div>;
    },
  },
  {
    accessorKey: 'totalDemandas',
    header: 'Total Demandas',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('totalDemandas')}</div>;
    },
  },
  {
    accessorKey: 'totalEnderecosVisitados',
    header: 'Total Endereços Visitados',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('totalEnderecosVisitados')}</div>;
    },
  },
  {
    accessorKey: 'tempoTrabalhado',
    header: 'Tempo Trabalhado',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('tempoTrabalhado')}</div>;
    },
  },
  {
    accessorKey: 'produtividadeCaixaPorHora',
    header: 'Produtividade Caixa Por Hora',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('produtividadeCaixaPorHora')}</div>;
    },
  },
  {
    accessorKey: 'mediaEnderecosPorDemanda',
    header: 'Média Endereços Por Demanda',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('mediaEnderecosPorDemanda')}</div>;
    },
  },
];
