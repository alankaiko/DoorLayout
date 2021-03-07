import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Paciente } from '../core/model';

export class PacienteFiltro {
  pacienteid: string;
  nome: string;
  datanasc: Date;
  idade: string;
  sexo: string;
  servidor: boolean;
  pagina = 0;
  itensPorPagina = 10;
}


@Injectable({
  providedIn: 'root'
})
export class ServidorService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/servidor`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: PacienteFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.pacienteid) {
      params = params.append('pacienteid', filtro.pacienteid);
    }

    if (filtro.servidor) {
      params = params.append('servidor', 'true');
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

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const paciente = response as Paciente;
        return paciente;
      });
  }

  BuscarUrlBuscaImagem(instanceuid: any) {
    return `${this.url}/dicom/${instanceuid}`;
  }

  BuscarInstanciasDoPaciente(codigo: number): Promise<any> {
    return this.http.get<any>(`${this.url}/series/${codigo}`).toPromise().then(response => response);
  }

  urlUploadAnexo(valor) {
    return this.http.post(`${this.url}/teste`, valor).subscribe(resposta => console.log('Upload ok.'));
  }
}
