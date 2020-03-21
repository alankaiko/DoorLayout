import { EspecialidademedicaComponent } from './especialidademedica.component';
import { CrmComponent } from './crm.component';
import { CnesComponent } from './cnes.component';
import { Cid10Component } from './cid10.component';
import { CbhpmComponent } from './cbhpm.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base De Dados'
    },
    children: [
      {
        path: '',
        redirectTo: 'Cbhpm'
      },
      {
        path: 'cbhpm',
        component: CbhpmComponent,
        data: {
          title: 'CBHPM'
        }
      },
      {
        path: 'cid10',
        component: Cid10Component,
        data: {
          title: 'CID10'
        }
      },
      {
        path: 'cnes',
        component: CnesComponent,
        data: {
          title: 'CNES'
        }
      }
      ,
      {
        path: 'crm',
        component: CrmComponent,
        data: {
          title: 'CRM'
        }
      }
      ,
      {
        path: 'especialidademedica',
        component: EspecialidademedicaComponent,
        data: {
          title: 'Especialidade Médica'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasededadosRoutingModule {}
