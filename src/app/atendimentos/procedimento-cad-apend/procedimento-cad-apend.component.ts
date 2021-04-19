import { ProfissionalexecutanteService } from './../../zservice/profissionalexecutante.service';
import { ProcedimentomedicoService } from './../../zservice/procedimentomedico.service';
import { ProcedimentoAtendimento } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';
import { isEmptyObject } from 'jquery';

@Component({
  selector: 'app-procedimento-cad-apend',
  templateUrl: './procedimento-cad-apend.component.html',
  styleUrls: ['./procedimento-cad-apend.component.css']
})
export class ProcedimentoCadApendComponent implements OnInit {
  @Input() procedimentos: Array<ProcedimentoAtendimento>;
  procedimento = new ProcedimentoAtendimento();
  exbindoFormularioProcedimento = false;
  procedimentoIndex: number;
  profissionalexecutantes: any[];
  procedimentomedicos: any[];

  constructor(private serviceProc: ProcedimentomedicoService,
              private serviceProf: ProfissionalexecutanteService) { }

  ngOnInit() {
    this.CarregarProcedimentosMedico();
    this.CarregaProfissionalExecutante();
  }

  PrepararNovoProcedimento() {
    this.exbindoFormularioProcedimento = true;
    this.procedimento = new ProcedimentoAtendimento();
    this.procedimentoIndex = this.procedimentos.length;


  }

  PrepararEdicaoProcedimento(procedimento: ProcedimentoAtendimento) {
    this.procedimento = procedimento;
    this.procedimentoIndex = this.procedimentos.indexOf(procedimento);
    this.exbindoFormularioProcedimento = true;
  }

  ConfirmarProcedimento() {
    this.procedimentos[this.procedimentoIndex] = this.procedimento;
    const codigo = this.procedimentos[this.procedimentoIndex].procedimentomedico.codigo;
    this.serviceProc.BuscarPorId(codigo).then(proc => {
      this.procedimentos[this.procedimentoIndex].procedimentomedico = proc;
    }).catch(erro => erro);

    this.exbindoFormularioProcedimento = false;
  }

  RemoverProcedimento(index: number) {
    this.procedimentos.splice(index, 1);
  }

  CarregarProcedimentosMedico() {
    this.serviceProc.Listar().then(lista => {
      this.procedimentomedicos = lista.map(proc => ({label: proc.nome, value: proc.codigo}));
    }).catch(erro => erro);
  }

  CarregaProfissionalExecutante() {
    this.serviceProf.Listar().then(lista => {
      this.profissionalexecutantes = lista.map(prof => ({label: prof.nome, value: prof.codigo}));
    }).catch(erro => erro);
  }

  AdicionandoDias() {
    this.procedimento.preventregalaudo = new Date();
    this.procedimento.dataexecucao = new Date();
    // const data = moment();
    // data.add(8, 'days');
    // moment(data, 'YYYY-MM-DD').toDate();
    // return new Date(data.toDate());
  }

  BotaoCancelar() {
    this.exbindoFormularioProcedimento = false;
  }
}
