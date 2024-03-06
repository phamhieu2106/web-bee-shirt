import { PhieuGiamGia } from "./phieu-giam-gia.class";
import { NhanVien } from "./nhan-vien.class";
import { HoaDonChiTiet } from "./hoa-don-chi-tiet.class";
import { LichSuHoaDon } from "./lich-su-hoa-don.class";
import { ThanhToan } from "./thanh-toan";
import { KhachHang } from "./KhachHang.class";

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
  nhanVien: NhanVien;
  khachHang: KhachHang;
  phieuGiamGia: PhieuGiamGia;
  hoaDonChiTiets: HoaDonChiTiet[];
  lichSuHoaDons: LichSuHoaDon[];
  thanhToans: ThanhToan[];

  orderNameTemp: string; // để lưu STT hóa đơn chờ
}
