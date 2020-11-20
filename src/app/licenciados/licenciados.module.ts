import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadLicenciadoComponent } from './cad-licenciado/cad-licenciado.component';
import { ListaLicenciadoComponent } from './lista-licenciado/lista-licenciado.component';



@NgModule({
  declarations: [CadLicenciadoComponent, ListaLicenciadoComponent],
  imports: [
    CommonModule
  ]
})
export class LicenciadosModule { }
