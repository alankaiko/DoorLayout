import { MessageComponent } from './message/message.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayouthtmlComponent } from './layouthtml/layouthtml.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MessageComponent, LayouthtmlComponent],
  exports: [MessageComponent]
})
export class CoreModule { }
