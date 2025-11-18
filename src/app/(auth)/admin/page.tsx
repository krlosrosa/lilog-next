import { checkPermission } from '@/_shared/utils/checkPermission';
import UnauthorizedComponent from '@/_shared/_components/unauthorized';

export default async function AdminPage() {
  const { hasPermission } = await checkPermission('manage', 'all');

  if (!hasPermission) {
    return <UnauthorizedComponent />;
  }

  return (
    <div>
      <h1>Painel de Administração</h1>
    </div>
  );
}
