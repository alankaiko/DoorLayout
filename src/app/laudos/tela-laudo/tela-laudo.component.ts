import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as RoosterJs from 'roosterjs';
import { Watermark, Editor, EditorPlugin, ImageResize, DefaultFormat, Alignment, Direction } from 'roosterjs';
import { ContentEdit, HyperLink, Paste } from 'roosterjs-editor-plugins';
import { EditorOptions } from 'roosterjs-editor-core';
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
  formulario: FormGroup;
  colunas: number;
  linhas: number;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.AdicionarListener();
    this.ConfBasicas();
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
      new RoosterJs.Watermark('Type content here ...'),
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

    const editor = new RoosterJs.Editor(contentDiv, options);

    document.getElementById('buttonB').addEventListener('click', () => RoosterJs.toggleBold(editor));
    document.getElementById('buttonI').addEventListener('click', () => RoosterJs.toggleItalic(editor));
    document.getElementById('buttonU').addEventListener('click', () => RoosterJs.toggleUnderline(editor));
    document.getElementById('buttonBullet').addEventListener('click', () => RoosterJs.toggleBullet(editor));
    document.getElementById('buttonNumbering').addEventListener('click', () => RoosterJs.toggleNumbering(editor));
    document.getElementById('buttonQuote').addEventListener('click', () => RoosterJs.toggleBlockQuote(editor));
    document.getElementById('buttonHeader').addEventListener('click', () => RoosterJs.toggleHeader(editor, 1));
    document.getElementById('buttonStrike').addEventListener('click', () => RoosterJs.toggleStrikethrough(editor));
    document.getElementById('buttonSubscript').addEventListener('click', () => RoosterJs.toggleSubscript(editor));
    document.getElementById('buttonSuperscript').addEventListener('click', () => RoosterJs.toggleSuperscript(editor));
    document.getElementById('buttonTextColor').addEventListener('click', () => RoosterJs.setTextColor(editor, '#994242'));
    document.getElementById('buttonFontName').addEventListener('click', () => RoosterJs.setFontName(editor, 'Arial'));
    document.getElementById('buttonAlignLeft').addEventListener('click', () => RoosterJs.setAlignment(editor, Alignment.Left));
    document.getElementById('buttonAlignCenter').addEventListener('click', () => RoosterJs.setAlignment(editor, Alignment.Center));
    document.getElementById('buttonAlignRight').addEventListener('click', () => RoosterJs.setAlignment(editor, Alignment.Right));
    document.getElementById('buttonToRight').addEventListener('click', () => RoosterJs.setDirection(editor, Direction.LeftToRight));
    document.getElementById('buttonToLeft').addEventListener('click', () => RoosterJs.setDirection(editor, Direction.RightToLeft));
    document.getElementById('buttonTable').addEventListener('click', () => RoosterJs.insertTable(editor, this.colunas, this.linhas));
    document.getElementById('buttonImagem').addEventListener('click', () => RoosterJs.insertImage(editor, this.colunas, this.linhas));

    document.getElementById('buttonUndo').addEventListener('click', () => editor.undo());
    document.getElementById('buttonRedo').addEventListener('click', () => editor.redo());

  }

}
