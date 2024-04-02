import { DiaChiVaPhiVanChuyen } from "./dia-chi-va-phi-van-chuyen.class";
import { HoaDonChiTietRequest } from "./hoa-don-chi-tiet-request.class";
import { ThanhToanRequest } from "./thanh-toan-reuqest.class";

export class HoaDonRequest {
  tongTien?: number;
  tienGiam?: number;
  phiVanChuyen?: number;
  loaiHoaDon?: string;
  hoaDonChiTiets?: HoaDonChiTietRequest[];
  nhanVienId?: number;
  khachHangId?: number;
  phieuGiamGiaId?: number;
  thanhToans?: ThanhToanRequest[];
  tenNguoiNhan?: string;
  sdtNguoiNhan?: string;
  emailNguoiNhan?: string;
  diaChiNguoiNhan?: string;
  ghiChu?: string;
  diaChiVaPhiVanChuyen?: DiaChiVaPhiVanChuyen;
}
