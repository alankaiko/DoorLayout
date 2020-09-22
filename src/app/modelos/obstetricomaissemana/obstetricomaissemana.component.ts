import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-obstetricomaissemana',
  templateUrl: './obstetricomaissemana.component.html',
  styleUrls: ['./obstetricomaissemana.component.css']
})
export class ObstetricomaissemanaComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  equip: any[];
  valordoca: any[];
  padraoig: any[];
  fetosituacao: any[];
  fetoapresentacao: any[];
  fetodorso: any[];
  fetomov: any[];
  fetoresp: any[];
  fetocard: any[];
  fetoritmo: any[];
  orgaosituacao: any[];
  orgaosintes: any[];
  orgaospreperito: any[];
  orgaossexofetal: any[];
  placentainsercao: any[];
  placentainsercao2: any[];
  placentamaturidade: any[];
  outraumbilical: any[];
  outraamniotico: any[];
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

    this.valordoca = [
      {label: 'Informar', value: 'informar'},
      {label: 'Calcular', value: 'calcular'}
    ];

    this.padraoig = [
      {label: 'Padrão clássico', value: 'padrao'},
      {label: 'Definido', value: 'definido'}
    ];

    this.fetosituacao = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Longitudinal', value: 'longitudinal'},
      {label: 'Transversal com polo encefálico a direita', value: 'trandireita'},
      {label: 'Transversal com polo encefálico a esquerda', value: 'transesquerda'},
      {label: 'Oblíqua', value: 'obliqua'},
      {label: 'Indiferente', value: 'indiferente'}
    ];

    this.fetoapresentacao = [
      {label: 'Cefálica', value: 'cefalica'},
      {label: 'Pélvica', value: 'pelvica'},
      {label: 'Córmica', value: 'cormica'},
      {label: 'Indiferente', value: 'indiferente'}
    ];

    this.fetodorso = [
      {label: 'À esquerda', value: 'esquerda'},
      {label: 'À direita', value: 'direita'},
      {label: 'Anterior', value: 'anterior'},
      {label: 'Posterior', value: 'posterior'},
      {label: 'Superior', value: 'superior'},
      {label: 'Inferior', value: 'inferior'},
      {label: 'Indiferente', value: 'indiferente'}
    ];

    this.fetomov = [
      {label: 'Presentes', value: 'presentes'},
      {label: 'Ausentes', value: 'ausentes'}
    ];

    this.fetoresp = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Presentes', value: 'presentes'},
      {label: 'Ausentes', value: 'ausentes'},
      {label: 'Não visualizados', value: 'naovizualizados'}
    ];

    this.fetocard = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Presentes', value: 'presentes'},
      {label: 'Ausentes', value: 'ausentes'},
      {label: 'Não visualizados', value: 'naovizualizados'}
    ];

    this.fetoritmo = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Rítmicos', value: 'ritmicos'},
      {label: 'Arrítmicos', value: 'arritimicos'}
    ];

    this.orgaosituacao = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normal', value: 'normal'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.orgaosintes = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Grau I', value: 'normal'},
      {label: 'Grau II', value: 'digitar'},
      {label: 'Grau III', value: 'digitar'},
      {label: 'Grau IV', value: 'digitar'}
    ];

    this.orgaospreperito = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Presente', value: 'presente'},
      {label: 'Ausente', value: 'ausente'}
    ];

    this.orgaossexofetal = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Masculino', value: 'masculino'},
      {label: 'Feminino', value: 'feminino'},
      {label: 'Não visualizado', value: 'naovisualizado'},
      {label: 'Não impresso a pedido (masculino)', value: 'naoimpressomasc'},
      {label: 'Não impresso a pedido (feminino)', value: 'naoimpressofem'}
    ];

    this.placentainsercao = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Tópica', value: 'topica'},
      {label: 'Heterotópica', value: 'heterotopica'},
      {label: 'Prévia marginal', value: 'previamarginal'},
      {label: 'Prévia centro parcial', value: 'previaparcial'},
      {label: 'Prévia centro total', value: 'previatotal'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.placentainsercao2 = [
      {label: 'Anterior', value: 'anterior'},
      {label: 'Posterior', value: 'posterior'},
      {label: 'Fúndica', value: 'fundica'},
      {label: 'Fúndica anterior', value: 'fundicaanterior'},
      {label: 'Fúndica posterior', value: 'funcidaposterior'},
      {label: 'Anterior lateral direita', value: 'antlateraldir'},
      {label: 'Anterior lateral esquerda', value: 'antlateralesq'},
      {label: 'Posterior lateral direita', value: 'postlateraldir'},
      {label: 'Posterior laterarl esquerda', value: 'postlateralesq'}
    ];

    this.placentamaturidade = [
      {label: 'Grau 0', value: 'grau0'},
      {label: 'Grau 1', value: 'grau1'},
      {label: 'Grau 2', value: 'grau2'},
      {label: 'Grau 3', value: 'grau3'}
    ];

    this.outraumbilical = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normal', value: 'normal'},
      {label: 'Artéria única', value: 'arteria'},
      {label: 'Não visualizado', value: 'naovisualizado'}
    ];

    this.outraamniotico = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normal', value: 'normal'},
      {label: 'Aumento leve', value: 'aumentoleve'},
      {label: 'Aumento moderado', value: 'aumentomoderado'},
      {label: 'Aumento acentuado', value: 'aumentoacentuado'},
      {label: 'Diminuição leve', value: 'diminuicaoleve'},
      {label: 'Diminuição moderado', value: 'diminuicaomoderado'},
      {label: 'Diminuição acentuado', value: 'diminuicaoacentuado'}
    ];

    this.impressoes = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];
  }
}
