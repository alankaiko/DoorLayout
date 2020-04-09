import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaLaudoComponent } from './tela-laudo/tela-laudo.component';
import { InserirImagensComponent } from './inserir-imagens/inserir-imagens.component';
import { LaudoComponent } from './laudo/laudo.component';



@NgModule({
  declarations: [TelaLaudoComponent, InserirImagensComponent, LaudoComponent],
  imports: [
    CommonModule
  ]
})
export class LaudosModule { }
