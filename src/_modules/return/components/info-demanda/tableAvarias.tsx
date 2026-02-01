import React, { useState } from "react";
import { Card, CardContent } from "@/_shared/_components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/_shared/_components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/_shared/_components/ui/table";
import { Badge } from "@/_shared/_components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/_shared/_components/ui/dialog";
import { AlertTriangle, ChevronDown, ChevronUp, ImageIcon, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils"; 

interface AnomalyPhoto {
  id: string;
  url: string;
  description: string;
}

interface Anomaly {
  id: string;
  codigo: string;
  descricao: string;
  tipoAnomalia: string;
  quantidade: string;
  photos: AnomalyPhoto[];
}

interface AnomaliesTableProps {
  anomalies: Anomaly[];
}

const anomalyTypeColors: Record<string, string> = {
  avaria: "bg-destructive text-destructive-foreground",
  falta: "bg-warning text-warning-foreground",
  excesso: "bg-primary text-primary-foreground",
  divergencia: "bg-muted text-muted-foreground",
};

export function AnomaliesTable({ anomalies }: AnomaliesTableProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [zoomPhoto, setZoomPhoto] = useState<AnomalyPhoto | null>(null);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <Card className="shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardContent className="p-0">
          <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 px-6 py-4 text-left hover:bg-muted/50 transition-colors rounded-t-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <span className="font-semibold text-lg">Anomalias</span>
              <Badge variant="secondary">
                {anomalies.length} {anomalies.length === 1 ? "item" : "itens"}
              </Badge>
            </div>
            {isOpen ? (
              <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-6 pb-6 pt-0">
              <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="w-10 text-center">
                  <ImageIcon className="h-4 w-4 mx-auto" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {anomalies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Nenhuma anomalia registrada
                  </TableCell>
                </TableRow>
              ) : (
                anomalies.map((anomaly) => {
                  const isExpanded = expandedRows.has(anomaly.id);
                  const hasPhotos = anomaly.photos.length > 0;

                  return (
                    <React.Fragment key={anomaly.id}>
                      <TableRow 
                        key={anomaly.id}
                        className={cn(
                          "cursor-pointer transition-colors hover:bg-muted/50",
                          isExpanded && "bg-muted/30"
                        )}
                        onClick={() => hasPhotos && toggleRow(anomaly.id)}
                      >
                        <TableCell className="p-2">
                          {hasPhotos && (
                            isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{anomaly.codigo}</TableCell>
                        <TableCell>{anomaly.descricao}</TableCell>
                        <TableCell>
                          <Badge className={anomalyTypeColors[anomaly.tipoAnomalia.toLowerCase()] || "bg-secondary"}>
                            {anomaly.tipoAnomalia}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">{anomaly.quantidade}</TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {anomaly.photos.length}
                        </TableCell>
                      </TableRow>
                      
                      {/* Expanded row with photos */}
                      {isExpanded && hasPhotos && (
                        <TableRow key={`${anomaly.id}-photos`}>
                          <TableCell colSpan={6} className="bg-muted/20 p-4">
                            <div className="space-y-3">
                              <p className="text-sm font-medium text-muted-foreground">
                                Fotos da Anomalia
                              </p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {anomaly.photos.map((photo) => (
                                  <button
                                    key={photo.id}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setZoomPhoto(photo);
                                    }}
                                    className="relative aspect-video overflow-hidden rounded-lg border bg-background text-left cursor-zoom-in hover:ring-2 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                  >
                                    <img
                                      src={photo.url}
                                      alt={photo.description}
                                      className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors">
                                      <ZoomIn className="h-8 w-8 text-white opacity-0 hover:opacity-100 drop-shadow-md" aria-hidden />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 to-transparent p-2">
                                      <p className="text-xs text-primary-foreground truncate">
                                        {photo.description}
                                      </p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>

      <Dialog open={!!zoomPhoto} onOpenChange={(open) => !open && setZoomPhoto(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
          <DialogTitle className="sr-only">
            {zoomPhoto?.description || "Ampliar imagem"}
          </DialogTitle>
          {zoomPhoto && (
            <div className="relative flex flex-col">
              <img
                src={zoomPhoto.url}
                alt={zoomPhoto.description}
                className="max-h-[85vh] w-full object-contain bg-muted"
              />
              {zoomPhoto.description && (
                <p className="p-3 text-sm text-muted-foreground border-t bg-background">
                  {zoomPhoto.description}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
