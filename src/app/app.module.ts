import { TextolivreComponent } from './modelosdetexto/textolivre/textolivre.component';
import { ProcedimentoCadApendComponent } from './atendimentos/procedimento-cad-apend/procedimento-cad-apend.component';
import { ListaGrupoexameComponent } from './grupoexames/lista-grupoexame/lista-grupoexame.component';
import { ListaSiglaComponent } from './siglas/lista-sigla/lista-sigla.component';
import { ListaLicenciadoComponent } from './licenciados/lista-licenciado/lista-licenciado.component';
import { ListaEstadoComponent } from './estados/lista-estado/lista-estado.component';
import { CadSiglaComponent } from './siglas/cad-sigla/cad-sigla.component';
import {ToastModule} from 'primeng/toast';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CadEstadoComponent } from './estados/cad-estado/cad-estado.component';
import { CadLicenciadoComponent } from './licenciados/cad-licenciado/cad-licenciado.component';
import { CadPacientesComponent } from './pacientes/cad-pacientes/cad-pacientes.component';
import { ListaPacientesComponent } from './pacientes/lista-pacientes/lista-pacientes.component';
import { CadTextopessoalComponent } from './textopessoal/cad-textopessoal/cad-textopessoal.component';
import { ListaTextopessoalComponent } from './textopessoal/lista-textopessoal/lista-textopessoal.component';
import { CadSolicitanteComponent } from './solicitantes/cad-solicitante/cad-solicitante.component';
import { ListaSolicitanteComponent } from './solicitantes/lista-solicitante/lista-solicitante.component';
import { ListaExecutanteComponent } from './executantes/lista-executante/lista-executante.component';
import { CadExecutanteComponent } from './executantes/cad-executante/cad-executante.component';
import { CadProcmedicoComponent } from './procmedicos/cad-procmedico/cad-procmedico.component';
import { ListaProcmedicoComponent } from './procmedicos/lista-procmedico/lista-procmedico.component';
import { CadGrupoexameComponent } from './grupoexames/cad-grupoexame/cad-grupoexame.component';
import { CadConvenioComponent } from './convenios/cad-convenio/cad-convenio.component';
import { ListaConvenioComponent } from './convenios/lista-convenio/lista-convenio.component';
import { TelaAtendimentoComponent } from './atendimentos/tela-atendimento/tela-atendimento.component';
import { ListaAtendimentoComponent } from './atendimentos/lista-atendimento/lista-atendimento.component';
import { CapturaComponent } from './capturas/captura/captura.component';
import { PaginaimagensComponent } from './laudos/paginaimagens/paginaimagens.component';
import { LaudoComponent } from './laudos/laudo/laudo.component';
import { EdicaoimagemComponent } from './capturas/edicaoimagem/edicaoimagem.component';
import { CadSubcategoriacidComponent } from './cid/cad-subcategoriacid/cad-subcategoriacid.component';
import { ListaSubcategoriacidComponent } from './cid/lista-subcategoriacid/lista-subcategoriacid.component';
import { ViewerComponent } from './servidor/viewer/viewer.component';
import { PrevisualizacaoComponent } from './servidor/previsualizacao/previsualizacao.component';
import { ListaServidorComponent } from './servidor/lista-servidor/lista-servidor.component';
import { MenubarModule } from 'primeng/menubar';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PaginainicioComponent } from './paginainicio/paginainicio.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { AppComponent } from './app.component';
import {SplitButtonModule} from 'primeng/splitbutton';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {RatingModule } from 'primeng/rating';
import {CardModule} from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {CarouselModule} from 'primeng/carousel';
import { CoreModule } from './core/core.module';
import {RadioButtonModule} from 'primeng/radiobutton';
import {WebcamModule} from 'ngx-webcam';
import {AccordionModule} from 'primeng/accordion';
import {TabViewModule} from 'primeng/tabview';
import * as $ from 'jquery';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {FileUploadModule} from 'primeng/fileupload';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/calendar';
import {ToolbarModule} from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import {TreeTableModule} from 'primeng/treetable';
import {SpinnerModule} from 'primeng/spinner';
import {EditorModule} from 'primeng/editor';
import {InputMaskModule} from 'primeng/inputmask';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PaginainicioComponent,
    ListaServidorComponent,
    PrevisualizacaoComponent,
    ViewerComponent,
    ListaSubcategoriacidComponent,
    CadSubcategoriacidComponent,
    EdicaoimagemComponent,
    LaudoComponent,
    PaginaimagensComponent,
    CapturaComponent,
    ListaAtendimentoComponent,
    TelaAtendimentoComponent,
    ListaConvenioComponent,
    CadConvenioComponent,
    CadGrupoexameComponent,
    ListaProcmedicoComponent,
    CadProcmedicoComponent,
    CadExecutanteComponent,
    ListaExecutanteComponent,
    ListaSolicitanteComponent,
    CadSolicitanteComponent,
    ListaTextopessoalComponent,
    CadTextopessoalComponent,
    ListaPacientesComponent,
    CadPacientesComponent,
    CadLicenciadoComponent,
    CadEstadoComponent,
    CadSiglaComponent,
    ListaEstadoComponent,
    ListaLicenciadoComponent,
    ListaSiglaComponent,
    ListaGrupoexameComponent,
    ProcedimentoCadApendComponent,
    TextolivreComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FieldsetModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    InputMaskModule,
    ToolbarModule,
    CheckboxModule,
    DropdownModule,
    CoreModule,
    DataViewModule,
    PanelModule,
    RatingModule,
    CardModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    CarouselModule,
    WebcamModule,
    DialogModule,
    TreeTableModule,
    FileUploadModule,
    TabViewModule,
    ReactiveFormsModule,
    EditorModule,
    ScrollPanelModule,
    DragDropModule,
    EditorModule,
    RadioButtonModule,
    SpinnerModule,
    AccordionModule,
    MenubarModule,
    FormsModule,
    SplitButtonModule,
    ToastModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
