import { Router } from '@angular/router';
import { TextopessoalService, TextoPessoalFiltro } from './../../zservice/textopessoal.service';
import { TextoPessoal } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  templateUrl: 'listatextopessoal.component.html',
  styleUrls: ['./listatextopessoal.component.css']
})
export class ListatextopessoalComponent implements OnInit {
  textospessoais = [];
  totalRegistros = 0;
  filtro = new TextoPessoalFiltro();

  constructor(private service: TextopessoalService, private route: Router) { }

  ngOnInit() {}

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.textospessoais = response.textopessoals.content;
      }).catch(erro => console.log(erro));
  }


  Excluir(textopessoal: TextoPessoal) {
    try {
      this.service.Remover(textopessoal.codigo);
      alert(textopessoal.abreviatura + ' foi excluído');
      this.route.navigate(['/tabelas/listatextopessoal']);
    } catch (error) {
      console.log('erro ao excluir');
    }

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }
}
