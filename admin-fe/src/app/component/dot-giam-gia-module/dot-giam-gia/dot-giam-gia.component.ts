import { Component, OnInit } from "@angular/core";
import { DotGiamGia } from "src/app/interface/dot-giam-gia";

@Component({
  selector: "app-dot-giam-gia",
  templateUrl: "./dot-giam-gia.component.html",
  styleUrls: ["./dot-giam-gia.component.css"],
})
export class DotGiamGiaComponent implements OnInit {
  mainHeading: string = "Đợt Giảm Giá";
  tittle: string = "Đợt Giảm Giá";
  icon: string = "fa-solid fa-tags";
  titleTable: string = "Danh Sách Đợt Giảm Giá";
  tHead: Array<string> = [
    "Mã Giảm Giá",
    "Tên Giảm Giá",
    "Giá Trị Giảm",
    "Ngày Bắt Đầu",
    "Ngày Kết Thúc",
    "Ngày Cập Nhật",
    "Trạng Thái",
    "Hành Động",
  ];
  listDotGiamGia: DotGiamGia[] = [
    {
      maDotGiamGia: "ABCD123",
      tenDotGiamGia: "Tết 2024",
      giaTriPhanTram: 10,
      ngayBatDau: "2024/1/17",
      ngayKetThuc: "2024/2/17",
      ngaySua: "2024/1/17",
      trangThai: 1,
    },
    {
      maDotGiamGia: "AAAAAAA",
      tenDotGiamGia: "Tết 2023",
      giaTriPhanTram: 99,
      ngayBatDau: "2023/1/17",
      ngayKetThuc: "2023/2/17",
      ngaySua: "2023/1/17",
      trangThai: 0,
    },
    {
      maDotGiamGia: "BBBBBBB",
      tenDotGiamGia: "Tết 2025",
      giaTriPhanTram: 20,
      ngayBatDau: "2025/1/17",
      ngayKetThuc: "2025/2/17",
      ngaySua: "2024/1/17",
      trangThai: 2,
    },
  ];

  ngOnInit(): void {}
}
