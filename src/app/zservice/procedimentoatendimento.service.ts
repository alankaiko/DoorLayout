import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProcedimentoAtendimento } from './../core/model';
import { Injectable } from '@angular/core';

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

  Atualizar(procedimento: ProcedimentoAtendimento): Promise<any> {
    return this.http.put(`${this.url}/${procedimento.codigo}`, procedimento)
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

}
