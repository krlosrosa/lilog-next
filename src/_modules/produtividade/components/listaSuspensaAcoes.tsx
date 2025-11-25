'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/_shared/_components/ui/dropdown-menu';
import { Button } from '@/_shared/_components/ui/button';
import { MoreVertical, Pause, Users, CheckCircle2, Trash2, Scissors, Truck } from 'lucide-react';
import { useState } from 'react';
import AddPausaIndividual from './addPausaIndividual';
import AddPausaGeral from './addPausaGeral';
import FinalizarPausaIndividual from './finalizarPausaIndividual';
import FinalizarPausaGeral from './finalizarPausaGeral';
import DeletarDemanda from './deletarDemanda';
import { useRouter } from 'next/navigation';
import ModalAddCargaParada from './transporte';

export default function ListaSuspensaAcoes() {
  const router = useRouter();
  const [openPausaIndividual, setOpenPausaIndividual] = useState(false);
  const [openPausaGeral, setOpenPausaGeral] = useState(false);
  const [openFinalizarPausaIndividual, setOpenFinalizarPausaIndividual] =
    useState(false);
  const [openFinalizarPausaGeral, setOpenFinalizarPausaGeral] = useState(false);
  const [openDeletarDemanda, setOpenDeletarDemanda] = useState(false);
  const [openAddCargaParada, setOpenAddCargaParada] = useState(false);
  const [corteMaterial, setCorteMaterial] = useState(false);

  const handleOpenPausaIndividual = () => {
    setTimeout(() => {
      setOpenPausaIndividual(true);
    }, 0);
  };

  const handleOpenPausaGeral = () => {
    setTimeout(() => {
      setOpenPausaGeral(true);
    }, 0);
  };

  const handleOpenFinalizarPausaIndividual = () => {
    setTimeout(() => {
      setOpenFinalizarPausaIndividual(true);
    }, 0);
  };

  const handleOpenFinalizarPausaGeral = () => {
    setTimeout(() => {
      setOpenFinalizarPausaGeral(true);
    }, 0);
  };

  const handleOpenDeletarDemanda = () => {
    setTimeout(() => {
      setOpenDeletarDemanda(true);
    }, 0);
  };

  const handleOpenAddCargaParada = () => {
    setTimeout(() => {
      setOpenAddCargaParada(true);
    }, 0);
  };

  return (
    <>
      {corteMaterial && (
        <div>
          <Button size='icon' variant='outline' className='relative'>
            <Scissors className="h-4 w-4" />
            <span className="absolute -left-0.5 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-destructive"></span>
            </span>
          </Button>
        </div>
      )}
      <AddPausaIndividual
        open={openPausaIndividual}
        onOpenChange={setOpenPausaIndividual}
      />
      <AddPausaGeral open={openPausaGeral} onOpenChange={setOpenPausaGeral} />
      <FinalizarPausaIndividual
        open={openFinalizarPausaIndividual}
        onOpenChange={setOpenFinalizarPausaIndividual}
      />
      <FinalizarPausaGeral
        open={openFinalizarPausaGeral}
        onOpenChange={setOpenFinalizarPausaGeral}
      />
      <DeletarDemanda
        open={openDeletarDemanda}
        onOpenChange={setOpenDeletarDemanda}
      />
      <ModalAddCargaParada
        open={openAddCargaParada}
        onOpenChange={setOpenAddCargaParada}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem
            className="cursor-pointer gap-3"
            onSelect={handleOpenPausaIndividual}
          >
            <Pause className="text-muted-foreground h-4 w-4" />
            <span>Adicionar Pausa Individual</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-3"
            onSelect={handleOpenPausaGeral}
          >
            <Users className="text-muted-foreground h-4 w-4" />
            <span>Adicionar Pausa Geral</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer gap-3"
            onSelect={handleOpenFinalizarPausaIndividual}
          >
            <CheckCircle2 className="text-muted-foreground h-4 w-4" />
            <span>Finalizar Pausa Individual</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-3"
            onSelect={handleOpenFinalizarPausaGeral}
          >
            <CheckCircle2 className="text-muted-foreground h-4 w-4" />
            <span>Finalizar Pausa Geral</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer gap-3"
            onSelect={() => router.push('/corte/operacional')}
          >
            <Scissors className="text-muted-foreground h-4 w-4" />
            <span>Corte Material</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-3"
            onSelect={handleOpenAddCargaParada}
          >
            <Truck className="text-muted-foreground h-4 w-4" />
            <span>Informar Carga Parada</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer gap-3"
            onSelect={handleOpenDeletarDemanda}
          >
            <Trash2 className="h-4 w-4" />
            <span>Deletar Demanda</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
