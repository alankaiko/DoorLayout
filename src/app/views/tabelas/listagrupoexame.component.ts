import { GrupoprocedimentoService, GrupoProcedimentoFiltro } from './../../zservice/grupoprocedimento.service';
import { Router } from '@angular/router';
import { GrupoProcedimento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  templateUrl: 'listagrupoexame.component.html',
  styleUrls: ['./listagrupoexame.component.css']
})
export class ListagrupoexameComponent implements OnInit {
  grupos = [];
  totalRegistros = 0;
  filtro = new GrupoProcedimentoFiltro();

  constructor(private service: GrupoprocedimentoService, private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.grupos = response.grupoprocedimentos.content;
      }).catch(erro => console.log(erro));
  }

  Excluir(grupo: GrupoProcedimento) {
    try {
      this.service.Remover(grupo.codigo);
      alert(grupo.nome + ' foi excluído');
      this.route.navigate(['/grupoprocedimento']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
