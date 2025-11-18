'use client';

import { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/_shared/_components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shared/_components/ui/select';
import { Checkbox } from '@/_shared/_components/ui/checkbox';
import { CORES_FIFO } from '../constants';
import { FormValues } from '../types';

interface OutrasConfiguracoesProps {
  control: Control<FormValues>;
}

export const OutrasConfiguracoes = ({ control }: OutrasConfiguracoesProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Outras Configurações</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="exibirInfoCabecalho"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exibir Info no Cabeçalho</FormLabel>
              <Select
                onValueChange={(value) =>
                  field.onChange(value === 'null' ? null : value)
                }
                value={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="NENHUM">Nenhum</SelectItem>
                  <SelectItem value="PRIMEIRO">Primeiro</SelectItem>
                  <SelectItem value="TODOS">Todos</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="segregarFifo"
          render={() => (
            <FormItem>
              <FormLabel>Segregar por FIFO</FormLabel>
              <div className="flex items-center gap-4 rounded-lg border p-3">
                {CORES_FIFO.map((cor) => (
                  <FormField
                    key={cor}
                    control={control}
                    name="segregarFifo"
                    render={({ field }) => {
                      const current = field.value || [];
                      const isChecked = current.includes(cor);
                      return (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const updated = checked
                                  ? [...current, cor]
                                  : current.filter((item) => item !== cor);
                                field.onChange(
                                  updated.length > 0 ? updated : null,
                                );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer text-sm capitalize">
                            {cor}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
