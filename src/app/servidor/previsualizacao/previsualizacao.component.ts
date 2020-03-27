import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { Patient, Series, Study, Instance } from './../../core/model';
import { ServidorService } from './../../zservice/servidor.service';
import { Component, OnInit } from '@angular/core';

export interface ArvoreDeDados {
  data?: any;
  children?: ArvoreDeDados[];
  leaf?: boolean;
  expanded?: boolean;
}

@Component({
  selector: 'app-previsualizacao',
  templateUrl: './previsualizacao.component.html',
  styleUrls: ['./previsualizacao.component.css']
})
export class PrevisualizacaoComponent implements OnInit {
  patient: Patient;
  lista: ArvoreDeDados[];

  constructor(private service: ServidorService, private route: ActivatedRoute) { }

  ngOnInit() {
    const idpatient = this.route.snapshot.params.idpatient;

    if (idpatient) {
      this.CarregarDadosPatient(idpatient);
    }
  }

  CarregarDadosPatient(idpatient: number) {
    this.service.BuscarPorId(idpatient).then(response => {
      this.patient = response;
      this.lista = this.CriarTabela().data;
    });
  }

  CriarTabela() {
    return {
      'data': this.CriarLinhaEstudo()
    };
  }

  CriarLinhaEstudo() {
    const lista = [];

    this.patient.studyes.forEach((el) => {
      const pega = {
        data: {
          'codigo': el.idstudy,
          'descricao': el.studydescription,
          'chave': el.accessionnumber,
          'date': el.studydatetime
        },
        children: this.CriarLinhaSeries(el.series)
      };
      lista.push(pega);
    });
    return lista;
  }

  CriarLinhaSeries(serie: Array<Series>) {
    const listadenovo = [];

    serie.forEach((el) => {
      const pegadenovo = {
        data: {
          'codigo': el.idseries,
          'descricao': el.seriesdescription,
          'chave': el.seriesinstanceuid
        },
        children: this.CriarLinhaInstancia(el.instance)
      };
      listadenovo.push(pegadenovo);
    });
    return listadenovo;
  }

  CriarLinhaInstancia(instance: Array<Instance>) {
    const otralista = [];

    instance.forEach((el) => {
      const otrapega = {
        data: {
          'codigo': el.idinstance,
          'descricao': el.sopinstanceuid,
          'chave': el.mediastoragesopinstanceuid,
          'date': '',
          'viewer': ''
        }
      };
      otralista.push(otrapega);
    });
    return otralista;
  }
}
