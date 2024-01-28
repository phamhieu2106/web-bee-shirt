import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PhieuGiamGiaKhachHang } from "../model/class/phieu-giam-gia-khach-hang.class";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhieuGiamGiaKhachHangService {

  private readonly apiUrl = "http://localhost:8080/phieu-giam-gia-khach-hang";
  constructor(private http: HttpClient) { }

  public add(phieuGiamGiaKhachHang: PhieuGiamGiaKhachHang): Observable<PhieuGiamGiaKhachHang> {
    return this.http.post<PhieuGiamGiaKhachHang>(`${this.apiUrl}/add`, phieuGiamGiaKhachHang);
  }

}
