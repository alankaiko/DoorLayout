import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaSubcategoriacidComponent } from './lista-subcategoriacid/lista-subcategoriacid.component';
import { CadSubcategoriacidComponent } from './cad-subcategoriacid/cad-subcategoriacid.component';



@NgModule({
  declarations: [ListaSubcategoriacidComponent, CadSubcategoriacidComponent],
  imports: [
    CommonModule
  ]
})
export class CidModule { }
