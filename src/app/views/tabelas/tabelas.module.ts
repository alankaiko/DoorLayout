import { TabelasRoutingModule } from './tabelas-routing.module';
import { ListatextopessoalComponent } from './listatextopessoal.component';
import { ListaprofsolicitanteComponent } from './listaprofsolicitante.component';
import { ListaprofexecutanteComponent } from './listaprofexecutante.component';
import { ListapacienteComponent } from './listapaciente.component';
import { ListagrupoexameComponent } from './listagrupoexame.component';
import { ListaexameprocmedicoComponent } from './listaexameprocmedico.component';
import { ListaconvenioComponent } from './listaconvenio.component';
import { ListaabreviaturaComponent } from './listaabreviatura.component';
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
    TabelasRoutingModule,
    TableModule
  ],
  declarations: [
    ListaabreviaturaComponent,
    ListaconvenioComponent,
    ListaexameprocmedicoComponent,
    ListagrupoexameComponent,
    ListapacienteComponent,
    ListaprofexecutanteComponent,
    ListaprofsolicitanteComponent,
    ListatextopessoalComponent
  ]
})
export class TabelasModule { }
