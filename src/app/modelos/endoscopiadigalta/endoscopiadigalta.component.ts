import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-endoscopiadigalta',
  templateUrl: './endoscopiadigalta.component.html',
  styleUrls: ['./endoscopiadigalta.component.css']
})
export class EndoscopiadigaltaComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  textonormal: any[];
  textoaux: any[];

  constructor() { }

  ngOnInit(): void {
    this.CarregarDrops();
    console.log('vindo aqui');
  }

  CarregarDrops() {
    this.textonormal = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.textoaux = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'texto'},
      {label: 'Digitar', value: 'digitar'}
    ];
  }

}
