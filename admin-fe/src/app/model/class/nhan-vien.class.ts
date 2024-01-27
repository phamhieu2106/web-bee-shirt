import { Account } from "./account.class";

export class NhanVien {
  id?: number;
  hoTen: string;
  ngaySinh: string;
  sdt: string;
  gioiTinh: boolean;
  email: string;
  diaChi: string;
  account: Account;
}
