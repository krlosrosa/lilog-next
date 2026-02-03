import { ClipboardPlus, PlayCircle, CheckCircle, Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { formatarDataUTC } from "@/_shared/utils/convertHourUtc";
import { format } from "date-fns";

interface TimelineStep {
  id: string;
  label: string;
  date: string | null;
  completed: boolean;
}

interface ProcessTimelineProps {
  steps: TimelineStep[];
}

const stepIcons = {
  cadastrado: ClipboardPlus,
  iniciou_conferencia: PlayCircle,
  terminou_conferencia: CheckCircle,
  finalizado: Flag,
};

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Timeline do Processo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Desktop: Horizontal */}
          <div className="hidden md:flex items-start justify-between">
            {steps.map((step, index) => {
              const Icon = stepIcons[step.id as keyof typeof stepIcons] || CheckCircle;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.id} className="flex flex-col items-center flex-1 relative">
                  {/* Connector line */}
                  {!isLast && (
                    <div 
                      className={`absolute top-5 left-1/2 w-full h-0.5 ${
                        step.completed ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                  
                  {/* Icon circle */}
                  <div 
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      step.completed 
                        ? "border-primary bg-primary text-primary-foreground" 
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  {/* Label and date */}
                  <div className="mt-3 text-center">
                    <p className={`text-sm font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.label}
                    </p>
                      {step.date && (
                      <p className="mt-1 text-xs text-muted-foreground">{format(formatarDataUTC(step?.date), "dd/MM/yyyy 'às' HH:mm")}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile: Vertical */}
          <div className="flex flex-col gap-4 md:hidden">
            {steps.map((step, index) => {
              const Icon = stepIcons[step.id as keyof typeof stepIcons] || CheckCircle;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.id} className="flex items-start gap-4 relative">
                  <div className="flex flex-col items-center">
                    {/* Icon circle */}
                    <div 
                      className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        step.completed 
                          ? "border-primary bg-primary text-primary-foreground" 
                          : "border-border bg-background text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    {/* Vertical connector */}
                    {!isLast && (
                      <div 
                        className={`w-0.5 h-8 mt-2 ${
                          step.completed ? "bg-primary" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="pt-2">
                    <p className={`text-sm font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                      {step.label}
                    </p>
                    {step.date && (
                      <p className="text-xs text-muted-foreground">{step.date}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
