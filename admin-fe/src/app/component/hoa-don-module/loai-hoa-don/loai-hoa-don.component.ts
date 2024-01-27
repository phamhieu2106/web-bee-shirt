import { Component, Input } from "@angular/core";

@Component({
  selector: "app-loai-hoa-don",
  templateUrl: "./loai-hoa-don.component.html",
  styleUrls: ["./loai-hoa-don.component.css"],
})
export class LoaiHoaDonComponent {

  @Input() loaiHoaDon: string;

}
