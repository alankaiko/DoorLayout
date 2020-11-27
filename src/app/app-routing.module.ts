import { ListaGrupoexameComponent } from './grupoexames/lista-grupoexame/lista-grupoexame.component';
import { ListaSiglaComponent } from './siglas/lista-sigla/lista-sigla.component';
import { ListaEstadoComponent } from './estados/lista-estado/lista-estado.component';
import { ListaLicenciadoComponent } from './licenciados/lista-licenciado/lista-licenciado.component';
import { PaginainicioComponent } from './paginainicio/paginainicio.component';
import { ListaTextopessoalComponent } from './textopessoal/lista-textopessoal/lista-textopessoal.component';
import { ListaSolicitanteComponent } from './solicitantes/lista-solicitante/lista-solicitante.component';
import { ListaExecutanteComponent } from './executantes/lista-executante/lista-executante.component';
import { ListaPacientesComponent } from './pacientes/lista-pacientes/lista-pacientes.component';
import { ListaProcmedicoComponent } from './procmedicos/lista-procmedico/lista-procmedico.component';
import { ListaConvenioComponent } from './convenios/lista-convenio/lista-convenio.component';
import { CadEstadoComponent } from './estados/cad-estado/cad-estado.component';
import { CadSiglaComponent } from './siglas/cad-sigla/cad-sigla.component';
import { CadLicenciadoComponent } from './licenciados/cad-licenciado/cad-licenciado.component';
import { CadPacientesComponent } from './pacientes/cad-pacientes/cad-pacientes.component';
import { CadTextopessoalComponent } from './textopessoal/cad-textopessoal/cad-textopessoal.component';
import { CadSolicitanteComponent } from './solicitantes/cad-solicitante/cad-solicitante.component';
import { CadExecutanteComponent } from './executantes/cad-executante/cad-executante.component';
import { CadProcmedicoComponent } from './procmedicos/cad-procmedico/cad-procmedico.component';
import { CadGrupoexameComponent } from './grupoexames/cad-grupoexame/cad-grupoexame.component';
import { CadConvenioComponent } from './convenios/cad-convenio/cad-convenio.component';
import { TelaAtendimentoComponent } from './atendimentos/tela-atendimento/tela-atendimento.component';
import { ListaAtendimentoComponent } from './atendimentos/lista-atendimento/lista-atendimento.component';
import { CapturaComponent } from './capturas/captura/captura.component';
import { PaginaimagensComponent } from './laudos/paginaimagens/paginaimagens.component';
import { LaudoComponent } from './laudos/laudo/laudo.component';
import { EdicaoimagemComponent } from './capturas/edicaoimagem/edicaoimagem.component';
import { CadSubcategoriacidComponent } from './cid/cad-subcategoriacid/cad-subcategoriacid.component';
import { ListaSubcategoriacidComponent } from './cid/lista-subcategoriacid/lista-subcategoriacid.component';
import { ViewerComponent } from './servidor/viewer/viewer.component';
import { PrevisualizacaoComponent } from './servidor/previsualizacao/previsualizacao.component';
import { ListaServidorComponent } from './servidor/lista-servidor/lista-servidor.component';
import { LayoutComponent } from './core/layout/layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Página Inicial'
    },
    children: [
      {
        path: 'home',
        component: PaginainicioComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
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
    component: LayoutComponent,
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
    component: LayoutComponent,
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
    component: LayoutComponent,
    data: {
      title: 'Lista CID10'
    },
    children: [
      {
        path: 'listasubcategoriacid',
        component: ListaSubcategoriacidComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Lista CID10'
    },
    children: [
      {
        path: 'subcategoriacid/:cod',
        component: CadSubcategoriacidComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
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
    component: LayoutComponent,
    data: {
      title: 'Laudos'
    },
    children: [
      {
        path: 'operacoes/laudos',
        component: LaudoComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Laudos'
    },
    children: [
      {
        path: 'operacoes/laudos/:cod',
        component: LaudoComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
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
    component: LayoutComponent,
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
    component: LayoutComponent,
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
    component: LayoutComponent,
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
    component: LayoutComponent,
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
    component: LayoutComponent,
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
    component: LayoutComponent,
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
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Convênio'
    },
    children: [
      {
        path: 'listaconvenio',
        component: ListaConvenioComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Convênio'
    },
    children: [
      {
        path: 'listaconvenio/novo',
        component: CadConvenioComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Editar Convênio'
    },
    children: [
      {
        path: 'listaconvenio/:cod',
        component: CadConvenioComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Grupos de Procedimento'
    },
    children: [
      {
        path: 'listagrupoexame/novo',
        component: CadGrupoexameComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Editar Grupos de Procedimento'
    },
    children: [
      {
        path: 'listagrupoexame/:cod',
        component: CadGrupoexameComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Grupos de Procedimento'
    },
    children: [
      {
        path: 'listagrupoexame',
        component: ListaGrupoexameComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Procedimento Médico'
    },
    children: [
      {
        path: 'listaexameprocmedico',
        component: ListaProcmedicoComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Procedimento Médico'
    },
    children: [
      {
        path: 'listaexameprocmedico/novo',
        component: CadProcmedicoComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Procedimento Médico'
    },
    children: [
      {
        path: 'listaexameprocmedico/:cod',
        component: CadProcmedicoComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Profissional Executante'
    },
    children: [
      {
        path: 'listaprofexecutante/novo',
        component: CadExecutanteComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Editar Profissional Executante'
    },
    children: [
      {
        path: 'listaprofexecutante',
        component: ListaExecutanteComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Editar Profissional Executante'
    },
    children: [
      {
        path: 'listaprofexecutante/:cod',
        component: CadExecutanteComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Profissional Solicitante'
    },
    children: [
      {
        path: 'listaprofsolicitante',
        component: ListaSolicitanteComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Profissional Solicitante'
    },
    children: [
      {
        path: 'listaprofsolicitante/novo',
        component: CadSolicitanteComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Editar Profissional Solicitante'
    },
    children: [
      {
        path: 'listaprofsolicitante/:cod',
        component: CadSolicitanteComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Texto Pessoal'
    },
    children: [
      {
        path: 'listatextopessoal',
        component: ListaTextopessoalComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Texto Pessoal'
    },
    children: [
      {
        path: 'listatextopessoal/novo',
        component: CadTextopessoalComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Texto Pessoal'
    },
    children: [
      {
        path: 'listatextopessoal/:cod',
        component: CadTextopessoalComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Paciente'
    },
    children: [
      {
        path: 'listapaciente',
        component: ListaPacientesComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Paciente'
    },
    children: [
      {
        path: 'listapaciente/novo',
        component: CadPacientesComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Paciente'
    },
    children: [
      {
        path: 'listapaciente/:cod',
        component: CadPacientesComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Licenciado'
    },
    children: [
      {
        path: 'listalicenciado/novo',
        component: CadLicenciadoComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Editar Licenciado'
    },
    children: [
      {
        path: 'listalicenciado/:cod',
        component: CadLicenciadoComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Lista Licenciado'
    },
    children: [
      {
        path: 'listalicenciado',
        component: ListaLicenciadoComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Estado'
    },
    children: [
      {
        path: 'listaestado/novo',
        component: CadEstadoComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Editar Estado'
    },
    children: [
      {
        path: 'listaestado/:cod',
        component: CadEstadoComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Lista Estado'
    },
    children: [
      {
        path: 'listaestado',
        component: ListaEstadoComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Cadastrar Sigla'
    },
    children: [
      {
        path: 'listasigla/novo',
        component: CadSiglaComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Editar Sigla'
    },
    children: [
      {
        path: 'listasigla/:cod',
        component: CadSiglaComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Lista Sigla'
    },
    children: [
      {
        path: 'listasigla',
        component: ListaSiglaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
