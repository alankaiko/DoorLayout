import { PaginaDeImagens } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


export class PaginaImagensFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class PaginaimagensService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/paginasimagens`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: PaginaImagensFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const paginas = response;

        const resultado = {
          paginas,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(paginas): Promise<PaginaDeImagens> {
    return this.http.post<PaginaDeImagens>(`${this.url}`, paginas).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const pagina = response as PaginaDeImagens;
        return pagina;
      });
  }

  Atualizar(paginas: PaginaDeImagens): Promise<any> {
    return this.http.put(`${this.url}/${paginas.codigo}`, paginas)
      .toPromise()
      .then(response => {
        const paginaalterado = response as PaginaDeImagens;
        return paginaalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
