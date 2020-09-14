import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dopplerfluxometria',
  templateUrl: './dopplerfluxometria.component.html',
  styleUrls: ['./dopplerfluxometria.component.css']
})
export class DopplerfluxometriaComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  equip: any[];
  incisuras: any[];
  ductodiastoles: any[];
  ductoveias: any[];

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

    this.incisuras = [
      {label: 'Não imprimir', value: 'naoimprimir'},
      {label: 'Não', value: 'nao'},
      {label: 'Sim', value: 'sim'}
    ];

    this.ductodiastoles = [
      {label: 'Não imprimir', value: 'naoimprimir'},
      {label: 'Presente', value: 'presente'},
      {label: 'Zero', value: 'zero'},
      {label: 'Reserva', value: 'reserva'}
    ];

    this.ductoveias = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Fluxo contínuo', value: 'continuo'},
      {label: 'Fluxo pulsátil', value: 'pulsatil'}
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
