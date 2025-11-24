'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/_shared/_components/ui/collapsible';
import { Input } from '@/_shared/_components/ui/input';
import { Button } from '@/_shared/_components/ui/button';
import { useUser } from '@/_shared/providers/UserContext';
import { ChevronDown, ChevronRight, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProcessoAcesso } from '../enums/processoAcesso.enum';
import { usePermissionsOperations } from '../hooks/usePermissionsOperations';
import { useParams } from 'next/navigation';
import { CanWithCenter } from '@/_shared/providers/casl/CanWithCenter';

const processDefinitions = [
  {
    id: 1,
    name: ProcessoAcesso.EXPEDICAO,
    label: 'Expedição',
    icon: '📦',
  },
  {
    id: 2,
    name: ProcessoAcesso.DEVOLUCAO,
    label: 'Devolução',
    icon: '🔄',
  },
  {
    id: 3,
    name: ProcessoAcesso.ESTOQUE,
    label: 'Estoque',
    icon: '📦',
  },
  {
    id: 4,
    name: ProcessoAcesso.PRODUTIVIDADE,
    label: 'Produtividade',
    icon: '📊',
  },
  {
    id: 5,
    name: ProcessoAcesso.PESSOAL,
    label: 'Pessoal',
    icon: '👥',
  },
  {
    id: 6,
    name: ProcessoAcesso.TRANSPORTE,
    label: 'Transporte',
    icon: '�',
  },
];

const masterLevel = {
  id: 1,
  name: 'manager',
  icon: '🔑',
  label: 'Master',
  description: 'Acesso total a tudo',
};

const gerenteLevel = {
  id: 2,
  name: 'gerente',
  icon: '👔',
  label: 'Gerente',
  description:
    'Acesso a todos os recursos do centro, com excessão a adicionar novo centro e excluir centro',
};

const niveisAcesso = [
  {
    id: 3,
    name: 'admin',
    label: 'Admin',
    icon: '🔑',
    description: 'Administrador da filial',
  },
  {
    id: 4,
    name: 'operador',
    label: 'Operador',
    icon: '🔑',
    description:
      'Adicionar funcionário, editar funcionário, excluir funcionário',
  },
  {
    id: 5,
    name: 'leitura',
    label: 'Leitura',
    icon: '🔑',
    description: 'Pode apenas visualizar informações',
  },
];

