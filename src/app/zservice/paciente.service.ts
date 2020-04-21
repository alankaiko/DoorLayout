import { PatientFiltro } from './servidor.service';
import { Patient } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/servidor`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: PatientFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });


    if (filtro.patientname) {
      params = params.append('patientname', filtro.patientname);
    }

    if (filtro.patientage) {
      params = params.append('patientage', filtro.patientage);
    }

    if (filtro.servidor) {
      params = params.append('servidor', 'true');
    }

    if (filtro.birthday) {
      params = params.append('birthday',
        moment(filtro.birthday).format('YYYY-MM-DD'));
    }

    if (filtro.patientsex) {
      params = params.append('patientsex', filtro.patientsex);
    }

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const pacientes = response;

        const resultado = {
          pacientes,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(patient): Promise<Patient> {
    return this.http.post<Patient>(`${this.url}`, patient).toPromise();
  }

  BuscarPorId(idpatient: number): Promise<Patient> {
    return this.http.get<Patient>(`${this.url}/${idpatient}`)
      .toPromise()
      .then(response => {
        const patient = response as Patient;
        this.converterStringsParaDatas([patient]);
        return patient;
      });
  }

  BuscarListaPorId(idpatient: number): Promise<any> {
    return this.http.get(`${this.url}/lista/${idpatient}`).toPromise().then(response => response);
  }

  Atualizar(patient: Patient): Promise<any> {
    return this.http.put(`${this.url}/${patient.idpatient}`, patient)
      .toPromise()
      .then(response => {
        const patientalterado = response as Patient;
        this.converterStringsParaDatas([patientalterado]);

        return patientalterado;
      });
  }

  Remover(idpatient: number): Promise<any> {
    return this.http.delete(`${this.url}/${idpatient}`)
      .toPromise()
      .then(() => null);
  }

  private converterStringsParaDatas(patients: Patient[]) {
    for (const patient of patients) {
      if (patient.birthday !== null) {
        patient.birthday = moment(patient.birthday, 'YYYY-MM-DD').toDate();
      }

      patient.datecreate = moment(patient.datecreate, 'YYYY-MM-DD').toDate();
    }
  }

}
