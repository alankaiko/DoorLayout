import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { Atendimento, ProcedimentoAtendimento } from './../../core/model';
import { Component, OnInit } from '@angular/core';


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

  ngOnInit() {
    this.CarregarAtendimentos();
  }

  constructor(private service: AtendimentoService,
              private serviceproc: ProcedimentoatendimentoService) {}


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
