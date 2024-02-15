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
    "Màu",
    "Trạng Thái",
    "Hành Động",
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

  // Set Object
  dotGiamGiaUpdateRequest: DotGiamGia;
  loadForm(id: number) {
    this.service.getDotGiamGiaById(id).subscribe({
      next: (value) => {
        this.dotGiamGiaUpdateRequest = value;
        console.log(this.dotGiamGiaUpdateRequest);
        // Get List ID SanPham
        // Load SanPham table
        this.getAllSanPham();
        this.getListIdSanPham(
          this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet
        );
      },
      error(err) {
        console.log(err);
      },
    });
  }

  // Load List Id SanPham
  listIdSanPham: number[];
  public async getListIdSanPham(ids: number[]) {
    this.service.getIdSanPhamBySanPhamChiTietId(ids).subscribe({
      next: async (value) => {
        this.listIdSanPham = value;
        // Get Ids SanPhamChiTiet
        //  Get SanPhamChiTiet after get List Id San Pham
        await this.getListIdSanPhamChiTiet(ids);
        await this.getAllSanPhamChiTietById(this.listIdSanPham);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // Load San Pham Chi Tiet
  listIdSanPhamChiTiet: number[];
  public async getListIdSanPhamChiTiet(ids: number[]) {
    const stringIDS = JSON.stringify(ids);
    this.listIdSanPhamChiTiet = stringIDS
      .split(",")
      .map((type) => type.replace(/"/g, ""))
      .map((x) => parseInt(x.trim(), 10));
  }
  // Page SPCT
  listSanPhamChiTiet: PagedResponse<DotGiamGiaSanPhamChiTiet>;
  // Data Table
  dataSanPhamChiTiet: DotGiamGiaSanPhamChiTiet[] = [];
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
      this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet =
        this.listIdSanPhamChiTiet;
    } else {
      this.toast.error("Mảng IdSanPhamChiTiet không được khởi tạo.");
      console.log("Mảng IdSanPhamChiTiet không được khởi tạo.");
    }
  };
  public getAllSanPhamChiTietById(id: Array<number>): void {
    this.service.getAllSanPhamChiTietById(id).subscribe({
      next: (value) => {
        this.listSanPhamChiTiet = value;
        this.dataSanPhamChiTiet = this.listSanPhamChiTiet.data;
      },
      error: (message) => {
        this.toast.error("Có lỗi khi lấy ra danh sách sản phẩm chi tiết");
        console.log(message);
      },
    });
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
      } else {
        // Giá trị không tồn tại, thêm vào mảng
        this.listIdSanPham.push(value);
      }
      this.getAllSanPhamChiTietById(this.listIdSanPham);
    } else {
      this.toast.error("Mảng this.listIdSanPham không được khởi tạo.");
      console.log("Mảng this.listIdSanPham không được khởi tạo.");
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
