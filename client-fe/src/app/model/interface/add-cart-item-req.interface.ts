import { SanPhamChiTiet } from "../class/san-pham-chi-tiet.class";

export interface AddCartItemReq {
  quantity: number;
  productDetails: SanPhamChiTiet;
  customerId: number;
}
