import { getTestBed } from '@angular/core/testing';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { ModelolaudoprocService } from './../../zservice/modelolaudoproc.service';
import { ModeloLaudoProc, Atendimento, ProcedimentoAtendimento } from './../../core/model';
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
  monte: HTMLElement;
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


  constructor(private servicoparametro: ParametrodosistemaService,
              private servicemodelo: ModelolaudoprocService,
              private serviceproc: ProcedimentoatendimentoService,
              private service: AtendimentoService) { }

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
      new RoosterJs.HyperLink(url => 'Ctrl+Click to follow the link:' + url),
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
    win.document.write(this.editor.getContent());
    // win.document.getElementsByTagName('body')[0].style.marginBottom = '0';

    win.document.close();
    win.print();

    const na = $( '.corpo' ).length;
    console.log(na);
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

  ConfigurarLogotipo() {
    const topo = document.getElementById('imagemtopo');
    topo.setAttribute('style', 'width: 100%; margin: 0 auto; text-align: center;');
    topo.innerHTML = '';

    const imagem = document.createElement('img');
    imagem.setAttribute('id', 'imagemtopomenu');
    topo.appendChild(imagem);
    imagem.setAttribute('style', 'width: 150px; height: 100px; margin-top: 40px;');
    imagem.src = this.imagelogo;

  }

  ConfigurarInfoCliente() {
    const info = document.getElementById('cabecalho');
    info.setAttribute('style', 'width: 93%; margin: 0 auto; text-align: center; border-top: 2px solid #000000; border-bottom: 2px solid #000000; margin-top: 20px;');
    info.innerHTML = '';

    const linha1 = document.createElement('div');
    linha1.setAttribute('id', 'linha1');
    linha1.setAttribute('style', 'width: 98%; display: inline-flex;');
    info.appendChild(linha1);

    const linha2 = document.createElement('div');
    linha2.setAttribute('id', 'linha2');
    linha2.setAttribute('style', 'width: 98%; display: inline-flex;');
    info.appendChild(linha2);

    const linha3 = document.createElement('div');
    linha3.setAttribute('id', 'linha3');
    linha3.setAttribute('style', 'width: 98%; display: inline-flex;');
    info.appendChild(linha3);

    const spannome = document.createElement('span');
    spannome.setAttribute('style', 'width: 50%; text-align: left;');
    spannome.innerHTML = 'PACIENTE: ' + this.atendimento.patient.patientname;
    linha1.appendChild(spannome);

    const spanatendimento = document.createElement('span');
    spanatendimento.setAttribute('style', 'width: 50%; text-align: right;');
    spanatendimento.innerHTML = 'ATENDIMENTO: ' + this.atendimento.codigo;
    linha1.appendChild(spanatendimento);

    const spandataatd = document.createElement('span');
    spandataatd.setAttribute('style', 'width: 50%; text-align: left;');
    spandataatd.innerHTML = 'Data Atendimento: ' + this.atendimento.dataatendimento;
    linha2.appendChild(spandataatd);

    const spannascimento = document.createElement('span');
    spannascimento.setAttribute('style', 'width: 50%; text-align: right;');
    spannascimento.innerHTML = 'Data Nasc: ' + this.atendimento.patient.birthday + ' Idade: ' + this.atendimento.patient.patientage;
    linha2.appendChild(spannascimento);

    const spansolicitante = document.createElement('span');
    spansolicitante.setAttribute('style', 'width: 50%; text-align: left;');
    spansolicitante.innerHTML = 'Dr. SOL.: ' + this.atendimento.solicitante.nome;
    linha3.appendChild(spansolicitante);

    const spanconvenio = document.createElement('span');
    spanconvenio.setAttribute('style', 'width: 50%; text-align: right;');
    spanconvenio.innerHTML = 'Convênio: ' + this.atendimento.convenio.nome;
    linha3.appendChild(spanconvenio);
  }

  ConfigurarLabelProcedimento() {
    const labels = document.getElementById('labelprocedimento');
    labels.setAttribute('style', 'width: 93%; margin: 0 auto; text-align: center; background-color: #cfcfcf; margin-top: 30px;');
    labels.innerHTML = '';

    const span = document.createElement('span');
    span.setAttribute('id', 'labelproc');
    labels.appendChild(span);
    this.procedimentosAtd.forEach(elo => {
      if (elo.value === this.procedimentoAtdSelecionado) {
        span.innerHTML = elo.label;
      }
    });
    span.setAttribute('style', 'text-transform: uppercase; font-weight: bold; font-family: Arial, Helvetica, sans-serif;');
  }

  ConfiguraModelo(modeloselecionado) {
    const corpo = document.getElementById('corpo');
    corpo.setAttribute('style', 'width: 93%;margin: 0 auto;  margin-top: 30px;');
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

      this.ConfigurarLogotipo();
      this.ConfigurarInfoCliente();
      this.ConfigurarLabelProcedimento();
      this.ConfigurarAssinatura();
      this.ConfigurarRodape();
  }

  ConfigurarAssinatura() {
    const assinatura = document.getElementById('assinatura');
    assinatura.setAttribute('style', 'width: 35%; margin: 0 auto; text-align: center; border-top: 1px solid; margin-top: 80px;');
    assinatura.innerHTML = '';

    const span = document.createElement('span');
    span.setAttribute('id', 'labelassinatura');
    assinatura.appendChild(span);
    span.innerHTML = 'MÉDICO EXECUTANTE <br>'
      + this.atendimento.solicitante.conselho.sigla.descricao + ' '
      + this.atendimento.solicitante.conselho.estado.uf + ' '
      + this.atendimento.solicitante.conselho.descricao;

  }

  ConfigurarRodape() {
    const rodape = document.getElementById('rodape');
    rodape.setAttribute('style', 'width: 93%; margin: 0 auto; text-align: center; border-top: 1px solid; margin-top: 80px;');
    rodape.innerHTML = '';

    const span = document.createElement('span');
    span.setAttribute('id', 'labelrodape');
    rodape.appendChild(span);
    span.innerHTML = 'Para adquirir este software acesse www.novaopcaomed.com.br (62)3643-6264';
    // textarea.value.match(/\n/g).length + 1;
  }


  SalvandoDocumento() {
    // const divHeight = document.getElementById('contentDiv');
    // console.log(this.editor.getBlockElementAtNode);
    const aff = document.getElementById('corpo');
    console.log(aff.offsetHeight);
  }
}
