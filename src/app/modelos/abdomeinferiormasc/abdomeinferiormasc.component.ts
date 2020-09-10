import { Laudo, CamposDoLaudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';
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
      {label: 'Digitar', value: 'digitar'},
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
      {label: 'Homogênea', value: 'Homogênea'},
      {label: 'Heterogênea', value: 'Heterogênea'}
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

}
