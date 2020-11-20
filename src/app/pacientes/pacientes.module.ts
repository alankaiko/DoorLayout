import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { CadPacientesComponent } from './cad-pacientes/cad-pacientes.component';



@NgModule({
  declarations: [ListaPacientesComponent, CadPacientesComponent],
  imports: [
    CommonModule
  ]
})
export class PacientesModule { }
