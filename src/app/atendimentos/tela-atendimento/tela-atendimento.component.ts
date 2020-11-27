import { ConvenioService, ConvenioFiltro } from './../../zservice/convenio.service';
import { Atendimento } from './../../core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentoService } from './../../zservice/atendimento.service';
import { FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-tela-atendimento',
  templateUrl: './tela-atendimento.component.html',
  styleUrls: ['./tela-atendimento.component.css']
})
export class TelaAtendimentoComponent implements OnInit {
  atendimento = new Atendimento();
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
              private location: Location) {
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
    this.service.BuscarPorId(codigo)
      .then(atendimento => {
        this.atendimento = atendimento;
      }).catch(erro => erro);
  }

  Salvar(form: FormControl) {
    if (this.editando) {
      this.Atualizar(form);
    } else {
      this.Adicionar(form);
    }
  }

  Adicionar(form: FormControl) {
    this.service.Adicionar(this.atendimento)
      .then(atendimentoaAdicionado => {
        this.route.navigate(['/operacoes/atendimento']);
      })
      .catch(erro => erro);
  }


  Atualizar(form: FormControl) {
    this.service.Atualizar(this.atendimento)
      .then(atendimento => {
        this.atendimento = atendimento;
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
      this.pacientes = lista.map(patient => ({label: patient.patientname, value: patient.idpatient}));
    }).catch(erro => erro);


  }

  InserirPacientes() {
    this.service.BuscarPorIdPatient(this.atendimento.patient.idpatient)
    .then( response => {
      this.atendimento.patient = response;
    }
    );
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
    this.route.navigate(['/operacoes/laudos', this.atendimento.codigo]);
  }

  VaiCaptura() {
    this.route.navigate(['/operacoes/captura', this.atendimento.codigo]);
  }

  GerarAtendimento(form: FormControl) {
    this.Salvar(form);

    this.service.PorAtestado(1)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      });

    this.exibiratestado = false;
  }

  Fechar() {
    this.route.navigate(['/home']);
    console.log(this.atendimento.solicitante.conselho.estado.uf);
  }

  Voltar() {
    this.location.back();
  }

}
