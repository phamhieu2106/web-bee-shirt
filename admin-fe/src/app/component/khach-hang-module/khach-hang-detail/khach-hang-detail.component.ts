// import { Component, OnInit } from "@angular/core";
// import { ActivatedRoute } from "@angular/router";
// import { KhachHang } from "src/app/model/class/khach-hang.class";
// import { KhachHangService } from "src/app/service/khach-hang.service";
// import { KhachHangResponse } from "src/app/model/interface/khach-hang-response.interface";

// @Component({
//   selector: "app-khach-hang-detail",
//   templateUrl: "./khach-hang-detail.component.html",
//   styleUrls: ["./khach-hang-detail.component.css"],
// })
// export class KhachHangDetailComponent implements OnInit {
//   public kh: KhachHang;
//   public id: number;
//   constructor(
//     private route: ActivatedRoute,
//     private khachHangService: KhachHangService
//   ) {}
//   ngOnInit() {
//     this.route.params.subscribe((params) => {
//       this.id = +params["id"];
//       this.khachHangService.getById(this.id).subscribe(
//         (kh) => (this.kh = kh),
//         (error) => console.error(error)
//       );
//     });
//     // export class KhachHangDetailComponent implements OnInit{
//     //   @Input() khChiTiet: KhachHangResponse;

//     //   ngOnInit(): void {
//   }
// }
import { Component, Input, OnInit } from "@angular/core";
import { KhachHangResponse } from "src/app/model/interface/khach-hang-response.interface";

@Component({
  selector: "app-khach-hang-detail",
  templateUrl: "./khach-hang-detail.component.html",
  styleUrls: ["./khach-hang-detail.component.css"],
})
export class KhachHangDetailComponent implements OnInit {
  @Input() khChiTiet: KhachHangResponse;

  ngOnInit(): void {}
}
