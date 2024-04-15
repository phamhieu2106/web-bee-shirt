import { HoaDonChiTiet } from "./hoa-don-chi-tiet.class";
import { HoaDon } from "./hoa-don.class";

export class HoaDonTraHang {
  ma: string;
  tenNguoiNhan: string;
  sdtNguoiNhan: string;
  emailNguoiNhan: string;
  diaChiNguoiNhan: string;
  tongTien: number;
  tongTienPhieuGiamGiaCu: number;
  tongTienPhieuGiamGiaMoi: number;
  tongTienTraKhach: number;
  ghiChu: string;
  hoaDonChiTiets: HoaDonChiTiet[];
  hoaDon: HoaDon;

  createdAt: string;
  createdBy: string;
  updatedAt: string;
  lastUpdatedBy: string;
}
