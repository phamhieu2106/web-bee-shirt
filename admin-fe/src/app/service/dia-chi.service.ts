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

public getAllDc(id: number): Observable<DiaChi[]>{
  return this.http.get<DiaChi[]>(`${this.apiUrl}/get-all/${id}`);
}
public addDC(idKh: number,dc: DiaChi): Observable<DiaChi>{
  return this.http.post<DiaChi>(`${this.apiUrl}/add/${idKh}`, dc);
}
public getDCById(idDC: number): Observable<DiaChi>{
  return this.http.get<DiaChi>(`${this.apiUrl}/get-by-id/${idDC}`);
}
public updateDC(idDC:number,dc: DiaChi): Observable<DiaChi>{
    return this.http.put<DiaChi>(`${this.apiUrl}/update/${idDC}`, dc);
}
public deleteDC(idDC:number): Observable<DiaChi>{
  return this.http.delete<DiaChi>(`${this.apiUrl}/delete-dc/${idDC}`);
}
public setDefaultDC(idDC: number): Observable<void>{
  return this.http.post<void>(`${this.apiUrl}/setDefault/${idDC}`,[]);
}

}
