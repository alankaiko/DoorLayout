import { isEmptyObject } from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { ModelodelaudodoprocService } from './../../zservice/modelodelaudodoproc.service';
import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { Atendimento, ProcedimentoAtendimento, ModeloDeLaudoDoProc, Laudo, STATUS_LAUDO, ParametroDoLaudo, SubcategoriaCid10 } from './../../core/model';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { Component, OnInit, ɵConsole } from '@angular/core';

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
  prioridade: number;
  dropmodelo: boolean = false;
  textolivre: boolean = false;
  abdomeinferiormasc: boolean = false;
  abdometotal: boolean = false;
  obstetrico1trimestre: boolean = false;
  diversos: boolean = false;
  dopplerfluxometria: boolean = false;
  endoscopiadigalta: boolean = false;
  mamas: boolean = false;
  ecodopplercardiograma: boolean = false;
  videocolsposcopia: boolean = false;
  abdomesuperior: boolean = false;
  abdomeinferiorfem: boolean = false;
  videofaringolar: boolean = false;
  videoendoscopia: boolean = false;
  videonasofibrolar: boolean = false;
  tireoide: boolean = false;
  transcraniano: boolean = false;
  aparelhourinario: boolean = false;
  laparoscopiadiagbiop: boolean = false;
  monitoracaoovulacao: boolean = false;
  obstetrico14semanas: boolean = false;
  morfologicofetal: boolean = false;
  videocolposcopiaifc: boolean = false;
  histeroscopia: boolean = false;
  obstetricomaissemana: boolean = false;
  abdomeinferiorfemendov: boolean = false;
  endoscopiadigestiva: boolean = false;
  videocolposc: boolean = false;
  endoscopiadigestivabaixa: boolean = false;
  videocolposcopiaifcpc: boolean = false;

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
      this.EditandoLaudo();
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

  EditandoLaudo() {
    for (let i = 0; i <= this.modelodelaudodoproc.length; i++) {
      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 27) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 2) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.abdomeinferiormasc = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 3) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.abdometotal = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 4) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.obstetrico1trimestre = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 5) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.diversos = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 8) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.dopplerfluxometria = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 9) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.endoscopiadigalta = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 10) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.mamas = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 11) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.ecodopplercardiograma = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 11) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.ecodopplercardiograma = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 12) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.videocolsposcopia = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 13) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.abdomesuperior = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 14) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.abdomeinferiorfem = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 16) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.videofaringolar = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 17) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.videoendoscopia = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 18) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.videonasofibrolar = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 19) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.tireoide = true;
      }
    }
  }

  Comparar() {
    for (let i = 0; i <= this.modelodelaudodoproc.length; i++) {
      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 27) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 2) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.abdomeinferiormasc = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 3) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.abdometotal = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 4) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.obstetrico1trimestre = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 5) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.diversos = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 8) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.dopplerfluxometria = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 9) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;
        this.endoscopiadigalta = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 10) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.mamas = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 11) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.ecodopplercardiograma = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 12) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.videocolsposcopia = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 13) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.abdomesuperior = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 14) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.abdomeinferiorfem = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 16) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;
        this.videofaringolar = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 17) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.videoendoscopia = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 18) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.videonasofibrolar = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 19) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.tireoide = true;
      }
    }
  }
}
