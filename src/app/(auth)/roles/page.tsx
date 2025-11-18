import AddNewRole from '@/_modules/roles/components/addNewRole';
import ListarRoles from '@/_modules/roles/components/listRoles';

export default function PageRoles() {
  return (
    <div className="p-2">
      <AddNewRole />
      <ListarRoles />
    </div>
  );
}
