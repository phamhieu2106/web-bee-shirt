import { SanPhamChiTiet } from "./san-pham-chi-tiet.class";

export class SanPham {
  id: number;
  ten: string;
  ma: string;
  moTa: string;
  trangThai: boolean;
  sanPhamChiTiets?: SanPhamChiTiet[];

  createdAt: string;
  createdBy: string;
  updatedAt: string;
  lastUpdatedBy: string;
}
