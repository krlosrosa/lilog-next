import FloatButton from "@/_shared/_components/ui/floatButton";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/_shared/_components/ui/dialog";

export default function AddCorteAdmParaOperaciona() {
  return(
    <Dialog>
      <DialogTrigger asChild>
      <FloatButton/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Corte Adm para Operaciona</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}