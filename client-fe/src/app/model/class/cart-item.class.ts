import { Cart } from "./cart.class";
import { SanPhamChiTiet } from "./san-pham-chi-tiet.class";

export class CartItem {
  id: number;
  soLuong: number;
  spct: SanPhamChiTiet;
  cart: Cart;

  constructor(soLuong: number, spct: SanPhamChiTiet) {
    this.soLuong = soLuong;
    this.spct = spct;
  }
}
