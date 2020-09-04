import { ParametroDoLaudo, Abdomeinferiormasc, Laudo } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';
import { ProfissionalexecutanteService } from '../../zservice/profissionalexecutante.service';

@Component({
  selector: 'app-abdomeinferiormasc',
  templateUrl: './abdomeinferiormasc.component.html',
  styleUrls: ['./abdomeinferiormasc.component.css']
})
export class AbdomeinferiormascComponent implements OnInit {
  @Input() laudosalvo: Array<ParametroDoLaudo>;
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
  simetria: any[];

  constructor(private serviceexec: ProfissionalexecutanteService) { }

  ngOnInit(): void {
    this.laudosalvo = new Array<ParametroDoLaudo>();
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
    if (this.abdomemodelo.presencabexiga === 'nao') {
      this.abdomemodelo.dadosequipamentotexto = '';
    }

    if (this.abdomemodelo.presencabexiga === 'convexo') {
      this.abdomemodelo.dadosequipamentotexto = 'Exame realizado em modo bidimensional com equipamento dinâmico Convexo multifrequêncial.';
    }

    if (this.abdomemodelo.presencabexiga === 'linear') {
      this.abdomemodelo.dadosequipamentotexto = 'Exame realizado em modo bidimensional com equipamento dinâmico Linear multifrequêncial.';
    }

    if (this.abdomemodelo.presencabexiga === 'endocavitario') {
      this.abdomemodelo.dadosequipamentotexto = 'Exame realizado em modo bidimensional com equipamento dinâmico Endocavitário multifrequêncial.';
    }

    if (this.abdomemodelo.presencabexiga === 'digitar') {
      this.abdomemodelo.dadosequipamentotexto = '';
    }
  }

