import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-laparoscopiadiagbiop',
  templateUrl: './laparoscopiadiagbiop.component.html',
  styleUrls: ['./laparoscopiadiagbiop.component.css']
})
export class LaparoscopiadiagbiopComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  dadostecnicos: any[];
  anestesias: any[];
  peritoneal: any[];
  bexigas: any[];
  uteros: any[];
  tubadireita: any[];
  cromotubagemdireita: any[];
  tubaesquerda: any[];
  cromotubagemesquerda: any[];
  ovariodireito: any[];
  ovarioesquerdo: any[];
  biopsias: any[];
  procedimentos: any[];
  impressoes: any[];

  constructor() { }

  ngOnInit(): void {
    this.CarregarDrops();
  }

  CarregarDrops() {
    this.dadostecnicos = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.anestesias = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Geral', value: 'geral'},
      {label: 'Peridural', value: 'peridural'},
      {label: 'Ráqui', value: 'raqui'},
      {label: 'Geral + peridural', value: 'geral'}
    ];

    this.anestesias = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.bexigas = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.uteros = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.tubadireita = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.cromotubagemdireita = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Pérvia com facilidade', value: 'perviafacilidade'},
      {label: 'Pérvia com relativa dificuldade', value: 'perviadificuldade'},
      {label: 'Pérvia com muita dificuldade', value: 'perviamuitadificuldade'},
      {label: 'Obstruída com terço proximal', value: 'tercoproximal'},
      {label: 'Obstruída no terço médio', value: 'tercomedio'},
      {label: 'Obstruída no terço distal', value: 'tercodistal'}
    ];

    this.tubaesquerda = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.cromotubagemesquerda = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Pérvia com facilidade', value: 'perviafacilidade'},
      {label: 'Pérvia com relativa dificuldade', value: 'perviadificuldade'},
      {label: 'Pérvia com muita dificuldade', value: 'perviamuitadificuldade'},
      {label: 'Obstruída com terço proximal', value: 'tercoproximal'},
      {label: 'Obstruída no terço médio', value: 'tercomedio'},
      {label: 'Obstruída no terço distal', value: 'tercodistal'}
    ];


    this.ovariodireito = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.ovarioesquerdo = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.biopsias = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.procedimentos = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.impressoes = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];
    }
}
