import { Atendimento, Patient, Convenio, ProfissionalSolicitante, Crm, Sigla, Estado, SubcategoriaCid10, ProfissionalExecutante } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

export class AtendimentoFilter {
  pagina = 0;
  itensPorPagina = 7;
  patientname: string;
  solicitantename: string;
  datainicial: Date;
  datafinal: Date;
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
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

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

  BuscarListaPorNomePaciente(patientname: string): Promise<any> {
    return this.http.get(`${this.url}/listapac/${patientname}`).toPromise().then(response => response);
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

  ListarPacientes(): Promise<Patient[]> {
    return this.http.get<Patient[]>(this.pacienteurl).toPromise();
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

  BuscarPorIdPatient(idpatient: number): Promise<Patient> {
    return this.http.get<Patient>(`${this.pacienteurl}/${idpatient}`)
      .toPromise()
      .then(response => {
        const patient = response as Patient;
        this.converterStringsParaDatasPat([patient]);
        return patient;
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

  private converterStringsParaDatasPat(patients: Patient[]) {
    for (const patient of patients) {
      if (patient.birthday !== null) {
        patient.birthday = moment(patient.birthday, 'YYYY-MM-DD').toDate();
      }

      patient.datecreate = moment(patient.datecreate, 'YYYY-MM-DD').toDate();
    }
  }

  private converterStringsParaDatas(atendimentos: Atendimento[]) {
    for (const atendimento of atendimentos) {
      atendimento.dataatendimento = moment(atendimento.dataatendimento, 'YYYY-MM-DD').toDate();
      atendimento.datacadastro = moment(atendimento.datacadastro, 'YYYY-MM-DD').toDate();
      atendimento.patient.birthday = moment(atendimento.patient.birthday, 'YYYY-MM-DD').toDate();

      for (const proc of atendimento.procedimentos) {
        proc.dataexecucao = moment(proc.dataexecucao, 'YYYY-MM-DD').toDate();
        proc.preventregalaudo = moment(proc.dataexecucao, 'YYYY-MM-DD').toDate();
      }
    }
  }

  PorAtestado(codigo: number) {
    return this.http.get(`${this.url}/relatorios/atestado/${codigo}`,
      { responseType: 'blob' })
      .toPromise();
  }

}
