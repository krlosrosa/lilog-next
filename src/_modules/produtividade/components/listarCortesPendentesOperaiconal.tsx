'use client';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/_shared/_components/ui/dialog";
import { useBuscarCortesPendentesOp } from "../hooks/queries/useBuscarCortesPendentesOp";
import { Button } from "@/_shared/_components/ui/button";
import { Badge } from "@/_shared/_components/ui/badge";
import { Scissors, ChevronDown, Package } from "lucide-react";
import ListaItensParaCorte from "./listaItensParaCorte/listaItensParaCorte";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/_shared/_components/ui/collapsible";
import { Separator } from "@/_shared/_components/ui/separator";
import { CorteMercadoriaGetDto } from "@/_services/api/model";
import ModalConfirmarCorte from "./modalConfirmarCorte";
import useConfirmarCortePorTransporte from "../hooks/mutation/useConfirmarCortePorTransporte";

export default function CortesPendentesOperacional() {
  const { cortesPendentesOp, groupedCortes, open, setOpen } = useBuscarCortesPendentesOp();
  const { confirmarCortePorTransporte, isConfirmandoCortePorTransporte } = useConfirmarCortePorTransporte();

  const handleConfirmarCorte = (transporteId: string) => {
    confirmarCortePorTransporte(transporteId, setOpen);
  } 
      


  return (
    cortesPendentesOp && cortesPendentesOp.length > 0 && <Dialog>
      <DialogTrigger asChild>
        <Button className="relative" size="icon">
          <Scissors className="w-4 h-4" />
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center px-1.5 text-xs font-semibold"
            >
              {cortesPendentesOp.length}
            </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-10/12 max-h-[95vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-primary" />
            Cortes Pendentes
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-0">
          {/* Lista de Transportes */}
          {Object.keys(groupedCortes).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-sm font-medium">
                Nenhum corte pendente encontrado
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(groupedCortes).map(([transporteId, cortes]) => (
                <Collapsible
                  key={transporteId}
                  className="rounded-lg border bg-card shadow-sm transition-all hover:shadow-md"
                >
                  <CollapsibleTrigger className="hover:bg-accent/50 flex w-full cursor-pointer items-center justify-between rounded-lg p-4 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-base font-semibold text-foreground">
                          Transporte: {transporteId}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {cortes.length} {cortes.length === 1 ? 'item' : 'itens'} pendente{cortes.length === 1 ? '' : 's'}
                        </p>
                      </div>
                    </div>
                    <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4">
                    <div className="space-y-4 pt-2">
                      <div className="flex justify-end">
                        <ModalConfirmarCorte handleConfirmarCorte={handleConfirmarCorte} transporteId={transporteId} open={open} setOpen={setOpen}>

                          <Button
                            size="sm"
                            className="gap-2 w-full"
                          >
                            <Scissors className="h-4 w-4" />
                            Confirmar Corte
                          </Button>
                        </ModalConfirmarCorte>
                      </div>
                      <div className="max-h-[400px] overflow-auto rounded-md border">
                        <ListaItensParaCorte cortes={cortes} />
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}