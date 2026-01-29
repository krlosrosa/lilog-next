'use client';

import { useCadastroDemandaDevolucao } from "../hooks/useCadastroDemandaDevolucao";
import { ViagemSearch } from "../components/ViagemSearch";
import { ViagemInfoCard } from "../components/ViagemInfoCard";
import { FormCadastroDemanda } from "../components/FormCadastroDemanda";

export default function CadastrarDemanda() {
  const {
    viagemId,
    setViagemId,
    infoViagem,
    isLoading,
    error,
    form,
    handleCriarDemanda,
    isCriandoDemanda,
  } = useCadastroDemandaDevolucao();

  return (
    <div className="space-y-6 w-full px-4 md:px-6 lg:px-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Cadastrar Nova Demanda</h1>
        <p className="text-muted-foreground">
          Busque a viagem Ravex para preencher automaticamente as informações do veículo
        </p>
      </div>

      {/* Busca de Viagem */}
      <ViagemSearch
        viagemId={viagemId}
        onViagemIdChange={setViagemId}
        isLoading={isLoading}
        error={error}
      />

      {/* Card com Informações da Viagem - Só aparece quando tiver dados */}
      {infoViagem && (
        <ViagemInfoCard infoViagem={infoViagem} form={form} />
      )}

      {/* Formulário de Cadastro - Só aparece quando tiver informações da viagem */}
      {infoViagem && (
        <FormCadastroDemanda
          form={form}
          onSubmit={handleCriarDemanda}
          isSubmitting={isCriandoDemanda}
        />
      )}

      {/* Estado inicial - quando não há viagem buscada */}
      {!viagemId && !infoViagem && !isLoading && (
        <div className="flex items-center justify-center py-12 border-2 border-dashed rounded-lg bg-muted/30">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Informe o ID da viagem Ravex para começar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
