import { DiaChiVaPhiVanChuyen } from "src/app/model/class/dia-chi-va-phi-van-chuyen.class";
import { HoaDonRequest } from "./../model/class/hoa-don-request.class";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PagedResponse } from "../model/interface/paged-response.interface";
import { LichSuHoaDon } from "../model/class/lich-su-hoa-don.class";
import { SoLuongDonHang } from "../model/class/so-luong-don-hang.class";
import { HoaDon } from "../model/class/hoa-don.class";
import { HoaDonChiTietRequest } from "../model/class/hoa-don-chi-tiet-request.class";
import { NhanVien } from "../model/class/nhan-vien.class";
import { ThanhToan } from "../model/class/thanh-toan";
import { ThanhToanRequest } from "../model/class/thanh-toan-reuqest.class";

@Injectable({
  providedIn: "root",
})
export class HoaDonService {
  private readonly baseUrl = "http://localhost:8080/hoa-don";
  constructor(private http: HttpClient) {}
  // update hóa đơn
  public putHoaDon(hoaDon: HoaDon): Observable<HoaDon> {
    return this.http.put<HoaDon>(this.baseUrl + "/update", hoaDon);
  }

  // get all
  public getAll(
    pageNumber: number = 0,
    pageSize: number = 5,
    search: string = "",
    loaiHoaDon = "",
    ngayTao = "",
    trangThai = ""
  ): Observable<PagedResponse<HoaDon>> {
    const params = `/ds-hoa-don?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}&loaiHoaDon=${loaiHoaDon}&ngayTao=${ngayTao}&trangThai=${trangThai}`;
    // console.log(this.baseUrl + params);

    return this.http.get<PagedResponse<HoaDon>>(this.baseUrl + params);
  }

  // get by id
  public getById(id: number): Observable<HoaDon> {
    const url = `/get-by-id/${id}`;
    return this.http.get<HoaDon>(this.baseUrl + url);
  }

  // change order status
  public changeOrderStatus(
    idHoaDon: number,
    moTa: string,
    isNext: boolean
  ): Observable<LichSuHoaDon> {
    return this.http.post<LichSuHoaDon>(this.baseUrl + "/change-status", {
      idHoaDon,
      moTa,
      isNext,
    });
  }

  // cancel order
  public cancelOrder(idHoaDon: number, moTa: string): Observable<LichSuHoaDon> {
    return this.http.post<LichSuHoaDon>(
      this.baseUrl + "/change-status/cancel",
      {
        idHoaDon,
        moTa,
      }
    );
  }

  //get số lượng đơn hàng all
  public getSoLuongDonHang(): Observable<SoLuongDonHang> {
    const url = this.baseUrl + `/get-order-quantity-all`;
    return this.http.get<SoLuongDonHang>(url);
  }
  public mapToHoaDonRequest(
    hoaDon: HoaDon,
    diaChiVaPhiVanChuyen: DiaChiVaPhiVanChuyen
  ): HoaDonRequest {
    let hoaDonRequest = new HoaDonRequest();
    // map properties
    hoaDonRequest.tongTien = hoaDon.tongTien;
    hoaDonRequest.tienGiam = hoaDon.tienGiam;
    hoaDonRequest.phiVanChuyen = hoaDon.phiVanChuyen;
    hoaDonRequest.loaiHoaDon = hoaDon.loaiHoaDon;
    hoaDonRequest.hoaDonChiTiets = hoaDon.hoaDonChiTiets.map((hdct) => {
      let hdctRequest = new HoaDonChiTietRequest();
      hdctRequest.soLuong = hdct.soLuong;
      hdctRequest.giaBan = hdct.giaBan;
      hdctRequest.giaNhap = hdct.giaNhap;
      hdctRequest.sanPhamChiTietId = hdct.sanPhamChiTiet.id;
      return hdctRequest;
    });
    hoaDonRequest.nhanVienId = JSON.parse(localStorage.getItem("nhanVien")).id;
    hoaDonRequest.khachHangId =
      hoaDon.khachHang == null ? null : hoaDon.khachHang.id;
    hoaDonRequest.phieuGiamGiaId =
      hoaDon.phieuGiamGia != null ? hoaDon.phieuGiamGia.id : null;
    hoaDonRequest.thanhToans = this.mapToThanhToanRequest(hoaDon.thanhToans);
    hoaDonRequest.tenNguoiNhan = hoaDon.tenNguoiNhan;
    hoaDonRequest.sdtNguoiNhan = hoaDon.sdtNguoiNhan;
    hoaDonRequest.emailNguoiNhan = hoaDon.emailNguoiNhan;
    hoaDonRequest.diaChiNguoiNhan = hoaDon.diaChiNguoiNhan;
    hoaDonRequest.diaChiVaPhiVanChuyen = diaChiVaPhiVanChuyen;
    return hoaDonRequest;
  }
  mapToThanhToanRequest(thanhToans: ThanhToan[]): ThanhToanRequest[] {
    return thanhToans.map((tt) => {
      let ttRequest = new ThanhToanRequest();
      ttRequest.hinhThucThanhToan = tt.tenHinhThucThanhToan;
      ttRequest.moTa = tt.moTa;
      ttRequest.maGiaoDich = tt.maGiaoDich;
      ttRequest.soTien = tt.soTien;
      return ttRequest;
    });
  }
  // place order
  public placeOrder(hoaDonRequest: HoaDonRequest): Observable<HoaDon> {
    return this.http.post<HoaDon>(this.baseUrl + "/place-order", hoaDonRequest);
  }

  getTienKhachThanhToan(thanhToans: ThanhToan[]): number {
    if (thanhToans != null && thanhToans.length > 0) {
      return thanhToans
        .map((thanhToan) => thanhToan.soTien)
        .reduce((pre, curr) => pre + curr, 0);
    }
    return 0;
  }

  isGiaoHangAndChuyenKhoan(hoaDon: HoaDon) {
    let isChuyenKhoan =
      hoaDon?.thanhToans?.length > 0 &&
      hoaDon?.thanhToans[0]?.hinhThucThanhToan.hinhThuc == "CHUYEN_KHOAN"
        ? true
        : false;
    if (hoaDon.loaiHoaDon == "GIAO_HANG" && isChuyenKhoan) {
      return true;
    }
    return false;
  }

  refundMoney(thanhToan: ThanhToan, idHoaDon: number): Observable<HoaDon> {
    return this.http.post<HoaDon>(this.baseUrl + "/change-status/refund", {
      idHoaDon: idHoaDon,
      hinhThucThanhToan: thanhToan.tenHinhThucThanhToan,
      moTa: thanhToan.moTa,
      maGiaoDich: thanhToan.maGiaoDich,
      soTien: thanhToan.soTien,
    });
  }
}
