import { HoaDonService } from "src/app/service/hoa-don.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HoaDon } from "src/app/model/class/hoa-don.class";
import { PdfService } from "src/app/service/pdf.service";
import { ToastrService } from "ngx-toastr";
import { DiaChiVaPhiVanChuyen } from "src/app/model/class/dia-chi-va-phi-van-chuyen.class";

@Component({
  selector: "app-chi-tiet-hoa-don",
  templateUrl: "./chi-tiet-hoa-don.component.html",
  styleUrls: ["./chi-tiet-hoa-don.component.css"],
})
export class ChiTietHoaDonComponent implements OnInit, OnDestroy {
  id: number = -1;
  hoaDon: HoaDon = new HoaDon();
  diaChiVaPhiVanChuyen = new DiaChiVaPhiVanChuyen();
  constructor(
    private activatedRoute: ActivatedRoute,
    private hoaDonService: HoaDonService,
    private pdfService: PdfService,
    private toastr: ToastrService
  ) {
    this.id = this.activatedRoute.snapshot.params["id"];
  }
  ngOnDestroy(): void {
    // console.log(this.hoaDon);

    this.hoaDonService.putHoaDon(this.hoaDon).subscribe({
      next: (resp) => {
        this.toastr.success("Cập nhật hóa đơn thành công", "Thành công");
        // console.log(resp);
      },
      error: (err) => {
        this.toastr.error(err.error.message, "Thất bại");
      },
    });
  }

  ngOnInit() {
    this.getHoaDonById();
  }

  getHoaDonById() {
    this.hoaDonService.getById(this.id).subscribe({
      next: (resp) => {
        this.hoaDon = resp;
        // console.log(resp);
      },
      error: (err) => console.log(err),
    });
  }

  printHoaDon() {
    this.pdfService.generatePDFHoaDon(this.hoaDon);
  }

  changeDiaChi() {
    if (
      this.diaChiVaPhiVanChuyen.tinh &&
      this.diaChiVaPhiVanChuyen.huyen &&
      this.diaChiVaPhiVanChuyen.xa
    ) {
      this.hoaDon.diaChiNguoiNhan = `${
        this.diaChiVaPhiVanChuyen.cuThe == undefined
          ? ""
          : this.diaChiVaPhiVanChuyen.cuThe
      },${this.diaChiVaPhiVanChuyen.xa},${this.diaChiVaPhiVanChuyen.huyen},${
        this.diaChiVaPhiVanChuyen.tinh
      }`;
      this.hoaDon.phiVanChuyen = this.diaChiVaPhiVanChuyen.phiVanChuyen;
    } else {
      this.toastr.warning("Bạn vui lòng chọn đầy đủ địa chỉ");
    }
  }
}
