import { AtendimentoService } from './../../zservice/atendimento.service';
import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { ModelolaudoprocService } from './../../zservice/modelolaudoproc.service';
import { ModeloLaudoProc, Atendimento, ProcedimentoAtendimento } from './../../core/model';
import { ParametrodosistemaService } from './../../zservice/parametrodosistema.service';
import { Component, OnInit } from '@angular/core';
import * as RoosterJs from 'roosterjs';
import { Editor, DefaultFormat, Alignment, Direction } from 'roosterjs';
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
  monte: HTMLElement;
  imagelogo: any;
  modelos: any[];
  modelo = new ModeloLaudoProc();
  atendimentos: any[];
  procedimentosAtd: any[];
  atendimento = new Atendimento();
  procedimento = new ProcedimentoAtendimento();
  atendimentoSelecionado: number;
  procedimentosAtdSelecionado: number;
  modeloselecionado: number;


  constructor(private servicoparametro: ParametrodosistemaService,
              private servicemodelo: ModelolaudoprocService,
              private serviceproc: ProcedimentoatendimentoService,
              private service: AtendimentoService) { }

  ngOnInit(): void {
    this.AdicionarListener();
    this.ConfBasicas();
    this.getImagemFromService();
    this.MontarLaudo();
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
      new RoosterJs.HyperLink(url => 'Ctrl+Click to follow the link:' + url),
      new RoosterJs.Paste(),
      new RoosterJs.ContentEdit(Object.assign(RoosterJs.getDefaultContentEditFeatures(), {
        outdentWhenEnterOnEmptyLine: true,
        mergeInNewLineWhenBackspaceOnFirstChar: true,
        insertLineBeforeStructuredNodeFeature: true,
        unlinkWhenBackspaceAfterLink: true,
        smartOrderedList: true,
      })),
      new RoosterJs.Watermark('Inserir Texto'),
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
    win.document.write(this.editor.getContent());
    win.document.close();
    win.print();
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
    this.service.BuscarPorId(this.atendimentoSelecionado)
      .then(
        response => {
          this.atendimento = response;
          this.procedimentosAtd = this.atendimento.procedimentos.map(procedimento => ({label: procedimento.procedimentomedico.nome, value: procedimento.codigo}));
        }
      );
  }

  ConfigurarVariavel(procedimentoatdselecionado) {
    this.servicemodelo.ListarPorProcedimento(procedimentoatdselecionado)
      .then(
        response => {
          this.modelos = response.map(modelo => ({label: modelo.descricao, value: modelo.codigo}));
        }
      );
  }

  ConfiguraModelo(modeloselecionado) {
    const corpo = document.getElementById('corpo');
    corpo.innerHTML = '';

    this.servicemodelo.BuscarPorId(modeloselecionado)
      .then(response => {
        this.modelo = response;
        this.modelo.customstring = this.modelo.customstring.replace('2;;setValor;;', '');
        corpo.innerHTML = this.modelo.customstring;
      });
  }

  MontarLaudo() {
    const tague = document.querySelector('.cabecalho');
    tague.setAttribute('style', 'width: 100%; height: 250px;');

    document.querySelector('.dados').setAttribute('style', 'width: 90%; margin: 0 auto; margin-top: 15px; border-top: 1px solid; border-bottom: 1px solid; display: inline-table;');


  }

  SalvandoDocumento() {

  }
}