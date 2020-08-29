import { Professor } from './../models/Professor';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  baseURL = `${environment.mainUrlAPI}professor`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.baseURL);
  }

  put(professor: Professor) {
    return this.http.put(`${this.baseURL}/${professor.id}`, professor);
  }

  post(professor: Professor) {
    return this.http.post(this.baseURL, professor);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/professorId=${id}`);
  }


}
