import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-textolivre',
  templateUrl: './textolivre.component.html',
  styleUrls: ['./textolivre.component.css']
})
export class TextolivreComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;

  constructor() { }

  ngOnInit(): void {
    this.PegaAltura();
  }

  PegaAltura() {
    const painel = document.getElementById('paineltexto').clientHeight;
    const editor = document.querySelector('div.ui-editor-content');
    editor.setAttribute('style' , 'height: ' + painel + 'px;');
  }
}

