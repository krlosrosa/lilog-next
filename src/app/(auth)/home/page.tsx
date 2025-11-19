'use client'
import { Building2, Menu } from "lucide-react";
import { Card, CardContent } from "@/_shared/_components/ui/card";
import { useUser } from "@/_shared/providers/UserContext";

export default function SelecionarCentroPage() {
  const { user } = useUser();

  const centerSelected = user?.centerSelect;
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="w-full max-w-md">
        <Card className="border-blue-200/50 shadow-lg shadow-blue-100/50">
          <CardContent className="p-8 text-center">
            {/* Ícone e Título */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            
            <h1 className="mb-2 text-xl font-bold text-slate-800">
              {centerSelected ? `Centro: ${centerSelected}` : 'Bem-vindo ao Sistema'}
            </h1>

            {/* Mensagem principal */}
            <p className="mb-6 text-slate-600 text-sm leading-relaxed">
              {centerSelected 
                ? 'Use o menu lateral para navegar entre as funcionalidades do sistema'
                : 'Selecione um centro de operações no menu lateral para começar'
              }
            </p>

            {/* Indicador do menu lateral */}
            <div className="flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-blue-50 border border-blue-200">
              <Menu className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                Menu Lateral
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Rodapé informativo */}
        <div className="text-center mt-4">
          <p className="text-xs text-slate-500">
            {centerSelected 
              ? 'Para alterar o centro, acesse o menu lateral' 
              : 'Navegue pelo menu para selecionar um centro'
            }
          </p>
        </div>
      </div>
    </div>
  );
}