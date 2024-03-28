import { Component, Input } from "@angular/core";

@Component({
  selector: "app-product-image",
  templateUrl: "./product-image.component.html",
  styleUrls: ["./product-image.component.css"],
})
export class ProductImageComponent {
  @Input() url: string = "/assets/img/default-image.jpg";
  @Input() discount: number;
  @Input() widths: number = 70;
  @Input() heights: number = 70;
}
