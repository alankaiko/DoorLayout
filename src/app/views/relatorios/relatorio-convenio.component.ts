import { ConvenioService } from './../../zservice/convenio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-convenio.component.html',
  styleUrls: ['./relatorio-convenio.component.css']
})
export class RelatorioConvenioComponent implements OnInit {

  constructor(private service: ConvenioService) { }

  ngOnInit() {
  }

  GerarConvenio() {
    this.service.PorConvenio()
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      });
  }
}
