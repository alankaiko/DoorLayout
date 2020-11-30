import { PacienteService } from './../../zservice/paciente.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from './../../core/model';
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
    this.CriarFormulario(new Patient());
    const idpatient = this.rota.snapshot.params.cod;

    if (idpatient) {
      this.CarregarPaciente(idpatient);
    }

    this.enumsexo = [
      {label: 'Masculino'},
      {label: 'Feminino'}
    ];

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 10);
  }


  get editando() {
    return Boolean(this.formulario.get('idpatient').value);
  }

  CriarFormulario(paciente: Patient) {
    this.formulario = this.formbuilder.group({
      idpatient: [null, paciente.idpatient],
      patientid: [null, paciente.patientid],
      patientname: [null, paciente.patientname],
      birthday: [null, paciente.birthday],
      patientage: [null, paciente.patientage],
      datecreate: [null, paciente.datecreate],
      patientsex: [null, paciente.patientsex],
      observacoes: [null, paciente.observacoes],
      contato: this.formbuilder.group({
        email: [paciente.contato.email],
        telefone: [paciente.contato.telefone],
        telefone2: [paciente.contato.telefone2],
        celular: [paciente.contato.celular],
      }),
      endereco: this.formbuilder.group({
        logradouro: [paciente.endereco.logradouro],
        complemento: [paciente.endereco.complemento],
        numero: [paciente.endereco.numero],
        bairro: [paciente.endereco.bairro],
        cidade: [paciente.endereco.cidade],
        estado: [paciente.endereco.estado],
        cep: [paciente.endereco.cep]
      })
    });

    if (paciente.datecreate === undefined) {
      this.formulario.get('datecreate').setValue(new Date());
    }
  }

  CarregarPaciente(idpatient: number) {
    this.service.BuscarPorId(idpatient).then(texto => this.formulario.patchValue(texto));
  }

  Salvar() {
    if (this.editando) {
      this.AtualizarPaciente();
    } else {
      this.formulario.patchValue(this.AdicionarPaciente());
    }
    this.CriarFormulario(new Patient());
  }

  AdicionarPaciente() {
    return this.service.Adicionar(this.formulario.value)
      .then(response => {
        this.route.navigate(['/listapaciente']);
      });
  }

  AtualizarPaciente() {
    this.service.Atualizar(this.formulario.value)
      .then(patient => {
        this.formulario.patchValue(patient);
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
