import { useState } from "react";
import { Card, CardContent } from "@/_shared/_components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/_shared/_components/ui/collapsible";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/_shared/_components/ui/table";
import { ClipboardList, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConferenceItem {
  id: string;
  codigo: string;
  descricao: string;
  caixasConferida: number;
  caixasContabil: number;
  unidadesConferida: number;
  unidadesContabil: number;
}

interface ConferenceTableProps {
  items: ConferenceItem[];
}

function formatDiff(value: number) {
  return value > 0 ? `+${value}` : value;
}

export function ConferenceTable({ items }: ConferenceTableProps) {
  const [isOpen, setIsOpen] = useState(true);
  const totals = items.reduce(
    (acc, item) => ({
      caixasConferida: acc.caixasConferida + item.caixasConferida,
      caixasContabil: acc.caixasContabil + item.caixasContabil,
      unidadesConferida: acc.unidadesConferida + item.unidadesConferida,
      unidadesContabil: acc.unidadesContabil + item.unidadesContabil,
    }),
    { caixasConferida: 0, caixasContabil: 0, unidadesConferida: 0, unidadesContabil: 0 }
  );

  const totalDiffCaixas = totals.caixasConferida - totals.caixasContabil;
  const totalDiffUnidades = totals.unidadesConferida - totals.unidadesContabil;

  return (
    <Card className="shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardContent className="p-0">
          <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 px-6 py-4 text-left hover:bg-muted/50 transition-colors rounded-t-lg">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              <span className="font-semibold text-lg">Tabela de Conferência</span>
              {items.length > 0 && (
                <span className="text-sm text-muted-foreground">({items.length} itens)</span>
              )}
            </div>
            {isOpen ? (
              <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 pt-0">
              <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px]">Código</TableHead>
                <TableHead className="min-w-[180px]">Descrição</TableHead>
                <TableHead colSpan={3} className="text-center bg-muted/50">
                  Caixas
                </TableHead>
                <TableHead colSpan={3} className="text-center bg-muted/50">
                  Unidades
                </TableHead>
                <TableHead className="w-14 text-center">Status</TableHead>
              </TableRow>
              <TableRow>
                <TableHead></TableHead>
                <TableHead></TableHead>
                <TableHead className="text-right">Conferida</TableHead>
                <TableHead className="text-right">Contábil</TableHead>
                <TableHead className="text-right">Diferença</TableHead>
                <TableHead className="text-right">Conferida</TableHead>
                <TableHead className="text-right">Contábil</TableHead>
                <TableHead className="text-right">Diferença</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                    Nenhum item conferido
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => {
                  const diffCaixas = item.caixasConferida - item.caixasContabil;
                  const diffUnidades = item.unidadesConferida - item.unidadesContabil;
                  const isMatch = diffCaixas === 0 && diffUnidades === 0;

                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.codigo}</TableCell>
                      <TableCell>{item.descricao}</TableCell>
                      <TableCell className="text-right">{item.caixasConferida}</TableCell>
                      <TableCell className="text-right">{item.caixasContabil}</TableCell>
                      <TableCell
                        className={cn(
                          "text-right font-medium",
                          diffCaixas === 0 ? "text-success" : "text-destructive"
                        )}
                      >
                        {formatDiff(diffCaixas)}
                      </TableCell>
                      <TableCell className="text-right">{item.unidadesConferida}</TableCell>
                      <TableCell className="text-right">{item.unidadesContabil}</TableCell>
                      <TableCell
                        className={cn(
                          "text-right font-medium",
                          diffUnidades === 0 ? "text-success" : "text-destructive"
                        )}
                      >
                        {formatDiff(diffUnidades)}
                      </TableCell>
                      <TableCell className="text-center">
                        {isMatch ? (
                          <CheckCircle className="h-5 w-5 text-success mx-auto" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-destructive mx-auto" />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
            {items.length > 0 && (
              <TableFooter>
                <TableRow className="bg-muted/50 font-semibold">
                  <TableCell colSpan={2}>Totais</TableCell>
                  <TableCell className="text-right">{totals.caixasConferida}</TableCell>
                  <TableCell className="text-right">{totals.caixasContabil}</TableCell>
                  <TableCell
                    className={cn(
                      "text-right",
                      totalDiffCaixas === 0 ? "text-success" : "text-destructive"
                    )}
                  >
                    {formatDiff(totalDiffCaixas)}
                  </TableCell>
                  <TableCell className="text-right">{totals.unidadesConferida}</TableCell>
                  <TableCell className="text-right">{totals.unidadesContabil}</TableCell>
                  <TableCell
                    className={cn(
                      "text-right",
                      totalDiffUnidades === 0 ? "text-success" : "text-destructive"
                    )}
                  >
                    {formatDiff(totalDiffUnidades)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </div>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
}
