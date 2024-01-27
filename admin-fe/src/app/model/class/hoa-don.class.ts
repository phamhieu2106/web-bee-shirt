import { HoaDonChiTiet } from "./hoa-don-chi-tiet.class";
import { LichSuHoaDon } from "./lich-su-hoa-don.class";
import { ThanhToan } from "./thanh-toan";

export class HoaDon {
  id: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  lastUpdatedBy: string;
  ma: string;
  tenNguoiNhan: string;
  sdtNguoiNhan: string;
  emailNguoiNhan: string;
  diaChiNguoiNhan: string;
  tongTien: number;
  tienGiam: number;
  phiVanChuyen: number;
  loaiHoaDon: string;
  trangThai: string;
  ghiChu: string;
  hoaDonChiTiets: HoaDonChiTiet[];
  lichSuHoaDons: LichSuHoaDon[];
  thanhToans: ThanhToan[];
}
