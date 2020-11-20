import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaGrupoexameComponent } from './lista-grupoexame/lista-grupoexame.component';
import { CadGrupoexameComponent } from './cad-grupoexame/cad-grupoexame.component';



@NgModule({
  declarations: [ListaGrupoexameComponent, CadGrupoexameComponent],
  imports: [
    CommonModule
  ]
})
export class GrupoexamesModule { }
