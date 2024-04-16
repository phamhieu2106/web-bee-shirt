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
  listSanPham: SanPham[];
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
  ];
  listSanPhamChiTiet: PagedResponse<DotGiamGiaSanPhamChiTiet>;
  dataSanPhamChiTiet: DotGiamGiaSanPhamChiTiet[] = [];
  // varribles for child elements
  listIdSanPham: Array<number> = [];
  listIdSanPhamChiTiet: Array<number> = [];

  // varribles for post methods
  constructor(
    private service: DotGiamGiaService,
    private toast: ToastrService
  ) {
    this.dotGiamGiaRequest = {
      tenDotGiamGia: null,
      giaTriPhanTram: null,
      thoiGianBatDau: null,
      thoiGianKetThuc: null,
      listIdSanPhamChiTiet: [],
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
        this.dataSanPhamChiTiet = this.removeDuplicateById(
          this.listSanPhamChiTiet.data
        );
        this.listOfData = this.removeDuplicateById(
          this.listSanPhamChiTiet.data
        );
      },
      error: (message) => {
        this.toast.error(message);
        console.log(message);
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

  public setListIdSanPhamChiTiet(): void {
    this.dotGiamGiaRequest.listIdSanPhamChiTiet = Array.from(
      this.setOfCheckedId
    );
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
      this.dotGiamGiaRequest.listIdSanPhamChiTiet = [];
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
