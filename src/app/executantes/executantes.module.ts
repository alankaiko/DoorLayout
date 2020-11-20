import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaExecutanteComponent } from './lista-executante/lista-executante.component';
import { CadExecutanteComponent } from './cad-executante/cad-executante.component';



@NgModule({
  declarations: [ListaExecutanteComponent, CadExecutanteComponent],
  imports: [
    CommonModule
  ]
})
export class ExecutantesModule { }
