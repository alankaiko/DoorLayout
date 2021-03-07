import { Estado } from './../../core/model';
import { EstadosService } from './../../zservice/estados.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cad-estado',
  templateUrl: './cad-estado.component.html',
  styleUrls: ['./cad-estado.component.css']
})
export class CadEstadoComponent implements OnInit {
  formulario: FormGroup;
  display = true;

  constructor(private service: EstadosService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new Estado());
    const codestado = this.rota.snapshot.params.cod;

    if (codestado) {
      this.CarregarEstado(codestado);
    }

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(estado: Estado) {
    this.formulario = this.formbuilder.group({
      codigo: [null, estado.codigo],
      uf: [null, estado.uf],
      descricao: [null, estado.descricao]
    });
  }

  CarregarEstado(codigo: number) {
    this.service.BuscarPorId(codigo).then(texto => this.formulario.patchValue(texto));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarEstado();
    } else {
      this.formulario.patchValue(this.AdicionarEstado());
      this.route.navigate(['/listaestado/novo']);
    }
    this.CriarFormulario(new Estado());
  }

  AdicionarEstado() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/listaestado']);
      });
  }

  AtualizarEstado() {
    this.service.Atualizar(this.formulario.value)
      .then(sigla => {
        this.formulario.patchValue(sigla);
        this.route.navigate(['/listaestado']);
      });
  }

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/home']);
  }
}
