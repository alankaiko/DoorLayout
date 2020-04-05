import { Sigla } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class SiglaFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class SiglaService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/siglas`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: SiglaFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const siglas = response;

        const resultado = {
          siglas,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(sigla): Promise<Sigla> {
    return this.http.post<Sigla>(`${this.url}`, sigla).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const sigla = response as Sigla;
        return sigla;
      });
  }

  Atualizar(sigla: Sigla): Promise<any> {
    return this.http.put(`${this.url}/${sigla.codigo}`, sigla)
      .toPromise()
      .then(response => {
        const siglaalterado = response as Sigla;
        return siglaalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
