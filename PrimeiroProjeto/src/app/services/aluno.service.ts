import { Aluno } from './../models/Aluno';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  baseURL = `${environment.mainUrlAPI}aluno`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Aluno[]>{
    return this.http.get<Aluno[]>(this.baseURL);
  }

  put(aluno: Aluno){
    return this.http.put(`${this.baseURL}/${aluno.id}`, aluno);
  }

  post(aluno: Aluno){
    return this.http.post(this.baseURL, aluno);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/alunoId=${id}`);
  }
}
