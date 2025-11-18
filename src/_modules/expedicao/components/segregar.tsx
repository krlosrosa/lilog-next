'use client';

import type { KeyboardEvent, MouseEvent, ReactElement } from 'react';

import {
  Card,
  CardContent,
} from '@/_shared/_components/ui/card';
import { Button } from '@/_shared/_components/ui/button';  
import { Input } from '@/_shared/_components/ui/input';
import { Badge } from '@/_shared/_components/ui/badge';
import { Separator } from '@/_shared/_components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/_shared/_components/ui/accordion';
import { Plus, X, Trash2, Users, Truck, Package, UserCheck, type LucideIcon } from 'lucide-react';

// Importar do provider real
import { useShipments, type Group } from '../others/providers/shipments.provider';
import { UploadClientesSegregados } from './uploadClientesSegregados';

type GroupType = 'clientes' | 'transportes' | 'remessas';

export function Segregar() {
  const {
    clientesSegregados,
    setClientesSegregados,
    grupoClientes,
    setGrupoClientes,
    grupoTransportes,
    setGrupoTransportes,
    grupoRemessas,
    setGrupoRemessas,
  } = useShipments();

  const handleAddGroup = (tipo: GroupType) => {
    const newGroup: Group = {
      id: Date.now().toString(),
      name: '',
      items: [],
    };

    if (tipo === 'clientes') {
      setGrupoClientes([...grupoClientes, newGroup]);
    } else if (tipo === 'transportes') {
      setGrupoTransportes([...grupoTransportes, newGroup]);
    } else {
      setGrupoRemessas([...grupoRemessas, newGroup]);
    }
  };

  const handleRemoveGroup = (tipo: GroupType, id: Group['id']) => {
    if (tipo === 'clientes') {
      setGrupoClientes(grupoClientes.filter((g) => g.id !== id));
    } else if (tipo === 'transportes') {
      setGrupoTransportes(grupoTransportes.filter((g) => g.id !== id));
    } else {
      setGrupoRemessas(grupoRemessas.filter((g) => g.id !== id));
    }
  };

  const handleUpdateGroupName = (
    tipo: GroupType,
    id: Group['id'],
    name: Group['name'],
  ) => {
    if (tipo === 'clientes') {
      setGrupoClientes(
        grupoClientes.map((g) => (g.id === id ? { ...g, name } : g)),
      );
    } else if (tipo === 'transportes') {
      setGrupoTransportes(
        grupoTransportes.map((g) => (g.id === id ? { ...g, name } : g)),
      );
    } else {
      setGrupoRemessas(
        grupoRemessas.map((g) => (g.id === id ? { ...g, name } : g)),
      );
    }
  };

  const handleAddItem = (tipo: GroupType, groupId: Group['id'], item: string) => {
    if (tipo === 'clientes') {
      setGrupoClientes(
        grupoClientes.map((g) =>
          g.id === groupId ? { ...g, items: [...g.items, item] } : g,
        ),
      );
    } else if (tipo === 'transportes') {
      setGrupoTransportes(
        grupoTransportes.map((g) =>
          g.id === groupId ? { ...g, items: [...g.items, item] } : g,
        ),
      );
    } else {
      setGrupoRemessas(
        grupoRemessas.map((g) =>
          g.id === groupId ? { ...g, items: [...g.items, item] } : g,
        ),
      );
    }
  };

  const handleRemoveItem = (
    tipo: GroupType,
    groupId: Group['id'],
    itemIndex: number,
  ) => {
    if (tipo === 'clientes') {
      setGrupoClientes(
        grupoClientes.map((g) =>
          g.id === groupId
            ? {
                ...g,
                items: g.items.filter((_, i) => i !== itemIndex),
              }
            : g,
        ),
      );
    } else if (tipo === 'transportes') {
      setGrupoTransportes(
        grupoTransportes.map((g) =>
          g.id === groupId
            ? {
                ...g,
                items: g.items.filter((_, i) => i !== itemIndex),
              }
            : g,
        ),
      );
    } else {
      setGrupoRemessas(
        grupoRemessas.map((g) =>
          g.id === groupId
            ? {
                ...g,
                items: g.items.filter((_, i) => i !== itemIndex),
              }
            : g,
        ),
      );
    }
  };

  const renderGroupSection = (
    title: string,
    _icon: LucideIcon,
    tipo: GroupType,
    groups: Group[],
  ): ReactElement => {
    const isEmpty = groups.length === 0;
    
    return (
      <div className="space-y-2.5">
        <div className="flex items-center justify-end">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-7 text-xs gap-1.5"
            onClick={() => handleAddGroup(tipo)}
          >
            <Plus className="h-3 w-3" />
            Novo Grupo
          </Button>
        </div>
        
        {isEmpty ? (
          <div className="rounded-lg border border-dashed bg-muted/20 px-4 py-6 text-center">
            <Package className="mx-auto h-8 w-8 text-muted-foreground/40 mb-2" />
            <p className="text-xs text-muted-foreground">
              Nenhum grupo criado ainda
            </p>
            <p className="text-[11px] text-muted-foreground/70 mt-0.5">
              Clique em "Novo Grupo" para começar
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {groups.map((group) => (
              <Card key={group.id} className="border bg-card/50">
                <CardContent className="p-3 space-y-2.5">
                  {/* Header do grupo */}
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Nome do grupo"
                      value={group.name}
                      onChange={(e) =>
                        handleUpdateGroupName(tipo, group.id, e.target.value)
                      }
                      className="h-8 flex-1 text-sm font-medium"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleRemoveGroup(tipo, group.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  {/* Input para adicionar item */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Adicionar item (Enter para confirmar)"
                      className="h-8 text-xs"
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          const input = e.currentTarget;
                          if (input.value.trim()) {
                            handleAddItem(tipo, group.id, input.value.trim());
                            input.value = '';
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        const input = e.currentTarget
                          .previousElementSibling as HTMLInputElement | null;
                        if (input?.value.trim()) {
                          handleAddItem(tipo, group.id, input.value.trim());
                          input.value = '';
                        }
                      }}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  {/* Lista de itens */}
                  {group.items.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1.5 px-2 py-1 text-xs font-normal"
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(tipo, group.id, index)}
                            className="hover:text-destructive transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-md bg-muted/30 px-3 py-2 text-center">
                      <p className="text-xs text-muted-foreground">
                        Nenhum item adicionado
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl space-y-3 py-4">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Users className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold leading-none">Segregação</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Gerencie clientes segregados e grupos de organização
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-5 pb-4">
          <Accordion type="multiple" className="space-y-3">
            {/* Clientes Segregados */}
            <AccordionItem value="clientes-segregados" className="border-0">
              <AccordionTrigger className="py-2 hover:no-underline [&[data-state=open]>div>div:first-child]:bg-primary [&[data-state=open]>div>div:first-child]:text-primary-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 transition-colors">
                    <UserCheck className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-semibold leading-none">
                      Clientes Segregados
                    </h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {clientesSegregados.length} {clientesSegregados.length === 1 ? 'cliente' : 'clientes'}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3 pb-0">
                <div className="space-y-2.5">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Adicionar cliente (Enter para confirmar)"
                      className="h-8 text-xs"
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          const input = e.currentTarget;
                          if (
                            input.value.trim() &&
                            !clientesSegregados.includes(input.value.trim())
                          ) {
                            setClientesSegregados([
                              ...clientesSegregados,
                              input.value.trim(),
                            ]);
                            input.value = '';
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        const input = e.currentTarget
                          .previousElementSibling as HTMLInputElement | null;
                        if (
                          input?.value.trim() &&
                          !clientesSegregados.includes(input.value.trim())
                        ) {
                          setClientesSegregados([
                            ...clientesSegregados,
                            input.value.trim(),
                          ]);
                          input.value = '';
                        }
                      }}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                    <UploadClientesSegregados />
                  </div>

                  {clientesSegregados.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {clientesSegregados.map((cliente, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="flex items-center gap-1.5 px-2 py-1 text-xs font-normal"
                        >
                          {cliente}
                          <button
                            type="button"
                            onClick={() =>
                              setClientesSegregados(
                                clientesSegregados.filter((_, i) => i !== index),
                              )
                            }
                            className="hover:text-destructive transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-md bg-muted/30 px-3 py-2 text-center">
                      <p className="text-xs text-muted-foreground">
                        Nenhum cliente segregado
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <Separator />

            {/* Grupo de Clientes */}
            <AccordionItem value="grupo-clientes" className="border-0">
              <AccordionTrigger className="py-2 hover:no-underline [&[data-state=open]>div>div:first-child]:bg-primary [&[data-state=open]>div>div:first-child]:text-primary-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 transition-colors">
                    <Users className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-semibold leading-none">Grupo de Clientes</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {grupoClientes.length} {grupoClientes.length === 1 ? 'grupo' : 'grupos'}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3 pb-0">
                {renderGroupSection('Grupo de Clientes', Users, 'clientes', grupoClientes)}
              </AccordionContent>
            </AccordionItem>

            <Separator />

            {/* Grupo de Transportes */}
            <AccordionItem value="grupo-transportes" className="border-0">
              <AccordionTrigger className="py-2 hover:no-underline [&[data-state=open]>div>div:first-child]:bg-primary [&[data-state=open]>div>div:first-child]:text-primary-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 transition-colors">
                    <Truck className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-semibold leading-none">Grupo de Transportes</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {grupoTransportes.length} {grupoTransportes.length === 1 ? 'grupo' : 'grupos'}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3 pb-0">
                {renderGroupSection('Grupo de Transportes', Truck, 'transportes', grupoTransportes)}
              </AccordionContent>
            </AccordionItem>

            <Separator />

            {/* Grupo de Remessas */}
            <AccordionItem value="grupo-remessas" className="border-0">
              <AccordionTrigger className="py-2 hover:no-underline [&[data-state=open]>div>div:first-child]:bg-primary [&[data-state=open]>div>div:first-child]:text-primary-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 transition-colors">
                    <Package className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-semibold leading-none">Grupo de Remessas</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {grupoRemessas.length} {grupoRemessas.length === 1 ? 'grupo' : 'grupos'}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-3 pb-0">
                {renderGroupSection('Grupo de Remessas', Package, 'remessas', grupoRemessas)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}