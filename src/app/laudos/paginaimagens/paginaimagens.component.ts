import { SelectItem } from 'primeng/api';
import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { Imagem, PaginaDeImagens, LAYOUT_IMG, ImagemImpressa } from './../../core/model';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-paginaimagens',
  templateUrl: './paginaimagens.component.html',
  styleUrls: ['./paginaimagens.component.css']
})
export class PaginaimagensComponent implements OnInit {
  @Input() paginadeimagens: Array<PaginaDeImagens>;
  @Input('listaimagem') listaimagem: Array<Imagem>;
  pagina: PaginaDeImagens;
  listaimagemsbase = new Array<Imagem>();
  qtdimagems: SelectItem[];
  qtdimagemselecionada: number = 1;
  paginaselecionada: number = 0;

  constructor(private serviceproc: ProcedimentoatendimentoService,
              private location: Location) {}

  ngOnInit() {
    this.OpcoesQtdImagens();
    this.ConfigurarVariavel();

    if (this.paginadeimagens.length === 0) {
      this.AdicionarPagina();
    }

    this.VerificaQualLayout(0);
  }


  OpcoesQtdImagens() {
    this.qtdimagems = [
      {label: '1 Imagem Grande', value: 1},
      {label: '1 Imagem Média', value: 2},
      {label: '2 Imagem Grandes', value: 3},
      {label: '2 Imagem Médias', value: 4},
      {label: '3 Imagem Médias', value: 5},
      {label: '4 Imagem Grandes', value: 6},
      {label: '4 Imagem Médias', value: 7},
      {label: '4 Imagem Pequenas', value: 8},
      {label: '6 Imagem Grandes', value: 9},
      {label: '6 Imagem Médias', value: 10},
      {label: '8 Imagem Grandes', value: 11},
      {label: '8 Imagem Pequenas', value: 12},
      {label: '9 Imagem Pequenas', value: 13},
      {label: '12 Imagem Pequenas', value: 14},
      {label: '15 Imagem Pequenas', value: 15}
    ];
  }

  AdicionarPagina() {
    this.pagina = new PaginaDeImagens();
    this.pagina.layout = this.EscolhendoLayout();
    this.pagina.procedimentoatendimento = this.listaimagem[0].procedimentoatendimento;
    this.paginadeimagens.push(this.pagina);
  }

  RemoverPagina() {
    this.paginadeimagens.splice(this.paginaselecionada, 1);
  }

  EscolherPagina(index) {
    this.paginaselecionada = index;
    this.VerificaQualLayout(index);
  }


  PermiteArrastar(ev) {
    ev.preventDefault();
  }

  Arrastar(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  Dropar(ev, valor: number) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');

    for (let i = 0; i < this.listaimagem.length; i++) {
      if (this.listaimagem[i].nomeimagem === data) {
        if (this.listaimagemsbase[valor] === undefined) {
          this.listaimagemsbase[valor] = this.listaimagem[i];
          this.listaimagem.splice(i, 1);

          const imagemimpressa = new ImagemImpressa;
          imagemimpressa.indice = valor;
          imagemimpressa.imagem = this.listaimagemsbase[valor];
          this.pagina.layout = this.EscolhendoLayout();
          this.pagina.imagemimpressa.push(imagemimpressa);
        } else {
          this.listaimagem.push(this.listaimagemsbase[valor]);
          this.listaimagemsbase[valor] = this.listaimagem[i];
          this.listaimagem.splice(i, 1);

          const imagemimpressa = new ImagemImpressa;
          imagemimpressa.indice = valor;
          this.pagina.layout = this.EscolhendoLayout();
          imagemimpressa.imagem = this.listaimagemsbase[valor];
          this.pagina.imagemimpressa.push(imagemimpressa);
        }
      }
    }
  }

