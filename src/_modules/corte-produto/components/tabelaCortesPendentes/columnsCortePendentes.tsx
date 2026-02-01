'use client';

import { CorteMercadoriaGetDto } from '@/_services/api/model';
import { Button } from '@/_shared/_components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Check } from 'lucide-react';
import ModalConfirmarCorteEfetuado from '../modalConfirmarCorteEfetuado';
import { ModalDeletarCorte } from '../ModalDeletarCorte';

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
      const corte = row.original;
      return (
        <div className="flex items-center gap-2">
          <ModalConfirmarCorteEfetuado id={corte.id.toString()}>
            <Button variant="outline" size="icon" title="Confirmar corte">
              <Check className="w-4 h-4" />
            </Button>
          </ModalConfirmarCorteEfetuado>
          <ModalDeletarCorte id={corte.id.toString()} corte={corte} />
        </div>
      );
    },
  },
];
