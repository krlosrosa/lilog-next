import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_shared/_components/ui/dialog";
import { Badge } from "@/_shared/_components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import useBuscarInfoPorTransporte from "../hooks/buscarInfoPorTransporte";
import { Button } from "@/_shared/_components/ui/button";
import { Eye, Loader2, Truck, MapPin, Building2, Calendar, AlertCircle, Package, ClipboardCheck } from "lucide-react";
import { StatusIcon } from "./table/columnsTransporte";
import InfoTransporte from "./detalhamentoTransporte/infoTransporte";
import { ResultTransporteDtoOutput } from "@/_services/api/model";
import TimeLine from "./detalhamentoTransporte/timeLine";
import InfoPalete from "./detalhamentoTransporte/infoPalete";
import { useState } from "react";
import ListarClientes from "./detalhamentoTransporte/listarClientes";
import ItensCortados from "./detalhamentoTransporte/itensCortados";

interface ModalDetalhamentoTransporteProps {
  transporteId: string;
}

type StatusType = 'NAO_INICIADO' | 'EM_PROGRESSO' | 'CONCLUIDO';

export default function ModalDetalhamentoTransporte({
  transporteId,
}: ModalDetalhamentoTransporteProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm"> {/* Ajustei estilo para caber melhor na tabela */}
          <Eye className="h-4 w-4 mr-2" />
          Detalhamento
        </Button>
      </DialogTrigger>
      
      <DialogContent className="min-w-10/12 max-h-[90vh] overflow-y-auto">
        {/* TRUQUE: O componente ConteudoDetalhamento só existe no DOM 
           se isOpen for true. Isso impede que o hook rode antes da hora.
        */}
        {isOpen && <ConteudoDetalhamento transporteId={transporteId} />}
      </DialogContent>
    </Dialog>
  );
}


function ConteudoDetalhamento({ transporteId }: { transporteId: string }) {
  // Assumindo que o hook busca automaticamente ao montar
  const { transporte, isLoading } = useBuscarInfoPorTransporte(transporteId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Detalhamento do Transporte
        </DialogTitle>
      </DialogHeader>
      
      <div className="mt-4 space-y-2">
        {/* Adicionei verificação de existência para evitar erro se transporte for null */}
        {transporte && <TimeLine transporte={transporte} />}
        {transporte && <InfoTransporte transporte={transporte} />}
        <ListarClientes clientes={transporte?.clientes || []} />
        <ItensCortados cortes={transporte?.cortes || []} />
        <InfoPalete paletes={transporte?.paletes || []} />
      </div>
    </>
  );
}