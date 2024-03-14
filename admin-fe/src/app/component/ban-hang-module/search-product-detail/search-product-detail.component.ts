import { Component } from "@angular/core";

@Component({
  selector: "app-search-product-detail",
  templateUrl: "./search-product-detail.component.html",
  styleUrls: ["./search-product-detail.component.css"],
})
export class SearchProductDetailComponent {
  minValue: number = 0;
  maxValue: number = 0;
  minPrice: number = 0;
  maxPrice: number = 0;
  step: number = 0;
  search: string;
  constructor() {
    this.minValue = 500;
    this.maxValue = 1000;
    this.minPrice = 500;
    this.maxPrice = 1000;
    this.step = 20;
  }
  ngOnInit(): void {}

  validateSlider() {
    if (this.minValue > this.maxValue) {
      let temp = this.minValue;
      this.minValue = this.maxValue;
      this.maxValue = temp;
    }
  }
}
