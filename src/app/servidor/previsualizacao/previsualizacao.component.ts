import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { Paciente, Series, Instancia } from './../../core/model';
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
  paciente: Paciente;
  lista: ArvoreDeDados[];

  constructor(private service: ServidorService, private route: ActivatedRoute) { }

  ngOnInit() {
    const codigo = this.route.snapshot.params.cod;

    if (codigo) {
      this.CarregarDadosPaciente(1);
    }
  }

  CarregarDadosPaciente(codigo: number) {
    return this.service.BuscarPorId(codigo).then(response => {
      this.paciente = response;
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
    console.log('lista aqui ' + this.paciente);
    this.paciente.estudos.forEach((el) => {
      const pega = {
        data: {
          'codigo': el.codigo,
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
          'codigo': el.codigo,
          'descricao': el.seriesdescription,
          'chave': el.seriesinstanceuid
        },
        children: this.CriarLinhaInstancia(el.instancias)
      };
      listadenovo.push(pegadenovo);
    });
    return listadenovo;
  }

  CriarLinhaInstancia(instance: Array<Instancia>) {
    const otralista = [];

    instance.forEach((el) => {
      const otrapega = {
        data: {
          'codigo': el.codigo,
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