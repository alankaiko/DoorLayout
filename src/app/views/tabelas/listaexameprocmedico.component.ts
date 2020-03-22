import { Router } from '@angular/router';
import { ProcedimentomedicoService, ProcedimentoMedicoFiltro } from './../../zservice/procedimentomedico.service';
import { ProcedimentoMedico } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  templateUrl: 'listaexameprocmedico.component.html',
  styleUrls: ['./listaexameprocmedico.component.css']
})
export class ListaexameprocmedicoComponent implements OnInit {
  procedimentos = [];
  totalRegistros = 0;
  filtro = new ProcedimentoMedicoFiltro();

  constructor(private service: ProcedimentomedicoService, private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.procedimentos = response.procedimentos.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(procedimento: ProcedimentoMedico) {
    try {
      this.service.Remover(procedimento.codigo);
      alert(procedimento.nome + ' foi excluído');
      this.route.navigate(['/procedimentomedico']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}

