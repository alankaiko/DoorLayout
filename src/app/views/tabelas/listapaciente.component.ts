import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { PacienteService, PacientesFiltro } from './../../zservice/paciente.service';
import { Patient } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/api';

@Component({
  templateUrl: 'listapaciente.component.html',
  styleUrls: ['./listapaciente.component.css'],
  providers: [ MessageService , ConfirmationService]
})
export class ListapacienteComponent implements OnInit {
  patients = [];
  totalRegistros = 0;
  filtro = new PacientesFiltro();
  visible: boolean = true;

  constructor(private service: PacienteService,
              private route: Router,
              private confirmation: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;
    this.filtro.servidor = false;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.patients = response.pacientes.content;
      }).catch(erro => console.log(erro));
  }

  ConfirmarExclusao(patient: Patient) {
    this.confirmation.confirm({
      message: 'Deseja Excluir: ' + patient.patientname.toUpperCase(),
      accept: () => {
        this.Excluir(patient);
      }
    });
  }

  Excluir(patient: Patient) {
    this.service.Remover(patient.idpatient)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Pesssoa excluída com sucesso!' });
      })
      .catch(erro => erro);
      this.visible = false;
      setTimeout (() => this.visible = true, 0);
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
