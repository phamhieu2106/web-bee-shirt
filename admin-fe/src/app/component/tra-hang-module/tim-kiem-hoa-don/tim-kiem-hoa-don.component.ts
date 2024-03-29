import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tim-kiem-hoa-don",
  templateUrl: "./tim-kiem-hoa-don.component.html",
  styleUrls: ["./tim-kiem-hoa-don.component.css"],
})
export class TimKiemHoaDonComponent implements OnInit {
  public maHoaDon: string;
  constructor() {}
  ngOnInit(): void {}
  public submitForm(): void {
    console.log(this.maHoaDon);
  }
}
