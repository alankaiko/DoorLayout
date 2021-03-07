import { PacienteService } from './../../zservice/paciente.service';
import { Component, OnInit } from '@angular/core';
import { Paciente } from './../../core/model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cad-pacientes',
  templateUrl: './cad-pacientes.component.html',
  styleUrls: ['./cad-pacientes.component.css']
})
export class CadPacientesComponent implements OnInit {
  formulario: FormGroup;
  display = true;
  enumsexo: any[];

  constructor(private service: PacienteService,
              private rota: ActivatedRoute,
              private formbuilder: FormBuilder,
              private route: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.CriarFormulario(new Paciente());
    const codigo = this.rota.snapshot.params.cod;

    if (codigo) {
      this.CarregarPaciente(codigo);
    }

    this.enumsexo = [
      {label: 'Masculino'},
      {label: 'Feminino'}
    ];

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
  }


  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  CriarFormulario(paciente: Paciente) {
    this.formulario = this.formbuilder.group({
      codigo: [null, paciente.codigo],
      pacienteid: [null, paciente.pacienteid],
      nome: [null, paciente.nome],
      datanasc: [null, paciente.datanasc],
      idade: [null, paciente.idade],
      datacriacao: [null, paciente.datacriacao],
      sexo: [null, paciente.sexo],
      observacoes: [null, paciente.observacoes],
      contato: this.formbuilder.group({
        email: [paciente.contato.email],
        telefone: [paciente.contato.telefone] + '',
        telefone2: [paciente.contato.telefone2] + '',
        celular: [paciente.contato.celular] + '',
      }),
      endereco: this.formbuilder.group({
        logradouro: [paciente.endereco.logradouro],
        complemento: [paciente.endereco.complemento],
        numero: [paciente.endereco.numero],
        bairro: [paciente.endereco.bairro],
        cidade: [paciente.endereco.cidade],
        estado: [paciente.endereco.estado],
        cep: [paciente.endereco.cep] + ''
      })
    });

    if (paciente.datacriacao === undefined) {
      this.formulario.get('datacriacao').setValue(new Date());
    }
  }

  CarregarPaciente(codigo: number) {
    this.service.BuscarPorId(codigo).then(paciente => this.formulario.patchValue(paciente));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarPaciente();
    } else {
      this.formulario.patchValue(this.AdicionarPaciente());
    }
    this.CriarFormulario(new Paciente());
  }

  AdicionarPaciente() {
    return this.service.Adicionar(this.formulario.value)
      .then(response => {
        this.route.navigate(['/listapaciente']);
      });
  }

  AtualizarPaciente() {
    this.service.Atualizar(this.formulario.value)
      .then(paciente => {
        this.formulario.patchValue(paciente);
        this.route.navigate(['/listapaciente']);
      });
  }

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/home']);
  }

}
