import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { DotGiamGiaService } from "src/app/service/dot-giam-gia.service";

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
    "Trạng Thái",
    "Hành Động",
  ];
  data: DotGiamGia[] = [];
  pageNumber: number;
  pageArray: number[];
  pageSize: number;
  search: string;

  constructor(private service: DotGiamGiaService) {}

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
  public handleChangePageSize(pageSize: any) {
    this.service.getDotGiamGiaPageSize(pageSize).subscribe({
      next: (value) => {
        this.setDataTable(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }
  public handleChangePageNumber(pageNumber: any) {
    this.service.getDotGiamGiaPageNumber(this.pageSize, pageNumber).subscribe({
      next: (value) => {
        this.setDataTable(value);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
