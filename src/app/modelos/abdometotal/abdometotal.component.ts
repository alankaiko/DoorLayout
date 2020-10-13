import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-abdometotal',
  templateUrl: './abdometotal.component.html',
  styleUrls: ['./abdometotal.component.css']
})
export class AbdometotalComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  codigoexecutante: number;
  executantes: any[];
  equip: any[];
  textoorgaos: any[];
  textonormal: any[];

  constructor() { }

  ngOnInit(): void {
    this.CarregarDrops();
  }

  CarregarDrops() {
    this.textonormal = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.textoorgaos = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.equip = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Convexo', value: 'convexo'},
      {label: 'Linear', value: 'linear'},
      {label: 'Endocavitário', value: 'endocavitario'},
      {label: 'Digitar', value: 'digitar'}
    ];
  }

  CarregarTextoEquip() {
    if (this.camposdolaudo.campo1 === 'nao') {
      this.camposdolaudo.campo2 = '';
    }

    if (this.camposdolaudo.campo1 === 'convexo') {
      this.camposdolaudo.campo2 = 'Exame realizado em modo bidimensional com equipamento dinâmico Convexo multifrequêncial.';
    }

    if (this.camposdolaudo.campo1 === 'linear') {
      this.camposdolaudo.campo2 = 'Exame realizado em modo bidimensional com equipamento dinâmico Linear multifrequêncial.';
    }

    if (this.camposdolaudo.campo1 === 'endocavitario') {
      this.camposdolaudo.campo2 = 'Exame realizado em modo bidimensional com equipamento dinâmico Endocavitário multifrequêncial.';
    }

    if (this.camposdolaudo.campo1 === 'digitar') {
      this.camposdolaudo.campo2 = '';
    }
  }

  ConfFigado() {
    if (this.camposdolaudo.campo3 === 'nao') {
      this.camposdolaudo.campo4 = '';
    }

    if (this.camposdolaudo.campo3 === 'sugestivo') {
      this.camposdolaudo.campo4 = '– Apresenta-se com topografia, forma, '
        + 'dimensões, contornos e superfície normais. A ecogenicidade do parênquima '
        + 'hepático está preservada. O sistema porta e veias supra-hepáticas estão '
        + 'com trajeto e calibre normais.';
    }

    if (this.camposdolaudo.campo3 === 'digitar') {
      this.camposdolaudo.campo4 = '';
    }
  }

  ConfViasBiliares() {
    if (this.camposdolaudo.campo5 === 'nao') {
      this.camposdolaudo.campo6 = '';
    }

    if (this.camposdolaudo.campo5 === 'sugestivo') {
      this.camposdolaudo.campo6 = 'As vias biliares intra e '
        + 'extra-hepáticas foram identificadas com o calibre e aspectos normais.';
    }

    if (this.camposdolaudo.campo5 === 'digitar') {
      this.camposdolaudo.campo6 = '';
    }
  }

  ConfVesicula() {
    if (this.camposdolaudo.campo7 === 'nao') {
      this.camposdolaudo.campo8 = '';
    }

    if (this.camposdolaudo.campo7 === 'sugestivo') {
      this.camposdolaudo.campo8 = 'A vesícula biliar tem forma, '
        + 'volume, contornos, paredes e conteúdo normais. Não há sinais de presença de cálculos.';
    }

    if (this.camposdolaudo.campo7 === 'digitar') {
      this.camposdolaudo.campo8 = '';
    }
  }

  ConfPancreas() {
    if (this.camposdolaudo.campo9 === 'nao') {
      this.camposdolaudo.campo10 = '';
    }

    if (this.camposdolaudo.campo9 === 'sugestivo') {
      this.camposdolaudo.campo10 = 'Com topografia, forma, dimensões '
        + 'e parênquima normais.';
    }

    if (this.camposdolaudo.campo9 === 'digitar') {
      this.camposdolaudo.campo10 = '';
    }
  }

  ConfRimDireito() {
    if (this.camposdolaudo.campo15 === 'nao') {
      this.camposdolaudo.campo16 = '';
    }

    if (this.camposdolaudo.campo15 === 'sugestivo') {
      this.camposdolaudo.campo16 = 'Tópico, com contornos '
        + 'regulares e volume normal. Cortical preservada e sistema pielo calicinal '
        + 'com distribuição normal e textura acústica habitual.';
    }

    if (this.camposdolaudo.campo15 === 'digitar') {
      this.camposdolaudo.campo16 = '';
    }
  }

  ConfRimEsquerdo() {
    if (this.camposdolaudo.campo21 === 'nao') {
      this.camposdolaudo.campo22 = '';
    }

    if (this.camposdolaudo.campo21 === 'sugestivo') {
      this.camposdolaudo.campo22 = 'Tópico, com contornos '
        + 'regulares e volume normal. Cortical preservada e sistema pielo calicinal com '
        + 'distribuição normal e textura acústica habitual.';
    }

    if (this.camposdolaudo.campo21 === 'digitar') {
      this.camposdolaudo.campo22 = '';
    }
  }

  ConfBexiga() {
    if (this.camposdolaudo.campo23 === 'nao') {
      this.camposdolaudo.campo24 = '';
    }

    if (this.camposdolaudo.campo23 === 'sugestivo') {
      this.camposdolaudo.campo24 = 'Sem alterações ecográficas visíveis.';
    }

    if (this.camposdolaudo.campo23 === 'digitar') {
      this.camposdolaudo.campo24 = '';
    }
  }

  ConfBaco() {
    if (this.camposdolaudo.campo25 === 'nao') {
      this.camposdolaudo.campo26 = '';
    }

    if (this.camposdolaudo.campo25 === 'sugestivo') {
      this.camposdolaudo.campo26 = 'De tamanho normal, apresentando '
        + 'parênquima acusticamente homogêneo.';
    }

    if (this.camposdolaudo.campo25 === 'digitar') {
      this.camposdolaudo.campo26 = '';
    }
  }

  ConfVasos() {
    if (this.camposdolaudo.campo27 === 'nao') {
      this.camposdolaudo.campo28 = '';
    }

    if (this.camposdolaudo.campo27 === 'sugestivo') {
      this.camposdolaudo.campo28 = 'Veia cava inferior e aorta '
        + 'abdominal apresentam trajeto, calibre e pulsatilidade normais.';
    }

    if (this.camposdolaudo.campo27 === 'digitar') {
      this.camposdolaudo.campo28 = '';
    }
  }

  ConfRetroperitonio() {
    if (this.camposdolaudo.campo29 === 'nao') {
      this.camposdolaudo.campo30 = '';
    }

    if (this.camposdolaudo.campo29 === 'sugestivo') {
      this.camposdolaudo.campo30 = 'Sem alterações ecográficas visíveis.';
    }

    if (this.camposdolaudo.campo29 === 'digitar') {
      this.camposdolaudo.campo30 = '';
    }
  }

  ConfCostofrenicos() {
    if (this.camposdolaudo.campo31 === 'nao') {
      this.camposdolaudo.campo32 = '';
    }

    if (this.camposdolaudo.campo31 === 'sugestivo') {
      this.camposdolaudo.campo32 = 'Seios costo-frênicos livres.';
    }

    if (this.camposdolaudo.campo31 === 'digitar') {
      this.camposdolaudo.campo32 = '';
    }
  }

  ConfOrgaos() {
    if (this.camposdolaudo.campo33 === 'nao') {
      this.camposdolaudo.campo34 = undefined;
    }

    if (this.camposdolaudo.campo33 === 'digitar') {
      this.camposdolaudo.campo34 = undefined;
    }
  }

  ConfImpressaoDiag() {
    if (this.camposdolaudo.campo37 === 'nao') {
      this.camposdolaudo.campo38 = undefined;
    }

    if (this.camposdolaudo.campo37 === 'sugestivo') {
      this.camposdolaudo.campo38 = 'Abdome total acusticamente dentro dos padrões de normalidade.';
    }

    if (this.camposdolaudo.campo37 === 'digitar') {
      this.camposdolaudo.campo38 = undefined;
    }
  }

  MontarImpressao() {
    this.camposdolaudo.zimpressao = '';
    this.MontarDadosEquip();
    this.MontarFigado();
    this.MontarViasBiliares();
    this.MontarVesiculaBiliar();
    this.MontarPancreas();
    this.MontarBaco();
    this.MontarVasos();
    this.MontarRetroperitonio();
    this.MontarSeiosCosto();
    this.MontarRimDireito();
    this.MontarRimEsquerdo();
    this.MontarBexiga();
    this.MontarOrgaoPelv();
    this.MontarObservacao();
    this.MontarImpDiag();
  }

  MontarDadosEquip() {
    if (this.camposdolaudo.campo1 !== 'nao' && this.camposdolaudo.campo1 !== null && this.camposdolaudo.campo1 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Dados do equipamento</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo2 + '</br>';
    }

    this.camposdolaudo.zimpressao += '</br>';
  }

  MontarFigado() {
    if (this.camposdolaudo.campo3 !== 'nao' && this.camposdolaudo.campo3 !== null && this.camposdolaudo.campo3 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Fígado</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo4 + '</br>';
    }

    this.camposdolaudo.zimpressao += '</br>';
  }

  MontarViasBiliares() {
    if (this.camposdolaudo.campo5 !== 'nao' && this.camposdolaudo.campo5 !== null && this.camposdolaudo.campo5 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Vias biliares</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo6 + '</br>';
    }

    this.camposdolaudo.zimpressao += '</br>';
  }

  MontarVesiculaBiliar() {
    if (this.camposdolaudo.campo7 !== 'nao' && this.camposdolaudo.campo7 !== null && this.camposdolaudo.campo7 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Vesícula biliar</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo8 + '</br>';
    }

    this.camposdolaudo.zimpressao += '</br>';
  }

  MontarPancreas() {
    if (this.camposdolaudo.campo9 !== 'nao' && this.camposdolaudo.campo9 !== null && this.camposdolaudo.campo9 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Pâncreas</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo10 + '</br>';
    }

    this.camposdolaudo.zimpressao += '</br>';
  }

  MontarRimDireito() {
    if (this.camposdolaudo.campo11 !== null || this.camposdolaudo.campo12 !== null ||
        this.camposdolaudo.campo13 !== null || this.camposdolaudo.campo14 !== null ||
        this.camposdolaudo.campo15 !== null) {

      this.camposdolaudo.zimpressao += '<b>-Rim Direito</b></br>';
    }
    if (this.camposdolaudo.campo15 !== 'nao') {
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo16;
    }

    if (this.camposdolaudo.campo11 !== undefined && this.camposdolaudo.campo11 !== null) {
      this.camposdolaudo.zimpressao += 'Medidas: Long.: ' + this.camposdolaudo.campo11 + ' cm. '
        + 'x Ant. Post.: ' + this.camposdolaudo.campo12 + ' cm. '
        +  'Trans.: ' + this.camposdolaudo.campo13 + ' cm.</br>'
        + 'Volume: ' + this.camposdolaudo.campo14 + ' cm³.</br>';
    }
  }

  MontarRimEsquerdo() {
    if (this.camposdolaudo.campo17 !== null || this.camposdolaudo.campo18 !== null ||
        this.camposdolaudo.campo19 !== null || this.camposdolaudo.campo20 !== null ||
        this.camposdolaudo.campo21 !== null) {

      this.camposdolaudo.zimpressao += '<b>-Rim Esquerdo</b></br>';
    }
    if (this.camposdolaudo.campo21 !== 'nao') {
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo22;
    }

    if (this.camposdolaudo.campo17 !== undefined && this.camposdolaudo.campo17 !== null) {
      this.camposdolaudo.zimpressao += 'Medidas: Long.: ' + this.camposdolaudo.campo17 + ' cm. '
        + 'x Ant. Post.: ' + this.camposdolaudo.campo18 + ' cm. '
        +  'Trans.: ' + this.camposdolaudo.campo19 + ' cm.</br>'
        + 'Volume: ' + this.camposdolaudo.campo20 + ' cm³.</br>';
    }
  }

  MontarBexiga() {
    if (this.camposdolaudo.campo23 !== 'nao' && this.camposdolaudo.campo23 !== null && this.camposdolaudo.campo23 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Bexiga</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo24 + '</br>';
    }

    this.camposdolaudo.zimpressao += '</br>';
  }

  MontarBaco() {
    if (this.camposdolaudo.campo25 !== 'nao' && this.camposdolaudo.campo25 !== null && this.camposdolaudo.campo25 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Baço</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo26 + '</br>';
    }

    this.camposdolaudo.zimpressao += '</br>';
  }

  MontarVasos() {
    if (this.camposdolaudo.campo27 !== 'nao' && this.camposdolaudo.campo27 !== null && this.camposdolaudo.campo27 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Vasos</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo28 + '</br>';
    }

    this.camposdolaudo.zimpressao += '</br>';
  }

  MontarRetroperitonio() {
    if (this.camposdolaudo.campo29 !== 'nao' && this.camposdolaudo.campo29 !== null && this.camposdolaudo.campo29 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Retroperitônio</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo30 + '</br>';
    }
  }

  MontarSeiosCosto() {
    if (this.camposdolaudo.campo31 !== 'nao' && this.camposdolaudo.campo31 !== null && this.camposdolaudo.campo31 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Seios costofrênicos</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo32 + '</br>';
    }
  }

  MontarOrgaoPelv() {
    if (this.camposdolaudo.campo33 !== 'nao' && this.camposdolaudo.campo34 !== null && this.camposdolaudo.campo34 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Demais orgãos pélvicos</b>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo34;
    }
  }

  MontarObservacao() {
    if (this.camposdolaudo.campo36 !== null) {
      this.camposdolaudo.zimpressao += '<b>-Observações gerais:</b>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo36;
    }
  }

  MontarImpDiag() {
    if (this.camposdolaudo.campo37 !== 'nao' && this.camposdolaudo.campo37 !== null && this.camposdolaudo.campo37 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Impressão diagnóstica:</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo38;
    }
  }
}
