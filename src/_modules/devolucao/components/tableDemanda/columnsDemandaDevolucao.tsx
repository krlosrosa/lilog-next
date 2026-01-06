'use client';

import { CenterDto, ListarDemandasDto, ReturnInfoGeralRavexNotasItemItensItem } from '@/_services/api/model';
import { Button } from '@/_shared/_components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { EyeIcon, Link } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const columnsDemandaDevolucao: ColumnDef<ListarDemandasDto>[] = [ 
  {
    accessorKey: 'id',  
    header: 'ID',
    cell: ({ row }) => {
      return (
        <div className="text-foreground font-medium">
          {row.getValue('id')}
        </div>
      );
    },
  },
  {
    accessorKey: 'placa',
    header: 'Placa',
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground">
          {row.getValue('placa')}
        </div>
      );
    },
  },
  {
    accessorKey: 'motorista',
    header: 'Motorista',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('motorista')}</div>;
    },
  },
  {
    accessorKey: 'idTransportadora',
    header: 'ID Transportadora',
    cell: ({ row }) => {
      const idTransportadora = row.getValue('idTransportadora') as string;
      return (
        <div className="bg-muted inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
          {idTransportadora}
        </div>
      );
    },
  },
  {
    accessorKey: 'telefone',
    header: 'Telefone',
    cell: ({ row }) => {
      const telefone = row.getValue('telefone') as string;
      return <div className="font-medium">{telefone}</div>;
    },
  },
  {
    accessorKey: 'cargaSegregada',
    header: 'Carga Segregada',
    cell: ({ row }) => {
      const cargaSegregada = row.getValue('cargaSegregada') as boolean;
      return <div className="font-medium">{cargaSegregada ? 'Sim' : 'Não'}</div>;
    },
  },
  {
    accessorKey: 'quantidadePaletes',
    header: 'Quantidade Paletes',
    cell: ({ row }) => {
      const quantidadePaletes = row.getValue('quantidadePaletes') as number;
      return <div className="font-medium">{quantidadePaletes}</div>;
    },
  },
  {
    accessorKey: 'doca',
    header: 'Doca',
    cell: ({ row }) => {
      const doca = row.getValue('doca') as string;
      return <div className="font-medium">{doca}</div>;
    },
  },
  {
    accessorKey: 'centerId',
    header: 'Center ID',
    cell: ({ row }) => {
      const centerId = row.getValue('centerId') as string;
      return <div className="font-medium">{centerId}</div>;
    },
  },
  {
    id: 'actions',
    header: 'Ação',
    cell: ({ row }) => {
      const id = row.original.id;
      const router = useRouter();
      return <div className="font-medium">
        <Button variant="outline" onClick={() => router.push(`/devolucao/demanda/${id}`)}>
          <Link className="w-4 h-4" />
        </Button>
      </div>;
    },
  }
];
