import { ProfissionalExecutante, Sigla, Estado } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ProfissionalExecutanteFiltro {
  pagina = 0;
  itensPorPagina = 10;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfissionalexecutanteService {
  url: string;
  urlcrm: string;
  urlestado: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/profissionaisexecutantes`;
    this.urlcrm = `${environment.apiUrl}/siglas`;
    this.urlestado = `${environment.apiUrl}/estados`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  BuscarListaPorId(descricao: string): Promise<any> {
    return this.http.get(`${this.url}/lista/${descricao}`).toPromise().then(response => response);
  }

  Consultar(filtro: ProfissionalExecutanteFiltro): Promise<any> {
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
        const profissionalexecutantes = response;

        const resultado = {
          profissionalexecutantes,
          total: response.totalElements
        };

        return resultado;
      });
  }


  Adicionar(profissionalexecutante): Promise<ProfissionalExecutante> {
    return this.http.post<ProfissionalExecutante>(`${this.url}`, profissionalexecutante).toPromise();
  }

  VerificarSeNomeExiste(nome: string): Promise<any> {
    return this.http.get(`${this.url}/verificar/${nome}`)
      .toPromise()
      .then(response => {
        const valor = response as boolean;
        return valor;
      });
  }

  BuscarPorId(codigo: number): Promise<ProfissionalExecutante> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const profissionalexecutante = response as ProfissionalExecutante;
        return profissionalexecutante;
      });
  }

  Atualizar(profissionalexecutante: ProfissionalExecutante): Promise<any> {
    return this.http.put(`${this.url}/${profissionalexecutante.codigo}`, profissionalexecutante)
      .toPromise()
      .then(response => {
        const profissionalexecutantealterado = response as ProfissionalExecutante;
        return profissionalexecutantealterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  PorProfExecutante(descricao: string, uf: string) {
    return this.http.get(`${this.url}/relatorios/por-executante/${descricao}/${uf}`,
      { responseType: 'blob' })
      .toPromise();
  }

  BuscarSiglasCrm() {
    return this.http.get<Sigla[]>(this.urlcrm).toPromise();
  }

  BuscarEstados() {
    return this.http.get<Estado[]>(this.urlestado).toPromise();
  }
}
