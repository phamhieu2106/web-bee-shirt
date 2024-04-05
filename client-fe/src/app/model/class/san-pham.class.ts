import { ChatLieu } from "./chat-lieu.class";
import { CoAo } from "./co-ao.class";
import { KieuDang } from "./kieu-dang.class";
import { KieuThietKe } from "./kieu-thiet-ke.class";
import { SaleEvent } from "./sale-event.class";
import { SanPhamChiTiet } from "./san-pham-chi-tiet.class";
import { TayAo } from "./tay-ao.class";

export class SanPham {
  id: number;
  ten: string;
  ma: string;
  moTa: string;
  trangThai: boolean;
  sanPhamChiTiets: SanPhamChiTiet[];
  kieuDang: KieuDang;
  thietKe: KieuThietKe;
  tayAo: TayAo;
  coAo: CoAo;
  chatLieu: ChatLieu;
  saleEvent: SaleEvent;

  createdAt: string;
  createdBy: string;
  updatedAt: string;
  lastUpdatedBy: string;
}
