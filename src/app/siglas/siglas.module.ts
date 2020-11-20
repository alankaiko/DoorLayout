import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadSiglaComponent } from './cad-sigla/cad-sigla.component';
import { ListaSiglaComponent } from './lista-sigla/lista-sigla.component';



@NgModule({
  declarations: [CadSiglaComponent, ListaSiglaComponent],
  imports: [
    CommonModule
  ]
})
export class SiglasModule { }
