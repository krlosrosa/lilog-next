'use client';

import { GetMovimentacaoDto } from "@/_services/api/model";
import { Button } from "@/_shared/_components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/_shared/_components/ui/dialog";
import { Input } from "@/_shared/_components/ui/input";
import { Label } from "@/_shared/_components/ui/label";
import { Edit, Warehouse, Palette, ArrowRight, Package } from "lucide-react";
import { useState } from "react";
import { useAtualizarDemandaMutation } from "../hooks/atualizarDemanda";
import toast from "react-hot-toast";

type ModalEditarDemandaProps = {
  demanda: GetMovimentacaoDto;
};

export default function ModalEditarDemanda({ demanda }: ModalEditarDemandaProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    palete: demanda.palete || '',
    origem: demanda.origem || '',
    destino: demanda.destino || '',
    prioridade: demanda.prioridade || 0,
    sku: demanda.sku || '',
    lote: demanda.lote || '',
    descricao: demanda.descricao || '',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const { atualizarDemanda, isAtualizandoDemanda } = useAtualizarDemandaMutation();

  function handleAtualizarDemanda() {
    atualizarDemanda(demanda.idMov, formData);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-primary" />
            Editar Demanda #{demanda.idMov}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Informações do Centro */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Warehouse className="h-4 w-4 text-muted-foreground" />
              ID Centro
            </Label>
            <Input
              value={demanda.idCentro}
              disabled
              className="bg-muted"
            />
          </div>

          {/* Grid de Campos Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                Palete <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.palete}
                onChange={(e) => handleInputChange('palete', e.target.value)}
                placeholder="Digite o número do palete"
                maxLength={50}
              />
            </div>

            <div className="space-y-2">
              <Label>Prioridade</Label>
              <Input
                type="number"
                value={formData.prioridade}
                onChange={(e) => handleInputChange('prioridade', parseInt(e.target.value) || 0)}
                placeholder="Digite a prioridade"
              />
            </div>
          </div>

          {/* Rota - Origem e Destino */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              Rota
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Origem <span className="text-destructive">*</span></Label>
                <Input
                  value={formData.origem}
                  onChange={(e) => handleInputChange('origem', e.target.value)}
                  placeholder="Digite a origem"
                  maxLength={50}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Destino <span className="text-destructive">*</span></Label>
                <Input
                  value={formData.destino}
                  onChange={(e) => handleInputChange('destino', e.target.value)}
                  placeholder="Digite o destino"
                  maxLength={50}
                />
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                SKU
              </Label>
              <Input
                value={formData.sku || ''}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                placeholder="Digite o SKU (opcional)"
              />
            </div>

            <div className="space-y-2">
              <Label>Lote</Label>
              <Input
                value={formData.lote || ''}
                onChange={(e) => handleInputChange('lote', e.target.value)}
                placeholder="Digite o lote (opcional)"
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Input
              value={formData.descricao || ''}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              placeholder="Digite a descrição (opcional)"
            />
          </div>

          {/* Informações de Status (somente leitura) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Status</Label>
              <Input
                value={demanda.status || '-'}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Data de Criação</Label>
              <Input
                value={demanda.dataCriacao ? new Date(demanda.dataCriacao).toLocaleDateString('pt-BR') : '-'}
                disabled
                className="bg-muted"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleAtualizarDemanda} disabled={isAtualizandoDemanda}>
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}