import { ListaSiglaComponent } from './lista-sigla.component';
import { ListaEstadoComponent } from './lista-estado.component';
import { TableModule } from 'primeng/components/table/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ListalicenciadoComponent } from './lista-licenciado.component';
import { FerramentasRoutingModule } from './ferramentas-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    CommonModule,
    FerramentasRoutingModule,
    ConfirmDialogModule,
    TableModule
  ],
  declarations: [
    ListalicenciadoComponent,
    ListaEstadoComponent,
    ListaSiglaComponent

  ]
})
export class FerramentasModule { }
