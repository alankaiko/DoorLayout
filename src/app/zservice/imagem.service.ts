import { Observable } from 'rxjs';
import { Imagem } from './../core/model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ImagemFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class ImagemService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/imagens`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: ImagemFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const imagens = response;

        const resultado = {
          imagens,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(imagem): Promise<Imagem> {
    return this.http.post<Imagem>(`${this.url}`, imagem).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const imagem = response as Imagem;
        return imagem;
      });
  }

  Atualizar(imagem: Imagem): Promise<any> {
    return this.http.put(`${this.url}/${imagem.codigo}`, Imagem)
      .toPromise()
      .then(response => {
        const imagemalterado = response as Imagem;
        return imagemalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  ListarPorCodigouid(codigouid: string): Promise<any> {
    return this.http.get(`${this.url}/listadicom/${codigouid}`).toPromise().then(response => response);
  }

  PegarImagem(codigo: number): Observable<Blob> {
    return this.http.get(`${this.url}/imagem/${codigo}`, { responseType: 'blob' });
  }

  PegarImagems(codigo: number): Observable<string> {
    return this.http.get(`${this.url}/imagemstring/${codigo}`, { responseType: 'text' });
  }

  PegarImagemString(codigo: number): Observable<string> {
    return this.http.get(`${this.url}/imagemstring/${codigo}`, { responseType: 'text' });
  }

}
