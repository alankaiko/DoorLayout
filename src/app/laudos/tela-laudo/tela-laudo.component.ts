import { ModelolaudoclientesalvoService } from './../../zservice/modelolaudoclientesalvo.service';
import { getTestBed } from '@angular/core/testing';
import { AtendimentoService, PdfFiltroDados } from './../../zservice/atendimento.service';
import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { ModelolaudoprocService } from './../../zservice/modelolaudoproc.service';
import { ModeloLaudoProc, Atendimento, ProcedimentoAtendimento, ModeloLaudoClienteSalvo } from './../../core/model';
import { ParametrodosistemaService } from './../../zservice/parametrodosistema.service';
import { Component, OnInit } from '@angular/core';
import * as RoosterJs from 'roosterjs';
import { Editor, DefaultFormat, Alignment, Direction } from 'roosterjs';
import { style } from '@angular/animations';
export * from 'roosterjs-editor-types';
export * from 'roosterjs-editor-dom';
export * from 'roosterjs-editor-core';
export * from 'roosterjs-editor-api';
export * from 'roosterjs-editor-plugins';
export * from 'roosterjs-plugin-image-resize';
export * from 'roosterjs-html-sanitizer';
export * from 'roosterjs-plugin-picker';


@Component({
  selector: 'app-tela-laudo',
  templateUrl: './tela-laudo.component.html',
  styleUrls: ['./tela-laudo.component.css']
})
export class TelaLaudoComponent implements OnInit {
  colunas: number;
  linhas: number;
  arquivoselecionado: File;
  editor: Editor;
  fileUrl;
  imagelogo: any;
  modelos: any[];
  modelo = new ModeloLaudoProc();
  atendimentos: any[];
  procedimentosAtd: any[];
  atendimento = new Atendimento();
  procedimento = new ProcedimentoAtendimento();
  atendimentoSelecionado: number;
  procedimentoAtdSelecionado: number;
  modeloselecionado: number;
  valordomodelooriginal: any;


  constructor(private servicoparametro: ParametrodosistemaService,
              private servicemodelo: ModelolaudoprocService,
              private serviceproc: ProcedimentoatendimentoService,
              private service: AtendimentoService,
              private servicemodelosalvo: ModelolaudoclientesalvoService) { }

  ngOnInit(): void {
    this.AdicionarListener();
    this.ConfBasicas();
    this.getImagemFromService();
    this.CarregarAtendimentos();
  }

  Mudarestado(divtable) {
    const display = document.getElementById(divtable).style.display;
    if (display === 'block') {
      document.getElementById(divtable).style.display = 'none';
    } else {
      document.getElementById(divtable).style.display = 'block';
    }
  }

  Esconder(divtable) {
    const display = document.getElementById(divtable).style.display = 'none';
  }

  ConfBasicas() {
    this.linhas = 1;
    this.colunas = 1;
  }

