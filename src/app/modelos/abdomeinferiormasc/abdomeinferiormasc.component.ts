import { CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input, Output } from '@angular/core';
import { ProfissionalexecutanteService } from '../../zservice/profissionalexecutante.service';

@Component({
  selector: 'app-abdomeinferiormasc',
  templateUrl: './abdomeinferiormasc.component.html',
  styleUrls: ['./abdomeinferiormasc.component.css']
})
export class AbdomeinferiormascComponent implements OnInit {
  @Input() camposdolaudo: CamposDoLaudo;
  executantes: any[];
  codigoexecutante: number;
  equip: any[];
  presenca: any[];
  espessura: any[];
  morfologia: any[];
  posicao: any[];
  superficie: any[];
  textura: any[];
  contornos: any[];
  limites: any[];
  texturaconteudo: any[];
  debrisconteudo: any[];
  posicaoassoalho: any[];
  capacidadebexiga: any[];
  residuoposmic: any[];
  presencaprostata: any[];
  posicaoprostata: any[];
  morfologiaprostata: any[];
  superficieprostata: any[];
  texturaprostata: any[];
  biopsiaprostata: any[];
  presencavesicula: any[];
  valortotal: string;
  simetria: any[];
  impressaodiag: any[];
  bexigapresenca: boolean;
  bexigadescricao: boolean ;
  prostatapresenca: boolean ;
  prostloboposterior: boolean;
  prostlobopostcentral: boolean;
  prostlobopostmedio: boolean;
  prostlobopostant: boolean;
  vesiculapresenca: boolean;
  vesiculadescricao: boolean;


  constructor(private serviceexec: ProfissionalexecutanteService) { }

  ngOnInit(): void {
    this.CarregarDrops();
    this.CarregarExecutantes();
  }

  CarregarExecutantes() {
    this.serviceexec.Listar().then(lista => {
      this.executantes = lista.map(executante => ({label: executante.nome, value: executante.codigo}));
    }).catch(erro => erro);
  }

  CarregarDrops() {
    this.equip = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Convexo', value: 'convexo'},
      {label: 'Linear', value: 'linear'},
      {label: 'Endocavitário', value: 'endocavitario'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.presenca = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Presente', value: 'presente'},
      {label: 'Ausente', value: 'ausente'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.espessura = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normal', value: 'normal'},
      {label: 'Espessa', value: 'espessa'}
    ];

    this.morfologia = [
      {label: 'Normal', value: 'normal'},
      {label: 'Disforme', value: 'disforme'}
    ];

    this.posicao = [
      {label: 'Tópica', value: 'tópica'},
      {label: 'Atópica', value: 'atópica'}
    ];

    this.superficie = [
      {label: 'Lisa', value: 'lisa'},
      {label: 'Rugosa', value: 'rugosa'}
    ];

    this.textura = [
      {label: 'Homogênea', value: 'homogênea'},
      {label: 'Heterogênea', value: 'heterogênea'}
    ];

    this.contornos = [
      {label: 'Definidos', value: 'definidos'},
      {label: 'Indefinidos', value: 'indefinidos'}
    ];

    this.limites = [
      {label: 'Precisos', value: 'precisos'},
      {label: 'Imprecisos', value: 'imprecisos'}
    ];

    this.texturaconteudo = [
      {label: 'Anenoico', value: 'anenoico'},
      {label: 'Hipoecoica', value: 'hipoecoica'},
      {label: 'Hiperecoica', value: 'hiperecoica'}
    ];

    this.debrisconteudo = [
      {label: 'Ausente', value: 'ausência'},
      {label: 'Presente', value: 'presença'}
    ];

    this.posicaoassoalho = [
      {label: 'Normal', value: 'normal'},
      {label: 'Elevado', value: 'elevado'},
      {label: 'Rebaixado', value: 'rebaixado'}
    ];

    this.capacidadebexiga = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Normal', value: 'normal'},
      {label: 'Diminuida', value: 'diminuida'},
      {label: 'Elevada', value: 'elevada'}
    ];

    this.residuoposmic = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Ausente', value: 'ausente'},
      {label: 'Desprezivel(0 a 40ml)', value: 'desprezivel(0 a 40ml)'},
      {label: 'Moderado(40 a 100ml)', value: 'moderado(40 a 100ml)'},
      {label: 'Acentuada(> que 100ml)', value: 'acentuada(> que 100ml)'}
    ];

