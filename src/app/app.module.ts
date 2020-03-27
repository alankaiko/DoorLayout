import { DefaultEspComponent } from './containers/default-esp/default-esp.component';
import { ViewerComponent } from './servidor/viewer/viewer.component';
import { PrevisualizacaoComponent } from './servidor/previsualizacao/previsualizacao.component';
import { ListaServidorComponent } from './servidor/lista-servidor/lista-servidor.component';
import { EdicaoimagemComponent } from './capturas/edicaoimagem/edicaoimagem.component';
import { CapturaComponent } from './capturas/captura/captura.component';
import { ProcedimentoCadApendComponent } from './atendimentos/procedimento-cad-apend/procedimento-cad-apend.component';
import { CardAtendimentoComponent } from './atendimentos/card-atendimento/card-atendimento.component';
import { TelaAtendimentoComponent } from './atendimentos/tela-atendimento/tela-atendimento.component';
import { ListaAtendimentoComponent } from './atendimentos/lista-atendimento/lista-atendimento.component';
import { DataViewModule } from 'primeng/components/dataview/dataview';
import { PanelModule } from 'primeng/components/panel/panel';
import {RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/components/card/card';
import { TableModule } from 'primeng/components/table/table';
import { DialogModule } from 'primeng/components/dialog/dialog';
import {CarouselModule} from 'primeng/carousel';
import { CoreModule } from './core/core.module';
import {WebcamModule} from 'ngx-webcam';
import { CadastroConvenioComponent } from './views/formularios/cadastro-convenio.component';
import { CadastroProfissionalexecComponent } from './views/formularios/cadastro-profissionalexec.component';
import { CadastroProfissionalsolComponent } from './views/formularios/cadastro-profissionalsol.component';
import { CadastroTextopessoalComponent } from './views/formularios/cadastro-textopessoal.component';
import { CadastroGrupoprocedimentoComponent } from './views/formularios/cadastro-grupoprocedimento.component';
import { CadastroPacienteComponent } from './views/formularios/cadastro-paciente.component';
import { CadastroAbreviaturaComponent } from './views/formularios/cadastro-abreviatura.component';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import {ToolbarModule} from 'primeng/components/toolbar/toolbar';
import { CheckboxModule } from 'primeng/components/checkbox/checkbox';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { ConfirmationService } from 'primeng/api';
import {TreeTableModule} from 'primeng/treetable';
import {TreeNode} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputMaskModule} from 'primeng/components/inputmask/inputmask';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldsetModule } from 'primeng/components/fieldset/fieldset';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent,
  DefaultEspComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { CadastroProcedimentomedicoComponent } from './views/formularios/cadastro-procedimentomedico.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
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
    TreeTableModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    CadastroAbreviaturaComponent,
    CadastroPacienteComponent,
    CadastroGrupoprocedimentoComponent,
    CadastroTextopessoalComponent,
    CadastroProfissionalsolComponent,
    CadastroProfissionalexecComponent,
    CadastroConvenioComponent,
    CadastroProcedimentomedicoComponent,
    ListaAtendimentoComponent,
    TelaAtendimentoComponent,
    CardAtendimentoComponent,
    ProcedimentoCadApendComponent,
    CapturaComponent,
    EdicaoimagemComponent,
    ListaServidorComponent,
    PrevisualizacaoComponent,
    ViewerComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
