import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, interval } from "rxjs";
import { switchMap } from 'rxjs/operators';
import { format } from 'date-fns';

import { PagedResponse } from "../model/interface/paged-response.interface";
import { PhieuGiamGia } from "../model/class/phieu-giam-gia.class";
import { PhieuGiamGiaKhachHang } from "../model/class/phieu-giam-gia-khach-hang.class";
import { PhieuGiamGiaUpdate } from "../model/interface/phieu-update.interface";

@Injectable({
  providedIn: "root",
})
export class PhieuGiamGiaService {
  private readonly apiUrl = "http://localhost:8080/phieu-giam-gia";
  constructor(private http: HttpClient) { }

  //public function

  public getAll(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<PhieuGiamGia>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<PhieuGiamGia>>(
      `${this.apiUrl}/ds-phieu-giam-gia${param}`
    );
  }

  public getOne(id: number): Observable<PhieuGiamGia> {
    return this.http.get<PhieuGiamGia>(`${this.apiUrl}/sua-phieu/${id}`);
  }


  public changeStatus(id: number): Observable<PhieuGiamGia> {
    return this.http.put<PhieuGiamGia>(`${this.apiUrl}/status/${id}`, id);
  }

  public add(phieuGiamGia: PhieuGiamGia): Observable<PhieuGiamGia> {
    return this.http.post<PhieuGiamGia>(`${this.apiUrl}/add`, phieuGiamGia);
  }

  public addPhieuKhachHang(phieuGiamGiaId: number, selectedIds: number[]): Observable<PhieuGiamGia> {
    const request = {
      phieuGiamGiaId,
      selectedIds,
    };
    return this.http.post<PhieuGiamGia>(`${this.apiUrl}/add-phieu`, request);
  }

  public getAllPhieuKhachHang(): Observable<PhieuGiamGiaKhachHang[]> {
    return this.http.get<PhieuGiamGiaKhachHang[]>(`${this.apiUrl}/get-phieu-khach-hang`);
  }
  public getKhachHangTang(id: number): Observable<PhieuGiamGiaKhachHang[]> {
    return this.http.get<PhieuGiamGiaKhachHang[]>(`${this.apiUrl}/get-phieu-khach-hang/${id}`);
  }

  public getKhachHangTangKhongCo(id: number): Observable<PhieuGiamGiaKhachHang[]> {
    return this.http.get<PhieuGiamGiaKhachHang[]>(`${this.apiUrl}/get-phieu-Khong-co/${id}`);
  }




  getPhieuGiamGiaList(): Observable<PhieuGiamGia[]> {
    return this.http.get<PhieuGiamGia[]>(`${this.apiUrl}/get-all`);
  }

  startPolling(): Observable<PhieuGiamGia[]> {
    return interval(5000)  // Cứ sau mỗi 5 giây, bạn có thể điều chỉnh thời gian
      .pipe(
        switchMap(() => this.getPhieuGiamGiaList())
      );
  }

  public update(id: number, phieu: PhieuGiamGia): Observable<PhieuGiamGia> {

    const thoiGianBatDau = new Date(phieu.thoiGianBatDau); // Chuyển đổi thành kiểu Date
    const thoiGianKetThuc = new Date(phieu.thoiGianKetThuc); // Chuyển đổi thành kiểu Date
    const phieuUpdate: PhieuGiamGiaUpdate = {
      id: phieu.id,
      maPhieuGiamGia: phieu.maPhieuGiamGia,
      tenPhieuGiamGia: phieu.tenPhieuGiamGia,
      kieu: phieu.kieu,
      loai: phieu.loai,
      giaTri: phieu.giaTri,
      giaTriMax: phieu.giaTriMax,
      dieuKienGiam: phieu.dieuKienGiam,
      soLuong: phieu.soLuong,
      trangThai: this.calculateStatus(thoiGianBatDau, thoiGianKetThuc),
      thoiGianBatDau: format(phieu.thoiGianBatDau, 'yyyy-MM-dd\'T\'HH:mm'),
      thoiGianKetThuc: format(phieu.thoiGianKetThuc, 'yyyy-MM-dd\'T\'HH:mm'),

    };

    // Gửi đối tượng đã chuyển đổi lên server
    return this.http.put<PhieuGiamGia>(`${this.apiUrl}/update/${id}`, phieuUpdate);
  }

  private calculateStatus(thoiGianBatDau: Date, thoiGianKetThuc: Date): string {
    const currentTime = new Date();

    if (thoiGianKetThuc != null && currentTime > thoiGianKetThuc) {
      return 'Đã kết thúc';
    } else if (thoiGianBatDau != null && currentTime < thoiGianBatDau) {
      return 'Sắp diễn ra';
    } else if (thoiGianBatDau != null && thoiGianKetThuc != null &&
      currentTime > thoiGianBatDau && currentTime < thoiGianKetThuc) {
      return 'Đang diễn ra';
    } else {
      return 'Đã hủy';
    }
  }

}
