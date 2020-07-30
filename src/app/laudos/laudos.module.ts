import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaLaudoComponent } from './tela-laudo/tela-laudo.component';
import { InserirImagensComponent } from './inserir-imagens/inserir-imagens.component';
import { PaginaimagensComponent } from './paginaimagens/paginaimagens.component';



@NgModule({
  declarations: [TelaLaudoComponent, InserirImagensComponent, PaginaimagensComponent, PaginaimagensComponent],
  imports: [
    CommonModule
  ]
})
export class LaudosModule { }
