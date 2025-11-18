'use client';
import { Form } from '@/_shared/_components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/_shared/_components/ui/button';
import { FormInputField } from '@/_shared/_components/ui/forms/FormInputField';
import z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/_shared/_components/ui/dialog';
import { useState } from 'react';
import FloatButton from '@/_shared/_components/ui/floatButton';
import { criarRoleParams } from '@/_services/api/schema/user/user.zod';
import { useRoleOperations } from '../hooks/useRoleOperations';

type InputRole = z.infer<typeof criarRoleParams>;
export default function AddNewRole() {
  const [open, setOpen] = useState(false);
  const form = useForm<InputRole>({
    resolver: zodResolver(criarRoleParams),
  });
  const { operations, isLoading } = useRoleOperations();

  function handleAddRole(data: InputRole) {
    operations.addRole(
      { id: data.id },
      {
        onSuccess: () => {
          form.reset();
          setOpen(false);
        },
      },
    );
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>
            <FloatButton />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Cadastro de Role</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddRole)}>
              <div className="flex w-full flex-col gap-4 p-4">
                <FormInputField control={form.control} label="id" name="id" />
                <Button disabled={isLoading} type="submit">
                  {isLoading ? 'Salvando' : 'Adicionar'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
