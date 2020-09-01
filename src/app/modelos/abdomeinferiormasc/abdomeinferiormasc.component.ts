import { ParametroDoLaudo, Abdomeinferiormasc } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';
import { ProfissionalexecutanteService } from '../../zservice/profissionalexecutante.service';

@Component({
  selector: 'app-abdomeinferiormasc',
  templateUrl: './abdomeinferiormasc.component.html',
  styleUrls: ['./abdomeinferiormasc.component.css']
})
export class AbdomeinferiormascComponent implements OnInit {
  @Input() laudosalvo: ParametroDoLaudo;
  abdomemodelo = new Abdomeinferiormasc();
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
      {label: 'Não imprimir', value: 'Não imprimir'},
      {label: 'Convexo', value: 'Convexo'},
      {label: 'Linear', value: 'Linear'},
      {label: 'Endocavitário', value: 'Endocavitário'},
      {label: 'Digitar', value: 'Digitar'}
    ];

    this.presenca = [
      {label: 'Não imprimir', value: 'Não imprimir'},
      {label: 'Presente', value: 'Presente'},
      {label: 'Ausente', value: 'Ausente'},
      {label: 'Digitar', value: 'Digitar'},
    ];

    this.espessura = [
      {label: 'Não imprimir', value: 'Não imprimir'},
      {label: 'Normal', value: 'Normal'},
      {label: 'Espessa', value: 'Espessa'}
    ];

    this.morfologia = [
      {label: 'Normal', value: 'Normal'},
      {label: 'Disforme', value: 'Disforme'}
    ];

    this.posicao = [
      {label: 'Tópica', value: 'Tópica'},
      {label: 'Atópica', value: 'Atópica'}
    ];

    this.superficie = [
      {label: 'Lisa', value: 'Lisa'},
      {label: 'Rugosa', value: 'Rugosa'}
    ];

    this.textura = [
      {label: 'Homogênea', value: 'Homogênea'},
      {label: 'Heterogênea', value: 'Heterogênea'}
    ];

    this.contornos = [
      {label: 'Definidos', value: 'Tópica'},
      {label: 'Indefinidos', value: 'Atópica'}
    ];

    this.limites = [
      {label: 'Precisos', value: 'Precisos'},
      {label: 'Imprecisos', value: 'Imprecisos'}
    ];

    this.texturaconteudo = [
      {label: 'Anenoico', value: 'Anenoico'},
      {label: 'Hipoecoica', value: 'Hipoecoica'},
      {label: 'Hiperecoica', value: 'Hiperecoica'}
    ];

    this.debrisconteudo = [
      {label: 'Ausente', value: 'Ausente'},
      {label: 'Presente', value: 'Presente'}
    ];

    this.posicaoassoalho = [
      {label: 'Normal', value: 'Normal'},
      {label: 'Elevado', value: 'Elevado'},
      {label: 'Rebaixado', value: 'Rebaixado'}
    ];

    this.capacidadebexiga = [
      {label: 'Não imprimir', value: 'Não imprimir'},
      {label: 'Normal', value: 'Normal'},
      {label: 'Diminuida', value: 'Diminuida'},
      {label: 'Elevada', value: 'Elevada'}
    ];

    this.residuoposmic = [
      {label: 'Não imprimir', value: 'Não imprimir'},
      {label: 'Ausente', value: 'Ausente'},
      {label: 'Desprezivel(0 a 40ml)', value: 'Desprezivel(0 a 40ml)'},
      {label: 'Moderado(40 a 100ml)', value: 'Moderado(40 a 100ml)'},
      {label: 'Acentuada(> que 100ml)', value: 'Acentuada(> que 100ml)'}
    ];

    this.presencaprostata = [
      {label: 'Não imprimir', value: 'Não imprimir'},
      {label: 'Presente', value: 'Presente'},
      {label: 'Ausente', value: 'Ausente'},
      {label: 'Digitar', value: 'Digitar'}
    ];

    this.posicaoprostata = [
      {label: 'Tópica', value: 'Tópica'},
      {label: 'Atópica', value: 'Atópica'}
    ];

    this.morfologiaprostata = [
      {label: 'Normal', value: 'Normal'},
      {label: 'Disforme', value: 'Disforme'},
      {label: 'Globosa', value: 'Globosa'}
    ];

    this.superficieprostata = [
      {label: 'Regular', value: 'Regular'},
      {label: 'Irregular', value: 'Irregular'}
    ];

    this.biopsiaprostata = [
      {label: 'Sim', value: 'Sim'},
      {label: 'Não', value: 'Não'}
    ];

    this.texturaprostata = [
      {label: 'Não imprimir', value: 'Não imprimir'},
      {label: 'Homogênea', value: 'Homogênea'},
      {label: 'Heterogênea', value: 'Heterogênea'}
    ];

    this.presencavesicula = [
      {label: 'Não imprimir', value: 'Não imprimir'},
      {label: 'Presente', value: 'Presente'},
      {label: 'Ausente', value: 'Ausente'},
      {label: 'Digitar', value: 'Digitar'}
    ];
  }

  CarregarTextoEquip() {
    if (this.abdomemodelo.presencabexiga === 'Não imprimir') {
      this.abdomemodelo.dadosequipamentotexto = '';
    }

    if (this.abdomemodelo.presencabexiga === 'Convexo') {
      this.abdomemodelo.dadosequipamentotexto = '– Equipamento:<br>Exame realizado em modo bidimensional com equipamento dinâmico Convexo multifrequêncial.';
    }

    if (this.abdomemodelo.presencabexiga === 'Linear') {
      this.abdomemodelo.dadosequipamentotexto = '– Equipamento:<br>Exame realizado em modo bidimensional com equipamento dinâmico Linear multifrequêncial.';
    }

    if (this.abdomemodelo.presencabexiga === 'Endocavitário') {
      this.abdomemodelo.dadosequipamentotexto = '– Equipamento:<br>Exame realizado em modo bidimensional com equipamento dinâmico Endocavitário multifrequêncial.';
    }

    if (this.abdomemodelo.presencabexiga === 'Digitar') {
      this.abdomemodelo.dadosequipamentotexto = '';
    }
  }

}
