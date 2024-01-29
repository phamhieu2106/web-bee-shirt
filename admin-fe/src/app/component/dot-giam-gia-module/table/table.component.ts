import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";
import { SanPhamChiTiet } from "src/app/model/class/san-pham-chi-tiet.class";
import { SanPham } from "src/app/model/class/san-pham.class";
import { DotGiamGiaSanPhamChiTiet } from "src/app/model/interface/dot-giam-gia-san-pham-chi-tiet";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  private timeout: any;

  @Input() template: string;
  @Input() titleTable: string;
  @Input() tHead: Array<string>;
  @Input() detail: Function;
  @Input() update: Function;
  @Input() listObject: DotGiamGia[];
  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Input() pageArray: number[];
  @Input() search: any;
  @Input() placeHolder: string;

  // For DotGiamGiaComponent
  @Output() onPageChange = new EventEmitter<any>();
  @Output() onPageNumberChange = new EventEmitter<any>();
  @Output() onPageChangeSearch = new EventEmitter<any>();

  // For SanPhamTable
  @Input() listSanPham: SanPham[];
  @Output() clickSanPham = new EventEmitter<any>();
  listIdSanPham: Array<number> = [];
  // For SanPhamChiTietTable
  @Input() listSanPhamChiTiet: DotGiamGiaSanPhamChiTiet[];
  @Output() clickSanPhamChiTiet = new EventEmitter<any>();
  // For DotGiamGia
  public onChangeSize(sizeNumber: any) {
    this.onPageChange.emit(sizeNumber.target.value);
  }

  public onChangePage(pageNumber: any) {
    this.onPageNumberChange.emit(pageNumber);
  }

  public onChangeSearch(searchText: any) {
    this.onPageChangeSearch.emit(searchText);
  }

  // Debounce make sure that the search not request server many times for DotGiamGia
  public onInputSearch(event: any) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.onChangeSearch(event.target.value);
    }, 900); // Thời gian debounce là 900 milliseconds ~ 1s
  }

  // For SanPham
  public addIdSanPham(value: any) {
    this.clickSanPham.emit(value);
  }

  // For SanPhamChiTiet
  public addIdSanPhamChiTiet(value: any) {
    this.clickSanPhamChiTiet.emit(value);
  }
  ngOnInit(): void {}
}
