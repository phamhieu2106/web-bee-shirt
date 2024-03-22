import { HoaDonChiTietRequest } from "./hoa-don-chi-tiet-request.class";
import { ThanhToan } from "./thanh-toan";

export class HoaDonRequest {
  tongTien: number;
  tienGiam: number;
  phiVanChuyen: number;
  loaiHoaDon: string;
  hoaDonChiTiets: HoaDonChiTietRequest[];
  nhanVienId: number;
  khachHangId: number;
  phieuGiamGiaId: number;
  thanhToans: ThanhToan[];
}
