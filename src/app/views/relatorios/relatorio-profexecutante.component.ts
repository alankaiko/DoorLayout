import { ProfissionalexecutanteService } from './../../zservice/profissionalexecutante.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-profexecutante.component.html',
  styleUrls: ['./relatorio-profexecutante.component.css']
})
export class RelatorioProfexecutanteComponent implements OnInit {
  crms: any[];
  estados: any[];
  estadoselecionado: number;
  crmselecionado: number;

  constructor(private service: ProfissionalexecutanteService) { }

  ngOnInit() {
    this.BuscarCrms();
    this.BuscarEstados();
  }

  GerarProfExecutante() {
    const dropcrm = $('#dropcrm :selected').text();
    const dropestado = $('#dropestado :selected').text();

    this.service.PorProfExecutante(dropcrm, dropestado)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      });
  }

  BuscarCrms() {
    this.service.BuscarSiglasCrm().then(lista => {
      this.crms = lista.map(crm => ({label: crm.descricao, value: crm.codigo}));
    }).catch(erro => erro);
  }

  BuscarEstados() {
    this.service.BuscarEstados().then(lista => {
      this.estados = lista.map(estado => ({label: estado.uf, value: estado.codigo}));
    }).catch(erro => erro);
  }
}
