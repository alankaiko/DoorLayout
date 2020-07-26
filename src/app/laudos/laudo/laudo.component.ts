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

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      if (this.listaimagemsbase.length === 3) {
        if (this.listaimagemsbase[2] === 1) {
          this.listaimagemsbase.splice(2);
        } else {
          transferArrayItem(event.container.data, event.previousContainer.data, event.previousIndex, event.currentIndex);
          this.listaimagemsbase.splice(2);
        }
      }

      if (this.listaimagemsbase.length === 1) {
        this.listaimagemsbase.push(1);
      }

    }

    // if (this.teste && this.listaimagemsbase.length !== 0) {
    //   transferArrayItem(event.container.data, event.previousContainer.data, event.previousIndex, event.currentIndex);
    //   this.listaimagemsbase.splice(1);
    // }
  }

  Testando() {
    const valor = document.getElementById('papela4');
    const win = window.open();
    win.document.write(valor.outerHTML);
    win.document.close();
    win.print();
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



  ConfigurarDimensoes() {
    if (this.qtdimagemselecionada === 1) {
      this.listaimagemsbase.length = 1;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto1grande');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade1');
      }, 5);
    }

    if (this.qtdimagemselecionada === 2) {
      this.listaimagemsbase.length = 1;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto1media');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade1');
      }, 5);
    }

    if (this.qtdimagemselecionada === 3) {
      this.listaimagemsbase.length = 2;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto2grande');
        div[1].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto2grande');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade1');
      }, 5);
    }

    if (this.qtdimagemselecionada === 4) {
      this.listaimagemsbase.length = 2;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto2media');
        div[1].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto2media');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade1');
      }, 5);
    }

    if (this.qtdimagemselecionada === 5) {
      this.listaimagemsbase.length = 3;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto3media');
        div[1].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto3media');
        div[2].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto3media');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade1');
      }, 5);
    }

    if (this.qtdimagemselecionada === 6) {
      this.listaimagemsbase.length = 4;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto4grande');
        div[1].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto4grande');
        div[2].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto4grande');
        div[3].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto4grande');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade1');
      }, 5);
    }

    if (this.qtdimagemselecionada === 7) {
      this.listaimagemsbase.length = 4;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto4media');
        div[1].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto4media');
        div[2].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto4media');
        div[3].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto4media');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade1');
      }, 5);
    }

    if (this.qtdimagemselecionada === 8) {
      this.listaimagemsbase.length = 4;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto4pequena');
        div[1].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto4pequena');
        div[2].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto4pequena');
        div[3].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto4pequena');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade1');
      }, 5);
    }

    if (this.qtdimagemselecionada === 9) {
      this.listaimagemsbase.length = 6;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto6grande');
        div[1].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto6grande');
        div[2].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto6grande');
        div[3].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto6grande');
        div[4].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto6grande');
        div[5].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto6grande');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade1');
      }, 5);
    }

    if (this.qtdimagemselecionada === 10) {
      this.listaimagemsbase.length = 6;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto6media');
        div[1].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto6media');
        div[2].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto6media');
        div[3].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto6media');
        div[4].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto6media');
        div[5].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto6media');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade1');
      }, 5);

    }

    if (this.qtdimagemselecionada === 11) {
      this.listaimagemsbase.length = 8;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8grande');
        div[1].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8grande');
        div[2].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8grande');
        div[3].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8grande');
        div[4].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8grande');
        div[5].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8grande');
        div[6].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8grande');
        div[7].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8grande');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade2');
      }, 5);
    }

    if (this.qtdimagemselecionada === 12) {
      this.listaimagemsbase.length = 8;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8pequena');
        div[1].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8pequena');
        div[2].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8pequena');
        div[3].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8pequena');
        div[4].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8pequena');
        div[5].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8pequena');
        div[6].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8pequena');
        div[7].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto8pequena');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade1');
      }, 5);
    }

    if (this.qtdimagemselecionada === 13) {
      this.listaimagemsbase.length = 9;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto9pequena');
        div[1].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto9pequena');
        div[2].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto9pequena');
        div[3].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto9pequena');
        div[4].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto9pequena');
        div[5].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto9pequena');
        div[6].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto9pequena');
        div[7].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto9pequena');
        div[7].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto9pequena');
        div[8].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto9pequena');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade1');
      }, 5);
    }

    if (this.qtdimagemselecionada === 14) {
      this.listaimagemsbase.length = 12;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto12pequena');
        div[1].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto12pequena');
        div[2].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto12pequena');
        div[3].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto12pequena');
        div[4].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto12pequena');
        div[5].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto12pequena');
        div[6].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto12pequena');
        div[7].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto12pequena');
        div[7].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto12pequena');
        div[8].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto12pequena');
        div[9].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto12pequena');
        div[10].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto12pequena');
        div[11].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto12pequena');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade1');
      }, 5);
    }

    if (this.qtdimagemselecionada === 15) {
      this.listaimagemsbase.length = 15;
      setTimeout(() => {
        const div = document.getElementsByClassName('listafoto');
        div[0].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[1].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[2].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[3].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[4].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[5].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[6].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[7].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[7].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[8].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[9].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[10].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[11].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[12].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[13].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');
        div[14].setAttribute('class', 'listafoto cdk-drag ng-star-inserted foto15pequena');

        const grade = document.getElementsByClassName('grade');
        grade[0].setAttribute('class', 'grade grade1');
      }, 5);
    }
  }

}
