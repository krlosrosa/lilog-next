import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/_shared/_components/ui/sheet";
import { Button } from "@/_shared/_components/ui/button";
import { Input } from "@/_shared/_components/ui/input";
import { Plus, Search, Truck, MapPin, X } from "lucide-react";
import useTransporte from "../../hooks/useTransporte";
import InfoTransporte from "./infoTransporte";
import FormAddCargaParada from "./formAddCargaParada";
import { Badge } from "@/_shared/_components/ui/badge";

type ModalAddCargaParadaProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ModalAddCargaParada({ open, onOpenChange }: ModalAddCargaParadaProps) {
  const { form, onSubmit, transporteId, setTransporteId, transporte } = useTransporte();

  const handleFormSubmit = (data: any) => {
    const submitData = {
      ...data,
    };
    onSubmit(submitData);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl lg:max-w-4xl flex flex-col p-0">
        {/* Header Fixo */}
        <SheetHeader className="p-2 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-orange-500" />
              <div>
                <SheetTitle className="text-xl font-bold text-gray-800">
                  Registrar Carga Parada
                </SheetTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Informe os dados do transporte e o motivo da parada
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        {/* Conteúdo Scrollável */}
        <div className="flex-1 overflow-y-auto py-2 px-4 space-y-1">
          {/* Seção de Busca do Transporte */}
          <div className="space-y-1 mb-4">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-500" />
              Buscar Transporte
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Digite o número do transporte..."
                value={transporte?.numeroTransporte || transporteId}
                onChange={(e) => setTransporteId(e.target.value)}
                className="h-12 pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Layout de duas colunas quando transporte selecionado */}
          {transporteId && transporte && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Coluna da Esquerda - Informações do Transporte */}
              <div className="space-y-0">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-800">Informações do Transporte</h3>
                </div>
                <div className="border border-gray-200 rounded-lg bg-gray-50">
                  <InfoTransporte transporte={transporte} />
                </div>
              </div>

              {/* Coluna da Direita - Formulário */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-orange-500" />
                  <h3 className="font-semibold text-gray-800">Dados da Carga Parada</h3>
                </div>
                <div className="border border-gray-200 rounded-lg bg-white">
                  <div className="p-4">
                    <FormAddCargaParada form={form} handleFormSubmit={handleFormSubmit} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Estado vazio - quando não há transporte selecionado */}
          {!transporteId && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum transporte selecionado
              </h3>
              <p className="text-gray-500 max-w-sm">
                Digite o número do transporte acima para visualizar as informações e registrar a carga parada.
              </p>
            </div>
          )}
        </div>

        {/* Footer Fixo */}
        <SheetFooter className="p-6 pt-4 border-t border-gray-200 bg-white sticky bottom-0">
          <div className="flex gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-300"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={form.handleSubmit(handleFormSubmit)}
              disabled={!transporteId || (transporte && transporte?.cargaParada === true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Confirmar Registro
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}