'use client';

import { ListarDemandasDto } from '@/_services/api/model';
import { Button } from '@/_shared/_components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/_shared/_components/ui/badge';
import { format } from "date-fns";


const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'AGUARDANDO_LIBERACAO':
      return 'secondary';
    case 'AGUARDANDO_CONFERENCIA':
      return 'outline';
    case 'EM_CONFERENCIA':
      return 'default';
    case 'CONFERENCIA_FINALIZADA':
      return 'default';
    case 'FINALIZADO':
      return 'default';
    case 'CANCELADO':
      return 'destructive';
    default:
      return 'secondary';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'AGUARDANDO_LIBERACAO':
      return 'Aguardando Liberação';
    case 'AGUARDANDO_CONFERENCIA':
      return 'Aguardando Conferência';
    case 'EM_CONFERENCIA':
      return 'Em Conferência';
    case 'CONFERENCIA_FINALIZADA':
      return 'Conferência Finalizada';
    case 'FINALIZADO':
      return 'Finalizado';
    case 'CANCELADO':
      return 'Cancelado';
    default:
      return status;
  }
};

export const columnsDemandaReturn: ColumnDef<ListarDemandasDto>[] = [ 
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
        <div className="text-muted-foreground font-medium">
          {row.getValue('placa')}
        </div>
      );
    },
  },
  {
    accessorKey: 'conferenteId',          
    header: 'Conferente',
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('conferenteId')}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge variant={getStatusBadgeVariant(status) as any}>
          {getStatusLabel(status)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'idTransportadora',
    header: 'ID Transportadora',
    cell: ({ row }) => {
      const idTransportadora = row.getValue('idTransportadora') as string | null;
      if (!idTransportadora) return <span className="text-muted-foreground">-</span>;
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
      const telefone = row.getValue('telefone') as string | null;
      return <div className="font-medium">{telefone || '-'}</div>;
    },
  },
  {
    accessorKey: 'cargaSegregada',
    header: 'Carga Segregada',
    cell: ({ row }) => {
      const cargaSegregada = row.getValue('cargaSegregada') as boolean;
      return (
        <Badge variant={cargaSegregada ? 'default' : 'secondary'}>
          {cargaSegregada ? 'Sim' : 'Não'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'quantidadePaletes',
    header: 'Qtd. Paletes',
    cell: ({ row }) => {
      const quantidadePaletes = row.getValue('quantidadePaletes') as number | null;
      return <div className="font-medium">{quantidadePaletes ?? '-'}</div>;
    },
  },
  {
    accessorKey: 'doca',
    header: 'Doca',
    cell: ({ row }) => {
      const doca = row.getValue('doca') as string | null;
      return <div className="font-medium">{doca || '-'}</div>;
    },
  },
  {
    accessorKey: 'criadoEm',
    header: 'Criado Em',
    cell: ({ row }) => {
      const criadoEm = row.getValue('criadoEm') as string;
      if (!criadoEm) return <span className="text-muted-foreground">-</span>;
      const dateString = criadoEm.endsWith('Z') ? criadoEm : `${criadoEm}Z`;
      return (
        <div className="text-sm text-muted-foreground">
          {format(dateString, "dd/MM/yyyy HH:mm")}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const id = row.original.id;
      const router = useRouter();
      return (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => router.push(`/return/demanda/${id}`)}
            title="Ver detalhes"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  }
];
