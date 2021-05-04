import { PacienteFiltro } from './servidor.service';
import { Paciente } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/servidor`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: PacienteFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });


    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (filtro.idade) {
      params = params.append('idade', filtro.idade);
    }

    if (filtro.dicom) {
      params = params.append('dicom', 'true');
    }

    if (filtro.datanasc) {
      params = params.append('datanasc', moment(filtro.datanasc).format('YYYY-MM-DD'));
    }

    if (filtro.sexo) {
      params = params.append('sexo', filtro.sexo);
    }

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const pacientes = response;

        const resultado = {
          pacientes,
          total: response.totalElements
        };

        return resultado;
      });
  }

  VerificarSeNomeExiste(filtro: PacienteFiltro): Promise<any> {
    let params = new HttpParams();

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (filtro.datanasc) {
      params = params.append('datanasc', moment(filtro.datanasc).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.url}?verificarexistencia`,{ params })
      .toPromise()
      .then(response => {
        const valor = response as boolean;
        return valor;
      });
  }

  Adicionar(paciente): Promise<Paciente> {
    return this.http.post<Paciente>(`${this.url}`, paciente).toPromise();
  }

  BuscarPorId(codigo: number): Promise<Paciente> {
    return this.http.get<Paciente>(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const paciente = response as Paciente;
        this.converterStringsParaDatas([paciente]);
        return paciente;
      });
  }

  BuscarListaPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/lista/${codigo}`).toPromise().then(response => response);
  }

  Atualizar(paciente: Paciente): Promise<any> {
    return this.http.put(`${this.url}/${paciente.codigo}`, paciente)
      .toPromise()
      .then(response => {
        const pacientealterado = response as Paciente;
        this.converterStringsParaDatas([pacientealterado]);

        return pacientealterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`).toPromise().then(() => null);
  }

  private converterStringsParaDatas(pacientes: Paciente[]) {
    for (const paciente of pacientes) {
      if (paciente.datanasc !== null) {
        paciente.datanasc = moment(paciente.datanasc, 'YYYY-MM-DD').toDate();
      }

      if (paciente.datacriacao !== null) {
        paciente.datacriacao = moment(paciente.datacriacao, 'YYYY-MM-DD').toDate();
      }
    }
  }

}
