import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"],
})
export class FilterComponent {
  status: number = 3;
  startDate: string;
  endDate: string;

  @Output() filterFromChild = new EventEmitter<any>();
  @Output() filterReload = new EventEmitter<any>();

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
    };
    this.filterFromChild.emit(dataEmit);
  }

  handleReset(): void {
    this.status = 3;
    this.startDate = undefined;
    this.endDate = undefined;
    this.filterReload.emit();
  }
}
