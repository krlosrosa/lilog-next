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
import { SelecionarProcesso } from '@/_shared/_components/ui/forms/listasForm/processo';
import { SelecionarEmpresa } from '@/_shared/_components/ui/forms/listasForm/empresa';
import { SelecionarTurno } from '@/_shared/_components/ui/forms/listasForm/turno';
import { useAddFuncionario } from '../../hooks/mutation/funcionarios/useAddFuncionario';

type Props = {
  children: React.ReactNode;
}

export default function AddNewFuncionario({ children }: Props) {
  const { form, handleAddFuncionario, isCreating, open, setOpen } = useAddFuncionario();


  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Funcionário</DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para criar um novo funcionário no
              sistema.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddFuncionario)}
              className="space-y-4"
            >
              <div className="space-y-4">
                {/* Informações Básicas */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormInputField
                    control={form.control}
                    label="ID do Funcionário"
                    name="id"
                    placeholder="Digite o ID único do funcionário"
                  />

                  <FormInputField
                    control={form.control}
                    label="Nome Completo"
                    name="name"
                    placeholder="Digite o nome completo"
                  />
                </div>

                {/* Seletores */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <SelecionarTurno
                    control={form.control}
                    label="Turno"
                    name="turno"
                  />

                  <SelecionarEmpresa
                    control={form.control}
                    label="Empresa"
                    name="empresa"
                  />
                </div>

                <SelecionarProcesso control={form.control} />
              </div>

              <DialogFooter className="flex flex-col gap-2 pt-4 sm:flex-row">
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
                  {isCreating ? 'Salvando...' : 'Adicionar Funcionário'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
