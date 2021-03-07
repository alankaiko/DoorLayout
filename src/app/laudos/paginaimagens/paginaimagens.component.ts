import { ImagemService } from './../../zservice/imagem.service';
import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { SelectItem } from 'primeng/api';
import { Imagem, PaginaDeImagens, LAYOUT_IMG, ImagemImpressa, Estudo } from './../../core/model';
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
  pagina = new PaginaDeImagens();
  listaimagemsbase = new Array<Imagem>();
  qtdimagems: SelectItem[];
  qtdimagemselecionada = 1;
  paginaselecionada = 0;

  constructor(private location: Location, private serviceproc: ProcedimentoatendimentoService) {}

  ngOnInit() {
    this.OpcoesQtdImagens();
    this.ConfigurarVariavel();

    if (this.paginadeimagens.length === 0) {
      this.AdicionarPagina();
    }

    this.VerificaQualLayout(0);
    this.PegaAltura();
  }

  PegaAltura() {
    const painel = document.getElementById('painelgerallaudo').clientHeight;
    const editor = document.getElementById('geral');
    editor.setAttribute('style' , 'height: ' + painel + 'px;');
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

          const imagemimpressa = new ImagemImpressa();
          imagemimpressa.indice = valor;
          imagemimpressa.imagem = this.listaimagemsbase[valor];
          this.pagina.layout = this.EscolhendoLayout();
          this.pagina.imagemimpressa.push(imagemimpressa);
        } else {
          this.listaimagem.push(this.listaimagemsbase[valor]);
          this.listaimagemsbase[valor] = this.listaimagem[i];
          this.listaimagem.splice(i, 1);

          this.pagina.layout = this.EscolhendoLayout();
          this.paginadeimagens[this.paginaselecionada].imagemimpressa[valor].imagem = this.listaimagemsbase[valor];
          this.pagina.imagemimpressa.push(this.paginadeimagens[this.paginaselecionada].imagemimpressa[i]);
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
      this.listaimagem.forEach(alo => {
        if (elo === alo.codigo) {
          this.listaimagem.splice(this.listaimagem.indexOf(alo), 1);
        }
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

  Voltar() {
    this.location.back();
  }
}
