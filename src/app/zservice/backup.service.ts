import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackupService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/backup`;
  }

  CriarBackup() {
    this.http.get(`${this.url}`).toPromise();
  }

}