export default function ListarProcessos() {
  const { id } = useParams();
  const [openProcesses, setOpenProcesses] = useState<number[]>([]);
  const { user } = useUser();
  const [acessos, setAcessos] = useState<string[]>([]);
  const { operations, isLoading } = usePermissionsOperations();

  const { data: permissions, isLoading: isLoadingPermissions } =
    operations.useGetPermissoes(id as string, user?.centerSelect as string);

  async function getPermissoes() {
    if (permissions) {
      setAcessos(permissions || []);
    }
  }

  useEffect(() => {
    getPermissoes();
  }, [permissions]);

  const handleUpdatePermissoes = () => {
    operations.updatePermissoes({
      id: id as string,
      centerId: user?.centerSelect as string,
      data: acessos,
    });
  };

  const toggleProcess = (processId: number) => {
    setOpenProcesses((prev) =>
      prev.includes(processId)
        ? prev.filter((id) => id !== processId)
        : [...prev, processId],
    );
  };

  const handleMasterChange = (isChecked: boolean) => {
    if (isChecked) {
      // Se master for selecionado, remove todas as outras permissões (incluindo gerente) e adiciona master:all
      setAcessos(['manager:all']);
    } else {
      // Remove master:all
      setAcessos(acessos.filter((acesso) => acesso !== 'manager:all'));
    }
  };

  const handleGerenteChange = (isChecked: boolean) => {
    if (isChecked) {
      // Se gerente for selecionado, remove todas as outras permissões (incluindo master) e adiciona gerente:all
      setAcessos(['gerente:all']);
    } else {
      // Remove gerente:all
      setAcessos(acessos.filter((acesso) => acesso !== 'gerente:all'));
    }
  };

  const handlePermissionChange = (
    processId: number,
    nivelName: string,
    isChecked: boolean,
  ) => {
    // Se master ou gerente está selecionado, não permite outras permissões
    if (acessos.includes('manager:all') || acessos.includes('gerente:all')) {
      return;
    }

    const permissaoFormatada = `${nivelName}:${processDefinitions.find((p) => p.id === processId)?.name}`;

    if (isChecked) {
      // Remove master:all e gerente:all se existirem e qualquer permissão existente para este processo
      const acessosSemMasterGerente = acessos.filter(
        (acesso) => acesso !== 'manager:all' && acesso !== 'gerente:all',
      );
      const acessosSemProcesso = acessosSemMasterGerente.filter(
        (acesso) =>
          !acesso.endsWith(
            `:${processDefinitions.find((p) => p.id === processId)?.name}`,
          ),
      );
      // Adiciona a nova permissão
      setAcessos([...acessosSemProcesso, permissaoFormatada]);
    } else {
      // Remove a permissão específica
      setAcessos(acessos.filter((acesso) => acesso !== permissaoFormatada));
    }
  };

  const isMasterSelected = () => {
    return acessos.includes('manager:all');
  };

  const isGerenteSelected = () => {
    return acessos.includes('gerente:all');
  };

  const isPermissionSelected = (processId: number, nivelName: string) => {
    const processoName = processDefinitions.find(
      (p) => p.id === processId,
    )?.name;
    return acessos.includes(`${nivelName}:${processoName}`);
  };

  const isMasterSelectedValue = isMasterSelected();
  const isGerenteSelectedValue = isGerenteSelected();

  if (isLoadingPermissions) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header com Título e Botão */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-foreground text-2xl font-bold">
          Gerenciar Permissões
        </h1>
        <Button
          onClick={handleUpdatePermissoes}
          className="w-full gap-2 sm:w-auto"
          disabled={
            !user?.centerSelect || !id || isLoading || isLoadingPermissions
          }
        >
          <Save className="h-4 w-4" />
          {isLoading ? 'Salvando...' : 'Salvar Permissões'}
        </Button>
      </div>

      {/* Seção Master */}
      <CanWithCenter acao="manager" recurso="all">
        <div className="bg-card rounded-lg border p-4 shadow-sm">
          <h2 className="text-foreground mb-3 text-lg font-semibold">
            Acesso Master
          </h2>
          <label
            htmlFor="master-checkbox"
            className={`bg-background hover:bg-accent/30 flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors ${
              isMasterSelectedValue ? 'border-primary bg-primary/5' : ''
            }`}
          >
            <Input
              type="checkbox"
              id="master-checkbox"
              className="mt-1 h-4 w-4"
              checked={isMasterSelectedValue}
              onChange={(e) => handleMasterChange(e.target.checked)}
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">{masterLevel.icon}</span>
                <span className="text-sm font-medium uppercase">
                  {masterLevel.name}
                </span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {masterLevel.description}
              </p>
            </div>
          </label>
        </div>
      </CanWithCenter>

      {/* Seção Gerente */}
      <div className="bg-card rounded-lg border p-4 shadow-sm">
        <h2 className="text-foreground mb-3 text-lg font-semibold">
          Acesso Gerente
        </h2>
        <label
          htmlFor="gerente-checkbox"
          className={`bg-background hover:bg-accent/30 flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors ${
            isGerenteSelectedValue ? 'border-primary bg-primary/5' : ''
          }`}
        >
          <Input
            type="checkbox"
            id="gerente-checkbox"
            className="mt-1 h-4 w-4"
            checked={isGerenteSelectedValue}
            onChange={(e) => handleGerenteChange(e.target.checked)}
          />
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">{gerenteLevel.icon}</span>
              <span className="text-sm font-medium uppercase">
                {gerenteLevel.name}
              </span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {gerenteLevel.description}
            </p>
          </div>
        </label>
      </div>

      {/* Debug: Mostrar permissões selecionadas */}
      {acessos.length > 0 && (
        <div className="bg-muted/50 rounded-md p-3">
          <h3 className="mb-2 text-sm font-medium">Permissões selecionadas:</h3>
          <div className="space-y-1">
            {acessos.map((acesso, index) => (
              <div key={index} className="text-muted-foreground text-xs">
                {acesso}
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        className={`space-y-3 ${isMasterSelectedValue || isGerenteSelectedValue ? 'pointer-events-none opacity-50' : ''}`}
      >
        {processDefinitions.map((process) => {
          const isOpen = openProcesses.includes(process.id);

          return (
            <Collapsible
              key={process.id}
              open={isOpen}
              onOpenChange={() => toggleProcess(process.id)}
              className="bg-card rounded-lg border shadow-sm transition-all hover:shadow-md"
            >
              <CollapsibleTrigger className="hover:bg-accent/50 flex w-full cursor-pointer items-center justify-between rounded-lg p-4 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{process.icon}</div>
                  <div>
                    <h2 className="text-foreground text-lg font-semibold">
                      {process.label}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {niveisAcesso.length} níveis de acesso disponíveis
                    </p>
                    {(isMasterSelectedValue || isGerenteSelectedValue) && (
                      <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                        {isMasterSelectedValue ? 'Master' : 'Gerente'}{' '}
                        selecionado - outros processos desabilitados
                      </p>
                    )}
                  </div>
                </div>
                <div className="transition-transform duration-200">
                  {isOpen ? (
                    <ChevronDown className="text-muted-foreground h-5 w-5" />
                  ) : (
                    <ChevronRight className="text-muted-foreground h-5 w-5" />
                  )}
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="CollapsibleContent">
                <div className="bg-muted/20 border-t p-4">
                  <h3 className="text-muted-foreground mb-3 text-sm font-medium">
                    Selecione os níveis de acesso:
                  </h3>

                  <div className="grid grid-cols-1 gap-3">
                    {niveisAcesso.map((nivel) => (
                      <label
                        key={nivel.id}
                        htmlFor={`${process.id}-${nivel.id}`}
                        className="bg-background hover:bg-accent/30 flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors"
                      >
                        <Input
                          type="checkbox"
                          id={`${process.id}-${nivel.id}`}
                          className="mt-1 h-4 w-4"
                          checked={isPermissionSelected(process.id, nivel.name)}
                          onChange={(e) =>
                            handlePermissionChange(
                              process.id,
                              nivel.name,
                              e.target.checked,
                            )
                          }
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{nivel.icon}</span>
                            <span className="text-sm font-medium">
                              {nivel.label}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-xs leading-relaxed">
                            {nivel.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}
