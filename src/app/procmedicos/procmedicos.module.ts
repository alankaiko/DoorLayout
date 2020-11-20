import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProcmedicoComponent } from './lista-procmedico/lista-procmedico.component';
import { CadProcmedicoComponent } from './cad-procmedico/cad-procmedico.component';



@NgModule({
  declarations: [ListaProcmedicoComponent, CadProcmedicoComponent],
  imports: [
    CommonModule
  ]
})
export class ProcmedicosModule { }
