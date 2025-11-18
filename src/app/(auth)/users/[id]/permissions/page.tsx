import ListarProcessos from '@/_modules/permissoes/components/listarProcessos';
import { checkPermission } from '@/_shared/utils/checkPermission';
import UnauthorizedComponent from '@/_shared/_components/unauthorized';

export default async function PermissionPage() {
  const { hasPermission } = await checkPermission('gerente', 'all');

  if (!hasPermission) {
    return <UnauthorizedComponent />;
  }

  return (
    <div className="p-2">
      <ListarProcessos />
    </div>
  );
}
