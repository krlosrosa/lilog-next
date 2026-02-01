'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/_components/ui/card";
import { Button } from "@/_shared/_components/ui/button";
import { FileSpreadsheet, ClipboardCheck, FileText, AlertTriangle, Download } from "lucide-react";
import { ModalParametrosRelatorio } from "../components/ModalParametrosRelatorio";
import { useRelatorioNotasFiscais } from "../hooks/useRelatorioNotasFiscais";
import { useRelatorioContagemFisica } from "../hooks/useRelatorioContagemFisica";
import { useRelatorioAnomalias } from "../hooks/useRelatorioAnomalias";

interface RelatorioCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onDownload: (params: { dataInicio: string; dataFim: string; [key: string]: any }) => void;
  isLoading?: boolean;
  parametros?: any[]; // Para parâmetros específicos futuros
}

function RelatorioCard({ title, description, icon, onDownload, isLoading = false, parametros = [] }: RelatorioCardProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleConfirm = async (params: { dataInicio: string; dataFim: string; [key: string]: any }) => {
    await onDownload(params);
    setOpenModal(false);
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                {icon}
              </div>
              <div>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription className="mt-1">{description}</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleOpenModal}
            disabled={isLoading}
            className="w-full gap-2"
            variant="default"
          >
            <Download className="h-4 w-4" />
            Baixar Excel
          </Button>
        </CardContent>
      </Card>

      <ModalParametrosRelatorio
        open={openModal}
        onOpenChange={setOpenModal}
        title={`Gerar Relatório: ${title}`}
        description={`Selecione o intervalo de datas para gerar o relatório de ${title.toLowerCase()}`}
        parametros={parametros}
        onConfirm={handleConfirm}
        isLoading={isLoading}
      />
    </>
  );
}

export default function RelatoriosView() {
  const { downloadRelatorio: downloadRelatorioNotas, isGenerating: isGeneratingNotas } = useRelatorioNotasFiscais();
  const {
    downloadRelatorio: downloadRelatorioContagem,
    isGenerating: isGeneratingContagem,
  } = useRelatorioContagemFisica();
  const { downloadRelatorio: downloadRelatorioAnomalias, isGenerating: isGeneratingAnomalias } = useRelatorioAnomalias();

  const handleDownloadContagemFisica = async (params: { dataInicio: string; dataFim: string; [key: string]: any }) => {
    await downloadRelatorioContagem(params.dataInicio, params.dataFim);
  };

  const handleDownloadNotasFiscais = async (params: { dataInicio: string; dataFim: string; [key: string]: any }) => {
    await downloadRelatorioNotas(params.dataInicio, params.dataFim);
  };

  const handleDownloadAnomalias = async (params: { dataInicio: string; dataFim: string; [key: string]: any }) => {
    await downloadRelatorioAnomalias(params.dataInicio, params.dataFim);
  };

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Relatórios</h1>
        <p className="text-muted-foreground">
          Baixe relatórios em Excel para análise e controle das operações
        </p>
      </div>

      {/* Grid de Relatórios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Relatório de Contagem Física */}
        <RelatorioCard
          title="Contagem Física"
          description="Relatório completo com todas as informações de contagem física realizada nas demandas"
          icon={<ClipboardCheck className="h-5 w-5 text-primary" />}
          onDownload={handleDownloadContagemFisica}
          isLoading={isGeneratingContagem}
        />

        {/* Relatório de Notas Fiscais */}
        <RelatorioCard
          title="Notas Fiscais"
          description="Exporte todas as notas fiscais cadastradas com seus detalhes e status"
          icon={<FileText className="h-5 w-5 text-primary" />}
          onDownload={handleDownloadNotasFiscais}
          isLoading={isGeneratingNotas}
        />

        {/* Relatório de Anomalias */}
        <RelatorioCard
          title="Anomalias"
          description="Relatório detalhado de todas as anomalias encontradas durante as conferências"
          icon={<AlertTriangle className="h-5 w-5 text-primary" />}
          onDownload={handleDownloadAnomalias}
          isLoading={isGeneratingAnomalias}
        />
      </div>

      {/* Informação Adicional */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Sobre os Relatórios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Todos os relatórios são gerados no formato Excel (.xlsx) e podem ser abertos em qualquer planilha eletrônica.
            </p>
            <p>
              Os arquivos incluem todas as informações relevantes para análise e podem ser filtrados e organizados conforme sua necessidade.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
