"use client";

import { useRef, useState } from "react";
import { Input } from "@/_shared/_components/ui/input";
import { Button } from "@/_shared/_components/ui/button";
import { Label } from "@/_shared/_components/ui/label";
import { Card, CardContent, CardHeader } from "@/_shared/_components/ui/card";
import { Skeleton } from "@/_shared/_components/ui/skeleton";
import { InfoCards } from "../components/info-demanda/info-cards";
import { ProcessTimeline } from "../components/info-demanda/timeline";
import {
  mapResultadoToInfoCards,
  mapResultadoToTimelineSteps,
  mapResultadoItensToConferenceTable,
  mapAvariasToAnomalies,
} from "../components/info-demanda/mapInfoDemanda";
import useInfoDemanda from "../hooks/useInfoDemanda";
import { Search, AlertCircle, FileQuestion } from "lucide-react";
import { ConferenceTable } from "../components/info-demanda/conferenciaTable";
import { AnomaliesTable } from "../components/info-demanda/tableAvarias";
import { ChecklistPhotos } from "../components/info-demanda/check-list.fotos";
import { FotosFimProcesso } from "../components/info-demanda/fotos-fim-processo";

export default function InfoDemanda() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const {
    demandaId,
    setDemandaId,
    infoDemanda,
    avarias,
    isLoadingInfoDemanda,
    isErrorInfoDemanda,
    isLoadingAvarias,
    errorInfoDemanda,
    fotosCheckList,
    fotosFimProcesso,
    isLoadingFotosCheckList,
    isLoadingFotosFimProcesso,
    hasSearched,
  } = useInfoDemanda();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputValue.trim();
    setDemandaId(value || null);
    if (!value) inputRef.current?.focus();
  };

  const showEmptyState =
    !hasSearched &&
    !isLoadingInfoDemanda &&
    !isLoadingAvarias &&
    !isLoadingFotosCheckList &&
    !isLoadingFotosFimProcesso;
  const showContent =
    hasSearched &&
    infoDemanda &&
    !isLoadingInfoDemanda &&
    !isLoadingAvarias &&
    !isLoadingFotosCheckList &&
    !isLoadingFotosFimProcesso;
  const showError = hasSearched && isErrorInfoDemanda && !isLoadingInfoDemanda;

  const infoCardsData = infoDemanda ? mapResultadoToInfoCards(infoDemanda) : null;
  const timelineSteps = infoDemanda ? mapResultadoToTimelineSteps(infoDemanda) : [];
  const conferenceItems = infoDemanda
    ? mapResultadoItensToConferenceTable(infoDemanda.itens)
    : [];
  const anomalies = mapAvariasToAnomalies(avarias);

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-8">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Informações da Demanda
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Consulte o resultado e o andamento de uma demanda de devolução pelo ID.
        </p>
      </header>

      {/* Busca */}
      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" aria-hidden />
            Buscar demanda
          </h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 space-y-2">
              <Label htmlFor="demanda-id" className="text-sm font-medium">
                ID da demanda
              </Label>
              <Input
                ref={inputRef}
                id="demanda-id"
                type="text"
                inputMode="numeric"
                placeholder="Ex.: 12345"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoadingInfoDemanda}
                className="h-10 bg-background"
                aria-describedby="demanda-id-hint"
                aria-invalid={showError}
              />
              <p id="demanda-id-hint" className="text-xs text-muted-foreground">
                Informe o número do ID e clique em Buscar.
              </p>
            </div>
            <div className="flex items-end">
              <Button
                type="submit"
                disabled={!inputValue.trim() || isLoadingInfoDemanda}
                className="w-full sm:w-auto min-w-[120px] h-10"
              >
                {isLoadingInfoDemanda ? "Buscando…" : "Buscar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Empty state */}
      {showEmptyState && (
        <Card className="shadow-sm border-dashed border-border/70 bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center py-12 md:py-16 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <FileQuestion className="h-8 w-8 text-muted-foreground" aria-hidden />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">
              Nenhuma demanda consultada
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Digite o ID da demanda no campo acima e clique em Buscar para ver as
              informações e o timeline do processo.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Error state */}
      {showError && (
        <Card className="shadow-sm border-destructive/50 bg-destructive/5">
          <CardContent className="flex flex-col sm:flex-row items-start gap-4 py-6">
            <div className="rounded-full bg-destructive/10 p-2 shrink-0">
              <AlertCircle className="h-5 w-5 text-destructive" aria-hidden />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium text-destructive mb-1">
                Erro ao carregar a demanda
              </h3>
              <p className="text-sm text-muted-foreground">
                {errorInfoDemanda instanceof Error
                  ? errorInfoDemanda.message
                  : "Não foi possível carregar os dados. Verifique o ID e tente novamente."}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                ID consultado: <strong>{demandaId}</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading skeletons */}
      {hasSearched && isLoadingInfoDemanda && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="shadow-sm">
                <CardHeader className="pb-3">
                  <Skeleton className="h-5 w-24" />
                </CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="flex justify-between gap-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-between">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-20 mt-3" />
                    <Skeleton className="h-3 w-16 mt-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Conteúdo: cards + timeline */}
      {showContent && infoCardsData && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <InfoCards
            transporte={infoCardsData.transporte}
            conferencia={infoCardsData.conferencia}
            responsaveis={infoCardsData.responsaveis}
          />
          <ProcessTimeline steps={timelineSteps} />
          <ChecklistPhotos photos={fotosCheckList ?? []} />
          <ConferenceTable items={conferenceItems} />
          <AnomaliesTable anomalies={anomalies} />
          <FotosFimProcesso photos={fotosFimProcesso ?? []} />
        </div>
      )}
    </div>
  );
}
