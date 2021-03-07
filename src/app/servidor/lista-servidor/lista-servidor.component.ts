import { ServidorService, PacienteFiltro } from './../../zservice/servidor.service';
import { Paciente } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-lista-servidor',
  templateUrl: './lista-servidor.component.html',
  styleUrls: ['./lista-servidor.component.css']
})
export class ListaServidorComponent implements OnInit {
  pacientes = [];
  totalRegistros = 0;
  filtro = new PacienteFiltro();

  constructor(private service: ServidorService) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;
    this.filtro.servidor = true;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.pacientes = response.pacientes.content;
    }).catch(erro => console.log(erro));
  }


  BuscarPeloId(paciente: Paciente) {
    this.service.BuscarPorId(paciente.codigo).then(response => this.pacientes = response);
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
