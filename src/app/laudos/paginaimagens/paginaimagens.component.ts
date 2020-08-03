import { PaginaimagensService } from './../../zservice/paginaimagens.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { Atendimento, ProcedimentoAtendimento, Imagem, PaginaImagens } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-paginaimagens',
  templateUrl: './paginaimagens.component.html',
  styleUrls: ['./paginaimagens.component.css']
})
export class PaginaimagensComponent implements OnInit {
  atendimento = new Atendimento();
  procedimento = new ProcedimentoAtendimento();
  atendimentos: any[];
  procedimentosAtd: any[];
  atendimentoSelecionado: number;
  procedimentosAtdSelecionado: number;
  listaimagemsbase = new Array<Imagem>();
  qtdimagems: SelectItem[];
  qtdimagemselecionada: number = 1;
  paginasdeimagens = new Array<PaginaImagens>();

  constructor(private service: AtendimentoService,
    private serviceproc: ProcedimentoatendimentoService,
    private servicepagina: PaginaimagensService,
    private rota: ActivatedRoute,
    private route: Router,
    private location: Location) {}

  ngOnInit() {
    this.CarregarAtendimentos();
    this.OpcoesQtdImagens();
    this.ConfigurarDimensoes();
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

  get editando() {
    return Boolean(this.procedimento.codigo);
  }

  PermiteArrastar(ev) {
    ev.preventDefault();
  }

  Arrastar(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  Dropar(ev, valor: string) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');

    for (let i = 0; i < this.procedimento.listaimagem.length; i++) {
      if (this.procedimento.listaimagem[i].nomeimagem === data) {
        if (this.listaimagemsbase[valor] === undefined) {
          this.listaimagemsbase[valor] = this.procedimento.listaimagem[i];
          this.procedimento.listaimagem.splice(i, 1);
        } else {
          this.procedimento.listaimagem.push(this.listaimagemsbase[valor]);
          this.listaimagemsbase[valor] = this.procedimento.listaimagem[i];
          this.procedimento.listaimagem.splice(i, 1);
        }
      }
    }
  }

  DropRetorno(ev) {
    let confere = true as boolean;
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    this.procedimento.listaimagem.forEach(elo => {
      if (elo.nomeimagem === data) {
        confere = false;
      }
    });

    if (confere) {
      this.procedimento.listaimagem.push(this.listaimagemsbase[data]);
      this.listaimagemsbase[data] = undefined;
    }
  }

  CarregarAtendimentos() {
    this.service.ListarAtendimentos().then(lista => {
      this.atendimentos = lista.map(atendimento => ({label: atendimento.codigo + ' ' + atendimento.patient.patientname, value: atendimento.codigo}));
    }).catch(erro => erro);
  }

  CarregarProcedimentos() {
    this.service.BuscarPorId(this.atendimentoSelecionado)
      .then(
        response => {
          this.atendimento = response;
          this.procedimentosAtd = this.atendimento.procedimentos.map(procedimento => ({label: procedimento.procedimentomedico.nome, value: procedimento.codigo}));
        }
      );
  }

  ConfigurarVariavel() {
    this.atendimento.procedimentos.filter((elo) => {
      if (elo.codigo === this.procedimentosAtdSelecionado) {
        this.procedimento = elo;
        this.procedimento.listaimagem.forEach((el) => {
          this.serviceproc.PegarImagemString(el.codigo).subscribe(data => {
            el.imagem = data;
          }, error => {
            console.log(error);
          });
        });
      }
    });

    this.ConfigurarDimensoes();
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

      this.listaimagemsbase.length = 1;
    }

    if (this.qtdimagemselecionada === 2) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin:  0 auto; position: relative; text-align: center; margin-top: 61mm;');
      gradeimg.children[0].setAttribute('style', 'display:block; padding: 2mm;');

      const lab = document.getElementById('lab1');
      lab.setAttribute('style', 'display: block');
      lab.setAttribute('class', 'foto1media');

      this.listaimagemsbase.length = 1;
    }

    if (this.qtdimagemselecionada === 3) {
      const gradeimg = document.getElementById('gradeimg');
      gradeimg.setAttribute('style', 'margin:  0 auto; position: relative; text-align: center; margin-top: 20mm;');

      for (let i = 1; i <= 2; i++) {
        const lab = document.getElementById('lab' + i);
        lab.setAttribute('style', 'display: block');
        lab.setAttribute('class', 'foto2grande');
        gradeimg.children[i - 1].setAttribute('style', 'display:block; padding: 2mm;');

        this.listaimagemsbase.length = 2;
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

        this.listaimagemsbase.length = 2;
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

        this.listaimagemsbase.length = 3;
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

        this.listaimagemsbase.length = 4;
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

        this.listaimagemsbase.length = 4;
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

        this.listaimagemsbase.length = 4;
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

        this.listaimagemsbase.length = 6;
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

        this.listaimagemsbase.length = 6;
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

        this.listaimagemsbase.length = 8;
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

        this.listaimagemsbase.length = 8;
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

        this.listaimagemsbase.length = 9;
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

        this.listaimagemsbase.length = 12;
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

        this.listaimagemsbase.length = 15;
      }
    }
  }

  SalvandoHtml() {
    const pagina = new PaginaImagens();
    const valor = document.getElementById('papela4').outerHTML;
    pagina.dados = valor;
    pagina.descricao = 'teste';
    pagina.modelosalvo = this.procedimento.modelosalvo;
    this.paginasdeimagens.push(pagina);


    const win = window.open();
    win.document.write(valor);

    win.document.close();
    setTimeout(() => {
      win.print();
    }, 5);

  }

  Voltar() {
    this.location.back();
  }
}
