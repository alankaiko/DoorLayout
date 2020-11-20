import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadEstadoComponent } from './cad-estado/cad-estado.component';
import { ListaEstadoComponent } from './lista-estado/lista-estado.component';



@NgModule({
  declarations: [CadEstadoComponent, ListaEstadoComponent],
  imports: [
    CommonModule
  ]
})
export class EstadosModule { }
