import { Router } from '@angular/router';
import { CrmService, CrmFiltro } from './../../zservice/crm.service';
import { Crm } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  templateUrl: 'crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {
  listacrm = [];
  totalRegistros = 0;
  filtro = new CrmFiltro();

  constructor(private service: CrmService, private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.listacrm = response.crms.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(crm: Crm) {
    try {
      this.service.Remover(crm.codigo);
      alert(crm.codigo + ' foi excluído');
      this.route.navigate(['/listacrm']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
