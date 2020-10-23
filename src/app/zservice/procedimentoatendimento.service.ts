import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProcedimentoAtendimento, ImagemImpressa, PaginaDeImagens } from './../core/model';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';

export class ProcedimentoAtendimentoFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class ProcedimentoatendimentoService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/procedimentos`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: ProcedimentoAtendimentoFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const procedimentos = response;

        const resultado = {
          procedimentos,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(procedimento): Promise<ProcedimentoAtendimento> {
    return this.http.post<ProcedimentoAtendimento>(`${this.url}`, procedimento).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const procedimento = response as ProcedimentoAtendimento;
        return procedimento;
      });
  }

  BuscarPorIdComImgLista(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/listaimg/${codigo}`)
      .toPromise()
      .then(response => {
        const procedimento = response as ProcedimentoAtendimento;
        return procedimento;
      });
  }

  BuscarCodProcedimento(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/codprocedimento/${codigo}`)
      .toPromise()
      .then(response => {
        const codprocedimento = response as number;
        return codprocedimento;
      });
  }

  Atualizar(procedimento: ProcedimentoAtendimento): Promise<any> {
    console.log(procedimento);
    try {
      return this.http.put(`${this.url}/${procedimento.codigo}`, procedimento)
      .toPromise()
      .then(response => {
        const procedimentoalterado = response as ProcedimentoAtendimento;
        return procedimentoalterado;
      });
    } catch (error) {
      console.log(error);
    }
  }

  AtualizarComImagens(procedimento: ProcedimentoAtendimento): Promise<any> {
    return this.http.put(`${this.url}/atualizarcomimagens/${procedimento.codigo}`, procedimento)
      .toPromise()
      .then(response => {
        const procedimentoalterado = response as ProcedimentoAtendimento;
        return procedimentoalterado;
      });
  }

  AtualizarComPaginas(procedimento: ProcedimentoAtendimento): Promise<any> {
    procedimento.listaimagem = null;
    procedimento.paginadeimagens.forEach(elo => {
      elo.imagemimpressa.forEach(alo =>  {
        alo.imagem.imagem = null;
      });
    });

    return this.http.put(`${this.url}/atualizarcompaginas/teste/${procedimento.codigo}`, procedimento)
      .toPromise()
      .then(response => {
        const procedimentoalterado = response as ProcedimentoAtendimento;
        return procedimentoalterado;
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

  PegarImagems(codigo: number): Observable<string> {
    return this.http.get(`${this.url}/imagemstring/${codigo}`, { responseType: 'text' });
  }

  PegarImagemString(codigo: number): Observable<string> {
    return this.http.get(`${this.url}/imagemstring/${codigo}`, { responseType: 'text' });
  }
}
