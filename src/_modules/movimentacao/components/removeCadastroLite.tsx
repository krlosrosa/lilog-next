import { useState } from "react";
import { useContagemLite } from "../hooks/contagem-lite/useLite";
import { Dialog, DialogContent, DialogTrigger } from "@/_shared/_components/ui/dialog";
import { Button } from "@/_shared/_components/ui/button";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/_shared/_components/ui/dialog";
import { Trash2 } from "lucide-react";

export default function RemoveCadastroLite() {
  const { handleDeleteContagemLite, isDeletingContagemLite } = useContagemLite();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full sm:w-auto">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão do Cadastro Lite</DialogTitle>
          <DialogDescription>Esta ação não pode ser desfeita. Todos os dados relacionados a este cadastro lite serão permanentemente removidos.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="destructive" onClick={handleDeleteContagemLite} disabled={isDeletingContagemLite}>Deletar Cadastro Lite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}