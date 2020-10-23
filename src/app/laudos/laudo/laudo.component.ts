import { TextolivreComponent } from './../../modelos/textolivre/textolivre.component';
import { ParametrodosistemaService } from './../../zservice/parametrodosistema.service';
import { isEmptyObject } from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelodelaudodoprocService } from './../../zservice/modelodelaudodoproc.service';
import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { Atendimento, ProcedimentoAtendimento, ModeloDeLaudoDoProc, Laudo, STATUS_LAUDO, ParametroDoLaudo, SubcategoriaCid10, CamposDoLaudo } from './../../core/model';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginaimagensComponent } from '../paginaimagens/paginaimagens.component';

@Component({
  selector: 'app-laudo',
  templateUrl: './laudo.component.html',
  styleUrls: ['./laudo.component.css']
})
export class LaudoComponent implements OnInit {
  @ViewChild(TextolivreComponent) textolivrechild: TextolivreComponent;
  imagelogo: any;
  atendimentos: any[];
  procedimentosAtd: any[];
  atendimento = new Atendimento();
  atendimentoSelecionado: number;
  procedimentoAtdSelecionado: number;
  procedimento = new ProcedimentoAtendimento();
  modelodelaudodoproc = new Array<ModeloDeLaudoDoProc>();
  modelodelaudo: any[];
  prioridade: number;
  dropmodelo: boolean = false;
  conferindo: boolean = false;
  abrirpaginaimg: boolean = false;


  constructor(private service: AtendimentoService,
              private serviceproc: ProcedimentoatendimentoService,
              private servicemodelo: ModelodelaudodoprocService,
              private rota: ActivatedRoute,
              private route: Router,
              private servicoparametro: ParametrodosistemaService) { }

  ngOnInit(): void {
    const codatendimento = this.rota.snapshot.params.cod;

    if (codatendimento) {

    }

    this.CarregarAtendimentos();
    this.getImagemFromService();
  }

  AtivarExcluir() {
    this.dropmodelo = true;
  }

  CarregarAtendimentos() {
    this.service.ListarAtendimentos().then(lista => {
      this.atendimentos = lista.map(atendimento => ({label: 'atend: ' + atendimento.codigo + ' ' + atendimento.patient.patientname, value: atendimento.codigo}));
    }).catch(erro => erro);
  }

  CarregarProcedimentos() {
    this.service.BuscarProcedimentosPorAt(this.atendimentoSelecionado)
      .then(
        response => {
          this.atendimento = response;
          this.procedimentosAtd = this.atendimento.procedimentos.map(procedimento => ({label: procedimento.procedimentomedico.nome, value: procedimento.codigo}));
        }
      );
  }

  ConfigurarVariavel() {
    this.serviceproc.BuscarCodProcedimento(this.procedimentoAtdSelecionado)
      .then(
        response => {
          this.servicemodelo.BuscarPelaIdProcedimento(response)
            .then(
              resp => {
                this.modelodelaudodoproc = resp;
                this.prioridade = this.modelodelaudodoproc[0].prioridade;
                this.modelodelaudo = resp.map(modelo => ({label: modelo.descricao, value: modelo.prioridade}));

                this.FiltrandoProcedimento();
                this.RenderizarModeloLaudo();
              }
            );
        }
      );
  }

  FiltrandoProcedimento() {
    this.atendimento.procedimentos.filter(elo => {
      if (elo.codigo === this.procedimentoAtdSelecionado) {
        this.procedimento = elo;
      }
    });
  }

  RenderizarModeloLaudo() {
    if (isEmptyObject(this.procedimento.laudo)) {
      this.procedimento.laudo = new Laudo();
      this.conferindo = true;
      this.AbrirLaudo();
    } else {
      this.conferindo = true;
    }
  }

  Salvar() {
    setTimeout(() => {
      this.serviceproc.AtualizarComPaginas(this.procedimento);
    }, 50);
    this.ImprimirDocumento();
  }

  AbrirLaudo() {
    this.modelodelaudodoproc.filter(elo => {
      if (elo.prioridade === this.prioridade) {
        this.procedimento.laudo.camposdolaudo.campo1 = elo.customstring;
      }
    });

    setTimeout(() => {
      this.dropmodelo = false;
    }, 5);
  }

