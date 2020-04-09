import { ModeloLaudoProc } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ModeloLaudoProcFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class ModelolaudoprocService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/modelosprocedimento`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: ModeloLaudoProcFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const modelos = response;

        const resultado = {
          modelos,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(modelo): Promise<ModeloLaudoProc> {
    return this.http.post<ModeloLaudoProc>(`${this.url}`, modelo).toPromise();
  }

  ListarPorProcedimento(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/proc/${codigo}`).toPromise()
    .then(response => response);
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const modelo = response as ModeloLaudoProc;
        return modelo;
      });
  }

  Atualizar(modelo: ModeloLaudoProc): Promise<any> {
    return this.http.put(`${this.url}/${modelo.codigo}`, modelo)
      .toPromise()
      .then(response => {
        const modeloalterado = response as ModeloLaudoProc;
        return modeloalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
