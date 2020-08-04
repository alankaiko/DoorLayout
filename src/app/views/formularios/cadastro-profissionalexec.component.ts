import { EstadosService } from './../../zservice/estados.service';
import { SiglaService } from './../../zservice/sigla.service';
import { ProfissionalexecutanteService } from './../../zservice/profissionalexecutante.service';
import { Component, OnInit } from '@angular/core';
import { ProfissionalExecutante } from './../../core/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

export class ModelComponent {
  selectedValue: string;
}

@Component({
  selector: 'app-cadastro-profissionalexec',
  templateUrl: './cadastro-profissionalexec.component.html',
  styleUrls: ['./cadastro-profissionalexec.component.css']
})
export class CadastroProfissionalexecComponent implements OnInit {
  formulario: FormGroup;
  display: boolean = true;
  siglas = [];
  estados = [];
  city: string;

  constructor(private service: ProfissionalexecutanteService,
              private serviceSigla: SiglaService,
              private serviceEstado: EstadosService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new ProfissionalExecutante());
    const codprofissionalexec = this.rota.snapshot.params.cod;

    if (codprofissionalexec) {
      this.CarregarProfissionalExecutante(codprofissionalexec);
    }

    this.BuscarEstados();
    this.BuscarSiglas();
    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(profissional: ProfissionalExecutante) {
    this.formulario = this.formbuilder.group({
      codigo: [null, profissional.codigo],
      nome: [null, profissional.nome],
      frasepessoal: [null, profissional.frasepessoal],
      numnoconselho: [null, profissional.numnoconselho],
      asswidth: [null, profissional.asswidth],
      assheight: [null, profissional.assheight],
      espacoass: [null, profissional.espacoass],
      contato: this.formbuilder.group({
        email: [profissional.contato.email],
        telefone: [profissional.contato.telefone],
        telefone2: [profissional.contato.telefone2],
        celular: [profissional.contato.celular]
      }),
      endereco: this.formbuilder.group({
        logradouro: [profissional.endereco.logradouro],
        complemento: [profissional.endereco.complemento],
        numero: [profissional.endereco.numero],
        bairro: [profissional.endereco.bairro],
        cidade: [profissional.endereco.cidade],
        estado: [profissional.endereco.estado],
        cep: [profissional.endereco.cep]
      }),
      conselho: this.formbuilder.group({
        codigo: [profissional.conselho.codigo],
        descricao: [profissional.conselho.descricao],
        sigla: this.formbuilder.group({
          codigo: [profissional.conselho.sigla.codigo]
        }),
        estado: this.formbuilder.group({
          codigo: [profissional.conselho.estado.codigo]
        })
      })
    });
  }

  CarregarProfissionalExecutante(codigo: number) {
    this.service.BuscarPorId(codigo).then(profissional => this.formulario.patchValue(profissional));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarProfissionalExecutante();

    } else {
      this.formulario.patchValue(this.AdicionarProfissionalExecutante());
    }
    this.CriarFormulario(new ProfissionalExecutante());
  }

  AdicionarProfissionalExecutante() {
    return this.service.Adicionar(this.formulario.value)
      .then(response => {
        this.route.navigate(['/tabelas/listaprofexecutante']);
      });
  }

  AtualizarProfissionalExecutante() {
    this.service.Atualizar(this.formulario.value)
      .then(profissional => {
        this.formulario.patchValue(profissional);
        this.route.navigate(['/tabelas/listaprofexecutante']);
      });
  }

  Voltar() {
    this.location.back();
  }

  BuscarSiglas() {
    return this.serviceSigla.Listar()
    .then(siglas => {
      this.siglas = siglas
        .map(g => ({ label: g.descricao, value: g.codigo }));
    });
  }

  BuscarEstados() {
    return this.serviceEstado.Listar()
    .then(estados => {
      this.estados = estados
        .map(g => ({ label: g.uf, value: g.codigo }));
    });
  }

  Fechar() {
    this.route.navigate(['/dashboard']);
  }
}
