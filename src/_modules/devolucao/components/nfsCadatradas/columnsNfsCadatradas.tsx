'use client';

import { GetNotasDto, ReturnInfoGeralRavexNotasItemItensItem } from '@/_services/api/model';
import { GetNotasByDemandaIdDevolucaoQueryResult } from '@/_services/api/service/devolucao/devolucao';
import { ColumnDef } from '@tanstack/react-table';
import ModalRemoverNota from '../modalRemoverNota';


export const columnsNfsCadatradas: ColumnDef<GetNotasDto>[] = [ 
  {
    accessorKey: 'notaFiscal',  
    header: 'Nota Fiscal',
    cell: ({ row }) => {
      return (
        <div className="text-foreground font-medium">
          {row.getValue('notaFiscal')}
        </div>
      );
    },
  },
  {
    accessorKey: 'nfParcial',
    header: 'Nota Fiscal Parcial',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
            {row.getValue('nfParcial')}
        </div>
      );
    },
  },
  {
    accessorKey: 'idViagemRavex',
    header: 'ID Viagem Ravex',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('idViagemRavex')}</div>;
    },
  },
  {
    accessorKey: 'empresa',
      header: 'Empresa',
    cell: ({ row }) => {
      const empresa = row.getValue('empresa') as string;
      return <div className="font-medium">{empresa}</div>;
    },
  },
  {
    accessorKey: 'tipo',
      header: 'Tipo',
    cell: ({ row }) => {
      const tipo = row.getValue('tipo') as string;
      return <div className="font-medium">{tipo}</div>;
    },
  },
  {
    accessorKey: 'descMotivoDevolucao',
    header: 'Descrição do Motivo de Devolução',
    cell: ({ row }) => {
      const descMotivoDevolucao = row.getValue('descMotivoDevolucao') as string;
      return <div className="font-medium">{descMotivoDevolucao}</div>;
    },
  },
  {
    accessorKey: 'id',
    header: 'Ações',
    cell: ({ row }) => {
      return <div className="font-medium">
        <ModalRemoverNota id={row.getValue('id') as string} />
      </div>;
    },
  }
];
