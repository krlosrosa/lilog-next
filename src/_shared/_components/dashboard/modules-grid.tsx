import { Button } from '@/_shared/_components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_shared/_components/ui/card';
import {
  Home as HomeIcon,
  Settings,
  Users,
  ArrowRight,
  Building2,
} from 'lucide-react';
import Link from 'next/link';

interface Module {
  title: string;
  description: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

interface ModulesGridProps {
  modules: Module[];
}

export default function ModulesGrid({ modules }: ModulesGridProps) {
  if (modules.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        Nenhum módulo disponível para seu perfil
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {modules.map((module) => {
        const Icon = module.icon;
        return (
          <Card key={module.title} className="transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div
                className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${module.bgColor}`}
              >
                <Icon className={`h-5 w-5 ${module.color}`} />
              </div>
              <CardTitle className="text-lg">{module.title}</CardTitle>
              <CardDescription className="text-sm">
                {module.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={module.url}>
                  Acessar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
