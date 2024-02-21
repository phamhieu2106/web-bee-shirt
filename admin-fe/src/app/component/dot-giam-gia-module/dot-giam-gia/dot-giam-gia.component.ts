import { Component, OnInit } from "@angular/core";
import { Toast, ToastrService } from "ngx-toastr";
import { interval, switchMap } from "rxjs";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { DotGiamGiaService } from "src/app/service/dot-giam-gia.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-dot-giam-gia",
  templateUrl: "./dot-giam-gia.component.html",
  styleUrls: ["./dot-giam-gia.component.css"],
})
export class DotGiamGiaComponent implements OnInit {
  public overlayText: string = "";
  public isLoadding = false;
  mainHeading: string = "Đợt Giảm Giá";
  tittle: string = "Đợt Giảm Giá";
  icon: string = "fa-solid fa-tags";
  titleTable: string = "Danh Sách Đợt Giảm Giá";
  tHead: Array<string> = [
    "STT",
    "Mã Đợt Giảm Giá",
    "Tên Đợt Giảm Giá",
    "Giá Trị Giảm",
    "Ngày Bắt Đầu",
    "Ngày Kết Thúc",
    "Số Lượng Sản Phẩm",
    "Trạng Thái",
    "Hành Động",
  ];
  data: DotGiamGia[] = [];
  pageNumber: number;
  pageArray: number[];
  pageSize: number;
  search: string;

  constructor(
    private service: DotGiamGiaService,
    private toastSrc: ToastrService
  ) {}

  ngOnInit(): void {
    // Load ListDotGiamGia when first loaded
    this.getAllDotGiamGia();
  }

  private setDataTable(value: PagedResponse<DotGiamGia>) {
    this.data = value.data;
    this.pageArray = value.pageNumberArr;
    this.pageSize = value.pageSize;
    this.pageNumber = value.pageNumber;
  }

  public getAllDotGiamGia(): void {
    // Get DotGiamGia from service
    this.service.getAllDotGiamGia().subscribe({
      next: (value) => {
        this.setDataTable(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  // DOT GIAM GIA FILTER HANDLING
  public getValueFromFilter(data: any) {
    this.service
      .getFilterDotGiamGia(data.status, data.startDate, data.endDate)
      .subscribe({
        next: (value) => {
          this.setDataTable(value);
        },
        error(err) {
          console.log(err);
        },
      });
  }

  public reloadResetFilter() {
    this.getAllDotGiamGia();
  }
  // END DOT GIAM GIA FILTER HANDLING

  // DOT GIAM GIA TABLE HANDLING
  public handleChangePageSizeDGG(pageSize: any) {
    this.service.getDotGiamGiaPageSize(pageSize).subscribe({
      next: (value) => {
        this.setDataTable(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }
  public handleChangePageNumberDGG(pageNumber: any) {
    this.service.getDotGiamGiaPageNumber(this.pageSize, pageNumber).subscribe({
      next: (value) => {
        this.setDataTable(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }
  public handleChangeSearchDGG(search: any) {
    this.service.getDotGiamGiaSearch(search).subscribe({
      next: (value) => {
        this.setDataTable(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  public handleRemoveDGG(id: any) {
    this.service.deleteDotGiamGiaRequest(id).subscribe({
      complete: () => {
        Swal.fire({
          icon: "success",
          title: `Xoá thành công '${id}'!`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.turnOffOverlay("");
        this.toastSrc.success("Xoá đợt giảm giá thành công");
        this.getAllDotGiamGia();
      },
      error: (err) => {
        this.toastSrc.error(
          "Có lỗi khi cố gắng xoá Đợt Giảm Giá ",
          err.message
        );
        console.log(err.message);
      },
    });
  }
  // END DOT GIAM GIA TABLE HANDLING
  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }
}
