import { FormGroup } from '@angular/forms';
import { ProfissionalexecutanteService, ProfissionalExecutanteFiltro } from './../../zservice/profissionalexecutante.service';
import { Router } from '@angular/router';
import { ProfissionalExecutante } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import {Location} from '@angular/common';

@Component({
  selector: 'app-lista-executante',
  templateUrl: './lista-executante.component.html',
  styleUrls: ['./lista-executante.component.css']
})
export class ListaExecutanteComponent implements OnInit {
  profissionaisexec = [];
  profissional: ProfissionalExecutante;
  totalRegistros = 0;
  filtro = new ProfissionalExecutanteFiltro();
  camposbusca: any[];
  formulario: FormGroup;
  display = true;
  exclusao = false;

  constructor(private service: ProfissionalexecutanteService,
              private route: Router,
              private location: Location) { }

  ngOnInit() {
    this.camposbusca = [
      {label: 'Nome'},
      {label: 'Num Conselho'}
    ];
  }

  onRowSelect(event) {
    this.profissional = event.data;
  }

  Alterar() {
    if (this.profissional?.codigo != null) {
      this.route.navigate(['/listaprofexecutante', this.profissional.codigo]);
    }
  }

  PrimeiraSelecao() {
    this.profissional = this.profissionaisexec[0];
  }

  UltimaSelecao() {
    this.profissional = this.profissionaisexec[this.profissionaisexec.length - 1];
  }

  ProximaSelecao() {
    const valor = this.profissionaisexec.indexOf(this.profissional);
    this.profissional = this.profissionaisexec[valor + 1];
  }

  AnteriorSelecao() {
    const valor = this.profissionaisexec.indexOf(this.profissional);
    this.profissional = this.profissionaisexec[valor - 1];
  }

  Consultar(pagina = 0): Promise<any> {
    this.filtro.pagina = pagina;

    return this.service.Consultar(this.filtro)
      .then(response => {
        this.totalRegistros = response.total;
        this.profissionaisexec = response.profissionalexecutantes.content;
      }).catch(erro => console.log(erro));
  }


  BuscaDinamica() {
    const drop = $('#codigodrop :selected').text();
    const texto = document.getElementById('buscando') as HTMLInputElement;

    setTimeout (() => {
      if (drop === 'Nome') {
        this.filtro.nome = texto.value;
        this.Consultar();
      }

      if ((drop === 'Num Conselho') && (texto.value !== '')) {
        return this.service.BuscarListaPorId(texto.value)
          .then(response => {
            this.profissionaisexec = response;
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
