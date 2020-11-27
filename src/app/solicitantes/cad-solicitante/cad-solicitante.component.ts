import { EstadosService } from './../../zservice/estados.service';
import { SiglaService } from './../../zservice/sigla.service';
import { ProfissionalSolicitante } from './../../core/model';
import { ProfissionalsolicitanteService } from './../../zservice/profissionalsolicitante.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cad-solicitante',
  templateUrl: './cad-solicitante.component.html',
  styleUrls: ['./cad-solicitante.component.css']
})
export class CadSolicitanteComponent implements OnInit {
  formulario: FormGroup;
  display = true;
  siglas = [];
  estados = [];

  constructor(private service: ProfissionalsolicitanteService,
              private serviceSigla: SiglaService,
              private serviceEstado: EstadosService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new ProfissionalSolicitante());
    const codprofissionalsol = this.rota.snapshot.params.cod;

    if (codprofissionalsol) {
      this.CarregarProfissionalSolicitante(codprofissionalsol);
    }

    this.BuscarEstados();
    this.BuscarSiglas();
    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(profissional: ProfissionalSolicitante) {
    this.formulario = this.formbuilder.group({
      codigo: [null, profissional.codigo],
      nome: [null, profissional.nome],
      numnoconselho: [null, profissional.numnoconselho],
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

  CarregarProfissionalSolicitante(codigo: number) {
    this.service.BuscarPorId(codigo).then(profissional => this.formulario.patchValue(profissional));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarProfissionalSolicitante();
    } else {
      this.formulario.patchValue(this.AdicionarProfissionalSolicitante());
    }
    this.CriarFormulario(new ProfissionalSolicitante());
  }

  AdicionarProfissionalSolicitante() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/listaprofsolicitante']);
      });
  }

  AtualizarProfissionalSolicitante() {
    this.service.Atualizar(this.formulario.value)
      .then(profissional => {
        this.formulario.patchValue(profissional);
        this.route.navigate(['/listaprofsolicitante']);
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
    this.route.navigate(['/home']);
  }
}
