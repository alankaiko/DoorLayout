import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-videocolsposcopia',
  templateUrl: './videocolsposcopia.component.html',
  styleUrls: ['./videocolsposcopia.component.css']
})
export class VideocolsposcopiaComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  indicacaoexame: any[];
  vulvoscopia: any[];
  vagina: any[];
  cervicoscopiavisi: any[];
  cervicoscopialocali: any[];
  cervicoscopiazona: any[];
  cervcoscopialesao: any[];
  cervicoscopiaanormal: any[];
  cervicoscopialugol: any[];
  cervicoscopiabiopsia: any[];
  impressao: any[];

  constructor() { }

  ngOnInit(): void {
    this.CarregarDrops();
  }

  CarregarDrops() {
    this.indicacaoexame = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Exame de rotina', value: 'exame'},
      {label: 'Adenoca in sito do colo uterino em biópsia prévia', value: 'adenoca'},
      {label: 'Citologia - ASC-US persistente', value: 'ascus'},
      {label: 'Citologia-LIEBG', value: 'lebg'},
      {label: 'Verrugas de vulva', value: 'vulva'},
      {label: 'Citologia sugestica de ação viral - HPV', value: 'acaoviral'},
      {label: 'Ectrópio sangrante', value: 'ectropio'},
      {label: 'Citologia-ASC-H', value: 'asch'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.vulvoscopia = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normal', value: 'normal'},
      {label: 'Área(s) esbranquiçada(s)', value: 'esbranquicada'},
      {label: 'Aspecto de candidíase', value: 'candidiase'},
      {label: 'Condilomatosas', value: 'condilomatosas'},
      {label: 'Aspecto de herpes', value: 'herpes'},
      {label: 'Vestíbulo vulvar', value: 'vulvar'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.vagina = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Vagina apresentando revestimento epitelial normal', value: 'vagina'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.cervicoscopiavisi = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Completamente visível', value: 'completamente'},
      {label: 'Parcialmente visível', value: 'parcialmente'},
      {label: 'Não visível', value: 'naovisivel'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.cervicoscopialocali = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'JEC 0', value: 'jec0'},
      {label: 'JEC +1', value: 'jec1'},
      {label: 'JEC +2', value: 'jec2'},
      {label: 'JEC +3', value: 'jec3'},
      {label: 'JEC +4', value: 'jec4'},
      {label: 'JEC -1', value: 'jec-1'},
      {label: 'JEC -2', value: 'jec-2'},
      {label: 'JEC -3', value: 'jec-3'},
      {label: 'JEC -4', value: 'jec-4'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.cervicoscopiazona = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Tipo 1', value: 'tipo1'},
      {label: 'Tipo 2', value: 'tipo2'},
      {label: 'Tipo 3', value: 'tipo3'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.cervcoscopialesao = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Não possui lesão', value: 'naopossui'},
      {label: 'Dentro da ZT', value: 'dentrozt'},
      {label: 'Fora da ZT', value: 'forazt'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.cervicoscopiaanormal = [
      {label: 'Não imprimir', value: 'digitar'},
      {label: 'Leucoplasia (queratose)', value: 'queratose'},
      {label: 'Leucoplasia (hiperqueratose)', value: 'hiperqueratose'},
      {label: 'Erosão', value: 'erosao'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.cervicoscopialugol = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Iodo negativo', value: 'negativo'},
      {label: 'Iodo positivo', value: 'positivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.cervicoscopiabiopsia = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Não realizada', value: 'realizada'},
      {label: 'Foi realizada biópsia do colo uterino na área do epitélio aceto branco', value: 'acetobranco'},
      {label: 'Foi realizada biópsia do colo uterino na área do iodo negativo', value: 'iodonegativo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.impressao = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'digitar'},
      {label: 'Digitar', value: 'digitar'},
      {label: 'Colposcopia negativa, porém satisfatória', value: 'colposcopianegativa'},
      {label: 'Colposcopia inadequada', value: 'colposcopiainadeguada'},
      {label: 'Epitélio aceto branco no colo uterino', value: 'epitelio'},
      {label: 'Área iodo negativo no colo uterino', value: 'areaiodo'}
    ];
  }

}
