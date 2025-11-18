import { Badge } from "@/_shared/_components/ui/badge";
import { Button } from "@/_shared/_components/ui/button";
import { Card, CardContent } from "@/_shared/_components/ui/card";
import { Input } from "@/_shared/_components/ui/input";
import { LucideIcon, Package, Plus, Trash2, X } from "lucide-react";

export interface Group {
  id: string;
  name: string;
  items: string[];
}

export type GroupType = "clientes" | "transportes" | "remessas";

type RenderGroupSectionProps = {
  tipo: GroupType;
  groups: Group[];
  addGroup: (tipo: GroupType) => void;
  removeGroup: (tipo: GroupType, id: string) => void;
  updateGroupName: (tipo: GroupType, id: string, name: string) => void;
  addItem: (tipo: GroupType, groupId: string, item: string) => void;
  removeItem: (tipo: GroupType, groupId: string, index: number) => void;
};

export default function RenderGroupSection({
  tipo,
  groups,
  addGroup,
  removeGroup,
  updateGroupName,
  addItem,
  removeItem,
}: RenderGroupSectionProps) {
  const isEmpty = groups.length === 0;

  return (
    <div className="space-y-3">
      {/* Header com contador */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-foreground capitalize">
            {tipo}
          </h3>
          {!isEmpty && (
            <Badge variant="outline" className="h-5 px-1.5 text-xs font-normal">
              {groups.length} {groups.length === 1 ? 'grupo' : 'grupos'}
            </Badge>
          )}
        </div>
        
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-7 text-xs gap-1.5"
          onClick={() => addGroup(tipo)}
        >
          <Plus className="h-3.5 w-3.5" />
          Novo Grupo
        </Button>
      </div>

      {isEmpty ? (
        <div className="rounded-lg border border-dashed bg-muted/10 p-6 text-center transition-colors hover:bg-muted/20">
          <Package className="mx-auto h-6 w-6 text-muted-foreground/50 mb-2" />
          <p className="text-xs text-muted-foreground">Nenhum grupo criado</p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Clique em "Novo Grupo" para começar
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {groups.map((group, groupIndex) => (
            <Card key={group.id} className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-3 space-y-3">
                {/* Header do grupo */}
                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {groupIndex + 1}
                    </div>
                    <Input
                      placeholder="Nome do grupo"
                      value={group.name}
                      onChange={(e) =>
                        updateGroupName(tipo, group.id, e.target.value)
                      }
                      className="h-8 flex-1 text-sm min-w-0"
                    />
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive transition-colors"
                    onClick={() => removeGroup(tipo, group.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Input para adicionar item */}
                <div className="flex gap-2">
                  <Input
                    placeholder={group.name.trim() ? "Digite um item..." : "Nomeie o grupo primeiro"}
                    className="h-8 text-xs flex-1"
                    disabled={!group.name.trim()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim() && group.name.trim()) {
                        addItem(tipo, group.id, e.currentTarget.value.trim());
                        e.currentTarget.value = "";
                      }
                    }}
                  />

                  <Button
                    type="button"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={!group.name.trim()}
                    onClick={(e) => {
                      const input =
                        e.currentTarget.previousElementSibling as HTMLInputElement;
                      if (input?.value.trim() && group.name.trim()) {
                        addItem(tipo, group.id, input.value.trim());
                        input.value = "";
                      }
                    }}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* Lista de itens */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">
                      Itens ({group.items.length})
                    </span>
                    {group.items.length > 0 && (
                      <span className="text-xs text-muted-foreground/70">
                        Clique no × para remover
                      </span>
                    )}
                  </div>
                  
                  {group.items.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5 min-h-[32px]">
                      {group.items.map((item, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="gap-1 px-2.5 py-1 text-xs hover:bg-secondary/80 transition-colors group"
                        >
                          <span className="max-w-[120px] truncate" title={item}>
                            {item}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(tipo, group.id, index)}
                            className="hover:text-destructive transition-colors opacity-70 group-hover:opacity-100"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg bg-muted/20 p-3 text-center border">
                      <p className="text-xs text-muted-foreground">
                        {group.name.trim() 
                          ? "Nenhum item adicionado ainda" 
                          : "Adicione um nome ao grupo para começar"
                        }
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}