import { SiglaService } from './../../zservice/sigla.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router, ActivatedRoute } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { Sigla } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cad-sigla',
  templateUrl: './cad-sigla.component.html',
  styleUrls: ['./cad-sigla.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class CadSiglaComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private service: SiglaService,
    private rota: ActivatedRoute,
    private formbuilder: FormBuilder,
    private route: Router,
    private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new Sigla());
    const codsigla = this.rota.snapshot.params.cod;

    if (codsigla) {
      this.CarregarSiglas(codsigla);
    }
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

  CarregarSiglas(codigo: number) {
    this.service.BuscarPorId(codigo).then(sigla => this.formulario.patchValue(sigla));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarSigla();
    } else {
      this.formulario.patchValue(this.AdicionarSigla());
    }
    this.CriarFormulario(new Sigla());
  }

  AdicionarSigla() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/ferramentas/listasigla']);
      });

  }

  AtualizarSigla() {
    this.service.Atualizar(this.formulario.value)
      .then(sigla => {
        this.formulario.patchValue(sigla);
        this.route.navigate(['/ferramentas/listasigla']);
      });
  }

  Voltar() {
    this.location.back();
  }
}
