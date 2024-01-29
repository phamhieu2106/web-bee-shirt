import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiaChi } from '../model/class/dia-chi.class';

@Injectable({
  providedIn: 'root'
})
export class DiaChiService {
  private readonly apiUrl = "http://localhost:8080/dia-chi";

constructor(private http: HttpClient) { }

public getAllDc(id: number): Observable<DiaChi>{
  return this.http.get<DiaChi>(`${this.apiUrl}/get-all/${id}`);
}
public addDC(idKh: number,dc: DiaChi): Observable<DiaChi>{
  return this.http.post<DiaChi>(`${this.apiUrl}/add/${idKh}`, dc);
}
}
