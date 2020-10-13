import { Obstetrico1trimestreComponent } from './../../modelos/obstetrico1trimestre/obstetrico1trimestre.component';
import { AbdometotalComponent } from './../../modelos/abdometotal/abdometotal.component';
import { TextolivreComponent } from './../../modelos/textolivre/textolivre.component';
import { AbdomeinferiormascComponent } from './../../modelos/abdomeinferiormasc/abdomeinferiormasc.component';
import { ParametrodosistemaService } from './../../zservice/parametrodosistema.service';
import { isEmptyObject } from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { ModelodelaudodoprocService } from './../../zservice/modelodelaudodoproc.service';
import { ProcedimentoatendimentoService } from './../../zservice/procedimentoatendimento.service';
import { Atendimento, ProcedimentoAtendimento, ModeloDeLaudoDoProc, Laudo, STATUS_LAUDO, ParametroDoLaudo, SubcategoriaCid10, CamposDoLaudo } from './../../core/model';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-laudo',
  templateUrl: './laudo.component.html',
  styleUrls: ['./laudo.component.css']
})
export class LaudoComponent implements OnInit {
  @ViewChild(AbdomeinferiormascComponent) abdomeinfchild: AbdomeinferiormascComponent;
  @ViewChild(TextolivreComponent) textolivrechild: TextolivreComponent;
  @ViewChild(AbdometotalComponent) abdometotalchild: AbdometotalComponent;
  @ViewChild(Obstetrico1trimestreComponent) obstetricochild: Obstetrico1trimestreComponent;
  imagelogo: any;
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
              private rota: ActivatedRoute,
              private servicoparametro: ParametrodosistemaService) { }

  ngOnInit(): void {
    const codatendimento = this.rota.snapshot.params.cod;

    if (codatendimento) {

    }

    this.CarregarAtendimentos();
    this.getImagemFromService();
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
        this.EditandoLaudo1();
        this.EditandoLaudo2();
    } else {
      this.procedimento.laudo = new Laudo();
      this.Comparar1();
      this.Comparar2();
    }
  }


  Salvar() {
    this.EscolherModeloChild();
    setTimeout(() => {
      this.serviceproc.Atualizar(this.procedimento).then(response => response);
    }, 50);

    this.ImprimirDocumento();
  }

  EscolherModeloChild() {
    if (this.abdomeinferiormasc === true) {
      this.abdomeinfchild.MontarImpressao();
    }

    if (this.textolivre === true) {
      this.textolivrechild.MontarImpressao();
    }

    if (this.abdometotal === true) {
      this.abdometotalchild.MontarImpressao();
    }

    if (this.obstetrico1trimestre === true) {
      this.obstetricochild.MontarImpressao();
    }
  }

  EditandoLaudo1() {
    for (let i = 0; i <= this.modelodelaudodoproc.length; i++) {
      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 27) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.textolivre = true;
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
    }
  }

  EditandoLaudo2() {
    for (let i = 0; i <= this.modelodelaudodoproc.length; i++) {
      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 18) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.videonasofibrolar = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 19) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.tireoide = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 20) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.transcraniano = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 21) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.aparelhourinario = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 22) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.laparoscopiadiagbiop = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 23) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.monitoracaoovulacao = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 24) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.obstetrico14semanas = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 25) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.morfologicofetal = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 26) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.videocolposcopiaifc = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 27) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 28) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.histeroscopia = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 29) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.endoscopiadigestiva = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 31) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.obstetricomaissemana = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 32) {
        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.abdomeinferiorfemendov = true;
      }
    }
  }

  Comparar1() {
    for (let i = 0; i <= this.modelodelaudodoproc.length; i++) {
      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 27) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.textolivre = true;
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
    }
  }

  Comparar2() {
    for (let i = 0; i <= this.modelodelaudodoproc.length; i++) {
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

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 20) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.transcraniano = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 21) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.aparelhourinario = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 22) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.laparoscopiadiagbiop = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 23) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.monitoracaoovulacao = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 24) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.obstetrico14semanas = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 25) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.morfologicofetal = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 26) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.videocolposcopiaifc = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 28) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.histeroscopia = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 29) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.endoscopiadigestiva = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 31) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.obstetricomaissemana = true;
      }

      if (this.prioridade === i && this.modelodelaudodoproc[i].modelodelaudo.codigo === 32) {
        const param = new ParametroDoLaudo();
        param.valor = this.modelodelaudodoproc[i].customstring;
        param.index = this.modelodelaudodoproc[i].prioridade;

        this.procedimento.laudo.modelodelaudo = this.modelodelaudodoproc[i];
        this.procedimento.laudo.status = STATUS_LAUDO.pendente;

        this.abdomeinferiorfemendov = true;
      }
    }
  }

  getImagemFromService() {
    this.servicoparametro.PegarImagem(1).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imagelogo = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  ImprimirDocumento() {
    const win = window.open();
    win.document.write(this.ConfigurarCabecalho());
    win.document.write(this.ConfigurarLaudo());
    win.document.write(this.ConfigurarRodape());
    win.document.close();
    setTimeout(() => {
      win.print();
    }, 5);
  }

  private ConfigurarCabecalho() {
    return '<div class="page-header" style="text-align: center; margin: 0 auto; height: 230px; position: fixed; top: 0mm; width: 93%; background-color: white;">'
          +   '<div style="width: 100%;" class="logotip">'
          +     '<img id="imagemtopomenu" style="width: 150px; height: 100px;" src="' + this.imagelogo + '">'
          +   '</div>'

          +   '<div class="cabecalho" id="cabecalho" style="width: 100%; margin: 0 auto; text-align: center; border-top: 2px solid #000000; border-bottom: 2px solid #000000; margin-top: 10px; padding-top: 5px; padding-bottom: 5px;">'
          +     '<div id="linha1" style="width: 98%; display: inline-flex;">'
          +       '<span style="width: 50%; text-align: left; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">PACIENTE: ' + this.atendimento.patient.patientname.toUpperCase() + '</span>'
          +       '<span style="width: 50%; text-align: right; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">ATENDIMENTO: ' + this.ConfereAtendimento() + '</span>'
          +     '</div>'

          +     '<div id="linha2" style="width: 98%; display: inline-flex;">'
          +       '<span style="width: 50%; text-align: left; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">Data Atendimento: ' + this.atendimento.dataatendimento + '</span>'
          +       '<span style="width: 50%; text-align: right; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">Data Nasc: ' + this.atendimento.patient.birthday + ' Idade: ' + this.atendimento.patient.patientage + '</span>'
          +     '</div>'

          +     '<div id="linha3" style="width: 98%; display: inline-flex;">'
          +       '<span style="width: 50%; text-align: left; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">Dr. SOL.: ' + this.atendimento.solicitante.nome + '</span>'
          +       '<span style="width: 50%; text-align: right; font-famitly: Tahoma; font-size: 12pt; font-weight: bold;">Convênio: ' + this.atendimento.convenio.nome + '</span>'
          +     '</div>'
          +   '</div>'

          +   '<div class="labelprocedimento" id="labelprocedimento" style="width: 93%; margin: 0 auto; text-align: center; background-color: #cfcfcf; margin-top: 30px;">'
          +     '<span id="labelproc" style="text-transform: uppercase; font-weight: bold; font-family: Arial, Helvetica, sans-serif;">' + this.ConfigurarLabelProcedimento() + '</span>'
          +   '</div>'
          + '</div>';
  }

  private ConfereAtendimento() {
    return ('0000000' + this.atendimento.codigo).slice(-7);
  }

  private ConfigurarLabelProcedimento() {
    let proc;
    this.procedimentosAtd.forEach(elo => {
      if (elo.value === this.procedimentoAtdSelecionado) {
        proc = elo.label;
      }
    });

    return proc;
  }

  private ConfigurarLaudo() {
    return  '<table>'
      +       '<thead>'
      +         '<tr>'
      +           '<td>'
      +             '<div class="page-header-space" style="height: 230px;"></div>'
      +           '</td>'
      +         '</tr>'
      +       '</thead>'

      +       '<tbody>'
      +         '<tr>'
      +           '<td>'
      +             '<div class="page" style="width: 93%; margin: 0 auto;">' + this.procedimento.laudo.camposdolaudo.zimpressao + '</div>'
      +           '</td>'
      +         '</tr>'
      +         '<tr>'
      +           '<td>'
      +             '<div style="width: 100%; padding-top: 20px;">'
      +               '<div class="assinatura" id="assinatura" style="width: 40%; text-align: center; border-top: 1px solid; margin-top: 80px; margin: 0 auto;">'
      +                 '<span id="labelassinatura">' + this.ConfigurarAssinatura() + '</span>'
      +               '</div>'
      +             '</div>'
      +           '</td>'
      +         '</tr>'
      +       '</tbody>'

      +       '<tfoot>'
      +         '<tr>'
      +           '<td>'
      +             '<div class="page-footer-space" style="height: 25px;"></div>'
      +           '</td>'
      +         '</tr>'
      +       '</tfoot>'
      +      '</table>';
  }

  private ConfigurarAssinatura() {
    return 'MÉDICO EXECUTANTE <br>'
      + this.atendimento.solicitante.conselho.sigla.descricao + ' '
      + this.atendimento.solicitante.conselho.estado.uf + ' '
      + this.atendimento.solicitante.conselho.descricao;
  }

  ConfigurarRodape() {
    return  '<div class="page-footer" style="height: 25px; position: fixed; bottom: 0; width: 93%; border-top: 1px solid black; text-align: center; border-top: 1px solid #000; background-color: white;">'
      +       '<span id="labelrodape">Para adquirir este software acesse www.novaopcaomed.com.br (62)3643-6264</span>'
      +     '</div>';
  }
}
