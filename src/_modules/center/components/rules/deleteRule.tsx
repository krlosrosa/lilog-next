import { Button } from "@/_shared/_components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/_shared/_components/ui/dialog";
import { useDeleteEngineRules } from "../../hooks/mutation/useDeleteEngineRules";
import { AlertTriangle, Trash2 } from "lucide-react";

export function DeleteRule({ id }: { id: string }) {
  const { open, setOpen, deleteEngineRulesFunction } = useDeleteEngineRules();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full sm:w-auto">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Deletar Regra
          </DialogTitle>
          <DialogDescription className="pt-2">
            Esta ação não pode ser desfeita. A regra será permanentemente removida do sistema.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-destructive/5 border-destructive/20 flex items-start gap-3 rounded-lg border p-4 my-2">
          <AlertTriangle className="text-destructive mt-0.5 h-5 w-5 shrink-0" />
          <div className="flex-1">
            <p className="text-destructive mb-1 text-sm font-medium">
              Atenção!
            </p>
            <p className="text-muted-foreground text-xs">
              Você está prestes a deletar uma regra de motor. Esta ação é irreversível e todos os dados associados serão perdidos permanentemente.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button 
            variant="destructive"
            onClick={() => deleteEngineRulesFunction(id)}
            className="w-full sm:w-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Deletar Regra
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}