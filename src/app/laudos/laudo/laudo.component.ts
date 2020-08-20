import { ModelodelaudodoprocService } from './../../zservice/modelodelaudodoproc.service';
import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { Atendimento, ProcedimentoAtendimento, ModeloDeLaudoDoProc } from './../../core/model';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laudo',
  templateUrl: './laudo.component.html',
  styleUrls: ['./laudo.component.css']
})
export class LaudoComponent implements OnInit {
  atendimentos: any[];
  procedimentosAtd: any[];
  atendimento = new Atendimento();
  atendimentoSelecionado: number;
  procedimentoAtdSelecionado: number;
  procedimento = new ProcedimentoAtendimento();
  modelodelaudodoproc = new Array<ModeloDeLaudoDoProc>();

  constructor(private service: AtendimentoService,
              private serviceproc: ProcedimentoatendimentoService,
              private servicemodelo: ModelodelaudodoprocService) { }

  ngOnInit(): void {
    this.CarregarAtendimentos();
  }


  CarregarAtendimentos() {
    this.service.ListarAtendimentos().then(lista => {
      this.atendimentos = lista.map(atendimento => ({label: 'atend: ' + atendimento.codigo + ' ' + atendimento.patient.patientname, value: atendimento.codigo}));
    }).catch(erro => erro);
  }

  CarregarProcedimentos() {
    this.service.BuscarPorIdLaudo(this.atendimentoSelecionado)
      .then(
        response => {
          this.atendimento = response;
          this.procedimentosAtd = this.atendimento.procedimentos.map(procedimento => ({label: procedimento.procedimentomedico.nome, value: procedimento.codigo}));
        }
      );
  }

  ConfigurarVariavel() {
      this.serviceproc.BuscarCodProcedimento(this.procedimentoAtdSelecionado)
        .then(
          response => {
            this.servicemodelo.BuscarPelaIdProcedimento(response)
              .then(
                resp => {
                  this.modelodelaudodoproc = resp;
                }
              );
          }
        );
      console.log('deu certo');
  }

  ConfiguraModelo() {
    this.atendimento.procedimentos.filter(elo => {
      if (elo.codigo === this.procedimentoAtdSelecionado) {
        this.procedimento = elo;
      }
    });
  }
}
