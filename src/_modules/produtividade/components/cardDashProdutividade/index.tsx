import { Card, CardContent, CardTitle } from '@/_shared/_components/ui/card';
import { styleVariants } from './CardDashBoard.variants';

type Props = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  type:
    | 'emAndamento'
    | 'concluidos'
    | 'totalProcessos'
    | 'totalCaixas'
    | 'produtividade';
};

export function CardDashBoard({ title, value, icon, type }: Props) {
  const styles = styleVariants[type] || styleVariants.default;

  return (
    <Card className={`border ${styles.card} transition-shadow hover:shadow-md`}>
      <CardContent className="p-3">
        <div className="mb-1 flex items-center justify-between">
          <CardTitle className={`text-md font-medium ${styles.title}`}>
            {title}
          </CardTitle>
          {icon}
        </div>
        <div className={`text-md font-bold ${styles.value}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
