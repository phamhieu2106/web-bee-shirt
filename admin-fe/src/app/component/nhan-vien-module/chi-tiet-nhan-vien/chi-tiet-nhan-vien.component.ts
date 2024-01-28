import { Component, Input } from "@angular/core";
import { NhanVienResponse } from "src/app/model/interface/nhan-vien-response.interface";

@Component({
  selector: "app-chi-tiet-nhan-vien",
  templateUrl: "./chi-tiet-nhan-vien.component.html",
  styleUrls: ["./chi-tiet-nhan-vien.component.css"],
})
export class ChiTietNhanVienComponent {
  @Input() nhanVienDetails: NhanVienResponse;
}
