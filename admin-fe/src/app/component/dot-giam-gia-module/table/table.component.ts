import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  @Input() titleTable: string;
  @Input() tHead: Array<string>;
  @Input() detail: Function;
  @Input() update: Function;
  @Input() listObject: DotGiamGia[];
  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Input() pageArray: number[];
  @Input() search: any;

  @Output() onPageChange = new EventEmitter<any>();
  @Output() onPageNumberChange = new EventEmitter<any>();

  onChangeSize(sizeNumber: any) {
    this.onPageChange.emit(sizeNumber.target.value);
  }

  onChangePage(pageNumber: any) {
    this.onPageNumberChange.emit(pageNumber);
  }

  ngOnInit(): void {}
}
