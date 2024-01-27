import { Component, Input } from "@angular/core";

@Component({
  selector: "app-phuong-thuc-thanh-toan",
  templateUrl: "./phuong-thuc-thanh-toan.component.html",
  styleUrls: ["./phuong-thuc-thanh-toan.component.css"],
})
export class PhuongThucThanhToanComponent {
  @Input() phuongThucThanhToan: any;
}
