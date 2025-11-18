'use client';

import { useGetProdutividade } from '../hooks/queries/useGetProdutividade';
import { columnsProdutividade } from './tableProdutividade/columnsSeparacao';
import { DataTableProdutividade } from './tableProdutividade/data-table-produtividade';
import { Loader2 } from 'lucide-react';

export default function ListaProdutividade() {
  const { produtividade, isBuscandoProdutividade, filters } =
    useGetProdutividade();

  if (filters.dataRegistro === '' || filters.processo === '') {
    return <div>Selecione uma data e processo</div>;
  }

  return (
    <div>
      {isBuscandoProdutividade ? (
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        <>
          {produtividade && (
            <DataTableProdutividade
              columns={columnsProdutividade}
              data={produtividade}
            />
          )}
        </>
      )}
    </div>
  );
}
