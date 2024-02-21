export interface NhanVienResponse {
  id?: number;
  imageUrl?: string;
  cccd: string;
  hoTen: string;
  ngaySinh: string;
  sdt: string;
  gioiTinh: boolean;
  email: string;
  diaChi: string;
  tenDangNhap?: string;
  matKhau?: string;
  trangThai?: boolean;
  role?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  lastUpdatedBy?: string;
}
