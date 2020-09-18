import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-videonasofibrolar',
  templateUrl: './videonasofibrolar.component.html',
  styleUrls: ['./videonasofibrolar.component.css']
})
export class VideonasofibrolarComponent implements OnInit {
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
  tonsilaspalatinas: any[];
  uvulas: any[];
  basedelinguas: any[];
  valeculas: any[];
  seiospiriformes: any[];
  epiglotes: any[];
  aritenoides: any[];
  ariepigloticas: any[];
  superficiesmucosas: any[];
  vocaisbordos: any[];
  bandasventriculares: any[];
  coaptacaos: any[];
  vocaismobilidades: any[];
  vocaisfendas: any[];
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

    this.tonsilaspalatinas = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Nomortróficas', value: 'normotroficas'},
      {label: 'Hipertróficas', value: 'hipertroficas'},
      {label: 'Atróficas', value: 'atroficas'},
      {label: 'Assimétricas', value: 'assimetricas'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.uvulas = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normal', value: 'normal'},
      {label: 'Alongada', value: 'alongada'},
      {label: 'Bífida', value: 'bifida'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.basedelinguas = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normal', value: 'normal'},
      {label: 'Volume aumentado', value: 'aumentado'},
      {label: 'Presença de varizes', value: 'varizes'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.valeculas = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Livres', value: 'livres'},
      {label: 'Estase salivar', value: 'salivar'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.seiospiriformes = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Livres', value: 'livres'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.epiglotes = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normal', value: 'normal'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.aritenoides = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normais', value: 'normais'},
      {label: 'Hiperemiadas', value: 'hiperemiadas'},
      {label: 'Edemaciadas', value: 'edemaciadas'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.ariepigloticas = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normais', value: 'normais'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.bandasventriculares = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Livres', value: 'livres'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.superficiesmucosas = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Lisa', value: 'lisa'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.vocaisbordos = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Regulares', value: 'regulares'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.coaptacaos = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Completa', value: 'completa'},
      {label: 'Incompleta', value: 'inconpleta'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.vocaismobilidades = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normal', value: 'normal'},
      {label: 'Paresia direita', value: 'paresiadireita'},
      {label: 'Paresia esquerda', value: 'paresiaesquerda'},
      {label: 'Paralisia direita', value: 'paralisiadireita'},
      {label: 'Paralisia esquerda', value: 'paralisiaesquerda'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.vocaisfendas = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Anterior', value: 'anterior'},
      {label: 'Posterior', value: 'posterior'},
      {label: 'Em ampulheta', value: 'digitar'}
    ];

    this.impressoes = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];
  }

}
