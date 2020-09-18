import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-aparelhourinario',
  templateUrl: './aparelhourinario.component.html',
  styleUrls: ['./aparelhourinario.component.css']
})
export class AparelhourinarioComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  equip: any[];
  presencarimdireito: any[];
  topicitaderimdireito: any[];
  volumerimdireito: any[];
  contornorimdireito: any[];
  texturarimdireito: any[];
  seiorimdireito: any[];
  hidrorimdireito: any[];
  presencarimesquerdo: any[];
  topicitaderimesquerdo: any[];
  volumerimesquerdo: any[];
  contornorimesquerdo: any[];
  texturarimesquerdo: any[];
  seiorimesquerdo: any[];
  hidrorimesquerdo: any[];
  posicaobexiga: any[];
  morfologiabexiga: any[];
  superficiebexiga: any[];
  contornosbexiga: any[];
  conteudobexiga: any[];
  assoalhobexiga: any[];
  capacidadebexiga: any[];
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

    this.presencarimdireito = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Presente', value: 'presente'},
      {label: 'Ausente', value: 'ausente'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.topicitaderimdireito = [
      {label: 'Tópico', value: 'topico'},
      {label: 'Distópico', value: 'distopico'}
    ];

    this.volumerimdireito = [
      {label: 'Normal', value: 'normal'},
      {label: 'Aumentado', value: 'aumentado'},
      {label: 'Reduzido', value: 'reduzido'}
    ];

    this.contornorimdireito = [
      {label: 'Regular', value: 'regular'},
      {label: 'Irregular', value: 'irregular'},
      {label: 'Lobulado', value: 'lobulado'}
    ];

    this.texturarimdireito = [
      {label: 'Normal', value: 'normal'},
      {label: 'Hipoecogênica', value: 'hipoecogenica'},
      {label: 'Hiperecogênica', value: 'hiperecogenica'},
      {label: 'Heterogênea', value: 'heterogenea'},
      {label: 'Hipo ecogenecidade focal', value: 'hipofocal'}
    ];

    this.seiorimdireito = [
      {label: 'Normal', value: 'normal'},
      {label: 'Espessado', value: 'espessado'}
    ];

    this.hidrorimdireito = [
      {label: 'Não há', value: 'nao'},
      {label: 'Leve', value: 'leve'},
      {label: 'Moderado', value: 'moderado'},
      {label: 'Severa', value: 'severa'}
    ];

    this.presencarimesquerdo = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Presente', value: 'presente'},
      {label: 'Ausente', value: 'ausente'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.topicitaderimesquerdo = [
      {label: 'Tópico', value: 'topico'},
      {label: 'Distópico', value: 'distopico'}
    ];

    this.volumerimesquerdo = [
      {label: 'Normal', value: 'normal'},
      {label: 'Aumentado', value: 'aumentado'},
      {label: 'Reduzido', value: 'reduzido'}
    ];

    this.contornorimesquerdo = [
      {label: 'Regular', value: 'regular'},
      {label: 'Irregular', value: 'irregular'},
      {label: 'Lobulado', value: 'lobulado'}
    ];

    this.texturarimesquerdo = [
      {label: 'Normal', value: 'normal'},
      {label: 'Hipoecogênica', value: 'hipoecogenica'},
      {label: 'Hiperecogênica', value: 'hiperecogenica'},
      {label: 'Heterogênea', value: 'heterogenea'},
      {label: 'Hipo ecogenecidade focal', value: 'hipofocal'}
    ];

    this.seiorimesquerdo = [
      {label: 'Normal', value: 'normal'},
      {label: 'Espessado', value: 'espessado'}
    ];

    this.hidrorimesquerdo = [
      {label: 'Não há', value: 'nao'},
      {label: 'Leve', value: 'leve'},
      {label: 'Moderado', value: 'moderado'},
      {label: 'Severa', value: 'severa'}
    ];

    this.posicaobexiga = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Tópica', value: 'topica'},
      {label: 'Atópica', value: 'atopica'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.morfologiabexiga = [
      {label: 'Normal', value: 'normal'},
      {label: 'Disforme', value: 'disforme'}
    ];

    this.superficiebexiga = [
      {label: 'Lisa', value: 'lisa'},
      {label: 'Rugosa', value: 'rugosa'}
    ];

    this.contornosbexiga = [
      {label: 'Definidos', value: 'definidos'},
      {label: 'Indefinidos', value: 'indefinidos'},
      {label: 'Reduzido', value: 'reduzido'}
    ];

    this.conteudobexiga = [
      {label: 'Anenoico', value: 'anenoico'},
      {label: 'Hipoecoico', value: 'hipoecoico'},
      {label: 'Hipercoico', value: 'hipercoico'}
    ];

    this.assoalhobexiga = [
      {label: 'Normal', value: 'normal'},
      {label: 'Elevado', value: 'elevado'},
      {label: 'Rebaixado', value: 'rebaixado'}
    ];

    this.capacidadebexiga = [
      {label: 'Normal', value: 'normal'},
      {label: 'Diminuída', value: 'diminuida'},
      {label: 'Elevada', value: 'elevada'}
    ];

    this.impressoes = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];
  }

}
