import { Component } from "@angular/core";
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
export class CapNhatDotGiamGiaComponent {
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
  formHeader: string = "Cập Nhật Đợt Giảm Giá";
  formButton: string = "Cập Nhật";



  constructor(private service: DotGiamGiaService,
    private sanPhamService: SanPhamService,
     private route: ActivatedRoute,
     private toast: ToastrService) {
    // Load dotGiamGiaUpdateRequest
    this.route.paramMap.subscribe(params =>{
      this.loadForm(Number(params.get('id')));
    });
  }
  // Set Object
  dotGiamGiaUpdateRequest: DotGiamGia;
  loadForm(id: number){
    this.service.getDotGiamGiaById(id).subscribe({
      next: (value) => {
          this.dotGiamGiaUpdateRequest = value;
          console.log(this.dotGiamGiaUpdateRequest);
          // Get List ID SanPham
          // Load SanPham table
          this.getAllSanPham();
          this.getListIdSanPham();
      },
      error(err) {
        console.log(err);
      },
    })
  }

  // Load SET List Id SanPham
  listIdSanPham: number[];
  public getListIdSanPham(){
   this.service.getIdSanPhamBySanPhamChiTietId(this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet).subscribe({
     next: (value) => {
       this.listIdSanPham = value;
      //  Get SanPhamChiTiet after get List Id San Pham
       this.getAllSanPhamChiTietById(this.listIdSanPham);
      },
      error: (err) => {
        console.log(err);
      }
    }
   )
  }
  // Load Set List SanPhamChiTiet
  listSanPhamChiTiet: PagedResponse<DotGiamGiaSanPhamChiTiet>;
  dataSanPhamChiTiet: DotGiamGiaSanPhamChiTiet[] = [];
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
  //For Table SanPham
  listSanPham: PagedResponse<SanPham>;
  dataSanPham: SanPham[] = [];
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
