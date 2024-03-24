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
  // id: number = -1;
  hoaDon: HoaDon = new HoaDon();
  diaChiVaPhiVanChuyen = new DiaChiVaPhiVanChuyen();
  orderNameTemp: string;
  orderPhoneNumberTemp: string;
  orderNoteTemp: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private hoaDonService: HoaDonService,
    private pdfService: PdfService,
    private toastr: ToastrService
  ) {
    let id = this.activatedRoute.snapshot.params["id"];
    this.getHoaDonById(id);
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

  ngOnInit() {}

  getHoaDonById(id: number) {
    this.hoaDonService.getById(id).subscribe({
      next: (resp) => {
        this.hoaDon = resp;
        // console.log(resp);
        this.orderNameTemp = this.hoaDon.tenNguoiNhan;
        this.orderPhoneNumberTemp = this.hoaDon.sdtNguoiNhan;
        this.orderNoteTemp = this.hoaDon.ghiChu;
      },
      error: (err) => console.log(err),
    });
  }

  printHoaDon() {
    this.pdfService.generatePDFHoaDon(this.hoaDon);
  }

  changeDiaChi() {
    const orderPhoneNumberRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!orderPhoneNumberRegex.test(this.orderPhoneNumberTemp)) {
      this.toastr.error("Số điện thoại không hợp lệ");
      return;
    } else {
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
        this.hoaDon.tenNguoiNhan = this.orderNameTemp;
        this.hoaDon.sdtNguoiNhan = this.orderPhoneNumberTemp;
        this.hoaDon.ghiChu = this.orderNoteTemp;
      } else {
        this.toastr.warning("Bạn vui lòng chọn đầy đủ địa chỉ");
      }
    }
  }

  inPhieuGiao() {
    this.pdfService.generatePDFPhieuGiao(this.hoaDon);
  }
  // private mapToDiaChiVaPhiVanChuyen(diaChi: string): DiaChiVaPhiVanChuyen {
  //   let dcvpvn = new DiaChiVaPhiVanChuyen();
  //   if (diaChi != null && diaChi != undefined) {
  //     const diaChis: string[] = diaChi.split(",");
  //     dcvpvn.cuThe = diaChis[0];
  //     dcvpvn.xa = diaChis[1];
  //     dcvpvn.huyen = diaChis[2];
  //     dcvpvn.tinh = diaChis[3];
  //   }

  //   return dcvpvn;
  // }
  // doiDiaChi() {
  //   this.mapToDiaChiVaPhiVanChuyen(this.hoaDon.diaChiNguoiNhan);
  // }
}
