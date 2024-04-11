import { HinhThucThanhToan } from "./hinh-thuc-thanh-toan";

export class ThanhToan {
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  lastUpdatedBy: string;
  id: number;
  moTa: string;
  maGiaoDich: string;
  soTien: number;
  trangThai: boolean;
  hinhThucThanhToan: HinhThucThanhToan;
  tenHinhThucThanhToan: string; // CHUYEN_KHOAN , TIEN_MAT
}
