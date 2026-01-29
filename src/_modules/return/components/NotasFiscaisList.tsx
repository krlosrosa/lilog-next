'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/_shared/_components/ui/card";
import { DataTableNfsCadastradas } from "@/_modules/devolucao/components/nfsCadatradas/data-table-Nf-cadastradas";
import { createColumnsNfsCadastradasReturn } from "./columnsNfsCadastradasReturn";
import { GetNotasDto } from "@/_services/api/model";
import { FileText, Loader2 } from "lucide-react";
import { Badge } from "@/_shared/_components/ui/badge";
import { useMemo } from "react";

interface NotasFiscaisListProps {
  notas: GetNotasDto[] | undefined;
  isLoading: boolean;
  onRemoveNota: (nota: GetNotasDto) => void;
}

export function NotasFiscaisList({ notas, isLoading, onRemoveNota }: NotasFiscaisListProps) {
  const notasArray = notas ?? [];

  // Estatísticas
  const stats = useMemo(() => ({
    total: notasArray.length,
    devolucao: notasArray.filter(n => n.tipo === 'DEVOLUCAO').length,
    devolucaoParcial: notasArray.filter(n => n.tipo === 'DEVOLUCAO_PARCIAL').length,
    reentrega: notasArray.filter(n => n.tipo === 'REENTREGA').length,
  }), [notasArray]);

  // Criar colunas com callback
  const columns = useMemo(
    () => createColumnsNfsCadastradasReturn(onRemoveNota),
    [onRemoveNota]
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Notas Fiscais Cadastradas
            </CardTitle>
            <CardDescription className="mt-1">
              Relação de todas as notas fiscais associadas a esta demanda
            </CardDescription>
          </div>
          {stats.total > 0 && (
            <Badge variant="secondary" className="text-sm">
              {stats.total} {stats.total === 1 ? 'nota' : 'notas'}
            </Badge>
          )}
        </div>

        {/* Estatísticas */}
        {stats.total > 0 && (
          <div className="flex items-center gap-4 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Devolução: {stats.devolucao}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Parcial: {stats.devolucaoParcial}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Reentrega: {stats.reentrega}
              </Badge>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Carregando notas fiscais...
              </p>
            </div>
          </div>
        ) : (
          <DataTableNfsCadastradas 
            columns={columns} 
            data={notasArray} 
          />
        )}
      </CardContent>
    </Card>
  );
}
