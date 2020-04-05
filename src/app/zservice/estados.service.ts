import { Estado } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class EstadosFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/estados`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: EstadosFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const estados = response;

        const resultado = {
          estados,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(estado): Promise<Estado> {
    return this.http.post<Estado>(`${this.url}`, estado).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const estado = response as Estado;
        return estado;
      });
  }

  Atualizar(estado: Estado): Promise<any> {
    return this.http.put(`${this.url}/${estado.codigo}`, estado)
      .toPromise()
      .then(response => {
        const estadoalterado = response as Estado;
        return estadoalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
