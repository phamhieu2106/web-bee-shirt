import { Component, OnInit } from "@angular/core";
import { HoaDon } from "src/app/model/class/hoa-don.class";

@Component({
  selector: "app-tra-hang",
  templateUrl: "./tra-hang.component.html",
  styleUrls: ["./tra-hang.component.css"],
})
export class TraHangComponent implements OnInit {
  public hoaDon: HoaDon;

  public setHoaDonRequest(hoaDonRequest: any) {
    this.hoaDon = hoaDonRequest;
  }
  ngOnInit(): void {}
}
