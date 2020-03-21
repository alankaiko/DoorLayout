import { Router } from '@angular/router';
import { EspecialidademedicaService, EspecialidadeMedicaFiltro } from './../../zservice/especialidademedica.service';
import { EspecialidadeMedica } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  templateUrl: 'especialidademedica.component.html'
})
export class EspecialidademedicaComponent implements OnInit {
  especialidades = [];
  totalRegistros = 0;
  filtro = new EspecialidadeMedicaFiltro();

  constructor(private service: EspecialidademedicaService, private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.especialidades = response.especialidades.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(especialidades: EspecialidadeMedica) {
    try {
      this.service.Remover(especialidades.codigo);
      alert(especialidades.nome + ' foi excluído');
      this.route.navigate(['/listaespecialidades']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