  MontarTexto() {
    this.valortotal = '';

    if (this.abdomemodelo.dadosequipamentotexto !== undefined) {
      this.valortotal = '<b>Equipamento</b><br>';
      this.valortotal += this.abdomemodelo.dadosequipamentotexto + '<br><br>';
    }

    if (this.abdomemodelo.presencabexiga !== 'nao' && this.abdomemodelo.presencabexiga !== '' && this.abdomemodelo.presencabexiga !== undefined) {
      this.valortotal += '<b>Bexiga</b><br>';
    }

    if (this.abdomemodelo.posicaobexiga !== undefined) {
      this.valortotal += this.abdomemodelo.posicaobexiga + ',';
    }

    if (this.abdomemodelo.morfologiabexiga !== undefined) {
      this.valortotal += ' morfologia ' + this.abdomemodelo.morfologiabexiga + ',';
    }

    if (this.abdomemodelo.superficiebexiga !== undefined) {
      this.valortotal += ' parede ' + this.abdomemodelo.superficiebexiga;
    }

    if (this.abdomemodelo.texturabexiga !== undefined) {
      this.valortotal += ' com textura acústica ' + this.abdomemodelo.texturabexiga + ',';
    }

    if (this.abdomemodelo.contornobexiga !== undefined) {
      this.valortotal += ' contornos ' + this.abdomemodelo.contornobexiga + ',';
    }

    if (this.abdomemodelo.limitesbexiga !== undefined) {
      this.valortotal +=  ' limites ' + this.abdomemodelo.limitesbexiga;
    }

    if (this.abdomemodelo.espessurabexiga !== undefined && this.abdomemodelo.espessurabexiga !== 'nao imprimir') {
      this.valortotal += ' e espessura ' + this.abdomemodelo.espessurabexiga + '.<br>';
    }

    if (this.abdomemodelo.texturadoconteudodabexiga !== undefined) {
      this.valortotal += 'Conteúdo ' + this.abdomemodelo.texturadoconteudodabexiga + ', ';
    }

    if (this.abdomemodelo.debrisconteudodabexiga !== undefined) {
      this.valortotal += 'com ' + this.abdomemodelo.debrisconteudodabexiga + ', ' +  ' de debris no seu interior.<br>';
    }

    if (this.abdomemodelo.posicaodoassoalhodabexiga !== undefined) {
      this.valortotal += 'Assoalho vesical em posição ' + this.abdomemodelo.posicaodoassoalhodabexiga + '.<br>';
    }

    if (this.abdomemodelo.capacidadedabexiga !== undefined && this.abdomemodelo.capacidadedabexiga !== 'nao imprimir') {
      this.valortotal +=  '. Capacidade vesical ' + this.abdomemodelo.capacidadedabexiga + '.<br>';
    }

    if (this.abdomemodelo.residuosposmiccionalbexiga !== undefined && this.abdomemodelo.residuosposmiccionalbexiga !== 'nao imprimir') {
      this.valortotal += 'Resíduo pós-miccional ' + this.abdomemodelo.residuosposmiccionalbexiga + '.<br>';
    }

    if (this.abdomemodelo.descricaotextobexiga !== undefined) {
      this.valortotal += this.abdomemodelo.descricaotextobexiga;
    }

    if (this.abdomemodelo.presencaprostata !== 'nao' && this.abdomemodelo.presencaprostata !== '' && this.abdomemodelo.presencaprostata !== undefined) {
      this.valortotal += '<br><b>Próstata</b><br>';
    }

    if (this.abdomemodelo.posicaoprostata !== undefined) {
      this.valortotal += this.abdomemodelo.posicaoprostata + ', ';
    }

    if (this.abdomemodelo.morfologiaprostata !== undefined) {
      this.valortotal += 'morfologia ' + this.abdomemodelo.morfologiaprostata + ' e ';
    }

    if (this.abdomemodelo.superficieprostata !== undefined) {
      this.valortotal += 'superfície ' + this.abdomemodelo.superficieprostata  + '.<br>';
    }

    if (this.abdomemodelo.diamlongitudinalprostata !== undefined) {
      this.valortotal += 'Medidas: Long.: ' + this.abdomemodelo.diamlongitudinalprostata + ' cm. ';
    }

    if (this.abdomemodelo.diamantpostprostata !== undefined) {
      this.valortotal += 'x Ant. Post.:' + this.abdomemodelo.diamantpostprostata + ' cm.';
    }

    if (this.abdomemodelo.diamtransversal !== undefined) {
      this.valortotal +=  'x Trans.:' + this.abdomemodelo.diamtransversal + ' cm.<br>';
    }

    if (this.abdomemodelo.pesoprostata !== undefined) {
      this.valortotal += 'Peso: ' + this.abdomemodelo.pesoprostata + ' g.';
    }

    if (this.abdomemodelo.texturaprostatazona !== undefined) {
      this.valortotal += '<br><b>• Zona periférica (lobo posterior)</b> com textura acústica '
        + this.abdomemodelo.texturaprostatazona + ', contornos '
        + this.abdomemodelo.contornozonapost + ' e limites ' + this.abdomemodelo.limieteszonapost
        + '<br>' + this.abdomemodelo.informacaocompzonaposttexto;
    }

    if (this.abdomemodelo.texturaprostatacentro !== undefined) {
      this.valortotal += '<br><b>• Zona central</b> com textura acústica '
        + this.abdomemodelo.texturaprostatacentro + ', contornos '
        + this.abdomemodelo.contornozonacentro + ' e limites ' + this.abdomemodelo.limieteszonacentro
        + '<br>' + this.abdomemodelo.informacaocompcentroposttexto;
    }

    if (this.abdomemodelo.texturaprostatatransic !== undefined) {
      this.valortotal += '<br><b>• Zona de transição (lobo médio)</b> com textura acústica '
        + this.abdomemodelo.texturaprostatatransic + ', contornos '
        + this.abdomemodelo.contornozonatransic + ' e limites ' + this.abdomemodelo.limieteszonatransic
        + '<br>' + this.abdomemodelo.informacaocomptransicposttexto;
    }

    if (this.abdomemodelo.texturaprostatafibro !== undefined) {
      this.valortotal += '<br><b>• Estroma fibromuscular</b> anterior com textura acústica '
        + this.abdomemodelo.texturaprostatafibro + ', contornos '
        + this.abdomemodelo.contornozonafibro + ' e limites ' + this.abdomemodelo.limieteszonafibro
        + '<br>' + this.abdomemodelo.informacaocompfibroposttexto;
    }

    if (this.abdomemodelo.presencavesicula !== 'nao' && this.abdomemodelo.presencavesicula !== '' && this.abdomemodelo.presencavesicula !== undefined) {
      this.valortotal += '<br><b>Vesículas seminais</b><br>';
    }

    if (this.abdomemodelo.simetribavesicula !== undefined) {
      this.valortotal += this.abdomemodelo.simetribavesicula + ',' ;
    }

    if (this.abdomemodelo.morfologiavesicula !== undefined) {
      this.valortotal += ' morfologia ' + this.abdomemodelo.morfologiavesicula + ',' ;
    }

    if (this.abdomemodelo.superficievesicula !== undefined) {
      this.valortotal += ' superfície ' + this.abdomemodelo.superficievesicula + ',' ;
    }

    if (this.abdomemodelo.texturavesicula !== undefined) {
      this.valortotal += ' textura acústica ' + this.abdomemodelo.texturavesicula + ',' ;
    }

    if (this.abdomemodelo.limitevesicula !== undefined) {
      this.valortotal += ' limites ' + this.abdomemodelo.limitevesicula + ' e ' ;
    }

    if (this.abdomemodelo.contornovesicula !== undefined) {
      this.valortotal += ' contornos ' + this.abdomemodelo.contornovesicula + '.' ;
    }

    if (this.abdomemodelo.descricaotextovesicula !== undefined) {
      this.valortotal += '<br>' + this.abdomemodelo.descricaotextovesicula + '.' ;
    }

    this.abdomemodelo.dadosequipamentotexto = this.valortotal;
    this.laudosalvo[0].valor = this.valortotal;
    // this.GuardarDados();
  }

