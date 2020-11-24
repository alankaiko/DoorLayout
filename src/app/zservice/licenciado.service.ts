import { Licenciado } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class LicenciadoFiltro {
  pagina = 0;
  itensPorPagina = 7;
  licenciadopara: string;
}

@Injectable({
  providedIn: 'root'
})
export class LicenciadoService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/licenciados`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: LicenciadoFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const licenciados = response;

        const resultado = {
          licenciados,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(licenciado): Promise<Licenciado> {
    return this.http.post<Licenciado>(`${this.url}`, licenciado).toPromise();
  }

  BuscarListaPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/lista/${codigo}`).toPromise().then(response => response);
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const licenciado = response as Licenciado;
        return licenciado;
      });
  }

  Atualizar(licenciado: Licenciado): Promise<any> {
    return this.http.put(`${this.url}/${licenciado.codigo}`, licenciado)
      .toPromise()
      .then(response => {
        const licenciadoalterado = response as Licenciado;
        return licenciadoalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
