import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DotGiamGia } from "src/app/model/class/dot-giam-gia.class";

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

  @Output() onPageChange = new EventEmitter<any>();
  @Output() onPageNumberChange = new EventEmitter<any>();
  @Output() onPageChangeSearch = new EventEmitter<any>();

  onChangeSize(sizeNumber: any) {
    this.onPageChange.emit(sizeNumber.target.value);
  }

  onChangePage(pageNumber: any) {
    this.onPageNumberChange.emit(pageNumber);
  }

  onChangeSearch(searchText: any) {
    this.onPageChangeSearch.emit(searchText);
  }

  // Debounce make sure that the search not request server many times
  onInputSearch(event: any) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.onChangeSearch(event.target.value);
    }, 900); // Thời gian debounce là 900 milliseconds ~ 1s
  }

  ngOnInit(): void {}
}
