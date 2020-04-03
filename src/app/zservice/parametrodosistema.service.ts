import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParametrosDoSistema } from '../core/model';

export class ParametrosDosSistemaFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class ParametrodosistemaService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/parametrosdosistema`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: ParametrosDosSistemaFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const parametros = response;

        const resultado = {
          parametros,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(parametro): Promise<ParametrosDoSistema> {
    return this.http.post<ParametrosDoSistema>(`${this.url}`, parametro).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const parametro = response as ParametrosDoSistema;
        return parametro;
      });
  }

  Atualizar(parametro: ParametrosDoSistema): Promise<any> {
    return this.http.put(`${this.url}/${parametro.codigo}`, parametro)
      .toPromise()
      .then(response => {
        const parametroalterado = response as ParametrosDoSistema;
        return parametroalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  PegarImagem(codigo: number): Observable<Blob> {
    return this.http.get(`${this.url}/imagem/${codigo}`, { responseType: 'blob' });
  }

}
