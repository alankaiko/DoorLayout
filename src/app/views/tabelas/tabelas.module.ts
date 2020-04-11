import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { TabelasRoutingModule } from './tabelas-routing.module';
import { ListatextopessoalComponent } from './listatextopessoal.component';
import { ListaprofsolicitanteComponent } from './listaprofsolicitante.component';
import { ListaprofexecutanteComponent } from './listaprofexecutante.component';
import { ListapacienteComponent } from './listapaciente.component';
import { ListagrupoexameComponent } from './listagrupoexame.component';
import { ListaexameprocmedicoComponent } from './listaexameprocmedico.component';
import { ListaconvenioComponent } from './listaconvenio.component';
import { ListaabreviaturaComponent } from './listaabreviatura.component';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/components/table/table';
import { ModalModule } from 'ngx-bootstrap/modal';
import {ButtonModule} from 'primeng/components/button/button';
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  imports: [
    CommonModule,
    TabelasRoutingModule,
    TableModule,
    ModalModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FormsModule
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
