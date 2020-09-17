import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-videoendoscopia',
  templateUrl: './videoendoscopia.component.html',
  styleUrls: ['./videoendoscopia.component.css']
})
export class VideoendoscopiaComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  indicacaoclinica: any[];
  opticas: any[];
  septosnasal: any[];
  desvionasal: any[];
  direcaonasal: any[];
  tipodesvionasal: any[];
  mucosadireita: any[];
  mucosaesquerda: any[];
  conchainferiordireita: any[];
  conchainfeioresquerda: any[];
  meatoinferiordireito: any[];
  meatoinferioresquerdo: any[];
  conchamediadireita: any[];
  conchamediaesquerda: any[];
  meatomediodireito: any[];
  meatomedioesquerdo: any[];
  rinofaringecavum: any[];
  rinofaringeadenoide: any[];
  rinofaringostios: any[];
  rinofaringepalatal: any[];
  impressoes: any[];

  constructor() { }

  ngOnInit(): void {
    this.CarregarDrops();
  }

  CarregarDrops() {
    this.indicacaoclinica = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.opticas = [
      {label: 'Flexível', value: 'flexivel'},
      {label: 'Rígida', value: 'rigida'}
    ];

    this.septosnasal = [
      {label: 'Centrado', value: 'centrado'},
      {label: 'Desvio', value: 'desvio'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.desvionasal = [
      {label: 'Caudal', value: 'caudal'},
      {label: 'Anterior', value: 'anterior'},
      {label: 'Médio', value: 'medio'},
      {label: 'Posterior', value: 'posterior'}
    ];

    this.direcaonasal = [
      {label: 'Para direita', value: 'direita'},
      {label: 'Para esquerda', value: 'esquerda'}
    ];

    this.tipodesvionasal = [
      {label: 'Leve', value: 'leve'},
      {label: 'Moderado', value: 'moderado'},
      {label: 'Obstrutivo', value: 'obstrutivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.mucosadireita = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normotrófica', value: 'normotrofica'},
      {label: 'Pálida', value: 'palida'},
      {label: 'Hiperemiada', value: 'hiperemiada'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.mucosaesquerda = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normotrófica', value: 'normotrofica'},
      {label: 'Pálida', value: 'palida'},
      {label: 'Hiperemiada', value: 'hiperemiada'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.conchainferiordireita = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normotrófica', value: 'normotrofica'},
      {label: 'Hipertrofiada, pouco responsiva ao vasoconstritor', value: 'poucoresp'},
      {label: 'Hipertrofiada, mas responsiva ao vasoconstritor', value: 'resp'},
      {label: 'Hipertrofiada, não responsiva ao vasoconstritor', value: 'naoresp'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.conchainfeioresquerda = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normotrófica', value: 'normotrofica'},
      {label: 'Hipertrofiada, pouco responsiva ao vasoconstritor', value: 'poucoresp'},
      {label: 'Hipertrofiada, mas responsiva ao vasoconstritor', value: 'resp'},
      {label: 'Hipertrofiada, não responsiva ao vasoconstritor', value: 'naoresp'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.meatoinferiordireito = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Ausência de secreção', value: 'ausencia'},
      {label: 'Presença de secreção hialina', value: 'presencahialina'},
      {label: 'Presença de secreção purulenta', value: 'prsencapurulenta'}
    ];

    this.meatoinferioresquerdo = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Ausência de secreção', value: 'ausencia'},
      {label: 'Presença de secreção hialina', value: 'presencahialina'},
      {label: 'Presença de secreção purulenta', value: 'prsencapurulenta'}
    ];

    this.conchamediadireita = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normotrófica', value: 'normotrofica'},
      {label: 'Hipertrofiada, pouco responsiva ao vasoconstritor', value: 'poucoresp'},
      {label: 'Hipertrofiada, mas responsiva ao vasoconstritor', value: 'resp'},
      {label: 'Hipertrofiada, não responsiva ao vasoconstritor', value: 'naoresp'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.conchamediaesquerda = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normotrófica', value: 'normotrofica'},
      {label: 'Hipertrofiada, pouco responsiva ao vasoconstritor', value: 'poucoresp'},
      {label: 'Hipertrofiada, mas responsiva ao vasoconstritor', value: 'resp'},
      {label: 'Hipertrofiada, não responsiva ao vasoconstritor', value: 'naoresp'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.meatomediodireito = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Ausência de secreção ou material obstrutivo', value: 'ausencia'},
      {label: 'Presença de secreção hialina', value: 'presencahialina'},
      {label: 'Presença de secreção purulenta', value: 'prsencapurulenta'},
      {label: 'Presença de tecido polipoide', value: 'prsencapolipoide'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.meatomedioesquerdo = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Ausência de secreção ou material obstrutivo', value: 'ausencia'},
      {label: 'Presença de secreção hialina', value: 'presencahialina'},
      {label: 'Presença de secreção purulenta', value: 'prsencapurulenta'},
      {label: 'Presença de tecido polipoide', value: 'prsencapolipoide'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.rinofaringecavum = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Livre', value: 'livre'},
      {label: 'Adenoide', value: 'adenoide'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.rinofaringeadenoide = [
      {label: 'Não imprimir', value: 'nao'},
      {label: '30%', value: '30'},
      {label: '50%', value: '50'},
      {label: '70%', value: '70'},
      {label: '90% ou mais', value: '90'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.rinofaringostios = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Livre', value: 'livre'},
      {label: 'Ocupados por tecidos adenoidiano', value: 'adenoidiano'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.rinofaringepalatal = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Preservada', value: 'preservada'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.impressoes = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];
  }

}
