import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaSolicitanteComponent } from './lista-solicitante/lista-solicitante.component';
import { CadSolicitanteComponent } from './cad-solicitante/cad-solicitante.component';



@NgModule({
  declarations: [ListaSolicitanteComponent, CadSolicitanteComponent],
  imports: [
    CommonModule
  ]
})
export class SolicitantesModule { }