  AdicionarListener() {
    const contentDiv = document.getElementById('contentDiv') as HTMLDivElement;

    const plugins = [
      new RoosterJs.HyperLink(url => 'Click to follow the link:' + url),
      new RoosterJs.ContentEdit(Object.assign(RoosterJs.getDefaultContentEditFeatures(), {
        outdentWhenEnterOnEmptyLine: true,
        mergeInNewLineWhenBackspaceOnFirstChar: true,
        insertLineBeforeStructuredNodeFeature: true,
        unlinkWhenBackspaceAfterLink: true,
        smartOrderedList: true,
      })),
      new RoosterJs.ImageResize(),
      new RoosterJs.TableResize(),
      new RoosterJs.PickerPlugin({
        onInitalize: (insertNodeCallback, setIsSuggestingCallback) => {},
        onDispose: () => {},
        onIsSuggestingChanged: (isSuggesting) => {},
        queryStringUpdated: (queryString) => {},
        onRemove: (nodeRemoved, isBackwards) => null,
        }, {
        elementIdPrefix: 'samplepicker-',
        changeSource: 'SAMPLE_COLOR_PICKER',
        triggerCharacter: ':',
        isHorizontal: true,
      }),
      new RoosterJs.CustomReplace(),
    ];

    const defaultFormat: DefaultFormat = {
      bold: true,
      italic: true,
      underline: true,
    };

    const options: RoosterJs.EditorOptions = {plugins: plugins, defaultFormat: defaultFormat};
    this.editor = new RoosterJs.Editor(contentDiv, options);

    document.getElementById('buttonB').addEventListener('click', () => RoosterJs.toggleBold(this.editor));
    document.getElementById('buttonI').addEventListener('click', () => RoosterJs.toggleItalic(this.editor));
    document.getElementById('buttonU').addEventListener('click', () => RoosterJs.toggleUnderline(this.editor));
    document.getElementById('buttonBullet').addEventListener('click', () => RoosterJs.toggleBullet(this.editor));
    document.getElementById('buttonNumbering').addEventListener('click', () => RoosterJs.toggleNumbering(this.editor));
    document.getElementById('buttonQuote').addEventListener('click', () => RoosterJs.toggleBlockQuote(this.editor));
    document.getElementById('buttonHeader').addEventListener('click', () => RoosterJs.toggleHeader(this.editor, 1));
    document.getElementById('buttonStrike').addEventListener('click', () => RoosterJs.toggleStrikethrough(this.editor));
    document.getElementById('buttonSubscript').addEventListener('click', () => RoosterJs.toggleSubscript(this.editor));
    document.getElementById('buttonSuperscript').addEventListener('click', () => RoosterJs.toggleSuperscript(this.editor));
    document.getElementById('buttonTextColor').addEventListener('click', () => RoosterJs.setTextColor(this.editor, '#994242'));
    document.getElementById('buttonFontName').addEventListener('click', () => RoosterJs.setFontName(this.editor, 'times new roman'));
    document.getElementById('buttonAlignLeft').addEventListener('click', () => RoosterJs.setAlignment(this.editor, Alignment.Left));
    document.getElementById('buttonAlignCenter').addEventListener('click', () => RoosterJs.setAlignment(this.editor, Alignment.Center));
    document.getElementById('buttonAlignRight').addEventListener('click', () => RoosterJs.setAlignment(this.editor, Alignment.Right));
    document.getElementById('buttonToRight').addEventListener('click', () => RoosterJs.setDirection(this.editor, Direction.LeftToRight));
    document.getElementById('buttonToLeft').addEventListener('click', () => RoosterJs.setDirection(this.editor, Direction.RightToLeft));
    document.getElementById('buttonTable').addEventListener('click', () => RoosterJs.insertTable(this.editor, this.colunas, this.linhas));
    document.getElementById('buttonImagem').addEventListener('click', () => RoosterJs.insertImage(this.editor, this.arquivoselecionado));

    document.getElementById('buttonUndo').addEventListener('click', () => this.editor.undo());
    document.getElementById('buttonRedo').addEventListener('click', () => this.editor.redo());
  }

  inputFileChange(event) {
    this.arquivoselecionado = event.target.files[0];
  }

  GerarPDF() {
    document.querySelector('.corpo').setAttribute('style', 'width: 250px; height: 150px; border: 1px solid; margin: 0 auto; margin-top: 150px;');
    window.open(this.editor.getContent());
  }

  ImprimirDocumento() {
    const win = window.open();
    win.document.write(this.ConfigurarCabecalho());
    win.document.write(this.ConfigurarTextoLaudo());
    win.document.write(this.ConfigurarRodape());
    win.document.close();

    setTimeout(() => {
      win.print();
    }, 5);
  }

  ExportarDocumento() {
    const win = window.open();
    win.document.write(this.editor.getContent());
  }

  LimparDocumento() {
    this.editor.setContent('');
  }

