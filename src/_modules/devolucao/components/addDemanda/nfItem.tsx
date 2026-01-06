import { ReturnInfoGeralRavexNotasItem, ReturnInfoGeralRavexNotasItemItensItem, ReturnInfoGeralRavexNotasItemTipo } from "@/_services/api/model";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { Badge } from "@/_shared/_components/ui/badge";
import { Separator } from "@/_shared/_components/ui/separator";
import { FileText, Package, User, Building, Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/_shared/_components/ui/collapsible";
import { useEffect, useState } from "react";
import TableEditavelItens from "./tableItens/tableEditavelItens";
import useAddNotaDevolucao from "../../hooks/useAddNotaDevolucao";
import { useParams } from "next/navigation";
import ModalConfirmacao from "../addNotaFiscal/modalConfirmacao";
import { Button } from "@/_shared/_components/ui/button";
import { useDevolucao } from "../../hooks/usedevolucao";

type NfItemProps = {
  nota: ReturnInfoGeralRavexNotasItem;
  idViagemRavex: string;
}


export default function NfItem({ nota, idViagemRavex }: NfItemProps) {
  const { id } = useParams();
  const { open, setOpen, handleAddNota, isAddingNota } = useAddNotaDevolucao();
  const { setNotaFiscal, nf, setViagemId } = useDevolucao();
  useEffect(() => {
    setNotaFiscal(nota.notaFiscal);
    setViagemId(idViagemRavex);
  }, [nota, idViagemRavex]);

  if (!nota) return null;
  const [itens, setItens] = useState<ReturnInfoGeralRavexNotasItemItensItem[]>([]);
  const [nfParcial, setNfParcial] = useState<string>('');

  const setItem = (item: ReturnInfoGeralRavexNotasItemItensItem) => {
    setItens(itens.map((i) => i.sku === item.sku ? item : i));
  };

  function handleAddNovaNota() {
    if (!nota || !itens) return;
    const newNota = {
      empresa: nota.empresa as 'LDB' | 'ITB' | 'DPA',
      devolucaoDemandaId: parseInt(id as string),
      notaFiscal: nota.notaFiscal,
      motivoDevolucao: nota.motivoDevolucao,
      descMotivoDevolucao: nota.descMotivoDevolucao ?? '',
      nfParcial: nfParcial ?? '',
      idViagemRavex: idViagemRavex,
      tipo: nota.tipo,
      itens: itens.map((i) => i.sku),
    }
    handleAddNota({
      ...newNota,
      itens: itens.map((item) => {
        return {
          ...item,
          demandaId: parseInt(id as string),
          tipo: newNota.tipo,
        }
      }),
    })
  }

  useEffect(() => {
    setItens(nota.itens ?? []);
  }, [nota]);


  return (
    <Collapsible>
      <Card className={`w-full p-2 border-l-4 ${nf ? 'border-l-green-500' : 'border-l-primary'}`}>
        <CollapsibleTrigger>
          <CardHeader className="pb-1 w-full m-0 ">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex items-center gap-3 w-full">
                <div className="p-0 bg-primary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="w-full">
                  <CardTitle className="flex items-center gap-2">
                    Nota Fiscal #{nota.notaFiscal}
                    {
                      nf && (
                        <Badge variant="default" className="ml-2">
                          Nota Já Adicionada
                        </Badge>
                      )
                    }
                    {nota.notaFiscalParcial && (
                      <Badge variant="outline" className="ml-2">
                        Parcial: {nota.notaFiscalParcial}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2 mt-1">

                      <Badge variant="outline">
                        {nota.tipo}
                      </Badge>
                      <span className="text-xs">•</span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {nota.operador || "Operador não informado"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {nota.empresa}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <ModalConfirmacao
                        nfParcial={nfParcial}
                        setNfParcial={setNfParcial}
                        open={open}
                        setOpen={setOpen}
                        handleConfirm={handleAddNovaNota}
                        tipo={nota.tipo}
                      >
                        <Button disabled={nf !== null && nf !== undefined} variant="default" className="gap-2">
                          <Plus className="h-4 w-4" />
                          Adicionar Nota Fiscal {JSON.stringify(nf)}
                        </Button>
                      </ModalConfirmacao>
                      <div className="flex flex-col items-end">
                        <p className="font-medium text-yellow-800 dark:text-yellow-300 text-sm">
                          Motivo de Devolução
                        </p>
                        <p className="text-yellow-700 dark:text-yellow-400 text-sm mt-1">
                          {nota.descMotivoDevolucao}
                        </p>
                      </div>
                    </div>

                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Separator className="my-0" />

          <CardContent className="">

            <div className="my-4">
              <div className="flex items-center gap-2 mb-3">
                <Package className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm text-muted-foreground">ITENS DA NOTA</h3>
              </div>
              <TableEditavelItens onChange={setItem} data={itens ?? []} />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}