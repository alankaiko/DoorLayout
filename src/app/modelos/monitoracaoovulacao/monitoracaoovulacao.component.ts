import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-monitoracaoovulacao',
  templateUrl: './monitoracaoovulacao.component.html',
  styleUrls: ['./monitoracaoovulacao.component.css']
})
export class MonitoracaoovulacaoComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  equip: any[];
  dadosclinicos: any[];
  inducoes: any[];
  hcg: any[];
  suplementacoes: any[];
  folicular: any[];
  endometrial: any[];
  luteas: any[];
  realizados: any[];
  impressoes: any[];

  constructor() { }

  ngOnInit(): void {
    this.CarregoarDrops();
  }

  CarregoarDrops() {
    this.equip = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Convexo', value: 'convexo'},
      {label: 'Linear', value: 'linear'},
      {label: 'Endocavitário', value: 'endocavitario'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.dadosclinicos = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.inducoes = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.hcg = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.suplementacoes = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.folicular = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.endometrial = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.luteas = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.realizados = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.impressoes = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];
  }

}
