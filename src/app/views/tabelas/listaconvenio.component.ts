import { FormBuilder, FormGroup } from '@angular/forms';
import { Convenio } from './../../core/model';
import { Router } from '@angular/router';
import { ConvenioFiltro, ConvenioService } from './../../zservice/convenio.service';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';



@Component({
  templateUrl: 'listaconvenio.component.html',
  styleUrls: ['./listaconvenio.component.css']
})
export class ListaconvenioComponent implements OnInit {
  convenios = [];
  convenio: Convenio;
  totalRegistros = 0;
  filtro = new ConvenioFiltro();
  visible: boolean = true;
  camposbusca: SelectItem[];
  formulario: FormGroup;
  display: boolean = true;
  exclusao: boolean = false;



  constructor(private service: ConvenioService,
              private route: Router) {
              }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome', value: {id: 1, name: 'Nome', code: '1'}},
      {label: 'Codigo', value: {id: 2, name: 'Codigo', code: '2'}}
    ];
  }

  onRowSelect(event) {
    this.convenio = event.data;
  }

  Alterar() {
    if (this.convenio?.codigo != null) {
      this.route.navigate(['/tabelas/listaconvenio', this.convenio.codigo]);
    }
  }


  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.convenios = response.convenios.content;
      }).catch(erro => console.log(erro));
  }

  ConfigurarVariavel(event) {
    const texto = document.getElementById('buscando') as HTMLInputElement;
    this.filtro.nome = texto.value;
    this.Consultar();

  }

  AtivarExcluir() {
    this.exclusao = true;
  }


  Excluir() {
    this.service.Remover(this.convenio.codigo)
      .then(() => {})
      .catch(erro => erro);
      this.exclusao = false;
      setTimeout (() => this.Consultar(), 0
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

}
