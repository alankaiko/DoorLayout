import { GrupoprocedimentoService } from './../../zservice/grupoprocedimento.service';
import { ProcedimentomedicoService } from './../../zservice/procedimentomedico.service';
import { Component, OnInit } from '@angular/core';
import { ProcedimentoMedico } from './../../core/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cad-procmedico',
  templateUrl: './cad-procmedico.component.html',
  styleUrls: ['./cad-procmedico.component.css']
})
export class CadProcmedicoComponent implements OnInit {
  formulario: FormGroup;
  grupos = [];
  display = true;

  constructor(private service: ProcedimentomedicoService,
              private rota: ActivatedRoute,
              private serviceGrupo: GrupoprocedimentoService,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new ProcedimentoMedico());
    const codprocedimentomedico = this.rota.snapshot.params.cod;

    if (codprocedimentomedico) {
      this.CarregarProcedimentoMedico(codprocedimentomedico);
    }

    this.BuscarGrupos();
    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
  }

  BuscarGrupos() {
    return this.serviceGrupo.Listar()
    .then(response => {
      this.grupos = response
        .map(g => ({ label: g.nomegrupo, value: g.codigo }));
    });
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(procedimentomedico: ProcedimentoMedico) {
    this.formulario = this.formbuilder.group({
      codigo: [null, procedimentomedico.codigo],
      nome: [null, procedimentomedico.nome],
      grupo: this.formbuilder.group({
        codigo: [procedimentomedico.grupo.codigo]
      })
    });
  }

  CarregarProcedimentoMedico(codigo: number) {
    this.service.BuscarPorId(codigo).then(procedimento => this.formulario.patchValue(procedimento));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarProcedimentoMedico();
    } else {
      this.formulario.patchValue(this.AdicionarProcedimentoMedico());
    }
    this.CriarFormulario(new ProcedimentoMedico());
  }

  AdicionarProcedimentoMedico() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/listaexameprocmedico']);
      });
  }

  AtualizarProcedimentoMedico() {
    this.service.Atualizar(this.formulario.value)
      .then(procedimento => {
        this.formulario.patchValue(procedimento);
        this.route.navigate(['/listaexameprocmedico']);
      });
  }

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/home']);
  }
}
