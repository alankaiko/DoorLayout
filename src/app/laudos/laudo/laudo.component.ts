import { SelectItem } from 'primeng/api';
import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { Atendimento, ProcedimentoAtendimento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { stringify } from 'querystring';


declare var Quill: any;

@Component({
  selector: 'app-laudo',
  templateUrl: './laudo.component.html',
  styleUrls: ['./laudo.component.css']
})
export class LaudoComponent implements OnInit {
  atendimento = new Atendimento();
  procedimento = new ProcedimentoAtendimento();
  atendimentos: any[];
  procedimentosAtd: any[];
  atendimentoSelecionado: number;
  procedimentosAtdSelecionado: number;
  listaimagemsbase = [];
  teste: boolean = false;
  qtdimagems: SelectItem[];
  qtdimagemselecionada: number = 1;

  ngOnInit() {
    this.CarregarAtendimentos();
    this.OpcoesQtdImagens();
  }

  constructor(private service: AtendimentoService, private serviceproc: ProcedimentoatendimentoService) {}

  OpcoesQtdImagens() {
    this.qtdimagems = [
      {label: '1 Imagem Grande', value: 1},
      {label: '1 Imagem Média', value: 2},
      {label: '2 Imagem Grandes', value: 3},
      {label: '2 Imagem Médias', value: 4},
      {label: '3 Imagem Grandes', value: 5},
      {label: '3 Imagem Médias', value: 6},
      {label: '4 Imagem Grandes', value: 7},
      {label: '4 Imagem Médias', value: 8},
      {label: '6 Imagem Grandes', value: 9},
      {label: '6 Imagem Médias', value: 10},
      {label: '8 Imagem Médias', value: 11},
      {label: '8 Imagem Pequenas', value: 12},
      {label: '9 Imagem Pequenas', value: 13},
      {label: '12 Imagem Pequenas', value: 14},
      {label: '15 Imagem Pequenas', value: 15},
    ];
  }



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

    // if (this.teste && this.listaimagemsbase.length !== 0) {
    //   transferArrayItem(event.container.data, event.previousContainer.data, event.previousIndex, event.currentIndex);
    //   this.listaimagemsbase.splice(1);
    // }

    this.teste = true;
  }

  Testando() {
    const valor = document.getElementById('papela4');
    const win = window.open();
    win.document.write(valor.outerHTML);
    win.document.close();
    win.print();
  }

  ConfigurarDimensoes() {
    if (this.qtdimagemselecionada === 1) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto1grande');
    }

    if (this.qtdimagemselecionada === 2) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto1media');
    }

    if (this.qtdimagemselecionada === 3) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto2grande');
    }

    if (this.qtdimagemselecionada === 4) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto2pequeno');
    }

    if (this.qtdimagemselecionada === 5) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto1pequeno');
    }

    if (this.qtdimagemselecionada === 6) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto1pequeno');
    }

    if (this.qtdimagemselecionada === 7) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto1pequeno');
    }

    if (this.qtdimagemselecionada === 8) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto1pequeno');
    }

    if (this.qtdimagemselecionada === 9) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto1pequeno');
    }

    if (this.qtdimagemselecionada === 10) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto1pequeno');
    }

    if (this.qtdimagemselecionada === 11) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto1pequeno');
    }

    if (this.qtdimagemselecionada === 12) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto1pequeno');
    }

    if (this.qtdimagemselecionada === 13) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto1pequeno');
    }

    if (this.qtdimagemselecionada === 14) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto1pequeno');
    }

    if (this.qtdimagemselecionada === 15) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto1pequeno');
    }

    if (this.qtdimagemselecionada === 2) {
      const div = document.getElementById('listafoto');
      div.setAttribute('class', 'foto1pequeno');
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
  }
}
