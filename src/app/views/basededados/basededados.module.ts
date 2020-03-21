import { EspecialidademedicaComponent } from './especialidademedica.component';
import { CrmComponent } from './crm.component';
import { CnesComponent } from './cnes.component';
import { Cid10Component } from './cid10.component';
import { CbhpmComponent } from './cbhpm.component';
import { BasededadosRoutingModule } from './basededados-routing.module';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/components/table/table';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    BasededadosRoutingModule,
    TableModule
  ],
  declarations: [
    CbhpmComponent,
    Cid10Component,
    CnesComponent,
    CrmComponent,
    EspecialidademedicaComponent
  ]
})
export class BasededadosModule { }
