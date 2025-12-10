import { Plus } from 'lucide-react';
import { Button } from './button';


export default function FloatButton() {
  return (
    <div className="fixed right-6 bottom-6 z-50">
      <Button
        size="lg"
        className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 w-14 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
        aria-label="Criar nova demanda"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
