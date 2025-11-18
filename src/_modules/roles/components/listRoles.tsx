'use client';
import { useRoleOperations } from '../hooks/useRoleOperations';
import { columnsRole } from './tableRole/columnsRole';
import { DataTableRole } from './tableRole/data-table-role';

export default function ListarRoles() {
  const { operations, isLoading } = useRoleOperations();
  const roles = operations.buscarRoles;

  if (isLoading) return <div></div>;

  return (
    <div>{roles && <DataTableRole columns={columnsRole} data={roles} />}</div>
  );
}
