import { HoaDonService } from "src/app/service/hoa-don.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HoaDon } from "src/app/model/class/hoa-don.class";
import { PdfService } from "src/app/service/pdf.service";
import { DiaChiVaPhiVanChuyen } from "src/app/model/class/dia-chi-va-phi-van-chuyen.class";
import { NotificationService } from "src/app/service/notification.service";
import { PdfTraHangService } from "src/app/service/pdf-tra-hang.service";
import { DiaChi } from "src/app/model/class/dia-chi.class";

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
    private pdfTraHangService: PdfTraHangService,
    private notifycation: NotificationService
  ) {}

  ngOnDestroy(): void {}

  updateHoaDon(hoaDon: HoaDon) {
    this.hoaDonService.putHoaDon(hoaDon).subscribe({
      next: (resp) => {
        this.notifycation.success("Cập nhật hóa đơn thành công");
        this.hoaDon = resp;
      },
      error: (err) => {
        this.notifycation.error(err.error.message);
      },
    });
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params["id"];
    this.getHoaDonById(id);
  }

  getHoaDonById(id: number) {
    this.hoaDonService.getById(id).subscribe({
      next: (resp) => {
        this.hoaDon = resp;
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

  printHoaDonTraHang() {
    this.pdfTraHangService.getHoaDonTraHang(this.hoaDon.id);
  }

  changeDiaChi() {
    const orderPhoneNumberRegex = /^(0[0-9])+([0-9]{8})\b/;
    if (!orderPhoneNumberRegex.test(this.orderPhoneNumberTemp)) {
      this.notifycation.error("Số điện thoại không hợp lệ");
      return;
    } else {
      if (
        this.diaChiVaPhiVanChuyen.tinh &&
        this.diaChiVaPhiVanChuyen.huyen &&
        this.diaChiVaPhiVanChuyen.xa &&
        this.diaChiVaPhiVanChuyen.cuThe &&
        this.diaChiVaPhiVanChuyen.cuThe.trim() != ""
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
        this.closeModal("btnCloseChangeDiaChi");
        this.updateHoaDon(this.hoaDon);
      } else {
        this.notifycation.warning("Bạn vui lòng chọn đầy đủ địa chỉ");
      }
    }
  }

  inPhieuGiao() {
    this.pdfService.generatePDFPhieuGiao(this.hoaDon);
  }

  putHoaDon(hoaDon: HoaDon) {
    this.updateHoaDon(hoaDon);
  }

  isGiaoHangAndChuyenKhoan(hoaDon: HoaDon): boolean {
    return this.hoaDonService.isGiaoHangAndChuyenKhoan(hoaDon);
  }

  closeModal(idModal: string): void {
    document.getElementById(idModal).click();
  }

  changeDiaChiVaPhiVanChuyen(diaChi: DiaChi) {
    let newDCVPVC = new DiaChiVaPhiVanChuyen();
    newDCVPVC.tinh = diaChi.tinh.trim();
    newDCVPVC.huyen = diaChi.huyen.trim();
    newDCVPVC.xa = diaChi.xa.trim();
    newDCVPVC.cuThe = diaChi.duong.trim();

    this.diaChiVaPhiVanChuyen = newDCVPVC;
  }
}
