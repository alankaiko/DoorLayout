import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-obstetrico1trimestre',
  templateUrl: './obstetrico1trimestre.component.html',
  styleUrls: ['./obstetrico1trimestre.component.css']
})
export class Obstetrico1trimestreComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  equip: any[];
  desviopad: any[];
  situacaobexiga: any[];
  situacaovagina: any[];
  uterosituacao: any[];
  uteroposicao: any[];
  uterocontorno: any[];
  uterolimite: any[];
  uterotextura: any[];
  uteroendo: any[];
  sacoinsercao: any[];
  sacoforma: any[];
  embriaovesicula: any[];
  embriaomembrana: any[];
  embriaopresenca: any[];
  embriaobatimento: any[];
  embriaomovimento: any[];
  ovarioposicao: any[];
  ovariocontorno: any[];
  ovariolimites: any[];
  ovarioparenquima: any[];
  fundosaco: any[];
  impressaodiagnostica: any[];
  bexiganaoimprimi: boolean = false;
  vaginanaoimprimi: boolean = false;
  fundosaconaoimprimi: boolean = false;

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

    this.desviopad = [
      {label: 'Padrão clássico', value: 'padrao'},
      {label: 'Definido', value: 'definido'},
    ];

    this.situacaobexiga = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normal', value: 'normal'},
      {label: 'Não visualizada', value: 'visualizada'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.situacaovagina = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normal', value: 'normal'},
      {label: 'Aumento da ecogenicidade luminar', value: 'ecogenicidade'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.uterosituacao = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Anteversão', value: 'anteversao'},
      {label: 'Médioversão', value: 'medioversao'},
      {label: 'RTV leve', value: 'leve'},
      {label: 'RTV moderada', value: 'moderada'},
      {label: 'RTV acentuada', value: 'acentuada'}
    ];

    this.uteroposicao = [
      {label: 'Centrado', value: 'centrado'},
      {label: 'Desviado para direita', value: 'direita'},
      {label: 'Desviado para esquerda', value: 'esquerda'}
    ];

    this.uterocontorno = [
      {label: 'Regulares', value: 'regulares'},
      {label: 'Irregulares', value: 'irregulares'},
      {label: 'Lobulados', value: 'lobulados'}
    ];

    this.uterolimite = [
      {label: 'Precisos', value: 'precisos'},
      {label: 'Imprecisos', value: 'imprecisos'}
    ];

    this.uterotextura = [
      {label: 'Homogênea', value: 'homogenea'},
      {label: 'Heterogênea', value: 'heterogenea'}
    ];

    this.uteroendo = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Fechado', value: 'fechado'},
      {label: 'Pérveo', value: 'perveo'},
      {label: 'Com presença de muco', value: 'presenca'},
      {label: 'Não se visualiza muco', value: 'visualiza'},
      {label: 'Dilatado com muco de 1 mm', value: 'muco1'},
      {label: 'Dilatado com muco de 2 mm', value: 'muco2'},
      {label: 'Dilatado com muco de 3 mm', value: 'muco3'},
      {label: 'Dilatado com muco de 4 mm', value: 'muco4'},
      {label: 'Dilatado com muco superior a 4 mm', value: 'mucomais'}
    ];

    this.sacoinsercao = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normoinserido', value: 'normoinserido'},
      {label: 'Inserção baixa', value: 'insercao'},
      {label: 'Ectópico', value: 'ectopico'}
    ];

    this.sacoforma = [
      {label: 'Regular', value: 'regular'},
      {label: 'Irregular', value: 'irregular'}
    ];

    this.embriaovesicula = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Presente e normal', value: 'normal'},
      {label: 'Presente e anômala', value: 'anomala'},
      {label: 'Ausente', value: 'ausente'},
      {label: 'Não visualizada', value: 'visualizada'}
    ];

    this.embriaomembrana = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Visualizada e normal', value: 'visualizada'},
      {label: 'Não visualizada', value: 'naovisualizada'}
    ];

    this.embriaopresenca = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Presente', value: 'presente'},
      {label: 'Ausente', value: 'ausente'},
      {label: 'Não visualizado', value: 'visualizado'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.embriaobatimento = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Presente', value: 'presente'},
      {label: 'Ausente', value: 'ausente'},
      {label: 'Não visualizado', value: 'visualizado'}
    ];

    this.embriaomovimento = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Lentos', value: 'letnso'},
      {label: 'Suaves', value: 'suaves'},
      {label: 'Rápidos', value: 'rapidos'},
      {label: 'Bruscos', value: 'bruscos'},
      {label: 'Ausentes', value: 'ausentes'},
      {label: 'Não visualizados', value: 'visualizados'}
    ];

    this.ovarioposicao = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Papa-uterino', value: 'papa'},
      {label: 'Posterior', value: 'posterior'},
      {label: 'Inferior', value: 'inferior'},
      {label: 'Anterior', value: 'anterior'},
      {label: 'Justa-uterino', value: 'justa'},
      {label: 'Pélvico', value: 'pelvico'},
      {label: 'Não visualizado', value: 'visualizado'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.ovariocontorno = [
      {label: 'Regulares', value: 'regulares'},
      {label: 'Irregulares', value: 'irregulares'}
    ];

    this.ovariolimites = [
      {label: 'Precisos', value: 'precisos'},
      {label: 'Imprecisos', value: 'imprecisos'}
    ];

    this.ovarioparenquima = [
      {label: 'Mista', value: 'mista'},
      {label: 'Sólida', value: 'solida'},
      {label: 'Cística', value: 'cistica'},
      {label: 'Sólido cística', value: 'solidacistica'},
      {label: 'Múltiplos folículos subcorticais', value: 'foliculos'}
    ];

    this.fundosaco = [
      {label: 'Não imrpimir', value: 'nao'},
      {label: 'Livre', value: 'livre'},
      {label: 'Com liquído livre', value: 'liquido'},
      {label: 'Livre com ecogenicidade aumentada', value: 'ecogenicidade'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.impressaodiagnostica = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'normal'},
      {label: 'Digitar', value: 'digitar'}
    ];
  }

  CarregarBexigas() {
    if (this.camposdolaudo.campo21 === 'nao') {
      this.camposdolaudo.campo22 = '';
      this.bexiganaoimprimi = true;
    }

    if (this.camposdolaudo.campo21 === 'normal') {
      this.camposdolaudo.campo22 = '<b>– Bexiga:</b><br> Conteúdo anecoico, paredes lisas e bem delimitadas.';
      this.bexiganaoimprimi = false;
    }

    if (this.camposdolaudo.campo21 === 'visualizada') {
      this.camposdolaudo.campo22 = '<b>– Bexiga:</b><br> Não visualizada.';
      this.bexiganaoimprimi = false;
    }

    if (this.camposdolaudo.campo21 === 'digitar') {
      this.camposdolaudo.campo22 = '';
      this.bexiganaoimprimi = false;
    }
  }

  CarregarVag() {
    if (this.camposdolaudo.campo23 === 'nao') {
      this.camposdolaudo.campo24 = '';
      this.vaginanaoimprimi = true;
    }

    if (this.camposdolaudo.campo23 === 'normal') {
      this.camposdolaudo.campo24 = '<b>– Vagina:</b><br> Acusticamente normal.';
      this.vaginanaoimprimi = false;
    }

    if (this.camposdolaudo.campo23 === 'ecogenicidade') {
      this.camposdolaudo.campo24 = '<b>– Bexiga:</b><br> Aumento da ecogenicidade luminar.';
      this.vaginanaoimprimi = false;
    }

    if (this.camposdolaudo.campo23 === 'digitar') {
      this.camposdolaudo.campo24 = '';
      this.vaginanaoimprimi = false;
    }
  }

  CarregaFundSaco() {
    if (this.camposdolaudo.campo67 === 'nao') {
      this.camposdolaudo.campo68 = '';
      this.fundosaconaoimprimi = true;
    }

    if (this.camposdolaudo.campo67 === 'livre') {
      this.camposdolaudo.campo68 = '<b>– F.S.D:</b><br>Livre.';
      this.fundosaconaoimprimi = false;
    }

    if (this.camposdolaudo.campo67 === 'liquido') {
      this.camposdolaudo.campo68 = '<b>– F.S.D:</b><br>Com líquido livre.';
      this.fundosaconaoimprimi = false;
    }

    if (this.camposdolaudo.campo67 === 'ecogenicidade') {
      this.camposdolaudo.campo68 = '<b>– Bexiga:</b><br>Livre com ecogenicidade aumentada.';
      this.fundosaconaoimprimi = false;
    }

    if (this.camposdolaudo.campo67 === 'digitar') {
      this.camposdolaudo.campo68 = '';
      this.fundosaconaoimprimi = false;
    }

  }

}
