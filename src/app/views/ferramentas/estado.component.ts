import { EstadosService } from './../../zservice/estados.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router, ActivatedRoute } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { Estado } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  templateUrl: 'estado.component.html',
  styleUrls: ['./estado.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class EstadoComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private service: EstadosService,
    private rota: ActivatedRoute,
    private formbuilder: FormBuilder,
    private route: Router,
    private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new Estado());
    const codestado = this.rota.snapshot.params.cod;

    if (codestado) {
      this.CarregarEstados(codestado);
    }
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

  CarregarEstados(codigo: number) {
    this.service.BuscarPorId(codigo).then(estado => this.formulario.patchValue(estado));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarEstado();
    } else {
      this.formulario.patchValue(this.AdicionarEstado());
    }
    this.CriarFormulario(new Estado());
  }

  AdicionarEstado() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/ferramentas/listaestado']);
      });

  }

  AtualizarEstado() {
    this.service.Atualizar(this.formulario.value)
      .then(estado => {
        this.formulario.patchValue(estado);
        this.route.navigate(['/ferramentas/listaestado']);
      });
  }

  Voltar() {
    this.location.back();
  }
}