  CriarTabb() {
    const tague = document.querySelector('table');
    if (tague !== null) {
      tague.parentNode.removeChild(tague);
    }
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



  CarregarAtendimentos() {
    this.service.ListarAtendimentos().then(lista => {
      this.atendimentos = lista.map(atendimento => ({label: 'atend: ' + atendimento.codigo + ' ' + atendimento.patient.patientname, value: atendimento.codigo}));
    }).catch(erro => erro);
  }

  CarregarProcedimentos() {
    this.service.BuscarPorIdLaudo(this.atendimentoSelecionado)
      .then(
        response => {
          this.atendimento = response;
          this.procedimentosAtd = this.atendimento.procedimentos.map(procedimento => ({label: procedimento.procedimentomedico.nome, value: procedimento.codigo}));
        }
      );
  }

  ConfigurarVariavel() {
    let codigoprocedimento;

    this.serviceproc.BuscarCodProcedimento(this.procedimentoAtdSelecionado)
      .then(
        response => {
          codigoprocedimento = response;

          this.servicemodelo.ListarPorProcedimento(response)
            .then(
              resp => {
                this.modelos = resp.map(modelo => ({label: modelo.descricao, value: modelo.codigo}));
              }
            );
        }
      );
  }

  ConfiguraModelo(modeloselecionado) {
    const corpo = document.getElementById('contentDiv');
    corpo.setAttribute('style', 'width: 93%; margin: 0 auto;  margin-top: 30px; position: relative');
    corpo.innerHTML = '';
    this.servicemodelo.BuscarPorId(modeloselecionado)
      .then(response => {
        this.modelo = response;
        this.modelo.customstring = this.modelo.customstring.replace('1;;setValor;;', '');
        this.modelo.customstring = this.modelo.customstring.replace('2;;setValor;;', '');
        this.modelo.customstring = this.modelo.customstring.replace('3;;setValor;;', '');
        this.modelo.customstring = this.modelo.customstring.replace('4;;setValor;;', '');
        this.modelo.customstring = this.modelo.customstring.replace('5;;setValor;;', '');
        this.modelo.customstring = this.modelo.customstring.replace('6;;setValor;;', '');
        this.modelo.customstring = this.modelo.customstring.replace('7;;setValor;;', '');
        this.modelo.customstring = this.modelo.customstring.replace('8;;setValor;;', '');
        this.modelo.customstring = this.modelo.customstring.replace('9;;setValor;;', '');
        this.modelo.customstring = this.modelo.customstring.replace('0;;setValor;;', '');
        corpo.innerHTML = this.modelo.customstring;
      });
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

  private ConfigurarTextoLaudo() {
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
      +             '<div class="page" style="width: 93%; margin: 0 auto;">' + this.editor.getContent() + '</div>'
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


  SalvandoDocumento() {
    const salvo = new ModeloLaudoClienteSalvo();
    salvo.customstring = this.editor.getContent();
    salvo.descricao = this.modelo.descricao;
    salvo.prioridade = this.modelo.prioridade;
    salvo.procedimentomedico = this.modelo.procedimentomedico;

    let proc;
    this.procedimentosAtd.forEach(elo => {
      if (elo.value === this.procedimentoAtdSelecionado) {
        proc = elo.label;
      }
    });

    this.servicemodelosalvo.Adicionar(salvo).then(response => {
      const dados = new PdfFiltroDados();

      dados.procedimento = proc;
      dados.executante = this.atendimento.solicitante.conselho.sigla.descricao + ' '
        + this.atendimento.solicitante.conselho.estado.uf + ' '
        + this.atendimento.solicitante.conselho.descricao;
      dados.codigoprocedimento = '1';

      this.service.PdfLaudo(this.atendimento.codigo, dados)
        .then(relatorio => {
          const url = window.URL.createObjectURL(relatorio);
          window.open(url);
        }
      );
    });
  }
}
