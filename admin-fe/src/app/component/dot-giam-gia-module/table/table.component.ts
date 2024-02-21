import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Router } from "@angular/router";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";
import { SanPham } from "src/app/model/class/san-pham.class";
import { DotGiamGiaSanPhamChiTiet } from "src/app/model/interface/dot-giam-gia-san-pham-chi-tiet";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  idRemove: number;
  @Input() template: string;
  @Input() titleTable: string;
  @Input() tHead: Array<string>;
  @Input() listObject: DotGiamGia[];
  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Input() pageArray: number[];
  @Input() search: any;
  @Input() placeHolder: string;

  // For DotGiamGiaComponent
  @Output() onPageChange = new EventEmitter<any>();
  @Output() onPageNumberChange = new EventEmitter<any>();
  @Output() onRemoveDotGiamGia = new EventEmitter<any>();
  // For SanPhamTable
  @Input() listSanPham: SanPham[];
  @Output() clickSanPham = new EventEmitter<any>();
  listIdSanPham: Array<number> = [];
  // For SanPhamChiTietTable
  @Input() listIdSanPhamChiTiet: Array<number>;
  @Input() listSanPhamChiTiet: DotGiamGiaSanPhamChiTiet[];
  @Output() clickSanPhamChiTiet = new EventEmitter<any>();

  constructor(private router: Router) {}
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["listSanPhamChiTiet"] &&
      changes["listSanPhamChiTiet"].currentValue
    ) {
      // Update numberArray based on the new dataFromParent
      this;
    }
  }

  // For DotGiamGia
  public onChangeSize(sizeNumber: any) {
    this.onPageChange.emit(sizeNumber.target.value);
  }

  public onChangePage(pageNumber: any) {
    this.onPageNumberChange.emit(pageNumber);
  }

  public onSelectRemove(id: number) {
    this.idRemove = id;
  }
  public onRemove(id: number) {
    console.log(id);
    this.onRemoveDotGiamGia.emit(id);
  }

  // Debounce make sure that the search not request server many times for DotGiamGia
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
