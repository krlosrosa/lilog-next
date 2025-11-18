import { checkPermission } from '@/_shared/utils/checkPermission';
import UnauthorizedComponent from '@/_shared/_components/unauthorized';
import AddNewCenter from '@/_modules/center/components/addNewCenter';
import ListarAllCenter from '@/_modules/center/components/listAllCenters';

export default async function PageCenter() {
  const { hasPermission } = await checkPermission('manage', 'all');

  if (!hasPermission) {
    return <UnauthorizedComponent />;
  }
  return (
    <div className="p-2">
      <ListarAllCenter />
      <AddNewCenter />
    </div>
  );
}
