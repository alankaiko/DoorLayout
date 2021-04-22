import { MessageService, ConfirmationService } from 'primeng/api';
import { ProfissionalexecutanteService } from './../../zservice/profissionalexecutante.service';
import { ProcedimentomedicoService } from './../../zservice/procedimentomedico.service';
import { ProcedimentoAtendimento } from './../../core/model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-procedimento-cad-apend',
  templateUrl: './procedimento-cad-apend.component.html',
  styleUrls: ['./procedimento-cad-apend.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ProcedimentoCadApendComponent implements OnInit {
  @Input() procedimentos: Array<ProcedimentoAtendimento>;
  procedimento = new ProcedimentoAtendimento();
  exbindoFormularioProcedimento = false;
  procedimentoIndex: number;
  profissionalexecutantes: any[];
  procedimentomedicos: any[];

  constructor(private serviceProc: ProcedimentomedicoService,
              private serviceProf: ProfissionalexecutanteService,
              private messageService: MessageService) { }

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
    if(this.ValidaCampoVazio()){
      return;
    }

    this.ValidarProfExecutante();

    this.procedimentos[this.procedimentoIndex] = this.procedimento;
    this.exbindoFormularioProcedimento = false;
  }

  private ValidarProfExecutante() {
    if(this.procedimento.profexecutante.codigo === undefined) {
      delete this.procedimento.profexecutante;
    }
  }

  private ValidaCampoVazio(){
    if (this.procedimento.profexecutante.codigo == null){
      this.CamposErro('Procedimento Médico');
      const editor = document.querySelector('#procedimentomedico .ui-inputtext') as HTMLElement;
      editor.setAttribute('style' , 'background-color: #fcd5d5;');
      return true;
    }

    return false;
  }

  private CamposErro(campo: string) {
    this.messageService.add({severity:'error', summary: 'Erro', detail:'Preencher campo ' + campo.toUpperCase(), life:6000});
  }

  RemoverProcedimento(index: number) {
    this.procedimentos.splice(index, 1);
  }

  CarregarProcedimentosMedico() {
    this.serviceProc.Listar().then(lista => {
      this.procedimentomedicos = lista.map(proc => ({label: proc.nome, value: proc}));
    }).catch(erro => erro);
  }

  CarregaProfissionalExecutante() {
    this.serviceProf.Listar().then(lista => {
      this.profissionalexecutantes = lista.map(prof => ({label: prof.nome, value: prof}));
    }).catch(erro => erro);
  }

  AdicionandoDias() {
    this.procedimento.preventregalaudo = new Date();
    this.procedimento.dataexecucao = new Date();
  }

  BotaoCancelar() {
    this.exbindoFormularioProcedimento = false;
  }

  get editando() {
    return this.procedimento && this.procedimento.codigo;
  }
}
