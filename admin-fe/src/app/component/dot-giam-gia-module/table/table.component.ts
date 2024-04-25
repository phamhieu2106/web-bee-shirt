import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";
import { SanPham } from "src/app/model/class/san-pham.class";
import { DotGiamGiaSanPhamChiTiet } from "src/app/model/interface/dot-giam-gia-san-pham-chi-tiet";
import { DotGiamGiaService } from "src/app/service/dot-giam-gia.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  object: DotGiamGia;
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

  //
  @Input() filterObject: any;
  valueSize: any = 5;
  valuePage: any = 1;
  //
  constructor(private service: DotGiamGiaService) {}
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
    this.valueSize = sizeNumber.target.value;
    this.onPageChange.emit({
      size: this.valueSize,
      page: this.valuePage,
    });
  }

  public onChangePage(pageNumber: any) {
    this.valuePage = pageNumber;
    this.onPageNumberChange.emit({
      size: this.valueSize,
      page: this.valuePage,
    });
  }

  public onSelectRemove(id: number) {
    this.onRemove(id);
  }
  public onRemove(id: number) {
    Swal.fire({
      title:
        "Bạn có chắc chắn muốn hủy Đợt Giảm Giá? Hành động này sẽ không thể được hoàn tác nếu bạn bấm đồng ý!",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then((result) => {
      if (result.isConfirmed) {
        this.onRemoveDotGiamGia.emit(id);
      }
    });
  }
  public onSelected(id: number) {
    this.service.getDotGiamGiaById(id).subscribe({
      next: (value) => {
        this.object = value;
      },
    });
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
