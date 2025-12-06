'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_shared/_components/ui/card';
import { Button } from '@/_shared/_components/ui/button';
import { Badge } from '@/_shared/_components/ui/badge';
import { Input } from '@/_shared/_components/ui/input';
import { Label } from '@/_shared/_components/ui/label';
import { Switch } from '@/_shared/_components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_shared/_components/ui/select';
import {
  Save,
  User,
  Mail,
  Briefcase,
  MapPin,
  Shield,
  Building,
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/_shared/_components/ui/tabs';

// ========== TYPES ==========
interface NewEmployeeForm {
  name: string;
  email: string;
  role: string;
  department: string;
  center: string;
  isAdmin: boolean;
  permissions: string[];
}

interface ProcessAction {
  id: string;
  label: string;
  description: string;
}

interface ProcessDefinition {
  name: string;
  icon: string;
  actions: ProcessAction[];
}

interface ProcessDefinitions {
  [key: string]: ProcessDefinition;
}

// ========== CONFIGURAÇÃO ==========

// Centros disponíveis
const AVAILABLE_CENTERS = [
  'pavuna',
  'contagem',
  'contagemII',
  'saoPaulo',
  'saoPauloDPA',
  'fortaleza',
  'paraDeMinas',
  'rio',
  'beloHorizonte',
] as const;

// Cargos disponíveis
const AVAILABLE_ROLES = [
  'Operador',
  'Supervisor',
  'Coordenador',
  'Gerente',
  'Analista',
  'Assistente',
];

// Departamentos disponíveis
const AVAILABLE_DEPARTMENTS = [
  'Operações',
  'Logística',
  'Estoque',
  'Expedição',
  'TI',
  'Administrativo',
  'Comercial',
];

// Definição dos processos
const processDefinitions: ProcessDefinitions = {
  estoque: {
    name: 'Gestão de Estoque',
    icon: '📦',
    actions: [
      {
        id: 'ver',
        label: 'Visualizar',
        description: 'Permite visualizar o estoque',
      },
      {
        id: 'editar',
        label: 'Editar',
        description: 'Permite editar itens do estoque',
      },
      {
        id: 'deletar',
        label: 'Deletar',
        description: 'Permite excluir itens do estoque',
      },
      {
        id: 'criar',
        label: 'Criar',
        description: 'Permite adicionar novos itens',
      },
    ],
  },
  devolucao: {
    name: 'Processo de Devolução',
    icon: '🔄',
    actions: [
      {
        id: 'ver',
        label: 'Visualizar',
        description: 'Permite visualizar devoluções',
      },
      {
        id: 'editar',
        label: 'Processar',
        description: 'Permite processar devoluções',
      },
    ],
  },
  expedicao: {
    name: 'Expedição',
    icon: '🚚',
    actions: [
      {
        id: 'ver',
        label: 'Visualizar',
        description: 'Permite visualizar expedições',
      },
      {
        id: 'criar',
        label: 'Criar',
        description: 'Permite criar ordens de expedição',
      },
    ],
  },
  relatorios: {
    name: 'Relatórios',
    icon: '📊',
    actions: [
      {
        id: 'ver',
        label: 'Visualizar',
        description: 'Permite visualizar relatórios',
      },
      {
        id: 'exportar',
        label: 'Exportar',
        description: 'Permite exportar relatórios',
      },
    ],
  },
};

// ========== UTILS ==========
const generatePermission = (
  action: string,
  process: string,
  center: string,
) => {
  return `${action}:${process}:${center}`;
};

// ========== COMPONENTS ==========

// Employee Form Component
interface EmployeeFormProps {
  formData: NewEmployeeForm;
  onFormChange: (field: keyof NewEmployeeForm, value: any) => void;
}

const EmployeeForm = ({ formData, onFormChange }: EmployeeFormProps) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome Completo</Label>
        <Input
          id="name"
          placeholder="Digite o nome do funcionário"
          value={formData.name}
          onChange={(e) => onFormChange('name', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="funcionario@empresa.com"
          value={formData.email}
          onChange={(e) => onFormChange('email', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="center">Centro de Trabalho</Label>
        <Select
          value={formData.center}
          onValueChange={(value) => onFormChange('center', value)}
        >
          <SelectTrigger>
            <MapPin className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Selecione o centro" />
          </SelectTrigger>
          <SelectContent>
            {AVAILABLE_CENTERS.map((center) => (
              <SelectItem key={center} value={center}>
                {center}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>

    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="role">Cargo</Label>
        <Select
          value={formData.role}
          onValueChange={(value) => onFormChange('role', value)}
        >
          <SelectTrigger>
            <Briefcase className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Selecione o cargo" />
          </SelectTrigger>
          <SelectContent>
            {AVAILABLE_ROLES.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Departamento</Label>
        <Select
          value={formData.department}
          onValueChange={(value) => onFormChange('department', value)}
        >
          <SelectTrigger>
            <Building className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Selecione o departamento" />
          </SelectTrigger>
          <SelectContent>
            {AVAILABLE_DEPARTMENTS.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-muted/20 flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-1">
          <Label htmlFor="isAdmin" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Acesso Administrativo
          </Label>
          <p className="text-muted-foreground text-sm">
            Permite configurar permissões personalizadas
          </p>
        </div>
        <Switch
          id="isAdmin"
          checked={formData.isAdmin}
          onCheckedChange={(checked) => onFormChange('isAdmin', checked)}
        />
      </div>
    </div>
  </div>
);

// Permission Card Component
interface PermissionCardProps {
  processKey: string;
  process: ProcessDefinition;
  selectedCenter: string;
  selectedPermissions: string[];
  onTogglePermission: (permission: string) => void;
  onToggleActionAll: (process: string, action: string) => void;
}

const PermissionCard = ({
  processKey,
  process,
  selectedCenter,
  selectedPermissions,
  onTogglePermission,
  onToggleActionAll,
}: PermissionCardProps) => {
  const hasSelectedCenter = selectedCenter.length > 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{process.icon}</div>
          <div>
            <CardTitle className="text-lg">{process.name}</CardTitle>
            <CardDescription>
              {process.actions.length} ações disponíveis
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {process.actions.map((action) => {
          const permission = generatePermission(
            action.id,
            processKey,
            selectedCenter,
          );
          const hasPermission = selectedPermissions.includes(permission);
          const allActionsGranted = process.actions.every((a) =>
            selectedPermissions.includes(
              generatePermission(a.id, processKey, selectedCenter),
            ),
          );

          return (
            <div
              key={action.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Label
                    htmlFor={`${processKey}-${action.id}`}
                    className="cursor-pointer font-medium"
                  >
                    {action.label}
                  </Label>
                  {hasPermission && (
                    <Badge variant="default" className="text-xs">
                      Ativa
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mt-1 text-sm">
                  {action.description}
                </p>
                {hasSelectedCenter && (
                  <p className="text-muted-foreground mt-2 text-xs">
                    Centro:{' '}
                    <Badge variant="outline" className="ml-1">
                      {selectedCenter}
                    </Badge>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {hasSelectedCenter ? (
                  <Switch
                    id={`${processKey}-${action.id}`}
                    checked={hasPermission}
                    onCheckedChange={() => onTogglePermission(permission)}
                  />
                ) : (
                  <Badge variant="outline" className="text-xs">
                    Selecione um centro
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

// Permissions Section Component
interface PermissionsSectionProps {
  formData: NewEmployeeForm;
  onTogglePermission: (permission: string) => void;
  onToggleActionAll: (process: string, action: string) => void;
}

const PermissionsSection = ({
  formData,
  onTogglePermission,
  onToggleActionAll,
}: PermissionsSectionProps) => {
  if (!formData.isAdmin) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        <Shield className="mx-auto mb-4 h-16 w-16 opacity-50" />
        <p className="text-lg">Acesso padrão do sistema</p>
        <p className="text-sm">
          Este funcionário terá as permissões padrão do cargo {formData.role}
        </p>
      </div>
    );
  }

  if (!formData.center) {
    return (
      <div className="text-muted-foreground py-8 text-center">
        <MapPin className="mx-auto mb-4 h-16 w-16 opacity-50" />
        <p className="text-lg">Selecione um centro de trabalho</p>
        <p className="text-sm">
          Escolha o centro onde o funcionário atuará para configurar as
          permissões
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Permissões Personalizadas</h3>
          <p className="text-muted-foreground text-sm">
            Configure as permissões específicas para {formData.name} no centro{' '}
            {formData.center}
          </p>
        </div>
        <Badge variant="secondary">
          {formData.permissions.length} permissões selecionadas
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {Object.entries(processDefinitions).map(([processKey, process]) => (
          <PermissionCard
            key={processKey}
            processKey={processKey}
            process={process}
            selectedCenter={formData.center}
            selectedPermissions={formData.permissions}
            onTogglePermission={onTogglePermission}
            onToggleActionAll={onToggleActionAll}
          />
        ))}
      </div>
    </div>
  );
};

// ========== MAIN COMPONENT ==========
export default function NewEmployeePage() {
  const router = useRouter();

  // State
  const [formData, setFormData] = useState<NewEmployeeForm>({
    name: '',
    email: '',
    role: '',
    department: '',
    center: '',
    isAdmin: false,
    permissions: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handlers
  const handleFormChange = (field: keyof NewEmployeeForm, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

      // Se mudou o centro ou isAdmin, limpa as permissões
      if (field === 'center' || field === 'isAdmin') {
        newData.permissions = [];
      }

      return newData;
    });
  };

  const handleTogglePermission = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleToggleActionAll = (process: string, action: string) => {
    if (!formData.center) return;

    const permission = generatePermission(action, process, formData.center);
    const hasPermission = formData.permissions.includes(permission);

    setFormData((prev) => ({
      ...prev,
      permissions: hasPermission
        ? prev.permissions.filter((p) => !p.startsWith(`${action}:${process}:`))
        : [...prev.permissions, permission],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Redirecionar para lista de funcionários
      setTimeout(() => {
        router.push('/funcionarios');
      }, 1000);
    } catch (error) {
      console.error('Erro ao criar funcionário:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.role &&
    formData.department &&
    formData.center;

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
          <User className="text-primary h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Novo Funcionário</h1>
          <p className="text-muted-foreground">
            Cadastre um novo colaborador no sistema
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>
              Preencha os dados básicos do funcionário
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EmployeeForm formData={formData} onFormChange={handleFormChange} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuração de Acesso</CardTitle>
            <CardDescription>
              Defina o nível de acesso e permissões do funcionário
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="permissoes" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="permissoes">Permissões</TabsTrigger>
                <TabsTrigger value="resumo">Resumo</TabsTrigger>
              </TabsList>

              <TabsContent value="permissoes" className="space-y-4">
                <PermissionsSection
                  formData={formData}
                  onTogglePermission={handleTogglePermission}
                  onToggleActionAll={handleToggleActionAll}
                />
              </TabsContent>

              <TabsContent value="resumo">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo do Cadastro</CardTitle>
                    <CardDescription>
                      Revise as informações antes de criar o funcionário
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Nome:</span>
                        <p>{formData.name || 'Não informado'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>
                        <p>{formData.email || 'Não informado'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Cargo:</span>
                        <p>{formData.role || 'Não informado'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Departamento:</span>
                        <p>{formData.department || 'Não informado'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Centro:</span>
                        <p>{formData.center || 'Não informado'}</p>
                      </div>
                      <div>
                        <span className="font-medium">Tipo de Acesso:</span>
                        <p>{formData.isAdmin ? 'Administrativo' : 'Padrão'}</p>
                      </div>
                    </div>

                    {formData.isAdmin && formData.center && (
                      <div>
                        <span className="font-medium">
                          Permissões Configuradas:
                        </span>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {formData.permissions.length > 0 ? (
                            formData.permissions.map((permission) => {
                              const [action, process, center] =
                                permission.split(':');
                              return (
                                <Badge
                                  key={permission}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {action} {process}
                                </Badge>
                              );
                            })
                          ) : (
                            <p className="text-muted-foreground text-sm">
                              Nenhuma permissão selecionada
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!isFormValid || isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Criando...' : 'Criar Funcionário'}
          </Button>
        </div>
      </form>
    </div>
  );
}
