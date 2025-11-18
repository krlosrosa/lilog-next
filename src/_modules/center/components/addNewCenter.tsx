'use client';
import { Form } from '@/_shared/_components/ui/form';
import { Button } from '@/_shared/_components/ui/button';
import { FormInputField } from '@/_shared/_components/ui/forms/FormInputField';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/_shared/_components/ui/dialog';
import FloatButton from '@/_shared/_components/ui/floatButton';
import { useAddNewCenter } from '../hooks/mutation/useAddNewCenter';

export default function AddNewCenter() {
  const { form, handleAddNewCenter, isCreating, open, setOpen } = useAddNewCenter();


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <FloatButton />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Centro</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para criar um novo centro de distribuição.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddNewCenter)}
            className="space-y-4"
          >
            <div className="space-y-4">
              <FormInputField
                control={form.control}
                label="ID do Centro"
                name="centerId"
                placeholder="Digite o ID do centro"
              />
              <FormInputField
                control={form.control}
                label="Descrição"
                name="description"
                placeholder="Digite a descrição do centro"
              />
              <FormInputField
                control={form.control}
                label="Estado"
                name="state"
                placeholder="Digite o estado"
              />
              <FormInputField
                control={form.control}
                label="Cluster"
                name="cluster"
                placeholder="Digite o cluster"
              />
            </div>

            <DialogFooter className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isCreating}
                className="w-full sm:w-auto"
              >
                {isCreating ? 'Salvando...' : 'Adicionar Centro'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
