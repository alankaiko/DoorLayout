import { isEmptyObject } from 'jquery';
import { ProcedimentoCadApendComponent } from './../procedimento-cad-apend/procedimento-cad-apend.component';
import { ConvenioService, ConvenioFiltro } from './../../zservice/convenio.service';
import { Atendimento } from './../../core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoService, AtendimentoFilter } from './../../zservice/atendimento.service';
import { FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import * as moment from 'moment';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-tela-atendimento',
  templateUrl: './tela-atendimento.component.html',
  styleUrls: ['./tela-atendimento.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class TelaAtendimentoComponent implements OnInit {
  @ViewChild(ProcedimentoCadApendComponent) appendchild: ProcedimentoCadApendComponent;
  atendimento = new Atendimento();
  filtro = new AtendimentoFilter();
  items: FormArray;
  filtroconvenio = new ConvenioFiltro();
  display = true;
  exibiratestado = false;
  pacientes: any[];
  convenios: any[];
  conselhos: any[];
  subcategoriacids: any[];
  estados: any[];
  executantes: any[];
  solicitantes: any[];
  codigodecid: number;
  codigoprofexecutante: number;


  constructor(private service: AtendimentoService,
              private serviceconv: ConvenioService,
              private rota: ActivatedRoute,
              private route: Router,
              private location: Location,
              private messageService: MessageService,
              private confirmService: ConfirmationService) {
  }

  ngOnInit() {
    const codatendimento = this.rota.snapshot.params.cod;

    this.CarregarConvenios();
    this.CarregarPacientes();
    this.CarregarSolicitantes();
    this.CarregarConselhos();
    this.CarregarEstados();
    this.CarregarCids();
    this.CarregarExecutantes();

    if (codatendimento) {
      this.CarregaAtendimento(codatendimento);
    } else {
      this.VerificarData();
    }

    setTimeout (() => {
      document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar());
      if (this.atendimento.datacadastro === undefined) {
        this.atendimento.datacadastro = new Date();
      }
    }, 10);

  }

  AbrirDialogo() {
    this.exibiratestado = true;
  }

  get editando() {
    return this.atendimento.codigo === null ? false : Boolean(this.atendimento.codigo);
  }

  VerificarData() {
    const data = moment();
    this.atendimento.dataatendimento = moment(data, 'YYYY-MM-DD').toDate();
  }

  CarregaAtendimento(codigo: number) {
    this.service.BuscarPorId(codigo).then(atendimento => {this.atendimento = atendimento; }).catch(erro => erro);
  }

  Salvar() {
    if(this.ValidaCampoVazio()){
      return;
    }


    if(this.editando){
      this.Atualizar();
      return;
    }

    this.Adicionar();
  }


  ValidaCampoVazio() {
    if (this.atendimento.convenio.codigo == null){
      this.CamposErro('Convênio');
      const editor = document.querySelector('#convenio .ui-inputtext') as HTMLElement;
      editor.setAttribute('style' , 'background-color: #fcd5d5;');
      return true;
    }

    if (this.atendimento.paciente.nome == null){
      this.CamposErro('Nome Paciente');
      const editor = document.querySelector('#paciente .ui-inputtext') as HTMLElement;
      editor.setAttribute('style' , 'background-color: #fcd5d5;');

      return true;
    }

    if (this.atendimento.paciente.nome == null){
      this.CamposErro('Data Nascimento');
      const editor = document.querySelector('#datanasc .ui-inputtext') as HTMLElement;
      editor.setAttribute('style' , 'background-color: #fcd5d5; text-transform: uppercase;');

      return true;
    }

    if (isEmptyObject(this.atendimento.procedimentos)){
      this.CamposErro('Procedimentos');
      const editor = document.querySelector('#tabelaproc .corpo .tabelas') as HTMLElement;
      editor.setAttribute('style' , 'background-color: #fcd5d5; border: 1px solid #cc0000');
      return true;
    }

    return false;
  }

  VerificaDuplicidade(){
    this.filtro.pacientenome = this.atendimento.paciente.nome;
    this.filtro.datainicial = this.atendimento.datacadastro;
    this.filtro.datafinal = this.atendimento.datacadastro;
    this.filtro.datanascpaciente = this.atendimento.paciente.datanasc;

    this.service.VerificarSeNomeExiste(this.filtro)
      .then(
        valor => {
          if(valor){
            this.CamposAviso(this.atendimento.paciente.nome);
            const editor = document.getElementById('paciente');
            editor.setAttribute('style' , 'background-color: #fcf6a1; text-transform: uppercase;');

            this.confirmService.confirm({
              message: 'Alerta: já existe um atendimento cadastrado para esse paciente com a data de hoje!'
            });
          }
        }
      );
  }

  private CamposErro(campo: string) {
    this.messageService.add({severity:'error', summary: 'Erro', detail:'Preencher campo ' + campo.toUpperCase(), life:6000});
  }

  private CamposAviso(campo: string) {
    this.messageService.add({severity:'warn', summary: 'Aviso', detail:'Valor ' + campo.toUpperCase() + ' já existe no banco de dados', life:10000});
  }

  Adicionar() {
      this.service.Adicionar(this.atendimento)
      .then(() => {
        this.route.navigate(['/operacoes/atendimento']);
      })
      .catch(erro => erro);
  }


  Atualizar() {
    this.service.Atualizar(this.atendimento)
      .then(() => {
        this.route.navigate(['/operacoes/atendimento']);
      })
      .catch(erro => erro);
  }

  Nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.atendimento = new Atendimento();
    }.bind(this), 1);

    this.route.navigate(['/operacoes/atendimento/novo']);
  }

  CarregarConselhos() {
    this.service.ListarSigla().then(lista => {
      this.conselhos = lista.map(sigla => ({label: sigla.descricao, value: sigla.codigo}));
    }).catch(erro => erro);
  }

  CarregarEstados() {
    this.service.ListarEstados().then(lista => {
      this.estados = lista.map(estado => ({label: estado.uf, value: estado.codigo}));
    }).catch(erro => erro);
  }

  CarregarPacientes() {
    this.service.ListarPacientes().then(lista => {
      this.pacientes = lista.map(paciente => ({label: paciente.nome, value: paciente.codigo}));
    }).catch(erro => erro);
  }

  InserirPacientes() {
    this.service.BuscarPorIdPaciente(this.atendimento.paciente.codigo)
    .then( response => {
      this.atendimento.paciente = response;
    });

    setTimeout(() => {
      this.VerificaDuplicidade();
    }, 500);
  }

  InserirProfSolicitante() {
    this.service.BuscarPorIdProf(this.atendimento.solicitante.codigo)
      .then(response => {
        this.atendimento.solicitante = response;
      });
  }

  CarregarConvenios() {
    this.filtroconvenio.ativo = true;
    return this.serviceconv.Consultar(this.filtroconvenio)
      .then(response => {
        this.convenios = response.convenios.content.map(conv => ({label: conv.nome, value: conv.codigo}));
      }).catch(erro => console.log(erro));
  }

  CarregarSolicitantes() {
    this.service.ListarSolicitantes().then(lista => {
      this.solicitantes = lista.map(solicitante => ({label: solicitante.nome, value: solicitante.codigo}));
    }).catch(erro => erro);
  }

  CarregarExecutantes() {
    this.service.ListarExecutantes().then(lista => {
      this.executantes = lista.map(executante => ({label: executante.nome, value: executante.codigo}));
    }).catch(erro => erro);
  }

  CarregarCids() {
    this.service.ListarSubcategoriaCid().then(lista => {
      this.subcategoriacids = lista.map(cid => ({label: cid.nome, value: cid.codigo}));
    }).catch(erro => erro);
  }

  VaiParaLaudos() {
    if (this.appendchild.procedimento !== null && this.appendchild.procedimento !== undefined) {
      this.route.navigate(['/operacoes/laudos', this.appendchild.procedimento.codigo]);
    }
  }

  VaiCaptura() {
    if (this.appendchild.procedimento !== null && this.appendchild.procedimento !== undefined) {
      this.route.navigate(['/operacoes/captura', this.appendchild.procedimento.codigo]);
    }
  }

  GerarAtendimento() {
    this.Salvar();

    this.service.PorAtestado(1)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      });

    this.exibiratestado = false;
  }

  Fechar() {
    this.route.navigate(['/home']);
  }

  Voltar() {
    this.location.back();
  }

}
