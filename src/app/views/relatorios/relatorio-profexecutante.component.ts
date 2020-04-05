import { ProfissionalexecutanteService } from './../../zservice/profissionalexecutante.service';
import { ConvenioService } from './../../zservice/convenio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-profexecutante.component.html',
  styleUrls: ['./relatorio-profexecutante.component.css']
})
export class RelatorioProfexecutanteComponent implements OnInit {

  constructor(private service: ProfissionalexecutanteService) { }

  ngOnInit() {
  }

  GerarProfExecutante() {
    this.service.PorProfExecutante()
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      });
  }
}
