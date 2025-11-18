'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Checkbox } from '@/_shared/_components/ui/checkbox';
import { Label } from '@/_shared/_components/ui/label';
import { GripVertical } from 'lucide-react';

interface SortableItemProps {
  id: string;
  campo: string;
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
  prefix: string;
}

export const SortableItem = ({
  id,
  campo,
  isChecked,
  onCheckedChange,
  prefix,
}: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="hover:bg-accent flex items-center space-x-2 rounded p-1.5"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none active:cursor-grabbing"
      >
        <GripVertical className="text-muted-foreground h-4 w-4" />
      </div>
      <Checkbox
        id={`${prefix}-${campo}`}
        checked={isChecked}
        onCheckedChange={onCheckedChange}
      />
      <Label
        htmlFor={`${prefix}-${campo}`}
        className="flex-1 cursor-pointer text-xs font-normal capitalize"
      >
        {campo}
      </Label>
    </div>
  );
};
