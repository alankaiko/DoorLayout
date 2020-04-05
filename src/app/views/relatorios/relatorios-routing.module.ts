import { RelatorioProfexecutanteComponent } from './relatorio-profexecutante.component';
import { RelatorioConvenioComponent } from './relatorio-convenio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Relatórios'
    },
    children: [
      {
        path: '',
        redirectTo: 'relatorios'
      },
      {
        path: 'relatorioporconvenio',
        component: RelatorioConvenioComponent,
        data: {
          title: 'Relatório Por Convênio'
        }
      },
      {
        path: 'relatorioporexecutante',
        component: RelatorioProfexecutanteComponent,
        data: {
          title: 'Relatório Por Prof. Executante'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule {}
