import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mamas',
  templateUrl: './mamas.component.html',
  styleUrls: ['./mamas.component.css']
})
export class MamasComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  equip: any[];
  textoaux: any[];

  constructor() { }

  ngOnInit(): void {
    this.CarregarDrops();
  }

  CarregarDrops() {
    this.equip = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Convexo', value: 'convexo'},
      {label: 'Linear', value: 'linear'},
      {label: 'Endocavitário', value: 'endocavitario'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.textoaux = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'texto'},
      {label: 'Digitar', value: 'digitar'}
    ];
  }

  CarregarTextoEquip() {
    if (this.camposdolaudo.campo1 === 'nao') {
      this.camposdolaudo.campo2 = '';
    }

    if (this.camposdolaudo.campo1 === 'convexo') {
      this.camposdolaudo.campo2 = 'Exame realizado em modo bidimensional com equipamento dinâmico Convexo multifrequêncial.';
    }

    if (this.camposdolaudo.campo1 === 'linear') {
      this.camposdolaudo.campo2 = 'Exame realizado em modo bidimensional com equipamento dinâmico Linear multifrequêncial.';
    }

    if (this.camposdolaudo.campo1 === 'endocavitario') {
      this.camposdolaudo.campo2 = 'Exame realizado em modo bidimensional com equipamento dinâmico Endocavitário multifrequêncial.';
    }

    if (this.camposdolaudo.campo1 === 'digitar') {
      this.camposdolaudo.campo2 = '';
    }
  }
}
