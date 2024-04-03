import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DiaChi } from "../model/class/dia-chi.class";

@Injectable({
  providedIn: "root",
})
export class DiaChiService {
  private readonly apiUrl = "http://localhost:8080/dia-chi";
  private readonly apiUrlDC = "https://vapi.vnappmob.com";

  constructor(private http: HttpClient) {}

  public getAllDc(id: number): Observable<DiaChi[]> {
    return this.http.get<DiaChi[]>(`${this.apiUrl}/get-all/${id}`);
  }

  public addDC(idKh: number, dc: DiaChi): Observable<DiaChi> {
    return this.http.post<DiaChi>(`${this.apiUrl}/add/${idKh}`, dc);
  }

  public getDCById(idDC: number): Observable<DiaChi> {
    return this.http.get<DiaChi>(`${this.apiUrl}/get-by-id/${idDC}`);
  }

  public updateDC(idDC: number, dc: DiaChi): Observable<DiaChi> {
    return this.http.put<DiaChi>(`${this.apiUrl}/update/${idDC}`, dc);
  }

  public deleteDC(idDC: number): Observable<DiaChi> {
    return this.http.delete<DiaChi>(`${this.apiUrl}/delete-dc/${idDC}`);
  }

  public setDefaultDC(idDC: number): Observable<DiaChi> {
    return this.http.post<DiaChi>(`${this.apiUrl}/set-default/${idDC}`, []);
  }

  public getTinh(): Observable<any> {
    return this.http.get(`${this.apiUrlDC}/api/province/`);
  }

  public getHuyen(idTinh: number): Observable<any> {
    return this.http.get(`${this.apiUrlDC}/api/province/district/${idTinh}`);
  }

  public getXa(idHuyen: number): Observable<any> {
    return this.http.get(`${this.apiUrlDC}/api/province/ward/${idHuyen}`);
  }
}
