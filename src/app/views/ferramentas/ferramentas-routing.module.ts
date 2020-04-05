import { ListaSiglaComponent } from './lista-sigla.component';
import { ListaEstadoComponent } from './lista-estado.component';
import { ListalicenciadoComponent } from './lista-licenciado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Ferramentas'
    },
    children: [
      {
        path: '',
        redirectTo: 'Licenciados'
      },
      {
        path: 'listalicenciado',
        component: ListalicenciadoComponent,
        data: {
          title: 'Licenciado Cad.'
        }
      },
      {
        path: 'listaestado',
        component: ListaEstadoComponent,
        data: {
          title: 'Estados'
        }
      },
      {
        path: 'listasigla',
        component: ListaSiglaComponent,
        data: {
          title: 'Siglas'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FerramentasRoutingModule {}
