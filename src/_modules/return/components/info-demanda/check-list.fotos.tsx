import { useState } from "react";
import { Card, CardContent } from "@/_shared/_components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/_shared/_components/ui/collapsible";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/_shared/_components/ui/dialog";
import { Camera, ZoomIn, ChevronDown, ChevronUp } from "lucide-react";

const FOTO_LABELS = ["Baú Aberto", "Baú Fechado"] as const;

interface ChecklistPhotosProps {
  /** Array de URLs das fotos (máx. 2) retornadas pelo useGetFotosCheckListDevolucao */
  photos: string[];
}

export function ChecklistPhotos({ photos }: ChecklistPhotosProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; title: string } | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const items = (photos ?? [])
    .slice(0, 2)
    .map((url, i) => ({
      id: `foto-${i}`,
      url,
      title: FOTO_LABELS[i] ?? `Foto ${i + 1}`,
    }));

  return (
    <>
      <Card className="shadow-sm">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CardContent className="p-0">
            <CollapsibleTrigger className="flex w-full items-center justify-between gap-2 px-6 py-4 text-left hover:bg-muted/50 transition-colors rounded-t-lg">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">Fotos do Checklist</span>
                {items.length > 0 && (
                  <span className="text-sm text-muted-foreground">({items.length})</span>
                )}
              </div>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6 pt-0">
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4">
                    Nenhuma foto de checklist disponível.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {items.map((photo) => (
                      <button
                        key={photo.id}
                        onClick={() => setSelectedPhoto({ url: photo.url, title: photo.title })}
                        className="group relative aspect-video overflow-hidden rounded-lg border bg-muted transition-all hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      >
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-all group-hover:bg-foreground/20">
                          <ZoomIn className="h-8 w-8 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-3">
                          <p className="text-sm font-medium text-primary-foreground">{photo.title}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </CardContent>
        </Collapsible>
      </Card>

      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogTitle className="sr-only">{selectedPhoto?.title ?? "Foto"}</DialogTitle>
          <DialogDescription className="sr-only">
            Visualização ampliada da foto do checklist
          </DialogDescription>
          {selectedPhoto && (
            <div className="relative">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
                <p className="text-lg font-medium text-primary-foreground">{selectedPhoto.title}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
