import { Router } from '@angular/router';
import { ProfissionalsolicitanteService, ProfissionalSolicitanteFiltro } from './../../zservice/profissionalsolicitante.service';
import { ProfissionalSolicitante } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  templateUrl: 'listaprofsolicitante.component.html',
  styleUrls: ['./listaprofsolicitante.component.css']
})
export class ListaprofsolicitanteComponent implements OnInit {
  profissionaissol = [];
  totalRegistros = 0;
  filtro = new ProfissionalSolicitanteFiltro();

  constructor(private service: ProfissionalsolicitanteService, private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.profissionaissol = response.profissionalsolicitantes.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(profissionalsol: ProfissionalSolicitante) {
    try {
      this.service.Remover(profissionalsol.codigo);
      alert(profissionalsol.nome + ' foi excluído');
      this.route.navigate(['/profissionalsolicitante']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

}
