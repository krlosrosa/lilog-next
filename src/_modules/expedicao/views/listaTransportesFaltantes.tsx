import { AlertTriangle, Plus } from 'lucide-react';
import { AlertTitle } from '@/_shared/_components/ui/alert';
import { AlertDescription } from '@/_shared/_components/ui/alert';
import { Alert } from '@/_shared/_components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
} from '@/_shared/_components/ui/card';
import { CardHeader } from '@/_shared/_components/ui/card';
import { PackageX } from 'lucide-react';
import { CardTitle } from '@/_shared/_components/ui/card';
import { Badge } from '@/_shared/_components/ui/badge';
import { AddTransportes } from '../components/addTransportes';

export function ListaTransportesFaltantes({
  transportesFaltantes,
}: {
  transportesFaltantes: string[];
}) {
  return (
    <div className="space-y-2">
      {transportesFaltantes.length > 0 && (
        <Alert
          variant="destructive"
          className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20"
        >
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertTitle className="text-amber-900 dark:text-amber-100">
            Transportes não encontrados no banco de dados
          </AlertTitle>
          <AlertDescription className="mt-2 text-amber-800 dark:text-amber-200">
            Os seguintes transportes ainda não foram cadastrados no sistema e
            precisam ser adicionados antes de gerar os mapas.
          </AlertDescription>
        </Alert>
      )}

      {transportesFaltantes.length > 0 && (
        <Card className="border-amber-200 dark:border-amber-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <PackageX className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <CardTitle>Transportes Faltantes</CardTitle>
              <Badge variant="destructive" className="ml-auto">
                {transportesFaltantes.length}
              </Badge>
            </div>
            <CardDescription>
              Total de transportes que não estão cadastrados no banco de dados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {transportesFaltantes.map((transporteId) => (
                <Badge
                  key={transporteId}
                  variant="outline"
                  className="border-amber-300 bg-amber-50 px-3 py-1.5 font-mono text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950/30 dark:text-amber-100"
                >
                  {transporteId}
                </Badge>
              ))}
            </div>
            <div className="flex justify-end border-t pt-2">
              <AddTransportes transportesFaltantes={transportesFaltantes} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
