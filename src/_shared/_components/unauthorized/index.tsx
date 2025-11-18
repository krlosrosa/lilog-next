import { ShieldX } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/_shared/_components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_shared/_components/ui/card';

export default function UnauthorizedComponent() {
  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl space-y-6">
        {/* Ícone e Título */}
        <div className="space-y-4 text-center">
          <div className="bg-destructive/10 mx-auto flex h-24 w-24 animate-pulse items-center justify-center rounded-full">
            <ShieldX className="text-destructive h-12 w-12" />
          </div>
          <div className="space-y-2">
            <h1 className="text-foreground text-4xl font-bold tracking-tight">
              Acesso Negado
            </h1>
            <p className="text-muted-foreground text-xl">
              Você não tem permissão para acessar esta página
            </p>
          </div>
        </div>

        {/* Alert de Erro */}
        <Alert variant="destructive" className="border-destructive/50">
          <ShieldX className="h-4 w-4" />
          <AlertTitle className="font-semibold">
            Erro 403 - Não Autorizado
          </AlertTitle>
          <AlertDescription className="mt-2">
            Suas credenciais atuais não permitem o acesso a este recurso. Entre
            em contato com o administrador do sistema se você acredita que
            deveria ter acesso.
          </AlertDescription>
        </Alert>

        {/* Card com Informações */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-center">Possíveis razões</CardTitle>
            <CardDescription className="text-center">
              Por que você pode estar vendo esta mensagem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-destructive mt-1">•</span>
                <span>
                  Você não possui as permissões necessárias para acessar este
                  recurso
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive mt-1">•</span>
                <span>Sua sessão pode ter expirado ou ter sido encerrada</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive mt-1">•</span>
                <span>
                  Esta área é restrita a determinados níveis de usuário
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive mt-1">•</span>
                <span>
                  O centro selecionado não possui permissões para esta
                  funcionalidade
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Mensagem Final */}
        <div className="space-y-2 pt-4 text-center">
          <p className="text-muted-foreground text-sm">
            Se você acredita que esta é uma mensagem de erro, por favor entre em
            contato com o suporte técnico ou o administrador do sistema.
          </p>
        </div>
      </div>
    </div>
  );
}
