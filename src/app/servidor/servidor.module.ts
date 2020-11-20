import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaServidorComponent } from './lista-servidor/lista-servidor.component';
import { PrevisualizacaoComponent } from './previsualizacao/previsualizacao.component';
import { ViewerComponent } from './viewer/viewer.component';



@NgModule({
  declarations: [ListaServidorComponent, PrevisualizacaoComponent, ViewerComponent],
  imports: [
    CommonModule
  ]
})
export class ServidorModule { }
