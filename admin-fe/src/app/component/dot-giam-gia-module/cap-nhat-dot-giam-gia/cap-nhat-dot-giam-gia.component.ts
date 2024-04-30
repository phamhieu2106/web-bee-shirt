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
  ];
  typeForm: string = "update";
  formHeader: string = "Cập Nhật Đợt Giảm Giá";
  formButton: string = "Cập Nhật";

  ngOnInit(): void {}

  constructor(
    private service: DotGiamGiaService,
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
        this.getAllSanPham();
        this.service
          .getAllListIdSanPhamChiTietByIdDotGiamGiaSanPham(id)
          .subscribe((data) => {
            this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet = data;
          });

        this.getListIdSanPham();
      },
      error(err) {
        console.log(err);
      },
      complete: () => {
        if (this.dotGiamGiaUpdateRequest.trangThai == 0) {
          this.toast.warning(
            "Đợt giảm giá này không thể được cập nhật do đã kết thúc hoặc bị hủy"
          );
        }
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
  public setListIdSanPhamChiTiet(): void {
    this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet = Array.from(
      this.setOfCheckedId
    );
  }
  public getAllSanPhamChiTietById(id: Array<number>) {
    let idDotGiamGia: number = null;
    this.route.paramMap.subscribe((params) => {
      idDotGiamGia = Number(params.get("id"));
    });

    this.service.getAllSanPhamChiTietUpdateById(id, idDotGiamGia).subscribe({
      next: (value) => {
        this.listSanPhamChiTiet = value;
        this.listOfData = this.removeDuplicateById(
          this.listSanPhamChiTiet.data
        );
      },
      error: (message) => {
        this.toast.error("Có lỗi khi lấy ra danh sách sản phẩm chi tiết");
        console.log(message);
      },
      complete: () => {
        let temp: any[] = [];
        this.listOfData.forEach((item) => {
          this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet.forEach((id) => {
            if (id == Number(item.id)) {
              temp.push(item);
              return;
            }
          });
        });
        temp.forEach((item) => this.onItemChecked(item.id, true));
      },
    });
  }

  private removeDuplicateById(data: any[]): any[] {
    const uniqueIds = new Set<number>();
    const uniqueData = data.filter((item) => {
      if (uniqueIds.has(item.id)) {
        return false; // Return false if ID has already been encountered
      } else {
        uniqueIds.add(item.id); // Add ID to set if encountering it for the first time
        return true; // Return true to keep this item in the filtered array
      }
    });

    return uniqueData;
  }
  //For Table SanPham
  // Page SanPham
  listSanPham: SanPham[];
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
    this.service.getAllSanPham().subscribe({
      next: (value) => {
        this.listSanPham = value;
        this.dataSanPham = this.listSanPham;
      },
      error: (err) => {
        console.log(err);
        this.toast.error("Có lỗi khi cố gắng lấy danh sách Sản Phẩm");
      },
    });
  }

  // TEST
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly DotGiamGiaSanPhamChiTiet[] = [];
  listOfData: readonly DotGiamGiaSanPhamChiTiet[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
      this.setListIdSanPhamChiTiet();
    } else {
      this.setOfCheckedId.delete(id);
      this.setListIdSanPhamChiTiet();
    }
  }
  onAllChecked(value: boolean): void {
    if (value) {
      // Đặt tất cả các phần tử trên trang hiện tại vào setOfCheckedId
      this.listOfData.forEach((item) => {
        this.setOfCheckedId.add(item.id);
      });
    } else {
      // Nếu giá trị là false, xóa tất cả các phần tử khỏi setOfCheckedId
      this.setOfCheckedId.clear();
      this.dotGiamGiaUpdateRequest.listIdSanPhamChiTiet = [];
    }

    // Lặp qua danh sách các phần tử đã chọn và cập nhật listIdSanPhamChiTiet
    this.setListIdSanPhamChiTiet();

    this.refreshCheckedStatus();
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly DotGiamGiaSanPhamChiTiet[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) => {
      this.setOfCheckedId.has(item.id);
    });
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }
}
