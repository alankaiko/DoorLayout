import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Home',
    url: '/dashboard',
    icon: 'fa fa-home'
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Servidor',
    url: '/servidor',
    icon: 'fa fa-server',
    children: [
      {
        name: 'Lista',
        url: '/servidor/listagem',
        icon: 'fa fa-angle-double-right'
      }
    ]
  },
  {
    name: 'Operações',
    url: '/operacoes',
    icon: 'fa fa-user-md',
    children: [
      {
        name: 'Atendimentos',
        url: '/operacoes/atendimento',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Laudos',
        url: '/operacoes/laudos',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Laudo Imagens',
        url: '/operacoes/laudosimagem',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Captura',
        url: '/operacoes/captura',
        icon: 'fa fa-angle-double-right'
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
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Convênios',
        url: '/tabelas/listaconvenio',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Grupos de Exame',
        url: '/tabelas/listagrupoexame',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Ex. e Proc. Médico',
        url: '/tabelas/listaexameprocmedico',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Prof. Executante',
        url: '/tabelas/listaprofexecutante',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Prof. Solicitante',
        url: '/tabelas/listaprofsolicitante',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Texto Pessoal',
        url: '/tabelas/listatextopessoal',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Abreviaturas',
        url: '/tabelas/listaabreviatura',
        icon: 'fa fa-angle-double-right'
      }
    ]
  },
  {
    name: 'Base de Dados',
    url: '/basededados',
    icon: 'fa fa-wpforms',
    children: [
      {
        name: 'CBHPM',
        url: '/basededados/cbhpm',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'CID10',
        url: '/basededados/cid10',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'CNES',
        url: '/basededados/cnes',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'CRM',
        url: '/basededados/crm',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Especialidade Médica',
        url: '/basededados/especialidademedica',
        icon: 'fa fa-angle-double-right'
      }
    ]
  },
  {
    name: 'Ferramentas',
    url: '/ferramentas',
    icon: 'fa fa-cubes',
    children: [
      {
        name: 'Dados Licenciado',
        url: '/ferramentas/listalicenciado',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Estados',
        url: '/ferramentas/listaestado',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Siglas',
        url: '/ferramentas/listasigla',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Backup',
        url: '/ferramentas/backup',
        icon: 'fa fa-angle-double-right'
      }
    ]
  },
  {
    name: 'Relatorios',
    url: '/relatorios',
    icon: 'fa fa-file-pdf-o',
    children: [
      {
        name: 'Rel Convênio',
        url: '/relatorios/relatorioporconvenio',
        icon: 'fa fa-angle-double-right'
      },
      {
        name: 'Rel Prof. Executante',
        url: '/relatorios/relatorioporexecutante',
        icon: 'fa fa-angle-double-right'
      }
    ]
  }
];
