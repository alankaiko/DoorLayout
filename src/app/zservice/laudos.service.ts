import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Laudo } from '../core/model';

export class LaudoFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class LaudosService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/laudos`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: LaudoFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const filtros = response;

        const resultado = {
          filtros,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(laudo): Promise<Laudo> {
    return this.http.post<Laudo>(`${this.url}`, laudo).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const laudo = response as Laudo;
        return laudo;
      });
  }

  Atualizar(laudo: Laudo): Promise<any> {
    return this.http.put(`${this.url}/${laudo.codigo}`, laudo)
      .toPromise()
      .then(response => {
        const laudoalterado = response as Laudo;
        return laudoalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
