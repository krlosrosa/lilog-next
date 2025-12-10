import { Button } from "@/_shared/_components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/_shared/_components/ui/dialog";
import { useDeletarMovimentacaoMutation } from "../hooks/deletarMovimentacao";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function ModalExcluirDemanda({ id }: { id: number }) {
  const { deletarMovimentacao, isDeletandoMovimentacao } = useDeletarMovimentacaoMutation ();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deletarMovimentacao(id);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full sm:w-auto">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão da Movimentação {id}</DialogTitle>
          <DialogDescription>Esta ação não pode ser desfeita. Todos os dados relacionados a esta movimentação serão permanentemente removidos.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeletandoMovimentacao}>Deletar Movimentação</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}