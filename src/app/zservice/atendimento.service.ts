import { Atendimento, Paciente, Convenio, ProfissionalSolicitante, Crm, Sigla, Estado, SubcategoriaCid10, ProfissionalExecutante } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

export class AtendimentoFilter {
  pagina = 0;
  itensPorPagina = 14;
  pacientenome: string;
  solicitantenome: string;
  datainicial: Date;
  datafinal: Date;
  datanascpaciente: Date;
}

export class PdfFiltroDados {
  procedimento: string;
  executante: string;
  codigoprocedimento: string;
}

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {
  url: string;
  conveniourl: string;
  pacienteurl: string;
  solicitanteurl: string;
  siglaurl: string;
  estadosurl: string;
  urlcids: string;
  executanteurl: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/atendimentos`;
    this.conveniourl = `${environment.apiUrl}/convenios`;
    this.pacienteurl = `${environment.apiUrl}/servidor`;
    this.solicitanteurl = `${environment.apiUrl}/profissionaissolicitantes`;
    this.siglaurl = `${environment.apiUrl}/siglas`;
    this.urlcids = `${environment.apiUrl}/subcategoriacid`;
    this.estadosurl = `${environment.apiUrl}/estados`;
    this.executanteurl = `${environment.apiUrl}/profissionaisexecutantes`;
   }


   Consultar(filtro: AtendimentoFilter): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });


    if (filtro.pacientenome) {
      params = params.append('pacientenome', filtro.pacientenome);
    }

    if (filtro.solicitantenome) {
      params = params.append('solicitantenome', filtro.solicitantenome);
    }

    if (filtro.datainicial) {
      params = params.append('datainicial', moment(filtro.datainicial).format('YYYY-MM-DD'));
    }

    if (filtro.datafinal) {
      params = params.append('datafinal', moment(filtro.datafinal).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const atendimentos = response;

        const resultado = {
          atendimentos,
          total: response.totalElements
        };

        return resultado;
      });
  }

  BuscarListaPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/lista/${codigo}`).toPromise().then(response => response);
  }

  BuscarListaPorNomePaciente(nome: string): Promise<any> {
    return this.http.get(`${this.url}/listapac/${nome}`).toPromise().then(response => response);
  }

  Adicionar(atendimento: Atendimento): Promise<Atendimento> {
    return this.http.post<Atendimento>(this.url, atendimento).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const atendimento = response as Atendimento;
        this.converterStringsParaDatas([atendimento]);
        return atendimento;
      });
   }

  BuscarProcedimentosPorAt(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
     .toPromise()
     .then(response => {
       const atendimento = response as Atendimento;
       return atendimento;
     });

  }

   Atualizar(atendimento: Atendimento): Promise<any> {
     return this.http.put(`${this.url}/${atendimento.codigo}`, atendimento)
      .toPromise()
      .then(response => {
        const atendimentoalterado = response as Atendimento;
        this.converterStringsParaDatas([atendimentoalterado]);
        return atendimentoalterado;
      });
   }

   Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  ListarPacientes(): Promise<Paciente[]> {
    return this.http.get<Paciente[]>(this.pacienteurl).toPromise();
  }

  ListarAtendimentos(): Promise<Atendimento[]> {
    return this.http.get<Atendimento[]>(this.url).toPromise();
  }

  ListarConvenios(): Promise<Convenio[]> {
    return this.http.get<Convenio[]>(this.conveniourl).toPromise();
  }

  ListarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosurl).toPromise();
  }

  ListarExecutantes(): Promise<ProfissionalExecutante[]> {
    return this.http.get<ProfissionalExecutante[]>(this.executanteurl).toPromise();
  }

  ListarSolicitantes(): Promise<ProfissionalSolicitante[]> {
    return this.http.get<ProfissionalSolicitante[]>(this.solicitanteurl).toPromise();
  }

  ListarSigla(): Promise<Sigla[]> {
    return this.http.get<Sigla[]>(this.siglaurl).toPromise();
  }

  ListarSubcategoriaCid(): Promise<SubcategoriaCid10[]> {
    return this.http.get<SubcategoriaCid10[]>(this.urlcids).toPromise();
  }

  BuscarPorIdPaciente(codigo: number): Promise<Paciente> {
    return this.http.get<Paciente>(`${this.pacienteurl}/${codigo}`)
      .toPromise()
      .then(response => {
        const paciente = response as Paciente;
        this.converterStringsParaDatasPat([paciente]);
        return paciente;
      });
  }

  BuscarPorIdProf(codigo: number): Promise<any> {
    return this.http.get(`${this.solicitanteurl}/${codigo}`)
      .toPromise()
      .then(response => {
        const profissionalsolicitante = response as ProfissionalSolicitante;
        return profissionalsolicitante;
      });
  }

  private converterStringsParaDatasPat(pacientes: Paciente[]) {
    for (const paciente of pacientes) {
      if (paciente.datanasc !== null) {
        paciente.datanasc = moment(paciente.datanasc, 'YYYY-MM-DD').toDate();
      }

      paciente.datacriacao = moment(paciente.datacriacao, 'YYYY-MM-DD').toDate();
    }
  }

  private converterStringsParaDatas(atendimentos: Atendimento[]) {
    for (const atendimento of atendimentos) {
      atendimento.dataatendimento = moment(atendimento.dataatendimento, 'YYYY-MM-DD').toDate();
      atendimento.datacadastro = moment(atendimento.datacadastro, 'YYYY-MM-DD').toDate();

      if (atendimento.paciente.datanasc != null) {
        atendimento.paciente.datanasc = moment(atendimento.paciente.datanasc, 'YYYY-MM-DD').toDate();
      }

      for (const proc of atendimento.procedimentos) {
        if (proc.dataexecucao != null) {
          proc.dataexecucao = moment(proc.dataexecucao, 'YYYY-MM-DD').toDate();
        }

        if (proc.preventregalaudo != null) {
          proc.preventregalaudo = moment(proc.dataexecucao, 'YYYY-MM-DD').toDate();
        }
      }
    }
  }

  PorAtestado(codigo: number) {
    return this.http.get(`${this.url}/relatorios/atestado/${codigo}`,{ responseType: 'blob' }).toPromise();
  }

  PdfLaudo(codigo: number, pdfdados: PdfFiltroDados) {
    let params = new HttpParams({
      fromObject: {
      }
    });

    if (pdfdados.executante) {
      params = params.append('executante', pdfdados.executante);
    }

    if (pdfdados.procedimento) {
      params = params.append('procedimento', pdfdados.procedimento);
    }

    if (pdfdados.codigoprocedimento) {
      params = params.append('codigoprocedimento', pdfdados.codigoprocedimento);
    }

    return this.http.get(`${this.url}/pdflaudo/${codigo}?pdff`, { params: params, responseType: 'blob' }).toPromise();
  }

  VerificarSeNomeExiste(filtro: AtendimentoFilter): Promise<boolean> {
    let params = new HttpParams();

    if (filtro.pacientenome) {
      params = params.append('pacientenome', filtro.pacientenome);
    }

    if (filtro.datafinal) {
      params = params.append('datafinal', moment(filtro.datafinal).format('YYYY-MM-DD'));
    }

    if (filtro.datainicial) {
      params = params.append('datainicial', moment(filtro.datainicial).format('YYYY-MM-DD'));
    }

    if (filtro.datanascpaciente) {
      params = params.append('datanascpaciente', moment(filtro.datanascpaciente).format('YYYY-MM-DD'));
    }

    return this.http.get<boolean>(`${this.url}?verificarexistencia`,{ params })
      .toPromise()
      .then(response => {
        const valor = response as boolean;
        return valor;
      });
  }

}
