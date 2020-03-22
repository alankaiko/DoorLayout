import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    icon: 'icon-drop'
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Operações',
    url: '/operacoes',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Atendimentos',
        url: '/operacoes/listaatendimento',
        icon: 'icon-puzzle'
      },
      {
        name: 'Laudos',
        url: '/operacoes/laudo',
        icon: 'icon-puzzle'
      },
      {
        name: 'Captura',
        url: '/operacoes/captura',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Cadastros',
    url: '/tabelas',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Pacientes',
        url: '/tabelas/listapaciente',
        icon: 'icon-puzzle'
      },
      {
        name: 'Convênios',
        url: '/tabelas/listaconvenio',
        icon: 'icon-puzzle'
      },
      {
        name: 'Grupos de Exame',
        url: '/tabelas/listagrupoexame',
        icon: 'icon-puzzle'
      },
      {
        name: 'Ex. e Proc. Médico',
        url: '/tabelas/listaexameprocmedico',
        icon: 'icon-puzzle'
      },
      {
        name: 'Prof. Executante',
        url: '/tabelas/listaprofexecutante',
        icon: 'icon-puzzle'
      },
      {
        name: 'Prof. Solicitante',
        url: '/tabelas/listaprofsolicitante',
        icon: 'icon-puzzle'
      },
      {
        name: 'Texto Pessoal',
        url: '/tabelas/listatextopessoal',
        icon: 'icon-puzzle'
      },
      {
        name: 'Abreviaturas',
        url: '/tabelas/listaabreviatura',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Base de Dados',
    url: '/basededados',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'CBHPM',
        url: '/basededados/cbhpm',
        icon: 'icon-puzzle'
      },
      {
        name: 'CID10',
        url: '/basededados/cid10',
        icon: 'icon-puzzle'
      },
      {
        name: 'CNES',
        url: '/basededados/cnes',
        icon: 'icon-puzzle'
      },
      {
        name: 'CRM',
        url: '/basededados/crm',
        icon: 'icon-puzzle'
      },
      {
        name: 'Especialidade Médica',
        url: '/basededados/especialidademedica',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Navbars',
        url: '/base/navbars',
        icon: 'icon-puzzle'

      },
      {
        name: 'Pagination',
        url: '/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Brand Buttons',
        url: '/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'CoreUI Icons',
        url: '/icons/coreui-icons',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Flags',
        url: '/icons/flags',
        icon: 'icon-star'
      },
      {
        name: 'Font Awesome',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }
];
