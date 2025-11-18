'use client';

import { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/_shared/_components/ui/form';
import { Input } from '@/_shared/_components/ui/input';
import { Label } from '@/_shared/_components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shared/_components/ui/select';
import { FormValues, Empresa } from '../types';

interface DadosBasicosProps {
  control: Control<FormValues>;
  empresa: Empresa;
  onEmpresaChange: (empresa: Empresa) => void;
}

export const DadosBasicos = ({
  control,
  empresa,
  onEmpresaChange,
}: DadosBasicosProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Dados Básicos</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input placeholder="ID da configuração" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Label>Empresa</Label>
          <Select
            value={empresa}
            onValueChange={(value) => onEmpresaChange(value as Empresa)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a empresa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DPA">DPA</SelectItem>
              <SelectItem value="ITB">ITB</SelectItem>
              <SelectItem value="LDB">LDB</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <FormField
          control={control}
          name="tipoImpressao"
          render={({ field }) => {
            // Garante que o valor seja uma string válida ou undefined
            // O Select do Radix UI precisa de undefined (não string vazia) quando não há valor
            const value = field.value && String(field.value).trim() !== '' ? String(field.value) : undefined;
            
            return (
              <FormItem>
                <FormLabel>Tipo de Impressão</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  value={value}
                  key={`tipoImpressao-${value || 'empty'}`} // Força re-render quando o valor mudar
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CLIENTE">Cliente</SelectItem>
                    <SelectItem value="TRANSPORTE">Transporte</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={control}
          name="dataMaximaPercentual"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Percentual de Data Máxima</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
