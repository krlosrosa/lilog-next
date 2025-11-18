'use client';

import { useGetAllCenter } from '../hooks/queries/useGetAllCenter';
import { useCentroOperations } from '../hooks/useCenterOperations';
import { columnsCenter } from './tableCenter/columnsCenter';
import { DataTableCenter } from './tableCenter/data-table-center';

export default function ListarAllCenter() {
  const { getAllCenters, isLoading } = useGetAllCenter();
  if(isLoading) {
    return <div>Carregando...</div>;
  }
  return (
    <div>{getAllCenters && <DataTableCenter columns={columnsCenter} data={getAllCenters} />}</div>
  );
}
