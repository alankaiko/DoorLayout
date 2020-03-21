import { Router } from '@angular/router';
import { AbreviaturaService, AbreviaturaFiltro } from './../../zservice/abreviatura.service';
import { Abreviatura } from './../../core/model';

import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  templateUrl: 'listaabreviatura.component.html'
})
export class ListaabreviaturaComponent implements OnInit {
  abreviaturas = [];
  totalRegistros = 0;
  filtro = new AbreviaturaFiltro();

  constructor(private service: AbreviaturaService, private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.abreviaturas = response.abreviaturas.content;
      }).catch(erro => console.log(erro));
  }

  Excluir(abreviatura: Abreviatura) {
    try {
      this.service.Remover(abreviatura.codigo)
        .then(() => {
          alert(abreviatura.texto + ' foi excluído');
          this.route.navigate(['/abreviaturas']);
        });
    } catch (error) {
      console.log('erro ao excluir');
    }
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