  GuardarDados() {


    let para = new ParametroDoLaudo();
    para.index = 1;
    para.valor = this.abdomemodelo.dadosequipamentotexto;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 2;
    para.valor = this.abdomemodelo.presencabexiga;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 3;
    para.valor = this.abdomemodelo.espessurabexiga;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 4;
    para.valor = this.abdomemodelo.morfologiabexiga;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 5;
    para.valor = this.abdomemodelo.posicaobexiga;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 6;
    para.valor = this.abdomemodelo.superficiebexiga;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 7;
    para.valor = this.abdomemodelo.texturabexiga;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 8;
    para.valor = this.abdomemodelo.contornobexiga;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 9;
    para.valor = this.abdomemodelo.limitesbexiga;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 10;
    para.valor = this.abdomemodelo.texturadoconteudodabexiga;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 11;
    para.valor = this.abdomemodelo.debrisconteudodabexiga;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 12;
    para.valor = this.abdomemodelo.posicaodoassoalhodabexiga;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 13;
    para.valor = this.abdomemodelo.capacidadedabexiga;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 14;
    para.valor = this.abdomemodelo.residuosposmiccionalbexiga;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 15;
    para.valor = this.abdomemodelo.descricaotextobexiga;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 16;
    para.valor = this.abdomemodelo.presencaprostata;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 17;
    para.valor = this.abdomemodelo.posicaoprostata;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 18;
    para.valor = this.abdomemodelo.morfologiaprostata;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 19;
    para.valor = this.abdomemodelo.superficieprostata;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 20;
    para.valor = this.abdomemodelo.diamlongitudinalprostata;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 21;
    para.valor = this.abdomemodelo.diamantpostprostata;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 22;
    para.valor = this.abdomemodelo.diamtransversal;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 23;
    para.valor = this.abdomemodelo.pesoprostata;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 24;
    para.valor = this.abdomemodelo.biopsiaprostata;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 25;
    para.valor = this.abdomemodelo.nfragmentosprostata;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 26;
    para.valor = this.abdomemodelo.texturaprostatazona;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 27;
    para.valor = this.abdomemodelo.limieteszonapost;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 28;
    para.valor = this.abdomemodelo.contornozonapost;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 29;
    para.valor = this.abdomemodelo.informacaocompzonaposttexto;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 30;
    para.valor = this.abdomemodelo.texturaprostatacentro;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 31;
    para.valor = this.abdomemodelo.limieteszonacentro;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 34;
    para.valor = this.abdomemodelo.contornozonacentro;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 33;
    para.valor = this.abdomemodelo.informacaocompcentroposttexto;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 35;
    para.valor = this.abdomemodelo.texturaprostatatransic;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 36;
    para.valor = this.abdomemodelo.limieteszonatransic;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 37;
    para.valor = this.abdomemodelo.contornozonatransic;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 38;
    para.valor = this.abdomemodelo.informacaocomptransicposttexto;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 39;
    para.valor = this.abdomemodelo.texturaprostatafibro;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 40;
    para.valor = this.abdomemodelo.limieteszonafibro;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 41;
    para.valor = this.abdomemodelo.contornozonafibro;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 42;
    para.valor = this.abdomemodelo.informacaocompfibroposttexto;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 43;
    para.valor = this.abdomemodelo.presencavesicula;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 44;
    para.valor = this.abdomemodelo.simetribavesicula;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 45;
    para.valor = this.abdomemodelo.morfologiavesicula;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 46;
    para.valor = this.abdomemodelo.superficievesicula;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 47;
    para.valor = this.abdomemodelo.texturavesicula;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 48;
    para.valor = this.abdomemodelo.limitevesicula;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 49;
    para.valor = this.abdomemodelo.contornovesicula;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 50;
    para.valor = this.abdomemodelo.descricaotextovesicula;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 51;
    para.valor = this.abdomemodelo.observacaotexto;
    this.laudosalvo.push(para);

    para = new ParametroDoLaudo();
    para.index = 52;
    para.valor = this.abdomemodelo.impressaotexto;
    this.laudosalvo.push(para);

    const laudo = new Laudo();
    laudo.codigo = 1;

    this.laudosalvo.forEach(elo => {
      elo.laudo = laudo;
    });
  }
}
