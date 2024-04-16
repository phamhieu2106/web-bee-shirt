import { HoaDonChiTietRequest } from "./hoa-don-chi-tiet-request.class";

export class HoaDonTraHangRequest {
  ma?: string;
  tenNguoiNhan?: string;
  sdtNguoiNhan?: string;
  emailNguoiNhan?: string;
  diaChiNguoiNhan?: string;
  tongTien?: number;
  tongTienPhieuGiamGiaCu?: number;
  tongTienPhieuGiamGiaMoi?: number;
  tongTienTraKhach?: number;
  ghiChu?: string;
  hoaDonChiTiets?: HoaDonChiTietRequest[];
  hoaDonId?: number;
  nhanVienId?: number;
  khachHangId?: number;
}
