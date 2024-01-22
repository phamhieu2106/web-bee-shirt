import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-danh-sach-nhan-vien",
  templateUrl: "./danh-sach-nhan-vien.component.html",
  styleUrls: ["./danh-sach-nhan-vien.component.css"],
})
export class DanhSachNhanVienComponent {
  icon: string = "fa-solid fa-users";
  title: string = "Nhân Viên";
  mainHeading: string = "Nhân Viên";

  listNhanVien: any[] = [
    {
      id: 1,
      hoTen: "Ma Thu Thủy",
      ngaySinh: "2004/1/17",
      sdt: "0123456789",
      gioiTinh: false,
      email: "mt1511@gmail.com",
      diaChi: "PT",
      account: {
        tenDangNhap: "nv1",
        matKhau: "mk1",
        trangThai: true,
        role: "ADMIN",
        author: true,
      },
    },
    {
      id: 2,
      hoTen: "Ma Thu Thủy 2",
      ngaySinh: "2004/1/17",
      sdt: "0123456789",
      gioiTinh: true,
      email: "mt1511@gmail.com",
      diaChi: "PT",
      account: {
        tenDangNhap: "nv1",
        matKhau: "mk1",
        trangThai: false,
        role: "ADMIN",
        author: true,
      },
    },
    {
      id: 3,
      hoTen: "Ma Thu Thủy 3",
      ngaySinh: "2004/1/17",
      sdt: "0123456789",
      gioiTinh: false,
      email: "mt1511@gmail.com",
      diaChi: "PT",
      account: {
        tenDangNhap: "nv1",
        matKhau: "mk1",
        trangThai: true,
        role: "ADMIN",
        author: true,
      },
    },
  ];
}
