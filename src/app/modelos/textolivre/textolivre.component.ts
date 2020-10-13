import { Laudo, ParametroDoLaudo, CamposDoLaudo } from './../../core/model';
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
  }

  MontarImpressao() {
    this.camposdolaudo.zimpressao = '';
    this.camposdolaudo.zimpressao = this.camposdolaudo.campo1;
  }

}
