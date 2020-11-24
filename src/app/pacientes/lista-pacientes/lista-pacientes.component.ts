import { FormGroup } from '@angular/forms';
import { PatientFiltro } from './../../zservice/servidor.service';
import { Router } from '@angular/router';
import { PacienteService } from './../../zservice/paciente.service';
import { Patient } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {
  patients = [];
  patient: Patient;
  totalRegistros = 0;
  filtro = new PatientFiltro();
  camposbusca: any[];
  formulario: FormGroup;
  display = true;
  exclusao = false;

  constructor(private service: PacienteService,
              private route: Router,
              private location: Location) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome'},
      {label: 'Prontuario'},
      {label: 'Data Nasc'},
      {label: 'Data Cad'}
    ];

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 0);
  }

  onRowSelect(event) {
    this.patient = event.data;
  }

  Alterar() {
    if (this.patient.idpatient != null) {
      this.route.navigate(['/listapaciente', this.patient.idpatient]);
    }
  }

  PrimeiraSelecao() {
    this.patient = this.patients[0];
  }

  UltimaSelecao() {
    this.patient = this.patients[this.patients.length - 1];
  }

  ProximaSelecao() {
    const valor = this.patients.indexOf(this.patient);
    this.patient = this.patients[valor + 1];
  }

  AnteriorSelecao() {
    const valor = this.patients.indexOf(this.patient);
    this.patient = this.patients[valor - 1];
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;
    this.filtro.servidor = false;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.patients = response.pacientes.content;
      }).catch(erro => console.log(erro));
  }

  BuscaDinamica() {
    const drop = $('#codigodrop :selected').text();
    const texto = document.getElementById('buscando') as HTMLInputElement;

    setTimeout (() => {
      if (drop === 'Nome') {
        this.filtro.birthday = null;
        this.filtro.patientname = texto.value;
        this.Consultar();
      }

      if ((drop === 'Prontuario') && (texto.value !== '')) {
        const numero = +texto.value;
        return this.service.BuscarListaPorId(numero)
          .then(response => {
            this.patients = response;
          }).catch(erro => console.log(erro));
      }
    }, 1000);
  }

  AtivarExcluir() {
    if (this.patient.idpatient != null) {
      this.exclusao = true;
    }
  }


  Excluir() {
    this.service.Remover(this.patient.idpatient)
      .then(() => {})
      .catch(erro => erro);
    this.exclusao = false;
    setTimeout (() => this.Consultar(), 100);
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

  Fechar() {
    this.route.navigate(['/home']);
  }

  Voltar() {
    this.location.back();
  }
}
