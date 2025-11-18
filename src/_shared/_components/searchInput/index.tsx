'use client';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useUpdateSearchParam } from '@/_shared/hooks/useUpdateSearchParams';
import { CanWithCenter } from '@/_shared/providers/casl/CanWithCenter';

export default function SearchInput() {
  const { setValue, value } = useUpdateSearchParam('search');
  const { setValue: setTipo, value: tipo } = useUpdateSearchParam('tipo');

  // roles: ['ver:estoque:pavuna', 'deletar:estoque:pavuna']

  return (
    <div>
      <Search />
      <CanWithCenter acao="ver" recurso="estoque" centro={'pavuna'}>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="search"
          placeholder="Busque por nome"
        />
      </CanWithCenter>
      <Input
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        type="search"
        placeholder="Busque por nome"
      />
    </div>
  );
}
