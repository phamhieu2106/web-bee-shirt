import { Account } from "./account.class";
import { Address } from "./address.class";
import { CustomerImage } from "./customer-image.class";

export class Customer {
  id: number;
  hoTen: string;
  ngaySinh: Date;
  sdt: string;
  email: string;
  gioiTinh: boolean;
  trangThai: number;
  account: Account;
  image: CustomerImage;
  diaChis: Address[];

  createdAt: string;
  createdBy: string;
  updatedAt: string;
  lastUpdatedBy: string;
}
