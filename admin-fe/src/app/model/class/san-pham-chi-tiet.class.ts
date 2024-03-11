import { DotGiamGiaSanPhamChiTiet } from "./../interface/dot-giam-gia-san-pham-chi-tiet";
import { ChatLieu } from "./chat-lieu.class";
import { CoAo } from "./co-ao.class";
import { DotGiamGia } from "./dot-giam-gia.class";
import { HinhAnh } from "./hinh-anh.class";
import { KichCo } from "./kich-co.class";
import { KieuDang } from "./kieu-dang.class";
import { KieuThietKe } from "./kieu-thiet-ke.class";
import { MauSac } from "./mau-sac.class";
import { SanPham } from "./san-pham.class";
import { TayAo } from "./tay-ao.class";

export class SanPhamChiTiet {
  id: number;
  giaNhap: number;
  giaBan: number;
  soLuongTon: number;
  trangThai: boolean;

  sanPham: SanPham;
  mauSac: MauSac;
  kichCo: KichCo;
  kieuDang: KieuDang;
  thietKe: KieuThietKe;
  tayAo: TayAo;
  coAo: CoAo;
  chatLieu: ChatLieu;
  hinhAnhs: HinhAnh[];
  dotGiamGia: DotGiamGia;

  createdAt: string;
  createdBy: string;
  updatedAt: string;
  lastUpdatedBy: string;
}
