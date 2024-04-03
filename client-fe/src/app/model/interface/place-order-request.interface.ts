import { OrderDetailsReq } from "./order-details-req.interface";

export interface PlaceOrderRequest {
  tongTien: number;
  tienGiam: number;
  phiVanChuyen: number;
  loaiHoaDon: string;

  hoaDonChiTiets: OrderDetailsReq[];
  nhanVienId: number;
  khachHangId: number;
  phieuGiamGiaId: number;

  //   thanhToans;

  tenNguoiNhan: string;
  sdtNguoiNhan: string;
  emailNguoiNhan: string;
  diaChiNguoiNhan: string;
  ghiChu: string;
  //  DiaChiVaPhiVanChuyenDto diaChiVaPhiVanChuyen;
}
