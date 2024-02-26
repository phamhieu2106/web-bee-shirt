import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";
import { SanPham } from "src/app/model/class/san-pham.class";
import { DotGiamGiaSanPhamChiTiet } from "src/app/model/interface/dot-giam-gia-san-pham-chi-tiet";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { DotGiamGiaService } from "src/app/service/dot-giam-gia.service";
import { SanPhamService } from "src/app/service/san-pham.service";

@Component({
  selector: "app-cap-nhat-dot-giam-gia",
  templateUrl: "./cap-nhat-dot-giam-gia.component.html",
  styleUrls: ["./cap-nhat-dot-giam-gia.component.css"],
})
export class CapNhatDotGiamGiaComponent implements OnInit {
  mainHeading: string = "Đợt Giảm Giá";
  tittle: string = "Đợt Giảm Giá";
  icon: string = "fa-solid fa-tags";
  modalTitle: string = "Xác Nhận Sửa";
  modalMessage: string = "Bạn chắc chắn muốn sửa đợt khuyến mại?";
  modalAction: string = "Cập nhật";
  titleTableProduct: string = "Danh Sách Sản Phẩm ";
  titleTableProducts: string = "Danh Sách Chi Tiết Sản Phẩm ";
  tHeadProduct: Array<string> = [
    "",
    "Mã Sản Phẩm",
    "Tên Sản Phẩm",
    "Trạng Thái",
  ];
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
  typeForm: string = "update";
  formHeader: string = "Cập Nhật Đợt Giảm Giá";
  formButton: string = "Cập Nhật";

  ngOnInit(): void {}

  constructor(
    private service: DotGiamGiaService,
    private sanPhamService: SanPhamService,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {
    // Load dotGiamGiaUpdateRequest
    this.route.paramMap.subscribe((params) => {
      this.loadForm(Number(params.get("id")));
    });
  }

  // Set Object and Load SanPham Table
  dotGiamGiaUpdateRequest: DotGiamGia;
  loadForm(id: number) {
    this.service.getDotGiamGiaById(id).subscribe({
      next: async (value) => {
        this.dotGiamGiaUpdateRequest = value;
        await this.getAllSanPham();
        await this.service
          .getAllListIdSanPhamChiTietByIdDotGiamGiaSanPham(id)
          .subscribe((data) => {
            this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet = data;
          });

        this.getListIdSanPham();
      },
      error(err) {
        console.log(err);
      },
    });
  }

  // Load List Id SanPham
  listIdSanPham: number[] = [];
  public getListIdSanPham() {
    setTimeout(() => {
      this.service
        .getIdSanPhamBySanPhamChiTietId(
          this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet
        )
        .subscribe({
          next: (value) => {
            this.listIdSanPham = value;
            console.log(this.listIdSanPham);
            this.getAllSanPhamChiTietById(value);
          },
        });
    }, 500);
  }
  // Load San Pham Chi Tiet
  listIdSanPhamChiTiet: number[];
  // Page SPCT
  listSanPhamChiTiet: PagedResponse<DotGiamGiaSanPhamChiTiet>;
  // Data Table
  dataSanPhamChiTiet: DotGiamGiaSanPhamChiTiet[] = [];
  public setListIdSanPhamChiTiet = (value: number) => {
    if (
      this.dotGiamGiaUpdateRequest &&
      Array.isArray(this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet)
    ) {
      const index = this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet.indexOf(
        Number(value)
      );

      if (index !== -1) {
        // Giá trị đã tồn tại, nên xoá nó khỏi mảng
        this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet.splice(index, 1);
      } else {
        // Giá trị không tồn tại, nên thêm vào mảng
        this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet.push(Number(value));
      }
      this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet =
        this.listIdSanPhamChiTiet;
    } else {
      this.toast.error("Danh Sách Sản Phẩm Chi Tiết không được khởi tạo.");
    }
  };
  public async getAllSanPhamChiTietById(id: Array<number>) {
    this.service.getAllSanPhamChiTietById(id).subscribe({
      next: (value) => {
        this.listSanPhamChiTiet = value;
        this.dataSanPhamChiTiet = this.listSanPhamChiTiet.data;
        // Set ListIDSanPhamChiTiet from  Dot Giam Gia Update Request
      },
      error: (message) => {
        this.toast.error("Có lỗi khi lấy ra danh sách sản phẩm chi tiết");
        console.log(message);
      },
    });
    this.listIdSanPhamChiTiet =
      this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet;
  }

  //For Table SanPham
  // Page SanPham
  listSanPham: PagedResponse<SanPham>;
  // Data SanPham
  dataSanPham: SanPham[] = [];
  public setListIdSanPham = (value: number) => {
    // Kiểm tra xem this.listIdSanPham đã được khởi tạo chưa
    if (this.listIdSanPham && Array.isArray(this.listIdSanPham)) {
      const index = this.listIdSanPham.indexOf(Number(value));

      if (index !== -1) {
        // Giá trị đã tồn tại, xoá nó khỏi mảng
        this.listIdSanPham.splice(index, 1);
        // Khi xoá khỏi mảng cũng xoá các sản phẩm chi tiết
        this.service.getIdSanPhamChiTietBySanPhamId(value).subscribe({
          next: (value) => {
            value.forEach((number) => {
              const index =
                this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet.indexOf(
                  number
                );
              if (index !== -1) {
                this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet.splice(
                  index,
                  1
                );
              }
            });
          },
        });
      } else {
        // Giá trị không tồn tại, thêm vào mảng
        this.listIdSanPham.push(value);
      }
      this.getAllSanPhamChiTietById(this.listIdSanPham);
    } else {
      this.toast.error("Danh Sách Sản Phẩm không được khởi tạo.");
      console.log("Danh Sách Sản Phẩm không được khởi tạo.");
    }
  };
  public getAllSanPham(): void {
    this.sanPhamService.getAll().subscribe({
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
}
