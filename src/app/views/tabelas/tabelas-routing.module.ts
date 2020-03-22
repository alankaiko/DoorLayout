import { ListaconvenioComponent } from './listaconvenio.component';
import { ListatextopessoalComponent } from './listatextopessoal.component';
import { ListaprofsolicitanteComponent } from './listaprofsolicitante.component';
import { ListaprofexecutanteComponent } from './listaprofexecutante.component';
import { ListaexameprocmedicoComponent } from './listaexameprocmedico.component';
import { ListagrupoexameComponent } from './listagrupoexame.component';
import { ListaabreviaturaComponent } from './listaabreviatura.component';
import { ListapacienteComponent } from './listapaciente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cadastros'
    },
    children: [
      {
        path: '',
        redirectTo: 'Pacientes'
      },
      {
        path: 'listapaciente',
        component: ListapacienteComponent,
        data: {
          title: 'Pacientes'
        }
      },
      {
        path: 'listaconvenio',
        component: ListaconvenioComponent,
        data: {
          title: 'Convênios'
        }
      },
      {
        path: 'grupoexame',
        component: ListagrupoexameComponent,
        data: {
          title: 'Grupos de Exame'
        }
      },
      {
        path: 'exameprocmedico',
        component: ListaexameprocmedicoComponent,
        data: {
          title: 'Ex. e Proc. Médicos'
        }
      },
      {
        path: 'listaprofexecutante',
        component: ListaprofexecutanteComponent,
        data: {
          title: 'Prof. Executantes'
        }
      },
      {
        path: 'listaprofsolicitante',
        component: ListaprofsolicitanteComponent,
        data: {
          title: 'Prof. Solicitantes'
        }
      },
      {
        path: 'listatextopessoal',
        component: ListatextopessoalComponent,
        data: {
          title: 'Texto Pessoal'
        }
      },
      {
        path: 'listaabreviatura',
        component: ListaabreviaturaComponent,
        data: {
          title: 'Abreviaturas'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabelasRoutingModule {}
