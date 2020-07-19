import { ModeloLaudoClienteSalvo } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ModeloLaudoClienteSalvoFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class ModelolaudoclientesalvoService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/modelosalvos`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: ModeloLaudoClienteSalvoFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const abreviaturas = response;

        const resultado = {
          abreviaturas,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(modelo): Promise<ModeloLaudoClienteSalvo> {
    return this.http.post<ModeloLaudoClienteSalvo>(`${this.url}`, modelo).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const modelo = response as ModeloLaudoClienteSalvo;
        return modelo;
      });
  }

  Atualizar(modelo: ModeloLaudoClienteSalvo): Promise<any> {
    return this.http.put(`${this.url}/${modelo.codigo}`, modelo)
      .toPromise()
      .then(response => {
        const modeloalterado = response as ModeloLaudoClienteSalvo;
        return modeloalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
