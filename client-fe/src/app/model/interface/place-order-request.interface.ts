import { AddressShipFee } from "../class/address-ship-fee.class";
import { OrderDetailsReq } from "./order-details-req.interface";
import { PaymentReq } from "./payment-req.interface";

export interface PlaceOrderRequest {
  tongTien: number;
  tienGiam: number;
  phiVanChuyen: number;
  loaiHoaDon: string;
  hoaDonChiTiets: OrderDetailsReq[];
  nhanVienId: number;
  khachHangId: number;
  phieuGiamGiaId: number;
  thanhToans: PaymentReq[];
  tenNguoiNhan: string;
  sdtNguoiNhan: string;
  emailNguoiNhan: string;
  diaChiNguoiNhan: string;
  ghiChu: string;
  diaChiVaPhiVanChuyen: AddressShipFee;
}
