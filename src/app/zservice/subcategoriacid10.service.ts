
import { AbreviaturaFiltro } from './abreviatura.service';
import { Abreviatura, SubcategoriaCid10 } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class SubcategoriascidFiltro {
  pagina = 0;
  itensPorPagina = 30;
  nome: string;
  codigotexto: string;
  nomecategoria: string;
  nomegrupo: string;
  nomecapitulo: string;
}

@Injectable({
  providedIn: 'root'
})
export class Subcategoriacid10Service {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/subcategoriacid`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }
  Consultar(filtro: SubcategoriascidFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const subcategorias = response;

        const resultado = {
          subcategorias,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(subcategoria): Promise<SubcategoriaCid10> {
    return this.http.post<SubcategoriaCid10>(`${this.url}`, subcategoria).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const subcategoria = response as SubcategoriaCid10;
        return subcategoria;
      });
  }

  Atualizar(subcategoria: SubcategoriaCid10): Promise<any> {
    return this.http.put(`${this.url}/${subcategoria.codigo}`, subcategoria)
      .toPromise()
      .then(response => {
        const subcategoriaalterado = response as SubcategoriaCid10;
        return subcategoriaalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
