import { HoaDonService } from "src/app/service/hoa-don.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HoaDon } from "src/app/model/class/hoa-don.class";

@Component({
  selector: "app-chi-tiet-hoa-don",
  templateUrl: "./chi-tiet-hoa-don.component.html",
  styleUrls: ["./chi-tiet-hoa-don.component.css"],
})
export class ChiTietHoaDonComponent {
  public id = this.activatedRoute.snapshot.params["id"];
  public hoaDon: HoaDon;
  constructor(
    private activatedRoute: ActivatedRoute,
    private hoaDonService: HoaDonService
  ) {}

  ngOnInit() {
    this.getHoaDonById();
  }

  getHoaDonById() {
    this.hoaDonService.getById(this.id).subscribe({
      next: (resp) => {
        this.hoaDon = resp;
        console.log(resp);
      },
      error: (err) => console.log(err),
    });
  }
}
