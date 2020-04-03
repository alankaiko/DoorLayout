import { ParametrodosistemaService } from './../../zservice/parametrodosistema.service';
import { Component, OnInit } from '@angular/core';
import * as RoosterJs from 'roosterjs';
import { Editor, DefaultFormat, Alignment, Direction } from 'roosterjs';
import { SelectItem } from 'primeng/api';
export * from 'roosterjs-editor-types';
export * from 'roosterjs-editor-dom';
export * from 'roosterjs-editor-core';
export * from 'roosterjs-editor-api';
export * from 'roosterjs-editor-plugins';
export * from 'roosterjs-plugin-image-resize';
export * from 'roosterjs-html-sanitizer';
export * from 'roosterjs-plugin-picker';

interface ImagensLaudo {
  name: string;
  code: number;
}

@Component({
  selector: 'app-inserir-imagens',
  templateUrl: './inserir-imagens.component.html',
  styleUrls: ['./inserir-imagens.component.css']
})
export class InserirImagensComponent implements OnInit {
  colunas: number;
  linhas: number;
  arquivoselecionado: File;
  editor: Editor;
  fileUrl;
  monte: HTMLElement;
  qtdimagems: SelectItem[];
  selecioneqtd: ImagensLaudo;
  control: boolean;

  constructor() { }

  ngOnInit(): void {
    this.OpcoesImagem();
    this.AdicionarListener();
    this.ConfBasicas();
  }

  OpcoesImagem() {
    this.qtdimagems = [
      {label: 'Selecione', value: null},
      {label: '1 Imagem', value: {id: 1, name: '1 Imagem', code: '1'}},
      {label: '2 Imagens', value: {id: 2, name: '2 Imagens', code: '2'}},
      {label: '3 Imagens', value: {id: 3, name: '3 Imagens', code: '3'}},
      {label: '4 Imagens', value: {id: 4, name: '4 Imagens', code: '4'}},
      {label: '6 Imagens', value: {id: 5, name: '6 Imagens', code: '6'}},
      {label: '8 Imagens', value: {id: 5, name: '7 Imagens', code: '8'}}
    ];
  }

  ConfigurarVariavel() {
    if (this.selecioneqtd.code == 1) {
      this.colunas = this.selecioneqtd.code;
      this.linhas = this.selecioneqtd.code;
      this.CriarTabela();
      RoosterJs.insertTable(this.editor, this.colunas, this.linhas);
      this.ConfTabelaLinha1();
    }

    if (this.selecioneqtd.code == 2) {
      this.linhas = this.selecioneqtd.code;
      this.CriarTabela();
      RoosterJs.insertTable(this.editor, this.colunas, this.linhas);
      this.ConfTabelaLinha2();
    }

    if (this.selecioneqtd.code == 3) {
      this.linhas = this.selecioneqtd.code;
      this.CriarTabela();
      RoosterJs.insertTable(this.editor, this.colunas, this.linhas);
      this.ConfTabelaLinha3();
    }

    if (this.selecioneqtd.code == 4) {
      this.colunas = this.selecioneqtd.code / 2;
      this.linhas = this.selecioneqtd.code / 2;
      this.CriarTabela();
      RoosterJs.insertTable(this.editor, this.colunas, this.linhas);
      this.ConfTabelaLinha4();
    }

    if (this.selecioneqtd.code == 6) {
      this.colunas = this.selecioneqtd.code / 3;
      this.linhas = this.selecioneqtd.code / 2;
      this.CriarTabela();
      RoosterJs.insertTable(this.editor, this.colunas, this.linhas);
      this.ConfTabelaLinha6();
    }

    if (this.selecioneqtd.code == 8) {
      this.colunas = this.selecioneqtd.code / 4;
      this.linhas = this.selecioneqtd.code / 2;
      this.CriarTabela();
      RoosterJs.insertTable(this.editor, this.colunas, this.linhas);
      this.ConfTabelaLinha8();
    }
  }

  ConfTabelaLinha1() {
    document.querySelector('table').setAttribute('style', 'border-collapse: collapse; width: 50%; height: 400px; margin: 0 auto; vertical-align: middle; text-align: center; margin-top: 200px; table-layout: fixed;');
  }

  ConfTabelaLinha2() {
    document.querySelector('table').setAttribute('style', 'border-collapse: collapse; margin: 0 auto; width: 50%; height: 500px; margin-top: 120px; text-align: center; vertical-align: middle; table-layout: fixed;');
  }

  ConfTabelaLinha3() {
    document.querySelector('table').setAttribute('style', 'border-collapse: collapse; width: 40%; height: 600px; margin: 0 auto; margin-top: 100px; text-align: center; vertical-align: middle; table-layout: fixed;');
  }

  ConfTabelaLinha4() {
    document.querySelector('table').setAttribute('style', 'border-collapse: collapse; width: 60%; height: 500px; margin: 0 auto; margin-top: 150px; text-align: center; vertical-align: middle; table-layout: fixed;');
  }

  ConfTabelaLinha6() {
    document.querySelector('table').setAttribute('style', 'border-collapse: collapse; width: 60%; height: 600px; margin: 0 auto; margin-top: 100px; text-align: center; vertical-align: middle; table-layout: fixed;');
  }

  ConfTabelaLinha8() {
    document.querySelector('table').setAttribute('style', 'border-collapse: collapse; width: 50%; height: 600px; margin: 0 auto; margin-top: 100px; text-align: center; vertical-align: middle; table-layout: fixed;');
  }

  CriarTabela() {
    const tague = document.querySelector('table');
    if (tague !== null) {
      tague.parentNode.removeChild(tague);
    }
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
    document.getElementById('buttonImagem').addEventListener('click', () => RoosterJs.insertImage(this.editor, this.arquivoselecionado));
  }

  inputFileChange(event) {
    this.arquivoselecionado = event.target.files[0];
  }

  GerarPDF() {

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


}
