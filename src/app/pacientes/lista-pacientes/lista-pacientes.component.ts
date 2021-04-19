import { FormGroup } from '@angular/forms';
import { PacienteFiltro } from './../../zservice/servidor.service';
import { Router } from '@angular/router';
import { PacienteService } from './../../zservice/paciente.service';
import { Paciente } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.css']
})
export class ListaPacientesComponent implements OnInit {
  pacientes = [];
  paciente: Paciente;
  totalRegistros = 0;
  filtro = new PacienteFiltro();
  camposbusca: any[];
  formulario: FormGroup;
  display = true;
  exclusao = false;

  constructor(private service: PacienteService,
              private route: Router,
              private location: Location) { }

  ngOnInit() {
    this.CriarCamposBusca();

    setTimeout (() => document.querySelector('.ui-dialog-titlebar-close').addEventListener('click', () => this.Fechar()), 0);
  }

  private CriarCamposBusca() {
    this.camposbusca = [
      {label: 'Nome'},
      {label: 'Prontuario'},
      {label: 'Data Nasc'},
      {label: 'Data Cad'}
    ];
  }

  onRowSelect(event) {
    this.paciente = event.data;
  }

  Alterar() {
    if (this.paciente.codigo != null) {
      this.route.navigate(['/listapaciente', this.paciente.codigo]);
    }
  }

  PrimeiraSelecao() {
    this.paciente = this.pacientes[0];
  }

  UltimaSelecao() {
    this.paciente = this.pacientes[this.pacientes.length - 1];
  }

  ProximaSelecao() {
    const valor = this.pacientes.indexOf(this.paciente);
    this.paciente = this.pacientes[valor + 1];
  }

  AnteriorSelecao() {
    const valor = this.pacientes.indexOf(this.paciente);
    this.paciente = this.pacientes[valor - 1];
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;
    this.filtro.servidor = false;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.pacientes = response.pacientes.content;
      }).catch(erro => console.log(erro));
  }

  BuscaDinamica() {
    const drop = $('#codigodrop :selected').text();
    const texto = document.getElementById('buscando') as HTMLInputElement;

    setTimeout (() => {
      if (drop === 'Nome') {
        this.filtro.datanasc = null;
        this.filtro.nome = texto.value;
        this.Consultar();
      }

      if ((drop === 'Prontuario') && (texto.value !== '')) {
        const numero = +texto.value;
        return this.service.BuscarListaPorId(numero)
          .then(response => {
            this.pacientes = response;
          }).catch(erro => console.log(erro));
      }
    }, 1000);
  }

  AtivarExcluir() {
    if (this.paciente.codigo != null) {
      this.exclusao = true;
    }
  }

  Excluir() {
    this.service.Remover(this.paciente.codigo).then(() => {}).catch(erro => erro);
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
