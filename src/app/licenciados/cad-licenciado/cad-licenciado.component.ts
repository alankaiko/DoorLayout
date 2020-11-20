import { FormGroup, FormBuilder } from '@angular/forms';
import { LicenciadoService } from './../../zservice/licenciado.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router, ActivatedRoute } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { Licenciado } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cad-licenciado',
  templateUrl: './cad-licenciado.component.html',
  styleUrls: ['./cad-licenciado.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class CadLicenciadoComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    private service: LicenciadoService,
    private rota: ActivatedRoute,
    private formbuilder: FormBuilder,
    private route: Router,
    private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new Licenciado());
    const codlicenciado = this.rota.snapshot.params.cod;

    if (codlicenciado) {
      this.CarregarLicenciados(codlicenciado);
    }
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(licenciado: Licenciado) {
    this.formulario = this.formbuilder.group({
      codigo: [null, licenciado.codigo],
      razaosocial: [null, licenciado.razaosocial],
      licenciadopara: [null, licenciado.licenciadopara],
      cnpj: [null, licenciado.cnpj],
      cnes: [null, licenciado.cnes],
      cpf: [null, licenciado.cpf],
      telefone2: [null, licenciado.telefone2],
      email: [null, licenciado.email],
      site: [null, licenciado.site],
      serial: [null, licenciado.serial],
      qtdeacessos: [null, licenciado.qtdeacessos],
      telefone1: [null, licenciado.telefone1],
      endereco: this.formbuilder.group({
        logradouro: [null, licenciado.endereco.logradouro],
        complemento: [null, licenciado.endereco.complemento],
        numero: [null, licenciado.endereco.numero],
        bairro: [null, licenciado.endereco.bairro],
        cidade: [null, licenciado.endereco.cidade],
        estado: [null, licenciado.endereco.estado],
        cep: [null, licenciado.endereco.cep]
      })
    });
  }

  CarregarLicenciados(codigo: number) {
    this.service.BuscarPorId(codigo).then(licenciado => this.formulario.patchValue(licenciado));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarLicenciado();
    } else {
      this.formulario.patchValue(this.AdicionarLicenciado());
    }
    this.CriarFormulario(new Licenciado());
  }

  AdicionarLicenciado() {
    return this.service.Adicionar(this.formulario.value)
      .then(salvo => {
        this.route.navigate(['/ferramentas/listalicenciado']);
      });

  }

  AtualizarLicenciado() {
    this.service.Atualizar(this.formulario.value)
      .then(licenciado => {
        this.formulario.patchValue(licenciado);
        this.route.navigate(['/ferramentas/listalicenciado']);
      });
  }

  Voltar() {
    this.location.back();
  }
}
