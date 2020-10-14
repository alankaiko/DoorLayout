import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { Atendimento, ProcedimentoAtendimento, Imagem, PaginaDeImagens } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { DropdownItem } from 'primeng/dropdown';

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
  listaimagemsbase = new Array<Imagem>();
  qtdimagems: SelectItem[];
  qtdimagemselecionada: number = 1;
  paginasdeimagens = new Array<PaginaDeImagens>();
  paginaselecionada: number = 1;

  constructor(private service: AtendimentoService,
    private serviceproc: ProcedimentoatendimentoService,
    private rota: ActivatedRoute,
    private location: Location) {}

  ngOnInit() {
    const codatendimento = this.rota.snapshot.params.cod;

    if (codatendimento) {
      this.CarregarProcedimentoPelaEdicao(codatendimento);
    }

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

  Dropar(ev, valor: number) {
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
    this.service.BuscarPorId(this.atendimento.codigo)
      .then(
        response => {
          this.atendimento = response;
          this.procedimentosAtd = this.atendimento.procedimentos.map(procedimento => ({label: procedimento.procedimentomedico.nome, value: procedimento.codigo}));
        }
      );
  }

  CarregarProcedimentoPelaEdicao(codigo: number) {
    this.serviceproc.BuscarPorId(codigo).then(procedimento => {
      this.atendimento = procedimento.atendimento;

      this.procedimento = procedimento;
      this.CarregarProcedimentos();
      this.ConfigurarVariavel();
    });
  }

  ConfigurarVariavel() {
    this.atendimento.procedimentos.filter((elo) => {
      if (elo.codigo === this.procedimento.codigo) {
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

  SalvandoHtml() {
    const pagina = new PaginaDeImagens();
    // pagina.dados = this.SalvarPagina();
    // pagina.descricao = 'teste';
    // pagina.modelosalvo.codigo = this.procedimento.modelosalvo.codigo;
    this.paginasdeimagens.push(pagina);
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

  SalvarPagina() {
    if (this.qtdimagemselecionada === 1) {
      return  '<div class="papela4" id="papela4">'
              + '<div  id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 61mm;">'
                + '<div  style="display:block; padding: 2mm;">'
                  + '<div  id="lab1" style="display: block" class="foto1grande">'
                    + '<img style="width: 140mm; height: 105mm;" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.qtdimagemselecionada === 2) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin:  0 auto; position: relative; text-align: center; margin-top: 61mm;">'
                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto1media">'
                    + '<img style="width:100mm; height: 73mm;" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.qtdimagemselecionada === 3) {
      return  '<div class="papela4" id="papela4">'
              + '<div  id="gradeimg" style="margin:  0 auto; position: relative; text-align: center; margin-top: 20mm;">'
                + '<div  style="display:block; padding: 2mm;">'
                  + '<div  id="lab1" style="display: block" class="foto2grande">'
                    + '<img style="width: 140mm; height: 105mm;" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div  style="display:block; padding: 2mm;">'
                  + '<div  id="lab1" style="display: block" class="foto2grande">'
                    + '<img style="width: 140mm; height: 105mm;" class="imagem" id="' + this.listaimagemsbase[1].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.qtdimagemselecionada === 4) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin:  0 auto; position: relative; text-align: center; margin-top: 61mm;">'
                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto2media">'
                    + '<img style="width: 100mm; height: 73mm;" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab2" style="display: block" class="foto2media">'
                    + '<img style="width: 100mm; height: 73mm;" class="imagem" id="' + this.listaimagemsbase[1].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.qtdimagemselecionada === 5) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin:  0 auto; position: relative; text-align: center; margin-top: 30mm;">'
                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab1" style="display: block" class="foto3media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab2" style="display: block" class="foto3media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" id="' + this.listaimagemsbase[1].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm;">'
                  + '<div id="lab3" style="display: block" class="foto3media">'
                    +  '<img style="width: 80mm; height: 66mm;" class="imagem" id="' + this.listaimagemsbase[2].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.qtdimagemselecionada === 6) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 61mm; width: 190mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto4grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto4grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" id="' + this.listaimagemsbase[1].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto4grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" id="' + this.listaimagemsbase[2].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto4grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" id="' + this.listaimagemsbase[3].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.qtdimagemselecionada === 7) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 61mm; width: 170mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto4media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto4media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" id="' + this.listaimagemsbase[1].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto4media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" id="' + this.listaimagemsbase[2].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto4media">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" id="' + this.listaimagemsbase[3].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.qtdimagemselecionada === 8) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 61mm; width: 140mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto4pequena">'
                    + '<img style="width: 65mm; height: 50mm" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto4pequena">'
                    + '<img style="width: 65mm; height: 50mm" class="imagem" id="' + this.listaimagemsbase[1].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto4pequena">'
                    + '<img style="width: 65mm; height: 50mm" class="imagem" id="' + this.listaimagemsbase[2].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto4pequena">'
                    + '<img style="width: 65mm; height: 50mm" class="imagem" id="' + this.listaimagemsbase[3].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.qtdimagemselecionada === 9) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 30mm; width: 190mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" id="' + this.listaimagemsbase[1].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" id="' + this.listaimagemsbase[2].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" id="' + this.listaimagemsbase[3].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" id="' + this.listaimagemsbase[4].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto6grande">'
                    + '<img style="width: 90mm; height: 68mm;" class="imagem" id="' + this.listaimagemsbase[5].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.qtdimagemselecionada === 10) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 30mm; width: 170mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" id="' + this.listaimagemsbase[1].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" id="' + this.listaimagemsbase[2].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" id="' + this.listaimagemsbase[3].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" id="' + this.listaimagemsbase[4].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto6media grade1">'
                    + '<img style="width: 80mm; height: 66mm;" class="imagem" id="' + this.listaimagemsbase[5].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.qtdimagemselecionada === 11) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; width: 180mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 58mm;" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 58mm;" class="imagem" id="' + this.listaimagemsbase[1].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 58mm;" class="imagem" id="' + this.listaimagemsbase[2].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 58mm;" class="imagem" id="' + this.listaimagemsbase[3].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 58mm;" class="imagem" id="' + this.listaimagemsbase[4].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 58mm;" class="imagem" id="' + this.listaimagemsbase[5].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 58mm;" class="imagem" id="' + this.listaimagemsbase[6].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto8grande">'
                    + '<img style="width: 80mm; height: 58mm;" class="imagem" id="' + this.listaimagemsbase[7].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.qtdimagemselecionada === 12) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 30mm; width: 140mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" id="' + this.listaimagemsbase[1].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" id="' + this.listaimagemsbase[2].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" id="' + this.listaimagemsbase[3].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" id="' + this.listaimagemsbase[4].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" id="' + this.listaimagemsbase[5].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" id="' + this.listaimagemsbase[6].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto8pequena">'
                    + '<img style="width: 65mm; height: 50mm;" class="imagem" id="' + this.listaimagemsbase[7].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.qtdimagemselecionada === 13) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 61mm; width: 180mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[1].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[2].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[3].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[4].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[5].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[6].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[7].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab9" style="display: block" class="foto9pequena">'
                    + '<img style="width:55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[8].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.qtdimagemselecionada === 14) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 61mm; width: 180mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[1].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[2].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[3].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[4].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[5].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[6].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[7].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab9" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[8].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab10" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[9].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab11" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[10].nomeimagem + '" src="' + this.listaimagemsbase[10].imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab12" style="display: block" class="foto12pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[11].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }

    if (this.qtdimagemselecionada === 15) {
      return  '<div class="papela4" id="papela4">'
              + '<div id="gradeimg" style="margin: 0 auto; position: relative; text-align: center; margin-top: 20mm; width: 180mm; height: auto; display: block;">'
                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab1" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[0].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab2" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[1].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab3" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[2].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab4" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[3].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab5" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[4].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab6" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[5].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab7" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[6].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab8" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[7].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab9" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[8].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab10" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[9].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab11" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[10].nomeimagem + '" src="' + this.listaimagemsbase[10].imagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab12" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[11].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab13" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[12].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab14" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[13].nomeimagem + '">'
                  + '</div>'
                + '</div>'

                + '<div style="display:block; padding: 2mm; float: left;">'
                  + '<div id="lab15" style="display: block" class="foto15pequena">'
                    + '<img style="width: 55mm; height: 40mm;" class="imagem" id="' + this.listaimagemsbase[14].nomeimagem + '">'
                  + '</div>'
                + '</div>'
              + '</div>'
            + '</div>';
    }
  }

  Voltar() {
    this.location.back();
  }
}