  getImagemFromService() {
    this.servicoparametro.PegarImagem(1).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imagelogo = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  EscolherImagens() {
    if (this.atendimento?.codigo != null) {
      // this.route.navigate(['/operacoes/laudos-teste', this.procedimento.codigo]);
      this.conferindo = false;
      this.abrirpaginaimg = true;
    }
  }

  EscolherLaudo() {
    this.abrirpaginaimg = false;
    this.conferindo = true;
  }

  ImprimirDocumento() {
    const win = window.open();
    win.document.write(this.ConfigurarCabecalho());
    win.document.write(this.ConfigurarLaudo());
    win.document.write(this.ConfigurarRodape());
    win.document.close();
    setTimeout(() => {
      win.print();
    }, 5);
  }

  private ConfigurarCabecalho() {
    return '<div class="page-header" style="text-align: center; margin: 0 auto; height: 230px; position: fixed; top: 0mm; width: 93%; background-color: white;">'
          +   '<div style="width: 100%;" class="logotip">'
          +     '<img id="imagemtopomenu" style="width: 150px; height: 100px;" src="' + this.imagelogo + '">'
          +   '</div>'

          +   '<div class="cabecalho" id="cabecalho" style="width: 100%; margin: 0 auto; text-align: center; border-top: 2px solid #000000; border-bottom: 2px solid #000000; margin-top: 10px; padding-top: 5px; padding-bottom: 5px;">'
          +     '<div id="linha1" style="width: 98%; display: inline-flex;">'
          +       '<span style="width: 50%; text-align: left; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">PACIENTE: ' + this.atendimento.patient.patientname.toUpperCase() + '</span>'
          +       '<span style="width: 50%; text-align: right; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">ATENDIMENTO: ' + this.ConfereAtendimento() + '</span>'
          +     '</div>'

          +     '<div id="linha2" style="width: 98%; display: inline-flex;">'
          +       '<span style="width: 50%; text-align: left; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">Data Atendimento: ' + this.atendimento.dataatendimento + '</span>'
          +       '<span style="width: 50%; text-align: right; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">Data Nasc: ' + this.atendimento.patient.birthday + ' Idade: ' + this.atendimento.patient.patientage + '</span>'
          +     '</div>'

          +     '<div id="linha3" style="width: 98%; display: inline-flex;">'
          +       '<span style="width: 50%; text-align: left; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">Dr. SOL.: ' + this.atendimento.solicitante.nome + '</span>'
          +       '<span style="width: 50%; text-align: right; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">Convênio: ' + this.atendimento.convenio.nome + '</span>'
          +     '</div>'
          +   '</div>'

          +   '<div class="labelprocedimento" id="labelprocedimento" style="width: 93%; margin: 0 auto; text-align: center; background-color: #cfcfcf; margin-top: 30px;">'
          +     '<span id="labelproc" style="text-transform: uppercase; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">' + this.ConfigurarLabelProcedimento() + '</span>'
          +   '</div>'
          + '</div>';
  }

  private ConfereAtendimento() {
    return ('0000000' + this.atendimento.codigo).slice(-7);
  }

  private ConfigurarLabelProcedimento() {
    let proc;
    this.procedimentosAtd.forEach(elo => {
      if (elo.value === this.procedimentoAtdSelecionado) {
        proc = elo.label;
      }
    });

    return proc;
  }

  private ConfigurarLaudo() {
    return  '<table>'
      +       '<thead>'
      +         '<tr>'
      +           '<td>'
      +             '<div class="page-header-space" style="height: 230px;"></div>'
      +           '</td>'
      +         '</tr>'
      +       '</thead>'

      +       '<tbody>'
      +         '<tr>'
      +           '<td>'
      +             '<div class="page" style="width: 93%; margin: 0 auto;">' + this.procedimento.laudo.camposdolaudo.campo1 + '</div>'
      +           '</td>'
      +         '</tr>'
      +         '<tr>'
      +           '<td>'
      +             '<div style="width: 100%; padding-top: 20px;">'
      +               '<div class="assinatura" id="assinatura" style="width: 40%; text-align: center; border-top: 1px solid; margin-top: 80px; margin: 0 auto;">'
      +                 '<span id="labelassinatura">' + this.ConfigurarAssinatura() + '</span>'
      +               '</div>'
      +             '</div>'
      +           '</td>'
      +         '</tr>'
      +       '</tbody>'

      +       '<tfoot>'
      +         '<tr>'
      +           '<td>'
      +             '<div class="page-footer-space" style="height: 25px;"></div>'
      +           '</td>'
      +         '</tr>'
      +       '</tfoot>'
      +      '</table>';
  }

  private ConfigurarAssinatura() {
    return 'MÉDICO EXECUTANTE <br>'
      + this.atendimento.solicitante.conselho.sigla.descricao + ' '
      + this.atendimento.solicitante.conselho.estado.uf + ' '
      + this.atendimento.solicitante.conselho.descricao;
  }

  ConfigurarRodape() {
    return  '<div class="page-footer" style="height: 25px; position: fixed; bottom: 0; width: 93%; border-top: 1px solid black; text-align: center; border-top: 1px solid #000; background-color: white;">'
      +       '<span id="labelrodape">Para adquirir este software acesse www.novaopcaomed.com.br (62)3643-6264</span>'
      +     '</div>';
  }
}
