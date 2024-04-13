import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-input-number",
  templateUrl: "./input-number.component.html",
  styleUrls: ["./input-number.component.css"],
})
export class InputNumberComponent {
  @Input({ required: true }) value: number;
  @Input() disabled = false;
  @Output() change = new EventEmitter();
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  inputValue: number;

  constructor() {}

  ngOnChanges() {
    this.inputValue = this.value;
  }

  onInputChange(target: any) {
    const parsedValue = parseInt(target.value.replace(/\D/g, ""), 10);
    if (!isNaN(parsedValue)) {
      this.inputValue = parsedValue;
      this.valueChange.emit(this.inputValue);
    }
  }

  formatNumber(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
