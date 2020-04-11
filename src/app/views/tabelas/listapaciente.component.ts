import { FormGroup } from '@angular/forms';
import { PatientFiltro } from './../../zservice/servidor.service';
import { Router } from '@angular/router';
import { PacienteService } from './../../zservice/paciente.service';
import { Patient } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';

@Component({
  templateUrl: 'listapaciente.component.html',
  styleUrls: ['./listapaciente.component.css']
})
export class ListapacienteComponent implements OnInit {
  patients = [];
  patient = new Patient();
  totalRegistros = 0;
  filtro = new PatientFiltro();
  visible: boolean = true;
  camposbusca: SelectItem[];
  formulario: FormGroup;
  display: boolean = true;
  exclusao: boolean = false;

  constructor(private service: PacienteService,
              private route: Router) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome', value: {id: 1, name: 'Nome', code: '1'}},
      {label: 'Codigo', value: {id: 2, name: 'Codigo', code: '2'}},
      {label: 'Prontuario', value: {id: 2, name: 'Prontuario', code: '3'}},
      {label: 'Data Nasc', value: {id: 2, name: 'Data Nasc', code: '4'}}
    ];
  }

  onRowSelect(event) {
    this.patient = event.data;
  }

  Alterar() {
    if (this.patient.idpatient != null) {
      this.route.navigate(['/tabelas/listapaciente', this.patient.idpatient]);
    }
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

  ConfigurarVariavel(event) {
    const texto = document.getElementById('buscando') as HTMLInputElement;
    this.filtro.patientname = texto.value;
    this.Consultar();

  }

  AtivarExcluir() {
    this.exclusao = true;
  }


  Excluir() {
    this.service.Remover(this.patient.idpatient)
      .then(() => {})
      .catch(erro => erro);
      this.exclusao = false;
      setTimeout (() => this.Consultar(), 0
      );
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
