import { PaymentMethod } from "./payment-method.class";

export class Payment {
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  lastUpdatedBy: string;
  id: number;
  moTa: string;
  maGiaoDich: string;
  soTien: number;
  trangThai: boolean;
  hinhThucThanhToan: PaymentMethod;
  tenHinhThucThanhToan: string;
}
