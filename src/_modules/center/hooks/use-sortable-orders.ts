'use client';

import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { CAMPOS_DISPONIVEIS } from '../components/config/constants';

interface UseSortableOrdersProps {
  ordemAtual: string[] | null;
  onOrderChange: (newOrder: string[] | null) => void;
}

export const useSortableOrders = ({
  ordemAtual,
  onOrderChange,
}: UseSortableOrdersProps) => {
  const ordem = ordemAtual || [];

  // Separa campos marcados e não marcados
  const camposMarcados = ordem.filter((c) =>
    CAMPOS_DISPONIVEIS.includes(c as any),
  );
  const camposNaoMarcados = CAMPOS_DISPONIVEIS.filter(
    (c) => !ordem.includes(c),
  );
  const todosCampos = [...camposMarcados, ...camposNaoMarcados];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = todosCampos.indexOf(active.id as string);
    const newIndex = todosCampos.indexOf(over.id as string);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(todosCampos, oldIndex, newIndex);
    const novosMarcados = reordered.filter((c) => ordem.includes(c));
    onOrderChange(novosMarcados.length > 0 ? novosMarcados : null);
  };

  const handleToggleField = (campo: string, checked: boolean) => {
    if (checked) {
      const updated = [...ordem, campo];
      onOrderChange(updated);
    } else {
      const updated = ordem.filter((item) => item !== campo);
      onOrderChange(updated.length > 0 ? updated : null);
    }
  };

  return {
    ordem,
    todosCampos,
    handleDragEnd,
    handleToggleField,
  };
};
