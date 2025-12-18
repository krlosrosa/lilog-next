import { gerarExcel } from "@/_shared/utils/gerarExcel";
import { useContagemLite } from "../hooks/contagem-lite/useLite";
import { Button } from "@/_shared/_components/ui/button";
import { Download } from "lucide-react";
import { Skeleton } from "@/_shared/_components/ui/skeleton";

export default function DownloadAnomaliaExcel() {
  const { anomaliasLite, isLoadingAnomaliasLite } = useContagemLite();

  
  function handleDownloadAnomaliaExcel() {
    gerarExcel(anomaliasLite || [], 'anomalias-lite');
  }
  
  if(isLoadingAnomaliasLite) return <Skeleton className="h-10 w-full" />;
  return (
    <div>
      {anomaliasLite && anomaliasLite.length > 0 && (
        <pre>{JSON.stringify(anomaliasLite, null, 2)}</pre>
      )}
    <Button onClick={handleDownloadAnomaliaExcel}>
      <Download className="h-4 w-4" />
      Download Anomalia Excel
    </Button>
    </div>
  )
}