'use client';

import { CreateTransporteDtoOutput } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';
import { ImpressaoMapaItem } from '../../others/types/items';

export const columnsSeparacao: ColumnDef<ImpressaoMapaItem>[] = [
  {
    accessorKey: 'endereco',
    header: 'Endereço',
    cell: ({ row }) => {
      return <div className="">{row.getValue('endereco')}</div>;
    },
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => {
      return <div className="">{row.getValue('sku')}</div>;
    },
  },

  {
    accessorKey: 'descricao',
    header: 'Descrição',
    cell: ({ row }) => {
      const seguimento = row.getValue('descricao') as string;
      return <div className="text-start">{seguimento || '-'}</div>;
    },
  },
  {
    accessorKey: 'lote',
    header: 'Lote',
    cell: ({ row }) => {
      return <div className="">{row.getValue('lote')}</div>;
    },
  },
  {
    accessorKey: 'dtFabricacao',
    header: 'Fab.',
    cell: ({ row }) => {
      const dataFabricacao = row.getValue('dtFabricacao') as Date;
      let dataFormatada = '-';
      if (dataFabricacao) {
        const dia = dataFabricacao.getDate();
        const mes = dataFabricacao.getMonth() + 1;
        const ano = dataFabricacao.getFullYear().toString().slice(-2);
        dataFormatada = `${dia}/${mes}/${ano}`;
      }
      return <div className="">{dataFormatada}</div>;
    },
  },
  {
    accessorKey: 'dtMaxima',
    header: 'Max',
    cell: ({ row }) => {
      const dataMaxima = row.getValue('dtMaxima') as Date;
      let dataFormatada = '-';
      if (dataMaxima) {
        const dia = dataMaxima.getDate();
        const mes = dataMaxima.getMonth() + 1;
        const ano = dataMaxima.getFullYear().toString().slice(-2);
        dataFormatada = `${dia}/${mes}/${ano}`;
      }
      return <div className="">{dataFormatada}</div>;
    },
  },
  {
    accessorKey: 'quantidadeCaixas',
    header: 'Cxs',
    cell: ({ row }) => {
      return <div className="">{row.getValue('quantidadeCaixas')}</div>;
    },
  },
  {
    accessorKey: 'quantidade',
    header: 'Und',
    cell: ({ row }) => {
      const quantidade = Number(row.getValue('quantidade'));
      const quantidadeFormatada = quantidade.toFixed(2);
      return <div className="">{quantidadeFormatada}</div>;
    },
  },
  {
    accessorKey: 'quantidadePaletes',
    header: 'Plts',
    cell: ({ row }) => {
      return <div className="">{row.getValue('quantidadePaletes')}</div>;
    },
  },
  {
    accessorKey: 'faixa',
    header: 'Faixa',
    cell: ({ row }) => {
      return <div className="">{row.getValue('faixa')}</div>;
    },
  },
];
