'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { ReturnInfoGeralRavex } from "@/_services/api/model";
import { Truck, User, Building2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/_shared/_components/ui/badge";
import { Input } from "@/_shared/_components/ui/input";
import { FormField, FormControl } from "@/_shared/_components/ui/form";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { addDemandaDevolucaoBody } from "@/_services/api/schema/devolucao/devolucao.zod";

interface ViagemInfoCardProps {
  infoViagem: ReturnInfoGeralRavex;
  form: UseFormReturn<z.infer<typeof addDemandaDevolucaoBody>>;
}

export function ViagemInfoCard({ infoViagem, form }: ViagemInfoCardProps) {
  if (!infoViagem) return null;

  return (
    <Card className="border-primary/20 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Informações da Viagem
          </CardTitle>
          <Badge variant="outline" className="font-mono">
            ID: {infoViagem.idViagem}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Placa - Editável */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Placa do Veículo
            </label>
            <FormField
              control={form.control}
              name="placa"
              render={({ field }) => (
                <Input
                  {...field}
                  className="font-mono font-semibold h-10"
                  placeholder="ABC-1234"
                />
              )}
            />
          </div>

          {/* Motorista */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              Motorista
            </label>
            <div className="h-10 px-3 py-2 bg-muted/50 rounded-md border flex items-center">
              <span className="text-sm font-medium text-foreground">
                {infoViagem.motorista}
              </span>
            </div>
          </div>

          {/* Transportadora */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Transportadora
            </label>
            <div className="h-10 px-3 py-2 bg-muted/50 rounded-md border flex items-center">
              <span className="text-sm font-medium text-foreground">
                {infoViagem.transportadora}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
