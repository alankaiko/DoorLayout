import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { ProfissionalsolicitanteService, ProfissionalSolicitanteFiltro } from './../../zservice/profissionalsolicitante.service';
import { ProfissionalSolicitante } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, ConfirmationService, SelectItem } from 'primeng/api';

@Component({
  templateUrl: 'listaprofsolicitante.component.html',
  styleUrls: ['./listaprofsolicitante.component.css']
})
export class ListaprofsolicitanteComponent implements OnInit {
  profissionaissol = [];
  profissional: ProfissionalSolicitante;
  totalRegistros = 0;
  filtro = new ProfissionalSolicitanteFiltro();
  visible: boolean = true;
  camposbusca: SelectItem[];
  formulario: FormGroup;
  display: boolean = true;
  exclusao: boolean = false;

  constructor(private service: ProfissionalsolicitanteService,
              private route: Router) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome', value: {id: 1, name: 'Nome', code: '1'}},
      {label: 'Num Conselho', value: {id: 2, name: 'Num Conselho', code: '2'}}
    ];
  }

  onRowSelect(event) {
    this.profissional = event.data;
  }

  Alterar() {
    if (this.profissional.codigo != null) {
      this.route.navigate(['/tabelas/listaprofsolicitante', this.profissional.codigo]);
    }
  }


  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.profissionaissol = response.profissionalsolicitantes.content;
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
    this.service.Remover(this.profissional.codigo)
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
