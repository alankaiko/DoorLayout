import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapturaComponent } from './captura/captura.component';
import { EdicaoimagemComponent } from './edicaoimagem/edicaoimagem.component';



@NgModule({
  declarations: [CapturaComponent, EdicaoimagemComponent],
  imports: [
    CommonModule
  ]
})
export class CapturasModule { }
