import { Account } from "./account.class";
import { KhachHangImage } from "./khach-hang-image.class";

export class KhachHang {
    id: number;
    hoTen: string;
    ngaySinh: string;
    sdt: string;
    gioiTinh: boolean;
    email: string;
    anh: string;
    trangThai: number;
    account: Account;
    image: KhachHangImage;
}
