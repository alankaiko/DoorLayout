import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transcraniano',
  templateUrl: './transcraniano.component.html',
  styleUrls: ['./transcraniano.component.css']
})
export class TranscranianoComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  equip: any[];
  ecomedios: any[];
  cerebrals: any[];
  talamos: any[];
  nucleobases: any[];
  ventrilucos: any[];
  coroides: any[];
  posteriors: any[];
  subdurals: any[];
  impressoes: any[];

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

    this.ecomedios = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.cerebrals = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.talamos = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.nucleobases = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.ventrilucos = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.coroides = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.posteriors = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.subdurals = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.impressoes = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];
  }

}
