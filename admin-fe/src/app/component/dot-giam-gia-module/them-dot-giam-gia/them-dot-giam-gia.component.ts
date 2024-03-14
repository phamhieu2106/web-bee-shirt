import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";
import { SanPham } from "src/app/model/class/san-pham.class";
import { DotGiamGiaSanPhamChiTiet } from "src/app/model/interface/dot-giam-gia-san-pham-chi-tiet";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { DotGiamGiaService } from "src/app/service/dot-giam-gia.service";
import { SanPhamService } from "src/app/service/san-pham.service";

@Component({
  selector: "app-form-add",
  templateUrl: "./them-dot-giam-gia.component.html",
  styleUrls: ["./them-dot-giam-gia.component.css"],
})
export class ThemDotGiamGiaComponent implements OnInit {
  mainHeading: string = "Đợt Giảm Giá";
  tittle: string = "Đợt Giảm Giá";
  icon: string = "fa-solid fa-tags";
  // Form
  formHeader: string = "Thêm Đợt Giảm Giá";
  formButton: string = "Thêm mới";
  // Table SanPham
  titleTableProduct: string = "Danh Sách Sản Phẩm ";
  tHeadProduct: Array<string> = [
    "",
    "Mã Sản Phẩm",
    "Tên Sản Phẩm",
    "Trạng Thái",
  ];
  listSanPham: PagedResponse<SanPham>;
  dataSanPham: SanPham[] = [];
  // Table SanPhamChiTiet
  titleTableProducts: string = "Danh Sách Chi Tiết Sản Phẩm ";
  tHeadProducts: Array<string> = [
    "",
    "Ảnh Sản Phẩm",
    "Mã Sản Phẩm",
    "Tên Sản Phẩm",
    "Số Lượng Tồn",
    "Giá Bán",
    "Chất Liệu",
    "Cổ Áo",
    "Kích Cỡ",
    "Kiểu Dáng",
    "Tay Áo",
    "Thiết Kế",
    "Màu",
    "Trạng Thái",
  ];
  listSanPhamChiTiet: PagedResponse<DotGiamGiaSanPhamChiTiet>;
  dataSanPhamChiTiet: DotGiamGiaSanPhamChiTiet[] = [];
  // varribles for child elements
  listIdSanPham: Array<number> = [];
  listIdSanPhamChiTiet: Array<number> = [];

  // varribles for post methods
  constructor(
    private service: DotGiamGiaService,
    private sanPhamService: SanPhamService,
    private toast: ToastrService
  ) {
    this.dotGiamGiaRequest = {
      tenDotGiamGia: null,
      giaTriPhanTram: null,
      thoiGianBatDau: null,
      thoiGianKetThuc: null,
      listIdSanPhamChiTiet: null,
    };
  }
  ngOnInit(): void {
    this.getAllSanPham();
  }

  // POST Methods and object
  dotGiamGiaRequest: DotGiamGia;

  public getDotGiamGiaRequest(): void {}
  // San Pham
  public getAllSanPham(): void {
    this.sanPhamService.getByPage().subscribe({
      next: (value) => {
        this.listSanPham = value;
        this.dataSanPham = this.listSanPham.data;
      },
      error: (err) => {
        console.log(err);
        this.toast.error("Có lỗi khi cố gắng lấy danh sách Sản Phẩm");
      },
    });
  }
  public setListIdSanPham = (value: number) => {
    // Kiểm tra xem this.listIdSanPham đã được khởi tạo chưa
    if (this.listIdSanPham && Array.isArray(this.listIdSanPham)) {
      const index = this.listIdSanPham.indexOf(Number(value));

      if (index !== -1) {
        // Giá trị đã tồn tại, nên xoá nó khỏi mảng
        this.listIdSanPham.splice(index, 1);
        // Khi xoá khỏi mảng cũng xoá các sản phẩm chi tiết
        this.service.getIdSanPhamChiTietBySanPhamId(value).subscribe({
          next: (value) => {
            value.forEach((number) => {
              const index = this.listIdSanPhamChiTiet.indexOf(number);
              if (index !== -1) {
                this.listIdSanPhamChiTiet.splice(index, 1);
              }
            });
          },
        });
      } else {
        // Giá trị không tồn tại, nên thêm vào mảng
        this.listIdSanPham.push(value);
      }
      this.getAllSanPhamChiTietById(this.listIdSanPham);
    } else {
      this.toast.error("Mảng this.listIdSanPham không được khởi tạo.");
      console.log("Mảng this.listIdSanPham không được khởi tạo.");
    }
  };
  // SanPhamChiTiet
  public getAllSanPhamChiTietById(id: Array<number>): void {
    this.service.getAllSanPhamChiTietById(id).subscribe({
      next: (value) => {
        this.listSanPhamChiTiet = value;
        this.dataSanPhamChiTiet = this.listSanPhamChiTiet.data;
      },
      error: (message) => {
        this.toast.error(message);
        console.log(message);
      },
    });
  }
  public setListIdSanPhamChiTiet = (value: number) => {
    if (this.listIdSanPhamChiTiet && Array.isArray(this.listIdSanPhamChiTiet)) {
      const index = this.listIdSanPhamChiTiet.indexOf(Number(value));

      if (index !== -1) {
        // Giá trị đã tồn tại, nên xoá nó khỏi mảng
        this.listIdSanPhamChiTiet.splice(index, 1);
      } else {
        // Giá trị không tồn tại, nên thêm vào mảng
        this.listIdSanPhamChiTiet.push(Number(value));
      }
      this.dotGiamGiaRequest.listIdSanPhamChiTiet = this.listIdSanPhamChiTiet;
    } else {
      this.toast.error("Mảng IdSanPhamChiTiet không được khởi tạo.");
      console.log("Mảng IdSanPhamChiTiet không được khởi tạo.");
    }
  };
}
