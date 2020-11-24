import { Sigla } from './../../core/model';
import { SiglaService } from './../../zservice/sigla.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cad-sigla',
  templateUrl: './cad-sigla.component.html',
  styleUrls: ['./cad-sigla.component.css']
})
export class CadSiglaComponent implements OnInit {
  formulario: FormGroup;
  display = true;

  constructor(private service: SiglaService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new Sigla());
    const codsigla = this.rota.snapshot.params.cod;

    if (codsigla) {
      this.CarregarSigla(codsigla);
    }

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(sigla: Sigla) {
    this.formulario = this.formbuilder.group({
      codigo: [null, sigla.codigo],
      descricao: [null, sigla.descricao]
    });
  }

  CarregarSigla(codigo: number) {
    this.service.BuscarPorId(codigo).then(texto => this.formulario.patchValue(texto));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarSigla();
    } else {
      this.formulario.patchValue(this.AdicionarSigla());
      this.route.navigate(['/listatextopessoal/novo']);
    }
    this.CriarFormulario(new Sigla());
  }

  AdicionarSigla() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/listatextopessoal']);
      });
  }

  AtualizarSigla() {
    this.service.Atualizar(this.formulario.value)
      .then(sigla => {
        this.formulario.patchValue(sigla);
        this.route.navigate(['/listatextopessoal']);
      });
  }

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/home']);
  }
}
