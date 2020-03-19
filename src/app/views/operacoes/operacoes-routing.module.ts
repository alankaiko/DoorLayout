import { CapturaComponent } from './captura.component';
import { LaudoComponent } from './laudo.component';
import { ListaatendimentoComponent } from './listaatendimento.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Operações'
    },
    children: [
      {
        path: '',
        redirectTo: 'Atendimento'
      },
      {
        path: 'listaatendimento',
        component: ListaatendimentoComponent,
        data: {
          title: 'Atendimentos'
        }
      },
      {
        path: 'laudo',
        component: LaudoComponent,
        data: {
          title: 'Laudos'
        }
      },
      {
        path: 'captura',
        component: CapturaComponent,
        data: {
          title: 'Captura'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacoesRoutingModule {}
