import { Button } from '@/_shared/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_shared/_components/ui/dialog';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useUserOperations } from '../hooks/useUserOperations';
import { Input } from '@/_shared/_components/ui/input';
import { UserDtoOutput } from '@/_services/api/model';
import { Label } from '@/_shared/_components/ui/label';
import { useResetSenha } from '../hooks/resetSenha';

export default function ResetPassword({ user }: { user: UserDtoOutput }) {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const { handleResetPassword, isResetPassword, open, setOpen } = useResetSenha();

  function handleEdit() {
    handleResetPassword(user.id, password);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer gap-2 rounded-sm p-1">
          <Lock className="h-4 w-4" />
          <span>Resetar Senha</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Resetar Senha</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informações do usuário */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Informações do Usuário</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div>
                <span className="font-semibold">ID:</span>
                <p className="text-muted-foreground">{user.id}</p>
              </div>
              <div>
                <span className="font-semibold">Nome:</span>
                <p className="text-muted-foreground">{user.name}</p>
              </div>
            </div>
          </div>

          {/* Campo de senha */}
          <div className="space-y-2">
            <Label htmlFor="new-password">Nova Senha</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a nova senha"
                aria-describedby="password-help"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-7 w-7"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p id="password-help" className="text-muted-foreground text-xs">
              A senha será redefinida para este usuário
            </p>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleEdit}
            disabled={!password.trim() || isResetPassword}
          >
            {isResetPassword ? 'Resetando...' : 'Confirmar'}
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
