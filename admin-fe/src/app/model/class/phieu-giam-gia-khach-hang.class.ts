import { KhachHang } from "./KhachHang.class";
import { PhieuGiamGia } from "./phieu-giam-gia.class";

export class PhieuGiamGiaKhachHang {

    id?: number;
    mo_ta: string;
    khach_hang: KhachHang;
    phieu_giam_gia: PhieuGiamGia;
}
