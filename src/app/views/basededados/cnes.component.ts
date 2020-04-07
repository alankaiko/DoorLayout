import { Router } from '@angular/router';
import { CnesService, CnesFiltro } from './../../zservice/cnes.service';
import { CNES } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  templateUrl: 'cnes.component.html',
  styleUrls: ['./cnes.component.css']
})
export class CnesComponent implements OnInit {
  listacnes = [];
  totalRegistros = 0;
  filtro = new CnesFiltro();

  constructor(private service: CnesService, private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.listacnes = response.cness.content;
      }).catch(erro => console.log(erro));
  }

  Excluir(cnes: CNES) {
    try {
      this.service.Remover(cnes.codigo);
      alert(cnes.sku + ' foi excluído');
      this.route.navigate(['/listacnes']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
