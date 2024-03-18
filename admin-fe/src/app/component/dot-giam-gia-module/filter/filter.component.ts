import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"],
})
export class FilterComponent {
  private timeout: any;
  status: number = 3;
  startDate: string;
  endDate: string;
  search: string;
  @Output() filterFromChild = new EventEmitter<any>();
  @Output() filterReload = new EventEmitter<any>();
  @Output() onPageChangeSearch = new EventEmitter<any>();
  onChangeFilter(): void {
    if (this.startDate === undefined) {
      this.startDate = "";
    }
    if (this.endDate === undefined) {
      this.endDate = "";
    }

    const dataEmit = {
      status: this.status,
      startDate: this.startDate,
      endDate: this.endDate,
      search: this.search,
    };
    this.filterFromChild.emit(dataEmit);
  }

  public handleReset(): void {
    this.status = 3;
    this.startDate = undefined;
    this.endDate = undefined;
    this.search = "";
    this.filterReload.emit();
  }

  public onChangeSearch(searchText: any) {
    this.onPageChangeSearch.emit(searchText);
  }

  public onInputSearch() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.onChangeFilter();
    }, 900); // Thời gian debounce là 900 milliseconds ~ 1s
  }
}
