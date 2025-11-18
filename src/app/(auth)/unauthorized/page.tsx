import { ShieldX, ArrowLeft, Home } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/_shared/_components/ui/alert';
import { Button } from '@/_shared/_components/ui/button';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Ícone e Título */}
        <div className="space-y-4 text-center">
          <div className="bg-destructive/10 mx-auto flex h-20 w-20 items-center justify-center rounded-full">
            <ShieldX className="text-destructive h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Acesso Negado</h1>
            <p className="text-muted-foreground text-xl">
              Você não tem permissão para acessar esta página
            </p>
          </div>
        </div>

        {/* Alert de Erro */}
        <Alert variant="destructive">
          <ShieldX className="h-4 w-4" />
          <AlertTitle>Erro 403 - Não Autorizado</AlertTitle>
          <AlertDescription>
            Suas credenciais atuais não permitem o acesso a este recurso. Entre
            em contato com o administrador do sistema se você acredita que
            deveria ter acesso.
          </AlertDescription>
        </Alert>

        {/* Possíveis Razões */}
        <div className="space-y-3 text-center">
          <p className="text-foreground font-semibold">Possíveis razões:</p>
          <ul className="text-muted-foreground space-y-2">
            <li>Você não possui as permissões necessárias</li>
            <li>Sua sessão pode ter expirado</li>
            <li>Esta área é restrita a determinados usuários</li>
          </ul>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Ir para Início
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
