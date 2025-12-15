import { gerarExcel } from "@/_shared/utils/gerarExcel";
import { useContagemLite } from "../hooks/contagem-lite/useLite";
import { Button } from "@/_shared/_components/ui/button";
import { Download } from "lucide-react";
import { Skeleton } from "@/_shared/_components/ui/skeleton";

export default function DownloadAnomaliaExcel() {
  const { anomaliasLite, isLoadingAnomaliasLite } = useContagemLite();

  if(isLoadingAnomaliasLite) return <Skeleton className="h-10 w-full" />;

  function handleDownloadAnomaliaExcel() {
    gerarExcel(anomaliasLite || [], 'anomalias-lite');
  }

  return (
    <Button onClick={handleDownloadAnomaliaExcel} disabled={isLoadingAnomaliasLite}>
      <Download className="h-4 w-4" />
      Download Anomalia Excel
    </Button>
  )
}