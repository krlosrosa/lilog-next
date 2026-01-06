import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/_components/ui/card"
import { Badge } from "@/_shared/_components/ui/badge" 
import { Separator } from "@/_shared/_components/ui/separator"
import { 
  User, 
  Truck, 
  Building2, 
  Package,
  Hash
} from "lucide-react"

type HeaderRavexProps = {
  idViagem: string;
  motorista: string;
  placa: string;
  transportadora: string;
}

export default function HeaderRavex({ idViagem, motorista, placa, transportadora }: HeaderRavexProps) {
  return (
    <Card className="w-full shadow-md border-border">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl sm:text-2xl">Detalhes da Viagem</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Informações da operação logística
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <Badge variant="outline" className="px-3 py-1 text-base font-semibold">
              {idViagem}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <Separator />
      
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Motorista */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-card border">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Motorista</p>
              <p className="text-lg font-semibold">{motorista}</p>
            </div>
          </div>
          
          {/* Placa */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-card border">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-md">
              <Truck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Placa do Veículo</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold tracking-wider uppercase">{placa}</p>
              </div>
            </div>
          </div>
          
          {/* Transportadora */}
          <div className="flex items-start gap-3 p-3 rounded-lg bg-card border">
            <div className="p-2 bg-violet-50 dark:bg-violet-900/20 rounded-md">
              <Building2 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Transportadora</p>
              <p className="text-lg font-semibold">{transportadora}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}