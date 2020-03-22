import { Router } from '@angular/router';
import { PacienteService, PacientesFiltro } from './../../zservice/paciente.service';
import { Patient } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  templateUrl: 'listapaciente.component.html',
  styleUrls: ['./listapaciente.component.css']
})
export class ListapacienteComponent implements OnInit {
  patients = [];
  totalRegistros = 0;
  filtro = new PacientesFiltro();

  constructor(private service: PacienteService, private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.patients = response.pacientes.content;
      }).catch(erro => console.log(erro));
  }

  Excluir(patient: Patient) {
    try {
      this.service.Remover(patient.idpatient);
      alert(patient.patientname + ' foi excluído');
      this.route.navigate(['/paciente']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
