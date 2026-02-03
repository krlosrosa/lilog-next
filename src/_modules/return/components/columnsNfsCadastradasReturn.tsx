'use client';

import { GetNotasDto } from '@/_services/api/model';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from "@/_shared/_components/ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "@/_shared/_components/ui/badge";
import { format } from 'date-fns';
import { formatarDataUTC } from '@/_shared/utils/convertHourUtc';

export const createColumnsNfsCadastradasReturn = (
  onRemoveNota: (nota: GetNotasDto) => void
): ColumnDef<GetNotasDto>[] => [
  {
    accessorKey: 'notaFiscal',
    header: 'Nota Fiscal',
    cell: ({ row }) => {
      return (
        <div className="text-foreground font-medium font-mono">
          {row.getValue('notaFiscal')}
        </div>
      );
    },
  },
  {
    accessorKey: 'nfParcial',
    header: 'NF Parcial',
    cell: ({ row }) => {
      const nfParcial = row.getValue('nfParcial') as string | null;
      return (
        <div className="text-muted-foreground">
          {nfParcial || '—'}
        </div>
      );
    },
  },
  {
    accessorKey: 'idViagemRavex',
    header: 'ID Viagem Ravex',
    cell: ({ row }) => {
      const idViagem = row.getValue('idViagemRavex') as string | null;
      return (
        <div className="font-medium font-mono text-sm">
          {idViagem || '—'}
        </div>
      );
    },
  },
  {
    accessorKey: 'empresa',
    header: 'Empresa',
    cell: ({ row }) => {
      const empresa = row.getValue('empresa') as string;
      return (
        <Badge variant="outline" className="font-medium">
          {empresa}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'tipo',
    header: 'Tipo',
    cell: ({ row }) => {
      const tipo = row.getValue('tipo') as string;
      const getVariant = (tipo: string) => {
        switch (tipo) {
          case 'DEVOLUCAO':
            return 'default';
          case 'DEVOLUCAO_PARCIAL':
            return 'outline';
          case 'REENTREGA':
            return 'secondary';
          default:
            return 'secondary';
        }
      };
      return (
        <Badge variant={getVariant(tipo) as any}>
          {tipo}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'descMotivoDevolucao',
    header: 'Motivo de Devolução',
    cell: ({ row }) => {
      const descMotivoDevolucao = row.getValue('descMotivoDevolucao') as string | null;
      return (
        <div className="text-sm text-muted-foreground max-w-md truncate">
          {descMotivoDevolucao || '—'}
        </div>
      );
    },
  },
  {
    accessorKey: 'criadoEm',
    header: 'Criado em',
    cell: ({ row }) => {
      const criadoEm = row.getValue('criadoEm') as string;
      if (!criadoEm) return <span className="text-muted-foreground">—</span>;
      return (
        <div className="text-sm text-muted-foreground">
          {format(new Date(formatarDataUTC(criadoEm)), "dd/MM/yyyy - HH:mm")}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const nota = row.original;
      return (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onRemoveNota(nota)}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Remover
        </Button>
      );
    },
  }
];
