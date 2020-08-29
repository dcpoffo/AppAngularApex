import { Disciplina } from './../models/Disciplina';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  baseURL = `${environment.mainUrlAPI}disciplina`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.baseURL);
  }

  post(disciplina: Disciplina) {
    return this.http.post(this.baseURL, disciplina);
  }

  put(disciplina: Disciplina) {
    return this.http.put(`${this.baseURL}/${disciplina.id}`, disciplina);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
