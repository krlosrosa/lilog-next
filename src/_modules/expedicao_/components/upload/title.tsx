import { Upload } from "lucide-react";

export function TitleUpload() {
  return (
    <div className="space-y-1">
    <div className="flex items-center gap-2">
      <Upload className="h-5 w-5 text-primary" />
      <h1 className="text-xl font-semibold tracking-tight">Upload de Arquivos</h1>
    </div>
    <p className="text-muted-foreground text-xs">
      Envie os arquivos necessários para processamento
    </p>
  </div>
  )
}