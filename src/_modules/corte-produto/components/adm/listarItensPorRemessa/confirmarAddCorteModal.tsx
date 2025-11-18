import { Button } from "@/_shared/_components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/_shared/_components/ui/dialog";
import { AugmentedZodDto } from "@/_services/api/model";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/_shared/_components/ui/table";
import { Alert, AlertDescription } from "@/_shared/_components/ui/alert";
import { Info } from "lucide-react";
import usePrintCorte from "@/_modules/corte-produto/hooks/usePrintCorte";

type ConfirmarAddCorteModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
  handleAddCorteProduto: () => void;
  dadosFiltrados: AugmentedZodDto[];
}

export const ConfirmarAddCorteModal = ({ open, setOpen, children, handleAddCorteProduto, dadosFiltrados }: ConfirmarAddCorteModalProps) => {

  const { printRef, print } = usePrintCorte();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle>Confirmar Adição de Corte</DialogTitle>
          <DialogDescription>
            Confirme os itens que serão cortados. Total de {dadosFiltrados.length} item(ns).
          </DialogDescription>
        </DialogHeader>
        <div ref={printRef} className="flex-1 overflow-y-auto min-h-0 space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="text-base font-semibold text-foreground">
              Transporte: {dadosFiltrados[0]?.transporte || 'N/A'}
            </h3>
          </div>
          
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Documento para Operação:</strong> Esta folha contém a lista de itens que devem ser cortados. 
              Após a impressão, entregue este documento à equipe de operação para execução dos cortes conforme especificado na tabela abaixo.
            </AlertDescription>
          </Alert>

          <div className="overflow-auto rounded-md border">
            <div className="w-full overflow-x-auto">
              <Table className="w-full">
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-[100px] whitespace-nowrap">SKU</TableHead>
                    <TableHead className="min-w-[200px]">Descrição</TableHead>
                    <TableHead className="w-[100px] whitespace-nowrap">Lote</TableHead>
                      <TableHead className="w-[80px] text-right whitespace-nowrap">Caixas</TableHead>
                      <TableHead className="w-[80px] text-right whitespace-nowrap">Unidades</TableHead>
                      <TableHead className="w-[80px] text-right whitespace-nowrap">Caixas Cortadas</TableHead>
                      <TableHead className="w-[80px] text-right whitespace-nowrap">Unidades Cortadas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosFiltrados.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        Nenhum item encontrado
                      </TableCell>
                    </TableRow>
                  ) : (
                    dadosFiltrados.map((item, index) => (
                      <TableRow key={`${item.sku}-${item.lote}-${index}`}>
                        <TableCell className="font-medium whitespace-nowrap">{item.sku}</TableCell>
                        <TableCell className="min-w-[200px]" title={item.descricao}>
                          {item.descricao}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{item.lote}</TableCell>
                        <TableCell className="text-right whitespace-nowrap">{item.caixas || 0}</TableCell>
                        <TableCell className="text-right whitespace-nowrap">{item.quantidade || 0}</TableCell>
                        <TableCell className={`text-right whitespace-nowrap ${item.caixasCortadas !== undefined && item.caixasCortadas > 0 ? 'text-destructive' : ''}`}>{item.caixasCortadas || 0}</TableCell>
                        <TableCell className={`text-right whitespace-nowrap ${item.quantidadeCortada !== undefined && item.quantidadeCortada > 0 ? 'text-destructive' : ''}`}>{item.quantidadeCortada || 0}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <DialogFooter className="shrink-0">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="default" onClick={print}>Imprimir</Button>
          <Button variant="default" onClick={handleAddCorteProduto} disabled={dadosFiltrados.length === 0}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}