import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTextopessoalComponent } from './lista-textopessoal/lista-textopessoal.component';
import { CadTextopessoalComponent } from './cad-textopessoal/cad-textopessoal.component';



@NgModule({
  declarations: [ListaTextopessoalComponent, CadTextopessoalComponent],
  imports: [
    CommonModule
  ]
})
export class TextopessoalModule { }
