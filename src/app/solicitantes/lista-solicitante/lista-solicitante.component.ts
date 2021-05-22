import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfissionalsolicitanteService, ProfissionalSolicitanteFiltro } from './../../zservice/profissionalsolicitante.service';
import { ProfissionalSolicitante } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-solicitante',
  templateUrl: './lista-solicitante.component.html',
  styleUrls: ['./lista-solicitante.component.css']
})
export class ListaSolicitanteComponent implements OnInit {
  profissionaissol = [];
  profissional: ProfissionalSolicitante;
  totalRegistros = 0;
  filtro = new ProfissionalSolicitanteFiltro();
  textodocampo: string;
  dropselecionado: string = 'nome';
  camposbusca: any[];
  formulario: FormGroup;
  display = true;
  exclusao = false;

  constructor(private service: ProfissionalsolicitanteService,
              private route: Router,
              private location: Location) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome', value: 'nome'},
      {label: 'Num Conselho', value: 'conselho'}
    ];
  }

  onRowSelect(event) {
    this.profissional = event.data;
  }

  Alterar() {
    if (this.profissional?.codigo != null) {
      this.route.navigate(['/listaprofsolicitante', this.profissional.codigo]);
    }
  }

  PrimeiraSelecao() {
    this.profissional = this.profissionaissol[0];
  }

  UltimaSelecao() {
    this.profissional = this.profissionaissol[this.profissionaissol.length - 1];
  }

  ProximaSelecao() {
    const valor = this.profissionaissol.indexOf(this.profissional);
    this.profissional = this.profissionaissol[valor + 1];
  }

  AnteriorSelecao() {
    const valor = this.profissionaissol.indexOf(this.profissional);
    this.profissional = this.profissionaissol[valor - 1];
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.profissionaissol = response.profissionalsolicitantes.content;
      }).catch(erro => console.log(erro));
  }


  BuscaDinamica() {

 

    setTimeout (() => {
      if (this.dropselecionado === 'nome') {
        this.filtro.nome = this.textodocampo;
        this.Consultar();
      }

      if ((this.dropselecionado === 'conselho') && (this.textodocampo !== '')) {
        return this.service.BuscarListaPorId(this.textodocampo)
          .then(response => {
            this.profissionaissol = response;
          }).catch(erro => console.log(erro));
      }
    }, 1000);
  }


  AtivarExcluir() {
    if (this.profissional.codigo != null) {
      this.exclusao = true;
    }
  }


  Excluir() {
    this.service.Remover(this.profissional.codigo).then(() => {}).catch(erro => erro);
    this.exclusao = false;
    setTimeout (() => this.Consultar(), 100);
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.Consultar(pagina);
  }

  Voltar() {
    this.location.back();
  }

  Fechar() {
    this.route.navigate(['/home']);
  }

}
