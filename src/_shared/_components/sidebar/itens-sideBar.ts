import {
  AlertCircle,
  ArrowLeftRight,
  Calendar,
  FileText,
  Home,
  Inbox,
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
    recurso: 'configuracoes',
    child: [
      {
        title: 'Movimentação',
        url: '/movimentacao',
        icon: ArrowLeftRight,
        recurso: 'movimentacao',
      },
      {
        title: 'Relatório de Cortes',
        url: '/estoque/cortes',
        icon: Scissors,
      },
      {
        title: 'Cortes Adm',
        url: '/corte/adm',
        icon: Scissors,
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
        url: '/devolucao',
        icon: ArrowLeftRight,
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
