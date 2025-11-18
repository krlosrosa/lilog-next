import { Button } from "@/_shared/_components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type TitleTabsProps = {
  title: string;
  description: string;
  icon: React.ReactNode;

  back?: {
    label: string;
    onClick: () => void;
  };

  next?: {
    label: string;
    onClick: () => void;
  };
};

export function TitleTabs({ title, description, icon, back, next }: TitleTabsProps) {
  return (
    <div className="flex justify-between items-start space-y-1">
      <div>
        <div className="flex items-center gap-2">
          {icon}
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        </div>

        <p className="text-muted-foreground text-xs">{description}</p>
      </div>

      {(back || next) && (
        <div className="flex items-center gap-2">
          {back && (
            <Button variant="outline" size="sm" onClick={back.onClick}>
              <ArrowLeft className="h-4 w-4" />
              {back.label}
            </Button>
          )}

          {next && (
            <Button variant="default" size="sm" onClick={next.onClick}>
              <ArrowRight className="h-4 w-4" />
              {next.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
