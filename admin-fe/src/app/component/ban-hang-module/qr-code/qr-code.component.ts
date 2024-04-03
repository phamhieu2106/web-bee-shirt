import { Component, EventEmitter, Output } from "@angular/core";
import {
  NgxScannerQrcodeComponent,
  ScannerQRCodeResult,
} from "ngx-scanner-qrcode";
@Component({
  selector: "app-qr-code",
  templateUrl: "./qr-code.component.html",
  styleUrls: ["./qr-code.component.css"],
})
export class QrCodeComponent {
  idModal = "closeModalQrCode";
  @Output() closeModal = new EventEmitter<string>();

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    if (e && e.length > 0) {
      const qrCodeValue = e[0].value;
      action.stop();
      console.log(qrCodeValue);
      this.closeModal.emit(this.idModal);
    }
  }
}
