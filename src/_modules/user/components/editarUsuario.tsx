import { Button } from '@/_shared/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_shared/_components/ui/dialog';
import { useUser } from '@/_shared/providers/UserContext';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { useUserOperations } from '../hooks/useUserOperations';
import { Input } from '@/_shared/_components/ui/input';
import { SimpleSelect } from '@/_shared/_components/ui/SelectSimples';
import { EditUserDtoTurno, UserDtoOutput } from '@/_services/api/model';

const opcoesTurno = [
  {
    label: 'manhã',
    value: 'MANHA',
  },
  {
    label: 'tarde',
    value: 'TARDE',
  },
  {
    label: 'noite',
    value: 'NOITE',
  },
  {
    label: 'intermédiario',
    value: 'INTERMEDIARIO',
  },
];

export default function EditarUser({ user }: { user: UserDtoOutput }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(user.name);
  const [turno, setTurno] = useState<string>(user.turno);
  const { operations } = useUserOperations();

  function handleEdit() {
    operations.editarUser({
      id: user.id,
      data: {
        name,
        turno: turno as EditUserDtoTurno,
      },
    });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex w-full gap-2 p-1">
          <Edit className="h-4 w-4" />
          <span>Editar</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
        </DialogHeader>
        Informe o nome
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <SimpleSelect value={turno} onChange={setTurno} options={opcoesTurno} />
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleEdit}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
