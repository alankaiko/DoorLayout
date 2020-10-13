import { isEmptyObject } from 'jquery';
import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

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
  imprimirdpp: any[];
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

    this.imprimirdpp = [
      {label: 'Sim', value: 'sim'},
      {label: 'Não', value: 'nao'}
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

  CarregarBexigas() {
    console.log('o que e isso gente');
    try {
      if (this.camposdolaudo.campo21 === 'nao') {
        this.camposdolaudo.campo22 = undefined;
      }

      if (this.camposdolaudo.campo21 === 'normal') {
        this.camposdolaudo.campo22 = 'Conteúdo anecoico, paredes lisas e bem delimitadas.';
      }

      if (this.camposdolaudo.campo21 === 'visualizada') {
        this.camposdolaudo.campo22 = 'Não visualizada.';
      }

      if (this.camposdolaudo.campo21 === 'digitar') {
        this.camposdolaudo.campo22 = undefined;
      }
    } catch (error) {
      console.log(error);
    }

  }

  CarregarVag() {
    if (this.camposdolaudo.campo23 === 'nao') {
      this.camposdolaudo.campo24 = undefined;
      this.vaginanaoimprimi = true;
    }

    if (this.camposdolaudo.campo23 === 'normal') {
      this.camposdolaudo.campo24 = 'Acusticamente normal.';
      this.vaginanaoimprimi = false;
    }

    if (this.camposdolaudo.campo23 === 'ecogenicidade') {
      this.camposdolaudo.campo24 = 'Aumento da ecogenicidade luminar.';
      this.vaginanaoimprimi = false;
    }

    if (this.camposdolaudo.campo23 === 'digitar') {
      this.camposdolaudo.campo24 = undefined;
      this.vaginanaoimprimi = false;
    }
  }

  CarregaFundSaco() {
    if (this.camposdolaudo.campo67 === 'nao') {
      this.camposdolaudo.campo68 = '';
      this.fundosaconaoimprimi = true;
    }

    if (this.camposdolaudo.campo67 === 'livre') {
      this.camposdolaudo.campo68 = 'Livre.';
      this.fundosaconaoimprimi = false;
    }

    if (this.camposdolaudo.campo67 === 'liquido') {
      this.camposdolaudo.campo68 = 'Com líquido livre.';
      this.fundosaconaoimprimi = false;
    }

    if (this.camposdolaudo.campo67 === 'ecogenicidade') {
      this.camposdolaudo.campo68 = 'Livre com ecogenicidade aumentada.';
      this.fundosaconaoimprimi = false;
    }

    if (this.camposdolaudo.campo67 === 'digitar') {
      this.camposdolaudo.campo68 = '';
      this.fundosaconaoimprimi = false;
    }

  }

  CarregaImpresDiagnostica() {
    if (this.camposdolaudo.campo70 === 'nao') {
      this.camposdolaudo.campo71 = undefined;
    }

    if (this.camposdolaudo.campo70 === 'normal') {
      this.camposdolaudo.campo71 = 'Gravidez tópica, com embrião / feto único...';
    }

    if (this.camposdolaudo.campo70 === 'liquido') {
      this.camposdolaudo.campo71 = undefined;
    }
  }

  CalculaData() {
    const hoje = new Date();
    const datainformada = new Date(this.camposdolaudo.campo4);
    const diff = Math.abs(hoje.getTime() - datainformada.getTime());
    const dia = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const semana = dia / 7;

    this.camposdolaudo.campo5 = Math.trunc(semana) + '';
    this.camposdolaudo.campo6 = dia - 1 + '';
  }

  MontarImpressao() {
    this.MontarDadosEquip();
    this.MontarBexiga();
    this.MontarUtero();
    this.MontarSacoGestacional();
    this.MontarEmbriaoFeto();
    this.MontarOvarioDireito();
    this.MontarOvarioEsquerdo();
    this.MontarFundSaco();
    this.MontarObservacoes();
    this.MontarImpDiag();
  }

  MontarDadosEquip() {
    if (this.camposdolaudo.campo1 !== 'nao' && this.camposdolaudo.campo1 !== null && this.camposdolaudo.campo1 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Dados do equipamento</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo2 + '</br>';
    }
  }

  MontarBexiga() {
    if (this.camposdolaudo.campo21 !== '' && this.camposdolaudo.campo21 !== null && this.camposdolaudo.campo21 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Bexiga</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo22 + '</br>';
    }
  }

  MontarVagina() {
    if (this.camposdolaudo.campo23 !== '' && this.camposdolaudo.campo23 !== null && this.camposdolaudo.campo23 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Vagina</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo24 + '</br>';
    }
  }

  MontarUtero() {
    if (this.camposdolaudo.campo25 !== null && this.camposdolaudo.campo25 !== 'nao' && this.camposdolaudo.campo25 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Útero</b></br>';
      this.camposdolaudo.zimpressao += 'Em ' + this.camposdolaudo.campo25 + ', ';

      if (this.camposdolaudo.campo26 !== null && this.camposdolaudo.campo26 !== undefined) {
        this.camposdolaudo.zimpressao += this.camposdolaudo.campo26 + ', ';
      }

      if (this.camposdolaudo.campo27 !== null && this.camposdolaudo.campo27 !== undefined) {
        this.camposdolaudo.zimpressao += 'de contornos ' + this.camposdolaudo.campo27;
      }

      if (this.camposdolaudo.campo28 !== null && this.camposdolaudo.campo28 !== undefined) {
        this.camposdolaudo.zimpressao += ' e limites ' + this.camposdolaudo.campo28 + '.</br>';
      }

      if (this.camposdolaudo.campo29 !== undefined && this.camposdolaudo.campo29 !== null) {
        this.camposdolaudo.zimpressao += 'Medidas: Long.: ' + this.camposdolaudo.campo29 + ' cm. '
          + 'x Ant. Post.: ' + this.camposdolaudo.campo30 + ' cm. '
          +  'Transv.: ' + this.camposdolaudo.campo31 + ' cm. '
          + 'Volume: ' + this.camposdolaudo.campo32 + ' cm³.</br>';
      }

      if (this.camposdolaudo.campo33 !== null && this.camposdolaudo.campo33 !== undefined) {
        this.camposdolaudo.zimpressao += 'Miométrio de textura acústica ' + this.camposdolaudo.campo33 + '.</br>';
      }

      if (this.camposdolaudo.campo34 !== null && this.camposdolaudo.campo34 !== undefined) {
        this.camposdolaudo.zimpressao += 'Canal endocervical: ' + this.camposdolaudo.campo34 + '.</br>';
      }
    }
  }

  MontarSacoGestacional() {
    this.camposdolaudo.zimpressao += '<b>-Saco Gestacional</b></br>';

    if (this.camposdolaudo.campo35 !== null && this.camposdolaudo.campo35 !== 'nao' && this.camposdolaudo.campo35 !== undefined) {
      this.camposdolaudo.zimpressao += 'Presença de saco gestacional ' + this.camposdolaudo.campo35;

      if (this.camposdolaudo.campo36 !== null && this.camposdolaudo.campo36 !== undefined) {
        this.camposdolaudo.zimpressao += ' com forma ' + this.camposdolaudo.campo36 + ', ';
      }

      if (this.camposdolaudo.campo37 !== undefined && this.camposdolaudo.campo37 !== null &&
          this.camposdolaudo.campo38 !== undefined && this.camposdolaudo.campo38 !== null &&
          this.camposdolaudo.campo39 !== undefined && this.camposdolaudo.campo39 !== null) {

        this.camposdolaudo.zimpressao += 'medindo: Long.: ' + this.camposdolaudo.campo37 + ' cm. '
          + 'x Ant. Post.: ' + this.camposdolaudo.campo38 + ' cm. '
          +  'Transv.: ' + this.camposdolaudo.campo39 + ' cm.</br>';
      }
    }
  }

  MontarEmbriaoFeto() {
    if (this.camposdolaudo.campo40 !== null && this.camposdolaudo.campo40 !== 'nao' && this.camposdolaudo.campo40 !== undefined) {
      this.camposdolaudo.zimpressao += 'Vesícula vitelínica ' + this.camposdolaudo.campo40 + '.</br>';

      if (this.camposdolaudo.campo41 !== null && this.camposdolaudo.campo41 !== undefined) {
        this.camposdolaudo.zimpressao += 'Membrana amniótica ' + this.camposdolaudo.campo41 + '.</br>';
      }

      if (this.camposdolaudo.campo42 !== null && this.camposdolaudo.campo42 !== undefined && this.camposdolaudo.campo42 === 'presente') {
        this.camposdolaudo.zimpressao += 'Embrião / Feto ' + this.camposdolaudo.campo42;

        if (this.camposdolaudo.campo14 !== null && this.camposdolaudo.campo14 !== undefined) {
          this.camposdolaudo.zimpressao += ', CCN medindo ' + this.camposdolaudo.campo14 + ' mm';
        }

        if (this.camposdolaudo.campo45 !== null && this.camposdolaudo.campo45 !== undefined) {
          this.camposdolaudo.zimpressao += ' com movimentos ' + this.camposdolaudo.campo45 + '.</br>';
        }

        if (this.camposdolaudo.campo43 !== null && this.camposdolaudo.campo43 !== undefined) {
          this.camposdolaudo.zimpressao += 'Batimentos cardíacos fetais ' + this.camposdolaudo.campo43
            + ' de ' + this.camposdolaudo.campo44 + 'bpm.</br>';
        }

        if (this.camposdolaudo.campo46 !== null && this.camposdolaudo.campo46 !== undefined) {
          this.camposdolaudo.zimpressao += 'Translucência nucal de ' + this.camposdolaudo.campo46 + 'mm.</br>';
        }
      } else if (this.camposdolaudo.campo42 === 'digitar' ||
                this.camposdolaudo.campo42 === 'ausente' ||
                this.camposdolaudo.campo42 === 'visualizado') {
        this.camposdolaudo.zimpressao += this.camposdolaudo.campo47 + '.</br>';
      }
    }
  }

  MontarOvarioDireito() {
    if ((this.camposdolaudo.campo48 !== null && this.camposdolaudo.campo48 !== undefined
        && this.camposdolaudo.campo48 !== 'nao') || (this.camposdolaudo.campo57 !== null
        && this.camposdolaudo.campo57 !== undefined
        && this.camposdolaudo.campo57 !== 'nao')) {
          this.camposdolaudo.zimpressao += '<b>-Ovários</b></br>';
    }
    if (this.camposdolaudo.campo48 !== null && this.camposdolaudo.campo48 !== 'nao' && this.camposdolaudo.campo48 !== undefined) {
      this.camposdolaudo.zimpressao += 'Ovário direito ' + this.camposdolaudo.campo48;

      if (this.camposdolaudo.campo49 !== null && this.camposdolaudo.campo49 !== undefined) {
        this.camposdolaudo.zimpressao += ', de contornos ' + this.camposdolaudo.campo49;
      }

      if (this.camposdolaudo.campo50 !== null && this.camposdolaudo.campo50 !== undefined) {
        this.camposdolaudo.zimpressao += 'e limites ' + this.camposdolaudo.campo50 + '</br>';
      }

      if (this.camposdolaudo.campo51 !== null && this.camposdolaudo.campo51 !== undefined) {
        this.camposdolaudo.zimpressao += 'Exibindo parênquima de textura '
          + this.camposdolaudo.campo51 + '.';
      }

      if (this.camposdolaudo.campo52 !== undefined && this.camposdolaudo.campo52 !== null) {
        this.camposdolaudo.zimpressao += 'Medidas: Long.: ' + this.camposdolaudo.campo52 + ' cm. '
          + 'x Ant. Post.: ' + this.camposdolaudo.campo53 + ' cm. '
          +  'Transv.: ' + this.camposdolaudo.campo54 + ' cm.</br>'
          + 'Volume: ' + this.camposdolaudo.campo55 + ' cm³.</br>';
      }
    }
  }

  MontarOvarioEsquerdo() {
    if (this.camposdolaudo.campo57 !== null && this.camposdolaudo.campo57 !== 'nao' && this.camposdolaudo.campo57 !== undefined) {
      this.camposdolaudo.zimpressao += 'Ovário esquerdo ' + this.camposdolaudo.campo57;

      if (this.camposdolaudo.campo58 !== null && this.camposdolaudo.campo58 !== undefined) {
        this.camposdolaudo.zimpressao += ', de contornos ' + this.camposdolaudo.campo58;
      }

      if (this.camposdolaudo.campo59 !== null && this.camposdolaudo.campo59 !== undefined) {
        this.camposdolaudo.zimpressao += 'e limites ' + this.camposdolaudo.campo59 + '</br>';
      }

      if (this.camposdolaudo.campo60 !== null && this.camposdolaudo.campo60 !== undefined) {
        this.camposdolaudo.zimpressao += 'Exibindo parênquima de textura '
          + this.camposdolaudo.campo60 + '.';
      }

      if (this.camposdolaudo.campo61 !== undefined && this.camposdolaudo.campo61 !== null) {
        this.camposdolaudo.zimpressao += 'Medidas: Long.: ' + this.camposdolaudo.campo61 + ' cm. '
          + 'x Ant. Post.: ' + this.camposdolaudo.campo62 + ' cm. '
          +  'Transv.: ' + this.camposdolaudo.campo63 + ' cm.</br>'
          + 'Volume: ' + this.camposdolaudo.campo64 + ' cm³.</br>';
      }
    }

    if (this.camposdolaudo.campo66 !== null && this.camposdolaudo.campo66 !== undefined && this.camposdolaudo.campo66 !== '') {
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo66;
    }
  }

  MontarFundSaco() {
    if (this.camposdolaudo.campo67 !== 'nao' && this.camposdolaudo.campo67 !== null && this.camposdolaudo.campo67 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-F.S.D:</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo68 + '</br>';
    }
  }

  MontarObservacoes() {
    if (this.camposdolaudo.campo69 !== 'nao' && this.camposdolaudo.campo69 !== null && this.camposdolaudo.campo69 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Observações gerais</b>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo69;
    }
  }

  MontarImpDiag() {
    if (this.camposdolaudo.campo4 !== '' && this.camposdolaudo.campo4 !== null && this.camposdolaudo.campo4 !== undefined) {
      this.camposdolaudo.zimpressao += '<b>-Dados da gestação:</b></br>';
      this.camposdolaudo.zimpressao += 'Data da última menstruação: ' + this.camposdolaudo.campo4;
    }

    if (this.camposdolaudo.campo5 !== '' && this.camposdolaudo.campo6 !== '' && this.camposdolaudo.campo18 !== '') {
      this.camposdolaudo.zimpressao += '</br><b>-Impressão diagnóstica:</b></br>';

      if (this.camposdolaudo.campo71 !== null && this.camposdolaudo.campo71 !== undefined) {
        this.camposdolaudo.zimpressao += 'Gravidez tópica, com embrião / feto único, de '
          + this.camposdolaudo.campo16 + ' semanas(s) e ' + this.camposdolaudo.campo17 + ' dia(s)';
      }

      if (this.camposdolaudo.campo5 !== null && this.camposdolaudo.campo5 !== undefined) {
        this.camposdolaudo.zimpressao += 'Tempo de amenorreia: ' + this.camposdolaudo.campo5
        + ' semanas(s) e ' + this.camposdolaudo.campo6 + ' dia(s)</br>';
      }

      if (this.camposdolaudo.campo18 !== null && this.camposdolaudo.campo18 !== undefined && this.camposdolaudo.campo72 === 'sim') {
        this.camposdolaudo.zimpressao += 'Data aproximada do parto:' + this.camposdolaudo.campo18 + ' (± ' + this.camposdolaudo.campo20 + ' sem).';
      }
    }

  }
}
