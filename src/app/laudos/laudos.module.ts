import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaLaudoComponent } from './tela-laudo/tela-laudo.component';
import { InserirImagensComponent } from './inserir-imagens/inserir-imagens.component';



@NgModule({
  declarations: [TelaLaudoComponent, InserirImagensComponent],
  imports: [
    CommonModule
  ]
})
export class LaudosModule { }
