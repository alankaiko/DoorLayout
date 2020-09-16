import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-videofaringolar',
  templateUrl: './videofaringolar.component.html',
  styleUrls: ['./videofaringolar.component.css']
})
export class VideofaringolarComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  indicacaoclinica: any[];
  opticas: any[];
  tonsilas: any[];
  baseslingua: any[];
  valeculas: any[];
  seiospiri: any[];
  epiglotes: any[];
  pregasariep: any[];
  aritenoides: any[];
  bandasventri: any[];
  vocaismucosas: any[];
  vocaisbordos: any[];
  vocaiscoaptacao: any[];
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

    this.tonsilas = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normotróficas', value: 'normotroficas'},
      {label: 'Hipertróficas', value: 'hipertroficas'},
      {label: 'Atróficas', value: 'atroficas'},
      {label: 'Assimétricas', value: 'assimetricas'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.baseslingua = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normal', value: 'normal'},
      {label: 'Volume aumentado', value: 'aumetnado'},
      {label: 'Presença de varizes', value: 'varizes'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.valeculas = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Livres', value: 'livres'},
      {label: 'Estase salivar', value: 'salivar'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.seiospiri = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normais', value: 'normais'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.epiglotes = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normal', value: 'normal'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.pregasariep = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normais', value: 'normais'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.aritenoides = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normais', value: 'normais'},
      {label: 'Hiperemiadas', value: 'hiperemiadas'},
      {label: 'Endemaciadas', value: 'endemaciadas'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.bandasventri = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Livres', value: 'livres'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.vocaismucosas = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Lisa', value: 'lisa'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.vocaisbordos = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Regulares', value: 'regulares'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.vocaiscoaptacao = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Completa', value: 'completa'},
      {label: 'Incompleta', value: 'inpcompleta'},
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
      {label: 'Em ampulheta', value: 'ampulheta'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.impressoes = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];
  }

}
