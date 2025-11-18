import AddNewFuncionario from '@/_modules/produtividade/components/funcionario/addNewFuncionario';
import ListarUsuarioFuncionaio from '@/_modules/produtividade/components/funcionario/listarUsuarios';
import UploadUserFuncionarioFileModal from '@/_modules/produtividade/components/funcionario/uploadUserFileModal';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_shared/_components/ui/card';
import FloatButton from '@/_shared/_components/ui/floatButton';

export default function PageFuncionarios() {
  return (
    <div className="bg-background relative min-h-screen">
      <div className="container mx-auto space-y-6 p-6">
        {/* Tabela de funcionários dentro de um Card */}
        <Card className="border shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-semibold">
                  Lista de Funcionários
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  Gerencie todos os funcionários e suas informações de
                  produtividade
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {/* Modal de upload */}
                <UploadUserFuncionarioFileModal />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ListarUsuarioFuncionaio />
          </CardContent>
        </Card>
      </div>

      {/* Botão flutuante */}
      <div className="fixed right-6 bottom-6 z-50">
        <AddNewFuncionario>
          <div>
            <FloatButton />
          </div>
        </AddNewFuncionario>
      </div>
    </div>
  );
}
