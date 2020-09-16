import { VideocolposcopiaifcpcComponent } from './modelos/videocolposcopiaifcpc/videocolposcopiaifcpc.component';
import { EndoscopiadigestivabaixaComponent } from './modelos/endoscopiadigestivabaixa/endoscopiadigestivabaixa.component';
import { VideocolposcComponent } from './modelos/videocolposc/videocolposc.component';
import { MorfologicofetalComponent } from './modelos/morfologicofetal/morfologicofetal.component';
import { MonitoracaoovulacaoComponent } from './modelos/monitoracaoovulacao/monitoracaoovulacao.component';
import { Obstetrico1trimestreComponent } from './modelos/obstetrico1trimestre/obstetrico1trimestre.component';
import { LaudoComponent } from './laudos/laudo/laudo.component';
import { PaginaimagensComponent } from './laudos/paginaimagens/paginaimagens.component';
import { CadastroSubcategoriacidComponent } from './views/formularios/cadastro-subcategoriacid.component';
import { ListasubcategoriacidComponent } from './views/tabelas/listasubcategoriacid.component';
import { SiglaComponent } from './views/ferramentas/sigla.component';
import { EstadoComponent } from './views/ferramentas/estado.component';
import { LicenciadoComponent } from './views/ferramentas/licenciado.component';
import { InserirImagensComponent } from './laudos/inserir-imagens/inserir-imagens.component';
import { TelaLaudoComponent } from './laudos/tela-laudo/tela-laudo.component';
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
import {ScrollPanelModule} from 'primeng/components/scrollpanel/scrollpanel';
import {RatingModule } from 'primeng/rating';
import { QuillModule } from 'ngx-quill';
import { CardModule } from 'primeng/components/card/card';
import { TableModule } from 'primeng/components/table/table';
import { DialogModule } from 'primeng/components/dialog/dialog';
import {CarouselModule} from 'primeng/carousel';
import { CoreModule } from './core/core.module';
import {RadioButtonModule} from 'primeng/radiobutton';
import {WebcamModule} from 'ngx-webcam';
import {AccordionModule} from 'primeng/accordion';
import {TabViewModule} from 'primeng/components/tabview/tabview';
import * as $ from 'jquery';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {FileUploadModule} from 'primeng/components/fileupload/fileupload';
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
import {TreeTableModule} from 'primeng/treetable';
import {SpinnerModule} from 'primeng/spinner';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {EditorModule} from 'primeng/components/editor/editor';
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
import { TextolivreComponent } from './modelos/textolivre/textolivre.component';
import { AbdomeinferiormascComponent } from './modelos/abdomeinferiormasc/abdomeinferiormasc.component';
import { AbdometotalComponent } from './modelos/abdometotal/abdometotal.component';
import { DiversosComponent } from './modelos/diversos/diversos.component';
import { DopplerfluxometriaComponent } from './modelos/dopplerfluxometria/dopplerfluxometria.component';
import { EndoscopiadigaltaComponent } from './modelos/endoscopiadigalta/endoscopiadigalta.component';
import { MamasComponent } from './modelos/mamas/mamas.component';
import { EcodopplercardiogramaComponent } from './modelos/ecodopplercardiograma/ecodopplercardiograma.component';
import { VideocolsposcopiaComponent } from './modelos/videocolsposcopia/videocolsposcopia.component';
import { AbdomesuperiorComponent } from './modelos/abdomesuperior/abdomesuperior.component';
import { VideofaringolarComponent } from './modelos/videofaringolar/videofaringolar.component';
import { VideoendoscopiaComponent } from './modelos/videoendoscopia/videoendoscopia.component';
import { VideonasofibrolarComponent } from './modelos/videonasofibrolar/videonasofibrolar.component';
import { AbdomeinferiorfemComponent } from './modelos/abdomeinferiorfem/abdomeinferiorfem.component';
import { TireoideComponent } from './modelos/tireoide/tireoide.component';
import { TranscranianoComponent } from './modelos/transcraniano/transcraniano.component';
import { AparelhourinarioComponent } from './modelos/aparelhourinario/aparelhourinario.component';
import { LaparoscopiadiagbiopComponent } from './modelos/laparoscopiadiagbiop/laparoscopiadiagbiop.component';
import { Obstetrico14semanasComponent } from './modelos/obstetrico14semanas/obstetrico14semanas.component';
import { HisteroscopiaComponent } from './modelos/histeroscopia/histeroscopia.component';
import { ObstetricomaissemanaComponent } from './modelos/obstetricomaissemana/obstetricomaissemana.component';
import { AbdomeinferiorfemendovComponent } from './modelos/abdomeinferiorfemendov/abdomeinferiorfemendov.component';

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
    AccordionModule
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
    ViewerComponent,
    TelaLaudoComponent,
    InserirImagensComponent,
    LicenciadoComponent,
    EstadoComponent,
    SiglaComponent,
    PaginaimagensComponent,
    ListasubcategoriacidComponent,
    CadastroSubcategoriacidComponent,
    LaudoComponent,
    TextolivreComponent,
    TextolivreComponent,
    AbdomeinferiormascComponent,
    AbdometotalComponent,
    DiversosComponent,
    DopplerfluxometriaComponent,
    EndoscopiadigaltaComponent,
    MamasComponent,
    EcodopplercardiogramaComponent,
    VideocolsposcopiaComponent,
    AbdomesuperiorComponent,
    VideofaringolarComponent,
    VideoendoscopiaComponent,
    VideonasofibrolarComponent,
    AbdomeinferiorfemComponent,
    TireoideComponent,
    TranscranianoComponent,
    AparelhourinarioComponent,
    LaparoscopiadiagbiopComponent,
    Obstetrico14semanasComponent,
    HisteroscopiaComponent,
    ObstetricomaissemanaComponent,
    AbdomeinferiorfemendovComponent,
    Obstetrico1trimestreComponent,
    MonitoracaoovulacaoComponent,
    MorfologicofetalComponent,
    VideocolposcComponent,
    EndoscopiadigestivabaixaComponent,
    VideocolposcopiaifcpcComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
