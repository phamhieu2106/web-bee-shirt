import { Component, Input } from "@angular/core";

@Component({
  selector: "app-trang-thai-hoa-don",
  templateUrl: "./trang-thai-hoa-don.component.html",
  styleUrls: ["./trang-thai-hoa-don.component.css"],
})
export class TrangThaiHoaDonComponent {

  @Input() trangThai: string;

}
