import { Button } from "@/_shared/_components/ui/button";
import { FileText, Printer } from "lucide-react";

interface PageHeaderProps {
  title: string;
  handle: () => void;
  description?: string;
  isLoading: boolean;
  titleButton: string;
  enablePrint?: boolean;
  isPrinting?: boolean;
  component?: React.ReactNode;
}

export function PageHeaderMapa({
  title,
  description,
  handle,
  isLoading,
  titleButton,
  enablePrint = true,
  component,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-xs">
            {description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={handle} disabled={isLoading}>
          <FileText className="h-4 w-4" />
          {isLoading ? 'Processando...' : titleButton}
        </Button>
        {enablePrint && component}
      </div>
    </div>
  );
}
