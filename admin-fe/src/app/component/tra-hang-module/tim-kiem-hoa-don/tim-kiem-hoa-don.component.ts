import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ScannerQRCodeResult } from "ngx-scanner-qrcode";
import { ToastrService } from "ngx-toastr";
import { HoaDon } from "src/app/model/class/hoa-don.class";
import { TraHangService } from "src/app/service/tra-hang.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-tim-kiem-hoa-don",
  templateUrl: "./tim-kiem-hoa-don.component.html",
  styleUrls: ["./tim-kiem-hoa-don.component.css"],
})
export class TimKiemHoaDonComponent implements OnInit {
  public maHoaDon: string;
  hoaDon: HoaDon = null;

  // Event
  @Output() findHoaDon: EventEmitter<any> = new EventEmitter();

  constructor(private traHangService: TraHangService) {}
  ngOnInit(): void {}
  public reset() {
    this.maHoaDon = null;
    this.findHoaDon.emit(null);
  }
  public submitForm(): void {
    if (this.maHoaDon == null) {
      this.findHoaDon.emit(null);
    } else {
      this.traHangService.getHoaDon(this.maHoaDon).subscribe({
        next: (value) => {
          this.hoaDon = value;
        },
        error: (err) => {
          Swal.fire({
            toast: true,
            icon: "error",
            position: "top-end",
            title: `${err.error.message}`,
            showConfirmButton: false,
            timer: 3000,
          });
        },
        complete: () => {
          Swal.fire({
            toast: true,
            icon: "success",
            position: "top-end",
            title: `Tìm thấy hóa đơn có mã ${this.maHoaDon}`,
            showConfirmButton: false,
            timer: 3000,
          });
          this.findHoaDon.emit(this.hoaDon);
        },
      });
    }
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    if (e && e.length > 0) {
      const qrCodeValue = e[0].value;

      // Ensure qrCodeValue starts with "HD......"
      if (qrCodeValue.startsWith("HD")) {
        this.maHoaDon = qrCodeValue.toString();
        this.submitForm();
      } else {
        // Handle case when qrCodeValue doesn't start with "HD......"
        Swal.fire({
          toast: true,
          icon: "error",
          position: "top-end",
          title: `Mã QR không hợp lệ`,
          showConfirmButton: false,
          timer: 3000,
        });
        console.log("Invalid QRCode");
      }
      action.stop();
      document.getElementById("closeFormQRCode").click();
    }
  }
}