  DropRetorno(ev) {
    let confere = true as boolean;
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    this.listaimagem.forEach(elo => {
      if (elo.nomeimagem === data) {
        confere = false;
      }
    });

    if (confere) {
      this.listaimagem.push(this.listaimagemsbase[data]);
      this.listaimagemsbase[data] = undefined;
    }
  }

  ConfigurarVariavel() {
    const lista = new Array<number>();
    this.paginadeimagens.forEach(elo => {
      elo.imagemimpressa.forEach(alo => {
        lista.push(alo.imagem.codigo);
      });
    });

    lista.forEach(elo => {
      this.listaimagem.forEach(aff => {
        if (elo === aff.codigo) {
          this.listaimagem.splice(this.listaimagem.indexOf(aff), 1);
        }
      });
    });

    this.listaimagem.filter((el) => {
      this.serviceproc.PegarImagemString(el.codigo).subscribe(data => {
        el.imagem = data;
      }, error => {
        console.log(error);
      });
    });

    this.ConfigurarDimensoes();
  }

  VerificaQualLayout(posicao) {
    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_1_GRANDE) {
      this.qtdimagemselecionada = 1;
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_1_MEDIA) {
      this.qtdimagemselecionada = 2;
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_2_GRANDE) {
      this.qtdimagemselecionada = 3;
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_2_MEDIA) {
      this.qtdimagemselecionada = 4;
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_3_MEDIA) {
      this.qtdimagemselecionada = 5;
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_4_GRANDE) {
      this.qtdimagemselecionada = 6;
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_4_MEDIA) {
      this.qtdimagemselecionada = 7;
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_4_PEQUENA) {
      this.qtdimagemselecionada = 8;
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_6_GRANDE) {
      this.qtdimagemselecionada = 9;
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_6_MEDIA) {
      this.qtdimagemselecionada = 10;
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_8_GRANDE) {
      this.qtdimagemselecionada = 11;
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_8_PEQUENA) {
      this.qtdimagemselecionada = 12;
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_9_PEQUENA) {
      this.qtdimagemselecionada = 13;
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_12_PEQUENA) {
      this.qtdimagemselecionada = 14;
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_15_PEQUENA) {
      this.qtdimagemselecionada = 15;
    }

