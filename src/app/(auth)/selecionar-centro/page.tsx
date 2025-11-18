import { AlertCircle, Building2 } from "lucide-react";
import { Alert, AlertDescription } from "@/_shared/_components/ui/alert";
import { Card, CardContent } from "@/_shared/_components/ui/card";

export default function SelecionarCentroPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Card Principal */}
        <Card className="border-blue-200/50 shadow-lg shadow-blue-100/50">
          <CardContent className="p-8 text-center">
            {/* Ícone decorativo */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <Building2 className="h-10 w-10 text-blue-600" />
            </div>
            
            {/* Título */}
            <h1 className="mb-3 text-2xl font-bold text-slate-800">
              Selecione um Centro
            </h1>
            
            {/* Descrição */}
            <p className="mb-6 text-slate-600 leading-relaxed">
              Para acessar todas as funcionalidades do sistema, você precisa selecionar um centro de operações.
            </p>

            {/* Alert informativo */}
            <Alert className="bg-blue-50 border-blue-200 text-blue-800 mb-6">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-sm">
                Utilize o menu lateral para escolher o centro desejado
              </AlertDescription>
            </Alert>

            {/* Instrução visual */}
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-2">
              <div className="h-px w-8 bg-slate-300"></div>
              <span>Clique no menu</span>
              <div className="h-px w-8 bg-slate-300"></div>
            </div>
            
            {/* Indicador visual do menu lateral */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 border border-slate-200">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium text-slate-700">Menu Lateral</span>
            </div>
          </CardContent>
        </Card>

        {/* Dica adicional */}
        <div className="text-center">
          <p className="text-xs text-slate-500">
            Se não conseguir visualizar o menu, verifique se está logado corretamente
          </p>
        </div>
      </div>
    </div>
  );
}
