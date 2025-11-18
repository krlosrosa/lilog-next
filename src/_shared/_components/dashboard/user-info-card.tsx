import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/_shared/_components/ui/card';
import { Badge } from '@/_shared/_components/ui/badge';
import { Avatar, AvatarFallback } from '@/_shared/_components/ui/avatar';

interface UserInfoCardProps {
  name: string;
  id: string;
  centers: string[];
  centerSelect: string | null;
  roles: string[];
}

export default function UserInfoCard({
  name,
  id,
  centers,
  centerSelect,
  roles,
}: UserInfoCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-base">{name}</CardTitle>
            <p className="text-muted-foreground text-sm">{id}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Centros:</span>
          <Badge variant="secondary">{centers.length}</Badge>
        </div>
        {centerSelect && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Centro Atual:</span>
            <Badge>{centerSelect}</Badge>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {roles && roles.length > 0 ? (
            roles.map((role, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {role}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-xs">
              Sem permissões
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