    this.ConfigurarDimensoes();
    this.RoteandoImagens(posicao);
  }

  EscolhendoLayout() {
    if (this.qtdimagemselecionada === 1) {
      return LAYOUT_IMG.LAYOUT_1_GRANDE;
    }

    if (this.qtdimagemselecionada === 2) {
      return LAYOUT_IMG.LAYOUT_1_MEDIA;
    }

    if (this.qtdimagemselecionada === 3) {
      return LAYOUT_IMG.LAYOUT_2_GRANDE;
    }

    if (this.qtdimagemselecionada === 4) {
      return LAYOUT_IMG.LAYOUT_2_MEDIA;
    }

    if (this.qtdimagemselecionada === 5) {
      return LAYOUT_IMG.LAYOUT_3_MEDIA;
    }

    if (this.qtdimagemselecionada === 6) {
      return LAYOUT_IMG.LAYOUT_4_GRANDE;
    }

    if (this.qtdimagemselecionada === 7) {
      return LAYOUT_IMG.LAYOUT_4_MEDIA;
    }

    if (this.qtdimagemselecionada === 8) {
      return LAYOUT_IMG.LAYOUT_4_PEQUENA;
    }

    if (this.qtdimagemselecionada === 9) {
      return LAYOUT_IMG.LAYOUT_6_GRANDE;
    }

    if (this.qtdimagemselecionada === 10) {
      return LAYOUT_IMG.LAYOUT_6_MEDIA;
    }

    if (this.qtdimagemselecionada === 11) {
      return LAYOUT_IMG.LAYOUT_8_GRANDE;
    }

    if (this.qtdimagemselecionada === 12) {
      return LAYOUT_IMG.LAYOUT_8_PEQUENA;
    }

    if (this.qtdimagemselecionada === 13) {
      return LAYOUT_IMG.LAYOUT_9_PEQUENA;
    }

    if (this.qtdimagemselecionada === 14) {
      return LAYOUT_IMG.LAYOUT_12_PEQUENA;
    }

    if (this.qtdimagemselecionada === 15) {
      return LAYOUT_IMG.LAYOUT_15_PEQUENA;
    }
  }

  RoteandoImagens(numero: number) {
    this.listaimagemsbase = new Array<Imagem>();

    this.paginadeimagens[numero].imagemimpressa.forEach(alo => {
      this.serviceproc.PegarImagemString(alo.imagem.codigo).subscribe(data => {
        alo.imagem.imagem = data;
        this.listaimagemsbase.push(alo.imagem);
      }, error => {
        console.log(error);
      });

    });

  }

  private RetornaImagens(nome: string) {
    let valor;

    this.listaimagem.filter(elo => {
      if (elo.nomeimagem === nome) {
        valor =  elo;
        this.listaimagem.splice(this.listaimagem.indexOf(elo), 1);
      }
    });

    return valor;
  }

  SalvarPaginaDeImpressoes() {
    // this.procedimento.modelosalvo.paginas = this.paginasdeimagens;

    // this.servicemodelo.Atualizar(this.procedimento.modelosalvo).then(response => {
    //  console.log('deu certo agora');
    // });
  }

  ConfigurarDimensoes() {
    for (let i = 1; i <= 15; i++) {
      const lab = document.getElementById('lab' + i);
      lab.setAttribute('style', 'display: none');

      const gradeimg = document.getElementById('gradeimg');
      gradeimg.children[i - 1].setAttribute('style', 'display: none');
    }

    if (this.qtdimagemselecionada === 1) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin:  0 auto; position: relative; text-align: center; margin-top: 61mm;');
      gradeimg.children[0].setAttribute('style', 'display:block; padding: 2mm;');

      const lab = document.getElementById('lab1');
      lab.setAttribute('style', 'display: block');
      lab.setAttribute('class', 'foto1grande');
    }

    if (this.qtdimagemselecionada === 2) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin:  0 auto; position: relative; text-align: center; margin-top: 61mm;');
      gradeimg.children[0].setAttribute('style', 'display:block; padding: 2mm;');

      const lab = document.getElementById('lab1');
      lab.setAttribute('style', 'display: block');
      lab.setAttribute('class', 'foto1media');
    }

    if (this.qtdimagemselecionada === 3) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin:  0 auto; position: relative; text-align: center; margin-top: 20mm;');

      for (let i = 1; i <= 2; i++) {
        const lab = document.getElementById('lab' + i);
        lab.setAttribute('style', 'display: block');
        lab.setAttribute('class', 'foto2grande');
        gradeimg.children[i - 1].setAttribute('style', 'display:block; padding: 2mm;');
      }
    }

    if (this.qtdimagemselecionada === 4) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin:  0 auto; position: relative; text-align: center; margin-top: 61mm;');

      for (let i = 1; i <= 2; i++) {
        const lab = document.getElementById('lab' + i);
        lab.setAttribute('style', 'display: block');
        lab.setAttribute('class', 'foto2media');
        gradeimg.children[i - 1].setAttribute('style', 'display:block; padding: 2mm;');
      }
    }

    if (this.qtdimagemselecionada === 5) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin:  0 auto; position: relative; text-align: center; margin-top: 61mm;');

      for (let i = 1; i <= 3; i++) {
        const lab = document.getElementById('lab' + i);
        lab.setAttribute('style', 'display: block');
        lab.setAttribute('class', 'foto3media');
        gradeimg.children[i - 1].setAttribute('style', 'display:block; padding: 2mm;');
      }
    }

    if (this.qtdimagemselecionada === 6) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin: 0 auto; position: relative; text-align: center; margin-top: 61mm; width: 190mm; height: auto; display: block;');

      for (let i = 1; i <= 4; i++) {
        const lab = document.getElementById('lab' + i);
        lab.setAttribute('style', 'display: block');
        lab.setAttribute('class', 'foto4grande');
        gradeimg.children[i - 1].setAttribute('style', 'display:block; padding: 2mm; float: left;');
      }
    }

    if (this.qtdimagemselecionada === 7) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin: 0 auto; position: relative; text-align: center; margin-top: 20mm; width: 170mm; height: auto; display: block;');

      for (let i = 1; i <= 4; i++) {
        const lab = document.getElementById('lab' + i);
        lab.setAttribute('style', 'display: block');
        lab.setAttribute('class', 'foto4media');
        gradeimg.children[i - 1].setAttribute('style', 'display:block; padding: 2mm; float: left;');
      }
    }

    if (this.qtdimagemselecionada === 8) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin: 0 auto; position: relative; text-align: center; margin-top: 61mm; width: 140mm; height: auto; display: block;');

      for (let i = 1; i <= 4; i++) {
        const lab = document.getElementById('lab' + i);
        lab.setAttribute('style', 'display: block');
        lab.setAttribute('class', 'foto4pequena');
        gradeimg.children[i - 1].setAttribute('style', 'display:block; padding: 2mm; float: left;');
      }
    }

    if (this.qtdimagemselecionada === 9) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin: 0 auto; position: relative; text-align: center; margin-top: 30mm; width: 190mm; height: auto; display: block;');

      for (let i = 1; i <= 6; i++) {
        const lab = document.getElementById('lab' + i);
        lab.setAttribute('style', 'display: block');
        lab.setAttribute('class', 'foto6grande');
        gradeimg.children[i - 1].setAttribute('style', 'display:block; padding: 2mm; float: left;');
      }
    }

    if (this.qtdimagemselecionada === 10) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin: 0 auto; position: relative; text-align: center; margin-top: 30mm; width: 170mm; height: auto; display: block;');

      for (let i = 1; i <= 6; i++) {
        const lab = document.getElementById('lab' + i);
        lab.setAttribute('style', 'display: block');
        lab.setAttribute('class', 'foto6media grade1');
        gradeimg.children[i - 1].setAttribute('style', 'display:block; padding: 2mm; float: left;');
      }
    }

    if (this.qtdimagemselecionada === 11) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin: 0 auto; position: relative; text-align: center; margin-top: 20mm; width: 190mm; height: auto; display: block;');

      for (let i = 1; i <= 8; i++) {
        const lab = document.getElementById('lab' + i);
        lab.setAttribute('style', 'display: block');
        lab.setAttribute('class', 'foto8grande');
        gradeimg.children[i - 1].setAttribute('style', 'display:block; padding: 2mm; float: left;');
      }
    }

    if (this.qtdimagemselecionada === 12) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin: 0 auto; position: relative; text-align: center; margin-top: 30mm; width: 140mm; height: auto; display: block;');

      for (let i = 1; i <= 8; i++) {
        const lab = document.getElementById('lab' + i);
        lab.setAttribute('style', 'display: block');
        lab.setAttribute('class', 'foto8pequena');
        gradeimg.children[i - 1].setAttribute('style', 'display:block; padding: 2mm; float: left;');
      }
    }

    if (this.qtdimagemselecionada === 13) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin: 0 auto; position: relative; text-align: center; margin-top: 61mm; width: 180mm; height: auto; display: block;');

      for (let i = 1; i <= 9; i++) {
        const lab = document.getElementById('lab' + i);
        lab.setAttribute('style', 'display: block');
        lab.setAttribute('class', 'foto9pequena');
        gradeimg.children[i - 1].setAttribute('style', 'display:block; padding: 2mm; float: left;');
      }
    }

    if (this.qtdimagemselecionada === 14) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin: 0 auto; position: relative; text-align: center; margin-top: 61mm; width: 180mm; height: auto; display: block;');

      for (let i = 1; i <= 12; i++) {
        const lab = document.getElementById('lab' + i);
        lab.setAttribute('style', 'display: block');
        lab.setAttribute('class', 'foto12pequena');
        gradeimg.children[i - 1].setAttribute('style', 'display:block; padding: 2mm; float: left;');
      }
    }

    if (this.qtdimagemselecionada === 15) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin: 0 auto; position: relative; text-align: center; margin-top: 20mm; width: 180mm; height: auto; display: block;');

      for (let i = 1; i <= 15; i++) {
        const lab = document.getElementById('lab' + i);
        lab.setAttribute('style', 'display: block');
        lab.setAttribute('class', 'foto15pequena');
        gradeimg.children[i - 1].setAttribute('style', 'display:block; padding: 2mm; float: left;');
      }
    }
  }

  SalvarPagina(posicao: number) {
    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_1_GRANDE) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 61mm;">'
                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto1grande">'
                    + '<img style="width: 140mm; height: 105mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_1_MEDIA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin:  0 auto; position: relative; text-align: center; margin-top: 61mm;">'
                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto1media">'
                    + '<img style="width:100mm; height: 73mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_2_GRANDE) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin:  0 auto; position: relative; text-align: center; margin-top: 10mm;">'
                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto2grande">'
                    + '<img style="width: 140mm; height: 105mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto2grande">'
                    + '<img style="width: 140mm; height: 105mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_2_MEDIA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin:  0 auto; position: relative; text-align: center; margin-top: 45mm;">'
                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto2media">'
                    + '<img style="width: 100mm; height: 73mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab2" style="display: block" class="foto2media">'
                    + '<img style="width: 100mm; height: 73mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_3_MEDIA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin:  0 auto; position: relative; text-align: center; margin-top: 15mm;">'
                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto3media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab2" style="display: block" class="foto3media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab3" style="display: block" class="foto3media">'
                    +  '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_4_GRANDE) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 50mm; width: 190mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto4grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto4grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto4grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto4grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_4_MEDIA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 55mm; width: 170mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto4media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto4media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto4media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto4media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_4_PEQUENA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 61mm; width: 140mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto4pequena">'
                    + '<img style="width: 65mm; height: 50mm" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto4pequena">'
                    + '<img style="width: 65mm; height: 50mm" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto4pequena">'
                    + '<img style="width: 65mm; height: 50mm" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto4pequena">'
                    + '<img style="width: 65mm; height: 50mm" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_6_GRANDE) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 10mm; width: 190mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[4].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[5].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_6_MEDIA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 15mm; width: 170mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[4].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[5].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_8_GRANDE) {
      return  '<div>'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; width: 180mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[4].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[5].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[6].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 55mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[7].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_8_PEQUENA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 10mm; width: 140mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[4].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[5].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[6].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[7].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_9_PEQUENA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 61mm; width: 180mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[4].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[5].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[6].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[7].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab9" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[8].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_12_PEQUENA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 30mm; width: 180mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[4].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[5].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[6].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[7].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab9" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[8].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab10" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[9].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab11" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[10].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab12" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[11].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.paginadeimagens[posicao].layout === LAYOUT_IMG.LAYOUT_15_PEQUENA) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 5mm; width: 180mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[0].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[1].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[2].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[3].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[4].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[5].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[6].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[7].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab9" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[8].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab10" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[9].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab11" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[10].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab12" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[11].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab13" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[12].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab14" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[13].imagem.imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab15" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" src="' + this.paginadeimagens[posicao].imagemimpressa[14].imagem.imagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }
  }

  PegarImagemPraImpressao() {
    this.paginadeimagens.forEach(elo => {
      elo.imagemimpressa.forEach(alo => {
        this.serviceproc.PegarImagemString(alo.imagem.codigo).subscribe(data => {
          alo.imagem.imagem =  data;
        }, error => {
          console.log(error);
        });
      });
    });
  }

  Voltar() {
    this.location.back();
  }
}
