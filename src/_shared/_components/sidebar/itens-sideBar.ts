import {
  AlertCircle,
  ArrowLeftRight,
  Calendar,
  FileSpreadsheet,
  FileText,
  Home,
  Inbox,
  Info,
  LayoutDashboardIcon,
  List,
  LogOut,
  LucideRulerDimensionLine,
  Package,
  Scissors,
  Search,
  Settings,
  Truck,
  Users,
} from 'lucide-react';
export const itemsSideBar = [
  {
    title: 'Produtividade',
    url: 'produtividade',
    icon: LayoutDashboardIcon,
    recurso: 'produtividade',
    child: [
      {
        title: 'Produtividade',
        url: '/produtividade',
        icon: LayoutDashboardIcon,
        recurso: 'produtividade',
      },
      {
        title: 'Funcionarios',
        url: '/produtividade/funcionarios',
        icon: Users,
        recurso: 'estoque',
      },
      {
        title: 'Anomalias',
        url: '/produtividade/relatorio/anomalia',
        icon: AlertCircle,
        recurso: 'produtividade',
      },
      {
        title: 'Paletes Em Aberto',
        url: '/produtividade/paletes/em-aberto',
        icon: Inbox,
        recurso: 'produtividade',
      },
      {
        title: 'Relatório',
        url: '/produtividade/relatorio',
        icon: FileText,
        recurso: 'produtividade',
      },
      {
        title: 'Buscar Demanda',
        url: '/produtividade/buscar-demanda',
        icon: Search,
        recurso: 'produtividade',
      }
    ],
  },
  {
    title: 'Expedição',
    url: '/expedicao',
    icon: Truck,
    recurso: 'expedicao',
    child: [
      {
        title: 'Mapa',
        url: '/expedicao',
        icon: Truck,
        recurso: 'expedicao',
      },
      {
        title: 'Configurações',
        url: '/expedicao/config',
        icon: Settings,
        recurso: 'configuracoes',
      },
      {
        title: 'Reagendar Expedição',
        url: '/expedicao/trocar-data-expedicao',
        icon: Calendar,
        recurso: 'expedicao',
      }
    ],
  },
  {
    title: 'Estoque',
    url: '/estoque',
    icon: Package,
    recurso: 'estoque',
    child: [
      {
        title: 'Cadastrar Contagem',
        url: '/movimentacao/contagem',
        icon: Package,
        recurso: 'estoque',
      },
      {
        title: 'Movimentação',
        url: '/movimentacao',
        icon: ArrowLeftRight,
        recurso: 'estoque',
      },
      {
        title: 'Relatório de Cortes',
        url: '/estoque/cortes',
        icon: Scissors,
        recurso: 'estoque',
      },
      {
        title: 'Cortes Adm',
        url: '/corte/adm',
        icon: Scissors,
        recurso: 'estoque',
      }
    ]
  },
  {
    title: 'Transporte',
    url: '/transporte',
    icon: Truck,
    recurso: 'transporte',
    child: [
      {
        title: 'Overview',
        url: '/transporte',
        icon: Truck,
        recurso: 'transporte',
      },
    ],
  },
  {
    title: 'Devolução',
    url: '/devolucao',
    icon: Package,
    recurso: 'devolucao',
    child: [
      {
        title: 'Devolucao',
        url: '/return',
        icon: ArrowLeftRight,
        recurso: 'devolucao',
      },
      {
        title: 'Relatórios',
        url: '/return/relatorios',
        icon: FileSpreadsheet,
        recurso: 'devolucao',
      },
      {
        title: 'Info Demanda',
        url: '/return/info',
        icon: Info,
        recurso: 'devolucao',
      },
    ],
  },
  {
    title: 'Centros',
    url: '/center',
    icon: Settings,
    recurso: 'configuracoes',
    child: [
      {
        title: 'Lista de Centros',
        url: '/center',
        icon: List,
        recurso: 'configuracoes',
      },
      {
        title: 'Usuarios',
        url: '/users',
        icon: Users,
        recurso: 'pessoal',
      },
      {
        title: 'Regras Anomalias',
        url: '/center/rules',
        icon: AlertCircle,
        recurso: 'configuracoes',
      },
    ],
  },
];
