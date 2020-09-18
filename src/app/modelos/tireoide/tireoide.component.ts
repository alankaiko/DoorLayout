import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tireoide',
  templateUrl: './tireoide.component.html',
  styleUrls: ['./tireoide.component.css']
})
export class TireoideComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  equip: any[];
  peles: any[];
  pretireoidianos: any[];
  carotidas: any[];
  tireoides: any[];
  linhaslobodireito: any[];
  linhasloboesquerdo: any[];
  tireoidismo: any[];
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

    this.peles = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.pretireoidianos = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.carotidas = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.tireoides = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.linhaslobodireito = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.linhasloboesquerdo = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.tireoidismo = [
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
