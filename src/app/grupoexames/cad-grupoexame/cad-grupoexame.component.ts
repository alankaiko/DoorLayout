import { GrupoprocedimentoService } from './../../zservice/grupoprocedimento.service';
import { Component, OnInit } from '@angular/core';
import { GrupoProcedimento } from './../../core/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cad-grupoexame',
  templateUrl: './cad-grupoexame.component.html',
  styleUrls: ['./cad-grupoexame.component.css']
})
export class CadGrupoexameComponent implements OnInit {
  formulario: FormGroup;
  display = true;

  constructor(private service: GrupoprocedimentoService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new GrupoProcedimento());
    const codigogrupo = this.rota.snapshot.params.cod;

    if (codigogrupo) {
      this.CarregarGrupoProcedimento(codigogrupo);
    }

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(grupo: GrupoProcedimento) {
    this.formulario = this.formbuilder.group({
      codigo: [null, grupo.codigo],
      nomegrupo: [null, grupo.nomegrupo]
    });
  }

  CarregarGrupoProcedimento(codigo: number) {
    this.service.BuscarPorId(codigo).then(texto => this.formulario.patchValue(texto));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarGrupoProcedimento();
    } else {
      this.formulario.patchValue(this.AdicionarGrupoProcedimento());
    }
    this.CriarFormulario(new GrupoProcedimento());
  }

  AdicionarGrupoProcedimento() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/listagrupoexame']);
      });
  }

  AtualizarGrupoProcedimento() {
    this.service.Atualizar(this.formulario.value)
      .then(grupo => {
        this.formulario.patchValue(grupo);
        this.route.navigate(['/listagrupoexame']);
      });
  }

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/home']);
  }
}
