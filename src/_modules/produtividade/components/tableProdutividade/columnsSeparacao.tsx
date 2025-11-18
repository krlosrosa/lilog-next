'use client';

import { ProdutividadeGetDataDto } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';

export const columnsProdutividade: ColumnDef<ProdutividadeGetDataDto>[] = [
  {
    accessorKey: 'nomeFuncionario',
    header: 'Funcionário',
    cell: ({ row }) => {
      return <div className="">{row.getValue('nomeFuncionario')}</div>;
    },
  },
  {
    accessorKey: 'processo',
    header: 'Processo',
    cell: ({ row }) => {
      return <div className="">{row.getValue('processo')}</div>;
    },
  },

  {
    accessorKey: 'segmento',
    header: 'Segmento',
    cell: ({ row }) => {
      const segmento = row.getValue('segmento') as string;
      return <div className="text-start">{segmento || '-'}</div>;
    },
  },
  {
    accessorKey: 'inicio',
    header: 'Início',
    cell: ({ row }) => {
      return <div className="">{row.getValue('inicio')}</div>;
    },
  },
  {
    accessorKey: 'tempoTrabalhado',
    header: 'Max',
    cell: ({ row }) => {
      const tempoTrabalhado = row.getValue('tempoTrabalhado') as number;
      return <div className="">{tempoTrabalhado}</div>;
    },
  },
  {
    accessorKey: 'produtividade',
    header: 'Produtividade',
    cell: ({ row }) => {
      return <div className="">{row.getValue('produtividade')}</div>;
    },
  },
  {
    accessorKey: 'unidades',
    header: 'Unidades',
    cell: ({ row }) => {
      const quantidade = Number(row.getValue('unidades'));
      const quantidadeFormatada = quantidade.toFixed(2);
      return <div className="">{quantidadeFormatada}</div>;
    },
  },
  {
    accessorKey: 'paletes',
    header: 'Paletes',
    cell: ({ row }) => {
      return <div className="">{row.getValue('paletes')}</div>;
    },
  },
  {
    accessorKey: 'visitas',
    header: 'Faixa',
    cell: ({ row }) => {
      return <div className="">{row.getValue('visitas')}</div>;
    },
  },
];
