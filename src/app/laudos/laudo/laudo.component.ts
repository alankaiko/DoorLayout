import { isEmptyObject } from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { ModelodelaudodoprocService } from './../../zservice/modelodelaudodoproc.service';
import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { Atendimento, ProcedimentoAtendimento, ModeloDeLaudoDoProc, Laudo, STATUS_LAUDO, ParametroDoLaudo, SubcategoriaCid10 } from './../../core/model';
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
  modelodelaudo: any[];
  textolivre: boolean = false;
  abdomeinferiormasc: boolean = false;
  prioridade: number;
  dropmodelo: boolean = false;

  constructor(private service: AtendimentoService,
              private serviceproc: ProcedimentoatendimentoService,
              private servicemodelo: ModelodelaudodoprocService,
              private rota: ActivatedRoute) { }

  ngOnInit(): void {
    const codatendimento = this.rota.snapshot.params.cod;

    if (codatendimento) {

    }

    this.CarregarAtendimentos();
  }

  AtivarExcluir() {
    this.dropmodelo = true;
  }

  CarregarAtendimentos() {
    this.service.ListarAtendimentos().then(lista => {
      this.atendimentos = lista.map(atendimento => ({label: 'atend: ' + atendimento.codigo + ' ' + atendimento.patient.patientname, value: atendimento.codigo}));
    }).catch(erro => erro);
  }

  CarregarProcedimentos() {
    this.service.BuscarProcedimentosPorAt(this.atendimentoSelecionado)
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
                this.prioridade = this.modelodelaudodoproc[0].prioridade;
                this.modelodelaudo = resp.map(modelo => ({label: modelo.descricao, value: modelo.prioridade}));

                this.FiltrandoProcedimento();
                this.RenderizarModeloLaudo();
              }
            );
        }
      );
  }

  FiltrandoProcedimento() {
    this.atendimento.procedimentos.filter(elo => {
      if (elo.codigo === this.procedimentoAtdSelecionado) {
        this.procedimento = elo;
      }
    });
  }

  RenderizarModeloLaudo() {
    if (!isEmptyObject(this.procedimento.laudo)) {

      this.textolivre = true;
    } else {
      this.procedimento.laudo = new Laudo();
      this.Comparar();
    }
  }


  Salvar() {
    setTimeout(() => {
      this.serviceproc.Atualizar(this.procedimento).then(response => response);
    }, 50);
  }

  Comparar() {
    for (let i = 0; i <= this.modelodelaudodoproc.length; i++) {
      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 27) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.laudosalvo = param;
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.textolivre = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 2) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.laudosalvo = param;
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.abdomeinferiormasc = true;
      }
    }
  }
}
