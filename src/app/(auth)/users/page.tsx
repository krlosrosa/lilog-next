import AddNewUser from '@/_modules/user/components/addNewUser';
import ListarUsuario from '@/_modules/user/components/listarUsuarios';
import UploadUserFileModal from '@/_modules/user/components/uploadUserFileModal';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_shared/_components/ui/card';
import { checkPermission } from '@/_shared/utils/checkPermission';
import UnauthorizedComponent from '@/_shared/_components/unauthorized';

export default async function PageUsers() {
  const { hasPermission } = await checkPermission('admin', 'pessoal');

  if (!hasPermission) {
    return <UnauthorizedComponent />;
  }

  return (
    <div className="bg-background relative min-h-screen">
      <div className="container mx-auto space-y-6 p-6">
        {/* Tabela de usuários dentro de um Card */}
        <Card className="border shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-semibold">
                  Lista de Usuários
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Gerencie todos os usuários do sistema e suas permissões
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {/* Modal de upload */}
                <UploadUserFileModal />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ListarUsuario />
          </CardContent>
        </Card>
      </div>

      {/* Botão flutuante */}
      <div className="fixed right-6 bottom-6 z-50">
        <AddNewUser />
      </div>
    </div>
  );
}