    this.presencaprostata = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Presente', value: 'presente'},
      {label: 'Ausente', value: 'ausente'},
      {label: 'Digitar', value: 'digitar'}
    ];

    this.posicaoprostata = [
      {label: 'Tópica', value: 'tópica'},
      {label: 'Atópica', value: 'atópica'}
    ];

    this.morfologiaprostata = [
      {label: 'Normal', value: 'normal'},
      {label: 'Disforme', value: 'disforme'},
      {label: 'Globosa', value: 'globosa'}
    ];

    this.superficieprostata = [
      {label: 'Regular', value: 'regular'},
      {label: 'Irregular', value: 'irregular'}
    ];

    this.biopsiaprostata = [
      {label: 'Sim', value: 'sim'},
      {label: 'Não', value: 'não'}
    ];

    this.texturaprostata = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Homogênea', value: 'homogenea'},
      {label: 'Heterogênea', value: 'heterogenea'}
    ];

    this.presencavesicula = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Presente', value: 'Presente'},
      {label: 'Ausente', value: 'Ausente'},
      {label: 'Digitar', value: 'Digitar'}
    ];

    this.simetria = [
      {label: 'Simétricas', value: 'simetricas'},
      {label: 'Assimétricas', value: 'assimetricas'},
      {label: 'Não visualizadas', value: 'nao'}
    ];

    this.impressaodiag = [
      {label: 'Não imprimir', value: 'nao'},
      {label: 'Texto normal sugestivo', value: 'normal'},
      {label: 'Digitar', value: 'digitar'},
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

  ConfereBexiga() {
    if (this.camposdolaudo.campo3 === 'nao') {
      this.bexigapresenca = true;
      this.bexigadescricao = true;
    }

    if (this.camposdolaudo.campo3 === 'presente') {
      this.bexigapresenca = false;
      this.bexigadescricao = true;
    }

    if (this.camposdolaudo.campo3 === 'ausente') {
      this.bexigapresenca = true;
      this.bexigadescricao = true;
    }

    if (this.camposdolaudo.campo3 === 'digitar') {
      this.bexigapresenca = true;
      this.bexigadescricao = false;
    }
  }

  ConfereProstata() {
    if (this.camposdolaudo.campo17 === 'nao') {
      this.prostatapresenca = true;
    }

    if (this.camposdolaudo.campo17 === 'presente') {
      this.prostatapresenca = false;
    }

    if (this.camposdolaudo.campo17 === 'ausente') {
      this.prostatapresenca = true;
    }

    if (this.camposdolaudo.campo17 === 'digitar') {
      this.prostatapresenca = true;
    }
  }

  ConfereProsLoboPost() {
    if (this.camposdolaudo.campo27 === 'nao') {
      this.prostloboposterior = true;
    }

    if (this.camposdolaudo.campo27 === 'homogenea') {
      this.prostloboposterior = false;
    }

    if (this.camposdolaudo.campo27 === 'heterogenea') {
      this.prostloboposterior = false;
    }
  }

  ConfereProsLoboCentral() {
    if (this.camposdolaudo.campo31 === 'nao') {
      this.prostlobopostcentral = true;
    }

    if (this.camposdolaudo.campo31 === 'homogenea') {
      this.prostlobopostcentral = false;
    }

    if (this.camposdolaudo.campo31 === 'heterogenea') {
      this.prostlobopostcentral = false;
    }
  }

  ConfereProsLoboMedio() {
    if (this.camposdolaudo.campo35 === 'nao') {
      this.prostlobopostmedio = true;
    }

    if (this.camposdolaudo.campo35 === 'homogenea') {
      this.prostlobopostmedio = false;
    }

    if (this.camposdolaudo.campo35 === 'heterogenea') {
      this.prostlobopostmedio = false;
    }
  }

  ConfereProsLoboAnterior() {
    if (this.camposdolaudo.campo39 === 'nao') {
      this.prostlobopostant = true;
    }

    if (this.camposdolaudo.campo39 === 'homogenea') {
      this.prostlobopostant = false;
    }

    if (this.camposdolaudo.campo39 === 'heterogenea') {
      this.prostlobopostant = false;
    }
  }

  ConfereVesiculas() {
    if (this.camposdolaudo.campo43 === 'nao') {
      this.vesiculapresenca = true;
      this.vesiculadescricao = true;
    }

    if (this.camposdolaudo.campo43 === 'presente') {
      this.vesiculapresenca = false;
      this.vesiculadescricao = true;
    }

    if (this.camposdolaudo.campo43 === 'ausente') {
      this.vesiculapresenca = true;
      this.vesiculadescricao = true;
    }

    if (this.camposdolaudo.campo43 === 'digitar') {
      this.vesiculapresenca = true;
      this.vesiculadescricao = false;
    }
  }

  ConfereImpressaoDiag() {
    if (this.camposdolaudo.campo53 === 'nao') {
      this.camposdolaudo.campo54 = 'a';
    }

    if (this.camposdolaudo.campo53 === 'normal') {
      this.camposdolaudo.campo54 = 'Exame ecográfico compatível com próstata, bexiga e vesículas seminais normais.';
    }

    if (this.camposdolaudo.campo53 === 'digitar') {
      this.camposdolaudo.campo54 = 'f';
    }
  }

  MontarImpressao() {
    this.camposdolaudo.zimpressao = '';

    this.MontarDadosEquip();
    this.MontarBexiga();
    this.camposdolaudo.zimpressao += '</br>';
    this.MontarProstata();
    this.MontarProstataLobSup();
    this.MontarProstataCentral();
    this.MontarProstataLobMedio();
    this.MontarProstataFibAnt();
    this.MontarVesicula();
    this.MontarObservacao();
    this.MontarImpDiag();
  }

  MontarDadosEquip() {
    if (this.camposdolaudo.campo1 !== 'nao' && this.camposdolaudo.campo1 !== null && this.camposdolaudo.campo1 !== undefined) {
      this.camposdolaudo.zimpressao = '<b>-Dados do equipamento</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo2 + '</br>';
    }

    this.camposdolaudo.zimpressao += '</br>';
  }

  MontarBexiga() {
    if (this.camposdolaudo.campo3 === 'presente') {
      this.camposdolaudo.zimpressao += '<b>-Bexiga</b></br>';

      if (this.camposdolaudo.campo6 !== undefined && this.camposdolaudo.campo6 !== null) {
        this.camposdolaudo.zimpressao += this.camposdolaudo.campo6 + ', ';
      }

      if (this.camposdolaudo.campo5 !== undefined && this.camposdolaudo.campo5 !== null) {
        this.camposdolaudo.zimpressao += 'morfologia ' + this.camposdolaudo.campo5 + ', ';
      }

      if (this.camposdolaudo.campo7 !== undefined && this.camposdolaudo.campo7 !== null) {
        this.camposdolaudo.zimpressao += 'parede ' + this.camposdolaudo.campo7 + ' ';
      }

      if (this.camposdolaudo.campo8 !== undefined && this.camposdolaudo.campo8 !== null) {
        this.camposdolaudo.zimpressao += 'com textura acústica ' + this.camposdolaudo.campo8 + ', ';
      }

      if (this.camposdolaudo.campo9 !== undefined && this.camposdolaudo.campo9 !== null) {
        this.camposdolaudo.zimpressao += 'contornos ' + this.camposdolaudo.campo9 + ', ';
      }

      if (this.camposdolaudo.campo10 !== undefined && this.camposdolaudo.campo10 !== null) {
        this.camposdolaudo.zimpressao += 'limites ' + this.camposdolaudo.campo10 + ' e ';
      }

      if (this.camposdolaudo.campo4 !== undefined && this.camposdolaudo.campo4 !== null) {
        this.camposdolaudo.zimpressao += 'espessura ' + this.camposdolaudo.campo4 + '.</br>';
      }

      if (this.camposdolaudo.campo11 !== undefined && this.camposdolaudo.campo11 !== null) {
        this.camposdolaudo.zimpressao += 'conteúdo ' + this.camposdolaudo.campo11 + ', ';
      }

      if (this.camposdolaudo.campo12 !== undefined && this.camposdolaudo.campo12 !== null) {
        this.camposdolaudo.zimpressao += 'com ' + this.camposdolaudo.campo12 + ' no seu interior.</br>';
      }

      if (this.camposdolaudo.campo13 !== undefined && this.camposdolaudo.campo13 !== null) {
        this.camposdolaudo.zimpressao += 'Assoalho vesical em posição ' + this.camposdolaudo.campo13 + '.</br>';
      }

      if (this.camposdolaudo.campo14 !== undefined && this.camposdolaudo.campo14 !== null) {
        this.camposdolaudo.zimpressao += 'Capacidade vesical ' + this.camposdolaudo.campo14 + '.</br>';
      }

      if (this.camposdolaudo.campo15 !== undefined && this.camposdolaudo.campo15 !== null) {
        this.camposdolaudo.zimpressao += 'resíduo pós-miccional ' + this.camposdolaudo.campo15 + '.';
      }

      if (this.camposdolaudo.campo16 !== null && this.camposdolaudo.campo16 !== null) {
        this.camposdolaudo.zimpressao += this.camposdolaudo.campo16 + '.</br>';
      }
    } else if (this.camposdolaudo.campo3 === 'ausente') {
      this.camposdolaudo.zimpressao = '<b>-Bexiga</b></br>Ausente.';
    } else if (this.camposdolaudo.campo3 === 'digitar') {
      if (this.camposdolaudo.campo16 !== null) {
        this.camposdolaudo.zimpressao += this.camposdolaudo.campo16 + '.';
      }
    }

    this.camposdolaudo.zimpressao += '</br>';
  }

  MontarProstata() {
    if (this.camposdolaudo.campo17 === 'presente') {
      this.camposdolaudo.zimpressao += '<b>-Próstata</b></br>';

      if (this.camposdolaudo.campo18 !== undefined && this.camposdolaudo.campo18 !== null) {
        this.camposdolaudo.zimpressao += this.camposdolaudo.campo18 + ', ';
      }

      if (this.camposdolaudo.campo19 !== undefined && this.camposdolaudo.campo19 !== null) {
        this.camposdolaudo.zimpressao += 'morfologia ' + this.camposdolaudo.campo19 + ' e ';
      }

      if (this.camposdolaudo.campo20 !== undefined && this.camposdolaudo.campo20 !== null) {
        this.camposdolaudo.zimpressao += 'superfície ' + this.camposdolaudo.campo20 + '.</br>';
      }

      if (this.camposdolaudo.campo24 !== undefined && this.camposdolaudo.campo24 !== null) {
        this.camposdolaudo.zimpressao += 'Medidas: Long.: ' + this.camposdolaudo.campo21 + ' cm. '
          + 'x Ant. Post.: ' + this.camposdolaudo.campo22 + ' cm. '
          +  'Trans.: ' + this.camposdolaudo.campo23 + ' cm.</br>'
          + 'Peso: ' + this.camposdolaudo.campo24 + ' g.</br>';
      }

      if (this.camposdolaudo.campo25 !== undefined && this.camposdolaudo.campo25 !== null) {
        this.camposdolaudo.zimpressao += 'Realizada biópsia transretal utilizando agulha acoplada em pistola automática.</br>'
          + 'Dirigida por ultrassonografia, sendo retirado ' + this.camposdolaudo.campo26 + ' fragmento(s) de próstata.';
      }
    } else if (this.camposdolaudo.campo17 === 'ausente') {
      this.camposdolaudo.zimpressao = '<b>-Bexiga</b></br>Ausente.';
    } else if (this.camposdolaudo.campo17 === 'digitar') {
      if (this.camposdolaudo.campo17 !== null) {
        this.camposdolaudo.zimpressao += this.camposdolaudo.campo16 + '.';
      }
    }
  }

  MontarProstataLobSup() {
    if (this.camposdolaudo.campo28 !== 'nao' && this.camposdolaudo.campo28 !== null && this.camposdolaudo.campo28 !== undefined) {
      this.camposdolaudo.zimpressao += '</br>--Zona periférica (lobo posterior) com textura acústica '
        + this.camposdolaudo.campo28 + ', ';

      if (this.camposdolaudo.campo30 !== undefined) {
        this.camposdolaudo.zimpressao += 'contornos ' + this.camposdolaudo.campo30;
      }

      if (this.camposdolaudo.campo29 !== undefined) {
        this.camposdolaudo.zimpressao += ' e limites  ' + this.camposdolaudo.campo29 + '.';
      }

      if (this.camposdolaudo.campo31 !== null) {
        this.camposdolaudo.zimpressao += this.camposdolaudo.campo31;
      }
    }
  }

  MontarProstataCentral() {
    if (this.camposdolaudo.campo32 !== 'nao' && this.camposdolaudo.campo32 !== null && this.camposdolaudo.campo32 !== undefined) {
      this.camposdolaudo.zimpressao += '</br>--Zona central com textura acústica '
        + this.camposdolaudo.campo32 + ', ';

      if (this.camposdolaudo.campo34 !== undefined) {
        this.camposdolaudo.zimpressao += 'contornos ' + this.camposdolaudo.campo34;
      }

      if (this.camposdolaudo.campo33 !== undefined) {
        this.camposdolaudo.zimpressao += ' e limites  ' + this.camposdolaudo.campo33 + '.';
      }

      if (this.camposdolaudo.campo35 !== null) {
        this.camposdolaudo.zimpressao += this.camposdolaudo.campo35;
      }
    }
  }

  MontarProstataLobMedio() {
    if (this.camposdolaudo.campo36 !== 'nao' && this.camposdolaudo.campo36 !== null && this.camposdolaudo.campo36 !== undefined) {
      this.camposdolaudo.zimpressao += '</br>--Zona de transição (lobo médio) com textura acústica '
        + this.camposdolaudo.campo36 + ', ';

      if (this.camposdolaudo.campo38 !== undefined) {
        this.camposdolaudo.zimpressao += 'contornos ' + this.camposdolaudo.campo38;
      }

      if (this.camposdolaudo.campo37 !== undefined) {
        this.camposdolaudo.zimpressao += ' e limites  ' + this.camposdolaudo.campo37 + '.';
      }

      if (this.camposdolaudo.campo39 !== null) {
        this.camposdolaudo.zimpressao += this.camposdolaudo.campo39;
      }
    }
  }

  MontarProstataFibAnt() {
    if (this.camposdolaudo.campo40 !== 'nao' && this.camposdolaudo.campo40 !== null && this.camposdolaudo.campo40 !== undefined) {
      this.camposdolaudo.zimpressao += '</br>--Estroma fibromuscular anterior com textura acústica '
        + this.camposdolaudo.campo40 + ', ';

      if (this.camposdolaudo.campo42 !== undefined) {
        this.camposdolaudo.zimpressao += 'contornos ' + this.camposdolaudo.campo42;
      }

      if (this.camposdolaudo.campo41 !== undefined) {
        this.camposdolaudo.zimpressao += ' e limites  ' + this.camposdolaudo.campo41 + '.';
      }

      if (this.camposdolaudo.campo43 !== null) {
        this.camposdolaudo.zimpressao += this.camposdolaudo.campo43;
      }
    }
  }

  MontarVesicula() {
    if (this.camposdolaudo.campo44 === 'presente' && this.camposdolaudo.campo44 !== null) {
      this.camposdolaudo.zimpressao += '</br></br><b>-Vesículas seminais:</b></br>';

      if (this.camposdolaudo.campo45 !== undefined) {
        this.camposdolaudo.zimpressao += this.camposdolaudo.campo45 + ', ';
      }

      if (this.camposdolaudo.campo46 !== undefined) {
        this.camposdolaudo.zimpressao += 'morfologia ' + this.camposdolaudo.campo46 + ', ';
      }

      if (this.camposdolaudo.campo47 !== undefined) {
        this.camposdolaudo.zimpressao += 'superfície ' + this.camposdolaudo.campo47 + ', ';
      }

      if (this.camposdolaudo.campo48 !== undefined) {
        this.camposdolaudo.zimpressao += 'textura acústica ' + this.camposdolaudo.campo48 + ', ';
      }

      if (this.camposdolaudo.campo49 !== undefined) {
        this.camposdolaudo.zimpressao += 'limites ' + this.camposdolaudo.campo49;
      }

      if (this.camposdolaudo.campo50 !== undefined) {
        this.camposdolaudo.zimpressao += 'e contornos ' + this.camposdolaudo.campo50;
      }

      if (this.camposdolaudo.campo51 !== null) {
        this.camposdolaudo.zimpressao += this.camposdolaudo.campo51;
      }
    }
  }

  MontarObservacao() {
    if (this.camposdolaudo.campo52 !== null) {
      this.camposdolaudo.zimpressao += '<b>-Observações gerais:</b>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo52;
    }
  }

  MontarImpDiag() {
    if (this.camposdolaudo.campo54 !== null) {
      this.camposdolaudo.zimpressao += '</br><b>-Impressão diagnóstica:</b></br>';
      this.camposdolaudo.zimpressao += this.camposdolaudo.campo54;
      this.camposdolaudo.zimpressao += '</br>';
    }
  }


}
