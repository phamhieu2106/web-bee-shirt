import { Component, OnInit } from "@angular/core";
import { Toast, ToastrService } from "ngx-toastr";
import { interval, switchMap } from "rxjs";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { DotGiamGiaService } from "src/app/service/dot-giam-gia.service";
import { NotificationService } from "src/app/service/notification.service";

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
    "Mã",
    "Tên ",
    "Giá Trị Giảm",
    "Ngày Bắt Đầu",
    "Ngày Kết Thúc",
    "Số Lượng",
    "Trạng Thái",
    "Hành Động",
  ];
  data: DotGiamGia[] = [];
  pageNumber: number;
  pageArray: number[];
  pageSize: number;
  search: string;

  //
  filterObject: any;
  //

  constructor(
    private service: DotGiamGiaService,
    private notifService: NotificationService
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
      error: (err) => {
        console.log(err);
        this.notifService.error("Lỗi khi tải danh sách đợt giảm giá");
      },
    });
  }

  // DOT GIAM GIA FILTER HANDLING
  public getValueFromFilter(data: any) {
    this.filterObject = data;
    this.service
      .getFilterDotGiamGia(
        data.status,
        data.startDate,
        data.endDate,
        data.search
      )
      .subscribe({
        next: (value) => {
          this.setDataTable(value);
        },
        error: (err) => {
          console.log(err);
          this.notifService.error(
            "Lỗi khi tải danh sách đợt giảm giá khi sử dụng lọc"
          );
        },
      });
  }

  public reloadResetFilter() {
    this.getAllDotGiamGia();
    this.filterObject = undefined;
  }
  // END DOT GIAM GIA FILTER HANDLING

  // DOT GIAM GIA TABLE HANDLING
  public handleChangePageSizeDGG(data: any) {
    if (this.filterObject) {
      this.service
        .getDotGiamGiaFilterPageNumber(
          data.size,
          data.page,
          this.filterObject.status,
          this.filterObject.startDate,
          this.filterObject.endDate,
          this.filterObject.search
        )
        .subscribe({
          next: (value) => {
            this.setDataTable(value);
          },
          error: (err) => {
            console.log(err);
            this.notifService.error(
              "Lỗi khi tải danh sách đợt giảm giá khi chọn trang đợt giảm giá"
            );
          },
        });
    } else {
      this.service.getDotGiamGiaPageSize(data.size, data.page).subscribe({
        next: (value) => {
          this.setDataTable(value);
        },
        error: (err) => {
          console.log(err);
          this.notifService.error(
            "Lỗi khi tải danh sách đợt giảm giá khi chọn số phần tử hiển thị"
          );
        },
      });
    }
  }
  public handleChangePageNumberDGG(data: any) {
    if (this.filterObject) {
      this.service
        .getDotGiamGiaFilterPageNumber(
          data.size,
          data.page,
          this.filterObject.status,
          this.filterObject.startDate,
          this.filterObject.endDate,
          this.filterObject.search
        )
        .subscribe({
          next: (value) => {
            this.setDataTable(value);
          },
          error: (err) => {
            console.log(err);
            this.notifService.error(
              "Lỗi khi tải danh sách đợt giảm giá khi chọn trang đợt giảm giá"
            );
          },
        });
    } else {
      this.service.getDotGiamGiaPageNumber(data.size, data.page).subscribe({
        next: (value) => {
          this.setDataTable(value);
        },
        error: (err) => {
          console.log(err);
          this.notifService.error(
            "Lỗi khi tải danh sách đợt giảm giá khi chọn trang đợt giảm giá"
          );
        },
      });
    }
  }
  public handleChangeSearchDGG(search: any) {
    this.service.getDotGiamGiaSearch(search).subscribe({
      next: (value) => {
        this.setDataTable(value);
      },
      error: (err) => {
        console.log(err);
        this.notifService.error(
          "Lỗi khi tải danh sách đợt giảm giá khi tìm kiếm đợt giảm giá"
        );
      },
    });
  }

  public handleRemoveDGG(id: any) {
    this.service.deleteDotGiamGiaRequest(id).subscribe({
      complete: () => {
        this.notifService.success("Hủy đợt giảm giá thành công");
        this.getAllDotGiamGia();
      },
      error: (err) => {
        this.notifService.error(`Xoá Thất Bại Do ${err.error.message}!`);
        console.log(err.message);
      },
    });
  }
  // END DOT GIAM GIA TABLE HANDLING
}
