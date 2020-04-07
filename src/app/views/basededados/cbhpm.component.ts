import { Router } from '@angular/router';
import { CbhpmService, CbhpmFiltro } from './../../zservice/cbhpm.service';
import { CBHPM } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  templateUrl: 'cbhpm.component.html',
  styleUrls: ['./cbhpm.component.css']
})
export class CbhpmComponent implements OnInit {
  lista = [];
  totalRegistros = 0;
  filtro = new CbhpmFiltro();

  constructor(private service: CbhpmService, private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.lista = response.cbhpms.content;
      }).catch(erro => console.log(erro));
  }

  Excluir(cbhpm: CBHPM) {
    try {
      this.service.Remover(cbhpm.codigo);
      alert(cbhpm.sku + ' foi excluído');
      this.route.navigate(['/listacbhpm']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
