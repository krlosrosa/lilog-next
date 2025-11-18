'use client';

import { CorteMercadoriaGetDto } from '@/_services/api/model';
import { Button } from '@/_shared/_components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Check, X } from 'lucide-react';
import ModalConfirmarCorteEfetuado from '../modalConfirmarOCorteEfetuado';

export const columnsCortePendentes: ColumnDef<CorteMercadoriaGetDto>[] = [
  {
    accessorKey: 'transporteId',
    header: 'Transporte ID',
  },
  {
    accessorKey: 'produto',
    header: 'Produto',
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição',
  },
  {
    accessorKey: 'lote',
    header: 'Lote',
  },
  {
    accessorKey: 'caixas',
    header: 'Caixas',
  },
  {
    accessorKey: 'unidades',
    header: 'Unidades',
  },
  {
    accessorKey: 'motivo',
    header: 'Motivo',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      return (
        <ModalConfirmarCorteEfetuado id={row.original.id.toString()}>
          <Button variant="outline" size="icon">
            <Check className="w-4 h-4" />
          </Button>
        </ModalConfirmarCorteEfetuado>
      )
    },
  },
];
