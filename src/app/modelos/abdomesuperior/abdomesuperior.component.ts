import { ProfissionalexecutanteService } from './../../zservice/profissionalexecutante.service';
import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-abdomesuperior',
  templateUrl: './abdomesuperior.component.html',
  styleUrls: ['./abdomesuperior.component.css']
})
export class AbdomesuperiorComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  codigoexecutante: number;
  executantes: any[];
  equip: any[];
  textonormal: any[];

  constructor(private serviceexec: ProfissionalexecutanteService) { }

  ngOnInit(): void {
    this.CarregarDrops();
  }

  CarregarDrops() {
    this.textonormal = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'sugestivo'},
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
      this.camposdolaudo.campo4 = '– <b>Fígado:</b><br> Apresenta-se com topografia, forma, '
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
      this.camposdolaudo.campo6 = '<b>– Vias biliares:</b><br> As vias biliares intra e '
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
      this.camposdolaudo.campo8 = '<b>– Vesícula biliar:</b><br> A vesícula biliar tem forma, '
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
      this.camposdolaudo.campo10 = '<b>– Pâncreas:</b><br> Com topografia, forma, dimensões '
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
      this.camposdolaudo.campo16 = '<b>– Rim direito:</b><br> Tópico, com contornos '
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
      this.camposdolaudo.campo22 = '<b>– Rim esquerdo:</b><br> Tópico, com contornos '
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
      this.camposdolaudo.campo24 = '<b>– Bexiga:</b><br> Sem alterações ecográficas visíveis.';
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
      this.camposdolaudo.campo26 = '<b>– Baço:</b><br> De tamanho normal, apresentando '
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
      this.camposdolaudo.campo28 = '<b>– Vasos:</b><br> Veia cava inferior e aorta '
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
      this.camposdolaudo.campo30 = '<b>– Retroperitônio:</b><br> Sem alterações ecográficas visíveis.';
    }

    if (this.camposdolaudo.campo29 === 'digitar') {
      this.camposdolaudo.campo30 = '';
    }
  }

  ConfCostofrenicos() {
    if (this.camposdolaudo.campo29 === 'nao') {
      this.camposdolaudo.campo30 = '';
    }

    if (this.camposdolaudo.campo29 === 'sugestivo') {
      this.camposdolaudo.campo30 = '<b>– Seios costo-frênicos:</b><br> Seios costo-frênicos livres.';
    }

    if (this.camposdolaudo.campo29 === 'digitar') {
      this.camposdolaudo.campo30 = '';
    }
  }

  ConfOrgaos() {
    if (this.camposdolaudo.campo29 === 'nao') {
      this.camposdolaudo.campo30 = '';
    }

    if (this.camposdolaudo.campo29 === 'digitar') {
      this.camposdolaudo.campo30 = '';
    }
  }

}
