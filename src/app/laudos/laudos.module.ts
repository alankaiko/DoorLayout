import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaudoComponent } from './laudo/laudo.component';
import { PaginaimagensComponent } from './paginaimagens/paginaimagens.component';



@NgModule({
  declarations: [LaudoComponent, PaginaimagensComponent],
  imports: [
    CommonModule
  ]
})
export class LaudosModule { }
