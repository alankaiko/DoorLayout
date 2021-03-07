import { Instancia } from './../core/model';
import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ResumoInstancia {
  idinstance: number;
  mediastoragesopinstanceuid: string;
  tagimagem: number;
}

@Injectable({
  providedIn: 'root'
})
export class InstanceService {
  url: string;
  urltags: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/instances`;
    this.urltags = `${environment.apiUrl}/tagimagens`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Adicionar(instancia) {
    return this.http.post(`${this.url}`, instancia).subscribe(response => response);
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const instancia = response as Instancia;
        return instancia;
      });
  }

  ResumoProDicom(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}?resumo`)
      .toPromise()
      .then(response => {
        const instancia = response as ResumoInstancia;
        return instancia;
      });
  }

  Atualizar(instancia: Instancia): Promise<any> {
    return this.http.put(`${this.url}/${instancia.codigo}`, instancia)
      .toPromise()
      .then(response => {
        const instanciaalterado = response as Instancia;
        return instanciaalterado;
      });
  }

  Remover(codigo: number) {
    this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  BuscarTagImgGamb(codigo: number): Promise<any> {
    return this.http.get(`${this.urltags}/tab/${codigo}`)
      .toPromise()
      .then(response => response);
  }
}
