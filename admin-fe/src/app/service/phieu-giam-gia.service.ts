import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, interval, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { format } from "date-fns";

import { PagedResponse } from "../model/interface/paged-response.interface";
import { PhieuGiamGia } from "../model/class/phieu-giam-gia.class";
import { PhieuGiamGiaKhachHang } from "../model/class/phieu-giam-gia-khach-hang.class";
import { PhieuGiamGiaUpdate } from "../model/interface/phieu-update.interface";
import { KhachHang } from "../model/class/KhachHang.class";

@Injectable({
  providedIn: "root",
})
export class PhieuGiamGiaService {
  private readonly apiUrl = "http://localhost:8080/phieu-giam-gia";
  constructor(private http: HttpClient) { }

  //public function

  public filter(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = "",
    kieu: number[] = [0, 1],
    loai: number[] = [0, 1],
    trangThai: string[] = ["Đang diễn ra", "Sắp diễn ra", "Đã kết thúc"],
    thoiGianBatDau: string = "",
    thoiGianKetThuc: string = ""
  ): Observable<PagedResponse<PhieuGiamGia>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}&kieu=${kieu}&loai=${loai}&trangThai=${trangThai}&thoiGianBatDau=${thoiGianBatDau}&thoiGianKetThuc=${thoiGianKetThuc}`;
    return this.http.get<PagedResponse<PhieuGiamGia>>(
      `${this.apiUrl}/filter${param}`
    );
  }

  public getAll(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = "",
    kieu: number[] = [0, 1],
    loai: number[] = [0, 1],
    trangThai: string[] = ["Đang diễn ra", "Sắp diễn ra", "Đã kết thúc"]
  ): Observable<PagedResponse<PhieuGiamGia>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}&kieu=${kieu}&loai=${loai}&trangThai=${trangThai}`;
    return this.http.get<PagedResponse<PhieuGiamGia>>(
      `${this.apiUrl}/ds-phieu-giam-gia${param}`
    );
  }


  public getAllActive(
    pageNumber: number = 1,
    pageSize: number = 5,
    search: string = ""
  ): Observable<PagedResponse<KhachHang>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;
    return this.http.get<PagedResponse<KhachHang>>(
      `${this.apiUrl}/get-active${param}`
    );
  }


  public getOne(id: number): Observable<PhieuGiamGia> {
    return this.http.get<PhieuGiamGia>(`${this.apiUrl}/sua-phieu/${id}`);
  }

  public changeStatus(id: number): Observable<PhieuGiamGia> {
    return this.http.put<PhieuGiamGia>(`${this.apiUrl}/status/${id}`, id);
  }

  public add(phieuGiamGia: PhieuGiamGia): Observable<PhieuGiamGia> {
    return this.http
      .post<PhieuGiamGia>(`${this.apiUrl}/add`, phieuGiamGia)
      .pipe(
        catchError((error: any) => {
          // Xử lý lỗi ở đây
          console.error("Error adding PhieuGiamGia:", error);
          return throwError(error); // Chuyển tiếp lỗi để subscriber xử lý
        })
      );
  }

  public addPhieuKhachHang(
    phieuGiamGiaId: number,
    selectedIds: number[]
  ): Observable<PhieuGiamGia> {
    const request = {
      phieuGiamGiaId,
      selectedIds
    };
    return this.http.post<PhieuGiamGia>(`${this.apiUrl}/add-phieu`, request);
  }

  public getAllPhieuKhachHang(): Observable<PhieuGiamGiaKhachHang[]> {
    return this.http.get<PhieuGiamGiaKhachHang[]>(
      `${this.apiUrl}/get-phieu-khach-hang`
    );
  }
  public getKhachHangTang(id: number): Observable<KhachHang[]> {
    return this.http.get<KhachHang[]>(
      `${this.apiUrl}/get-phieu-khach-hang/${id}`
    );
  }

  getPhieuGiamGiaList(): Observable<PhieuGiamGia[]> {
    return this.http.get<PhieuGiamGia[]>(`${this.apiUrl}/get-all`);
  }



  public update(id: number, phieu: PhieuGiamGia): Observable<PhieuGiamGia> {
    const thoiGianBatDau = new Date(phieu.thoiGianBatDau); // Chuyển đổi thành kiểu Date
    const thoiGianKetThuc = new Date(phieu.thoiGianKetThuc); // Chuyển đổi thành kiểu Date

    const formattedThoiGianBatDau = format(thoiGianBatDau, 'yyyy-MM-dd\'T\'HH:mm');
    const formattedThoiGianKetThuc = format(thoiGianKetThuc, 'yyyy-MM-dd\'T\'HH:mm');

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
      thoiGianBatDau: formattedThoiGianBatDau,
      thoiGianKetThuc: formattedThoiGianKetThuc,
    };

    // Gửi đối tượng đã chuyển đổi lên server
    return this.http
      .put<PhieuGiamGia>(`${this.apiUrl}/update/${id}`, phieuUpdate)
      .pipe(
        catchError((error: any) => {
          // Xử lý lỗi ở đây
          console.error("Error updating PhieuGiamGia:", error);
          return throwError(error); // Chuyển tiếp lỗi để subscriber xử lý
        })
      );
  }

  private calculateStatus(thoiGianBatDau: Date, thoiGianKetThuc: Date): string {
    const currentTime = new Date();

    if (thoiGianKetThuc != null && currentTime > thoiGianKetThuc) {
      return "Đã kết thúc";
    } else if (thoiGianBatDau != null && currentTime < thoiGianBatDau) {
      return "Sắp diễn ra";
    } else if (
      thoiGianBatDau != null &&
      thoiGianKetThuc != null &&
      currentTime > thoiGianBatDau &&
      currentTime < thoiGianKetThuc
    ) {
      return "Đang diễn ra";
    } else {
      return "Đã hủy";
    }
  }

  public getPhieuKhachKhongCo(
    pageNumber: number = 1,
    pageSize: number = 5,
    id: number,
  ): Observable<PagedResponse<KhachHang>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&id=${id}`;
    return this.http.get<PagedResponse<KhachHang>>(
      `${this.apiUrl}/ds-khach-tang${param}`
    );
  }

  public getPhieuKhachCo(
    pageNumber: number = 1,
    pageSize: number = 5,
    id: number,
  ): Observable<PagedResponse<PhieuGiamGiaKhachHang>> {
    const param = `?pageNumber=${pageNumber}&pageSize=${pageSize}&id=${id}`;
    return this.http.get<PagedResponse<PhieuGiamGiaKhachHang>>(
      `${this.apiUrl}/ds-khach-tang-co${param}`
    );
  }

  public getKhach(
    id: number,
    check: boolean
  ): Observable<KhachHang[]> {
    const param = `?id=${id}&check=${check}`;
    return this.http.get<KhachHang[]>(
      `${this.apiUrl}/ds-tang${param}`
    );
  }


}
