import { KhachHang } from "./KhachHang.class";

export class DiaChi {
    id: number;
    duong: string;
    huyen: string;
    xa: string;
    tinh: string;
    macDinh: boolean;
    khachHang: KhachHang;
    isCollapsed: boolean = true;
}
