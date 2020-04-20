import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { RelatorioProfexecutanteComponent } from './relatorio-profexecutante.component';
import { RelatorioRoutingModule } from './relatorios-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatorioConvenioComponent } from './relatorio-convenio.component';



@NgModule({
  imports: [
    CommonModule,
    RelatorioRoutingModule,
    DropdownModule
  ],
  declarations: [
    RelatorioConvenioComponent,
    RelatorioProfexecutanteComponent
  ]
})
export class RelatoriosModule { }
