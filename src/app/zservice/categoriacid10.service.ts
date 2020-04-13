import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Categoriacid10Service {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/categoriacid10`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }
}
