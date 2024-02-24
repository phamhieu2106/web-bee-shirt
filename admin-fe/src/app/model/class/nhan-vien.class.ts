import { Account } from "./account.class";
import { KhachHangImage } from "./khach-hang-image.class";

export class NhanVien {
  id?: number;
  cccd: string;
  hoTen: string;
  ngaySinh: string;
  sdt: string;
  gioiTinh: boolean;
  email: string;
  diaChi: string;
  account: Account;
  image: KhachHangImage;
}
