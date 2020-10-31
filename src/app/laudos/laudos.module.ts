import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelaLaudoComponent } from './tela-laudo/tela-laudo.component';
import { InserirImagensComponent } from './inserir-imagens/inserir-imagens.component';
import { PaginaimagensComponent } from './paginaimagens/paginaimagens.component';
import { LaudoComponent } from './laudo/laudo.component';
import { ModeloConsultaComponent } from './modelo-consulta/modelo-consulta.component';
import { RetornahtmlimgComponent } from './retornahtmlimg/retornahtmlimg.component';
import { RetornahtmlComponent } from './retornahtml/retornahtml.component';



@NgModule({
  declarations: [TelaLaudoComponent, InserirImagensComponent, PaginaimagensComponent, PaginaimagensComponent, LaudoComponent, ModeloConsultaComponent, RetornahtmlimgComponent, RetornahtmlComponent],
  imports: [
    CommonModule
  ]
})
export class LaudosModule { }
