import { AddressShipFee } from "../class/address-ship-fee.class";
import { OrderDetailsReq } from "./order-details-req.interface";
import { PaymentReq } from "./payment-req.interface";

export interface OnlineOrderRequest {
  tongTien: number;
  tienGiam: number;
  phiVanChuyen: number;
  paymentMethod: boolean;
  hoaDonChiTiets: OrderDetailsReq[];
  khachHangId: number;
  phieuGiamGiaId: number;
  tenNguoiNhan: string;
  sdtNguoiNhan: string;
  emailNguoiNhan: string;
  diaChiNguoiNhan: string;
  ghiChu: string;
}
