type KanbanColumnHeaderProps = {
  title: string;
  total: number;
  emAndamento: number;
  concluidos: number;
  naoIniciados: number;
  variant?: 'primary' | 'secondary' | 'accent';
}

const variantStyles = {
  primary: {
    bg: 'bg-primary/10',
    text: 'text-primary',
  },
  secondary: {
    bg: 'bg-secondary/10',
    text: 'text-secondary-foreground',
  },
  accent: {
    bg: 'bg-accent/10',
    text: 'text-accent-foreground',
  },
};

export default function KanbanColumnHeader({
  title,
  total,
  emAndamento,
  concluidos,
  naoIniciados,
  variant = 'primary',
}: KanbanColumnHeaderProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`${styles.bg} border-b-2 border-border px-4 py-1`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col">
          <h2 className={`text-lg font-bold ${styles.text}`}>{title}</h2>
          <span className="text-xs font-semibold text-foreground mt-1">
            Total: <span className="font-bold text-base">{total}</span>
          </span>
        </div>
        <div className="flex flex-col text-xs text-right">
          <span className="text-blue-600 font-medium">
            Em Andamento: <span className="font-bold text-base">{emAndamento}</span>
          </span>
          <span className="text-green-600 font-medium">
            Concluídos: <span className="font-bold text-base">{concluidos}</span>
          </span>
          <span className="text-muted-foreground font-medium">
            Não Iniciados: <span className="font-bold text-base">{naoIniciados}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

