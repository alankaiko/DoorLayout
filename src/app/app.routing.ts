import { PaginaimagensComponent } from './laudos/paginaimagens/paginaimagens.component';
import { CadastroSubcategoriacidComponent } from './views/formularios/cadastro-subcategoriacid.component';
import { ListasubcategoriacidComponent } from './views/tabelas/listasubcategoriacid.component';
import { SiglaComponent } from './views/ferramentas/sigla.component';
import { EstadoComponent } from './views/ferramentas/estado.component';
import { LicenciadoComponent } from './views/ferramentas/licenciado.component';
import { InserirImagensComponent } from './laudos/inserir-imagens/inserir-imagens.component';
import { TelaLaudoComponent } from './laudos/tela-laudo/tela-laudo.component';
import { DefaultEspComponent } from './containers/default-esp/default-esp.component';
import { ViewerComponent } from './servidor/viewer/viewer.component';
import { PrevisualizacaoComponent } from './servidor/previsualizacao/previsualizacao.component';
import { ListaServidorComponent } from './servidor/lista-servidor/lista-servidor.component';
import { EdicaoimagemComponent } from './capturas/edicaoimagem/edicaoimagem.component';
import { CapturaComponent } from './capturas/captura/captura.component';
import { ListaAtendimentoComponent } from './atendimentos/lista-atendimento/lista-atendimento.component';
import { TelaAtendimentoComponent } from './atendimentos/tela-atendimento/tela-atendimento.component';
import { CadastroPacienteComponent } from './views/formularios/cadastro-paciente.component';
import { CadastroTextopessoalComponent } from './views/formularios/cadastro-textopessoal.component';
import { CadastroProfissionalsolComponent } from './views/formularios/cadastro-profissionalsol.component';
import { CadastroProfissionalexecComponent } from './views/formularios/cadastro-profissionalexec.component';
import { CadastroProcedimentomedicoComponent } from './views/formularios/cadastro-procedimentomedico.component';
import { CadastroGrupoprocedimentoComponent } from './views/formularios/cadastro-grupoprocedimento.component';
import { CadastroConvenioComponent } from './views/formularios/cadastro-convenio.component';
import { CadastroAbreviaturaComponent } from './views/formularios/cadastro-abreviatura.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Servidor'
    },
    children: [
      {
        path: 'servidor/listagem',
        component: ListaServidorComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'PreVisualizar'
    },
    children: [
      {
        path: 'previsualizar/:idpatient',
        component: PrevisualizacaoComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Viewer'
    },
    children: [
      {
        path: 'viewer/:cod',
        component: ViewerComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Lista CID10'
    },
    children: [
      {
        path: 'operacoes/listasubcategoriacid',
        component: ListasubcategoriacidComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Lista CID10'
    },
    children: [
      {
        path: 'operacoes/subcategoriacid/:cod',
        component: CadastroSubcategoriacidComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Editar Imagem'
    },
    children: [
      {
        path: 'operacoes/editarimagem',
        component: EdicaoimagemComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Laudos'
    },
    children: [
      {
        path: 'operacoes/laudos',
        component: TelaLaudoComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Laudos'
    },
    children: [
      {
        path: 'operacoes/laudos/:cod',
        component: TelaLaudoComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Laudos'
    },
    children: [
      {
        path: 'operacoes/laudos-teste',
        component: PaginaimagensComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Laudos'
    },
    children: [
      {
        path: 'operacoes/laudos-teste/:cod',
        component: PaginaimagensComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Inserir Imagens'
    },
    children: [
      {
        path: 'operacoes/laudosimagem',
        component: InserirImagensComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Captura'
    },
    children: [
      {
        path: 'operacoes/captura',
        component: CapturaComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Captura'
    },
    children: [
      {
        path: 'operacoes/captura/:cod',
        component: CapturaComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Atendimentos'
    },
    children: [
      {
        path: 'operacoes/atendimento',
        component: ListaAtendimentoComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Incluir Atendimento'
    },
    children: [
      {
        path: 'operacoes/atendimento/novo',
        component: TelaAtendimentoComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Incluir Atendimento'
    },
    children: [
      {
        path: 'operacoes/atendimento/:cod',
        component: TelaAtendimentoComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Cadastrar Abreviatura'
    },
    children: [
      {
        path: 'tabelas/listaabreviatura/novo',
        component: CadastroAbreviaturaComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Editar Abreviatura'
    },
    children: [
      {
        path: 'tabelas/listaabreviatura/:cod',
        component: CadastroAbreviaturaComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Cadastrar Convênio'
    },
    children: [
      {
        path: 'tabelas/listaconvenio/novo',
        component: CadastroConvenioComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Editar Convênio'
    },
    children: [
      {
        path: 'tabelas/listaconvenio/:cod',
        component: CadastroConvenioComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Cadastrar Grupos de Procedimento'
    },
    children: [
      {
        path: 'tabelas/listagrupoexame/novo',
        component: CadastroGrupoprocedimentoComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Editar Grupos de Procedimento'
    },
    children: [
      {
        path: 'tabelas/listagrupoexame/:cod',
        component: CadastroGrupoprocedimentoComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Cadastrar Procedimento Médico'
    },
    children: [
      {
        path: 'tabelas/listaexameprocmedico/novo',
        component: CadastroProcedimentomedicoComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Cadastrar Procedimento Médico'
    },
    children: [
      {
        path: 'tabelas/listaexameprocmedico/:cod',
        component: CadastroProcedimentomedicoComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Cadastrar Profissional Executante'
    },
    children: [
      {
        path: 'tabelas/listaprofexecutante/novo',
        component: CadastroProfissionalexecComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Editar Profissional Executante'
    },
    children: [
      {
        path: 'tabelas/listaprofexecutante/:cod',
        component: CadastroProfissionalexecComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Cadastrar Profissional Solicitante'
    },
    children: [
      {
        path: 'tabelas/listaprofsolicitante/novo',
        component: CadastroProfissionalsolComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Editar Profissional Solicitante'
    },
    children: [
      {
        path: 'tabelas/listaprofsolicitante/:cod',
        component: CadastroProfissionalsolComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Cadastrar Texto Pessoal'
    },
    children: [
      {
        path: 'tabelas/listatextopessoal/novo',
        component: CadastroTextopessoalComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Cadastrar Texto Pessoal'
    },
    children: [
      {
        path: 'tabelas/listatextopessoal/:cod',
        component: CadastroTextopessoalComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Cadastrar Paciente'
    },
    children: [
      {
        path: 'tabelas/listapaciente/novo',
        component: CadastroPacienteComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Cadastrar Paciente'
    },
    children: [
      {
        path: 'tabelas/listapaciente/:cod',
        component: CadastroPacienteComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Cadastrar Licenciado'
    },
    children: [
      {
        path: 'ferramentas/listalicenciado/novo',
        component: LicenciadoComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Editar Licenciado'
    },
    children: [
      {
        path: 'ferramentas/listalicenciado/:cod',
        component: LicenciadoComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Cadastrar Estado'
    },
    children: [
      {
        path: 'ferramentas/listaestado/novo',
        component: EstadoComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Editar Estado'
    },
    children: [
      {
        path: 'ferramentas/listaestado/:cod',
        component: EstadoComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Cadastrar Sigla'
    },
    children: [
      {
        path: 'ferramentas/listasigla/novo',
        component: SiglaComponent
      }
    ]
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Editar Sigla'
    },
    children: [
      {
        path: 'ferramentas/listasigla/:cod',
        component: SiglaComponent
      }
    ]
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultEspComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'tabelas',
        loadChildren: () => import('./views/tabelas/tabelas.module').then(m => m.TabelasModule)
      },
      {
        path: 'basededados',
        loadChildren: () => import('./views/basededados/basededados.module').then(m => m.BasededadosModule)
      },
      {
        path: 'ferramentas',
        loadChildren: () => import('./views/ferramentas/ferramentas.module').then(m => m.FerramentasModule)
      },
      {
        path: 'relatorios',
        loadChildren: () => import('./views/relatorios/relatorios.module').then(m => m.RelatoriosModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },

      {
        path: 'cadastro',
        loadChildren: () => import('./views/formularios/formularios.module').then(m => m.FormulariosModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
