import { PdfService } from "./../../../service/pdf.service";
import { ThanhToanComponent } from "./../../ban-hang-module/thanh-toan/thanh-toan.component";
import { Observable } from "rxjs";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ThanhToan } from "src/app/model/class/thanh-toan";
import { HoaDonService } from "src/app/service/hoa-don.service";
import { NotificationService } from "src/app/service/notification.service";
import Swal from "sweetalert2";
import { HoaDon } from "src/app/model/class/hoa-don.class";

@Component({
  selector: "app-hoan-tien",
  templateUrl: "./hoan-tien.component.html",
  styleUrls: ["./hoan-tien.component.css"],
})
export class HoanTienComponent {
  @Input() title = "";
  @Input() disable = false;
  @Input({ required: true }) tienThanhToan: number;
  @Input({ required: true }) hoaDonId: number;

  @Output() hoaDonChange = new EventEmitter<HoaDon>();

  thanhToanForm: FormGroup;
  overlayText: string;
  isLoadding: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private hoaDonService: HoaDonService,
    private pdfService: PdfService
  ) {}
  ngOnInit(): void {
    // this.tongTien = this.tongTien = this.phiVanChuyen - this.tienGiam;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createThanhToanForm();
    // console.log(this.tongTien);
  }

  // tạo form
  createThanhToanForm(): void {
    this.thanhToanForm = this.fb.group({
      tienKhachDua: [
        this.tienThanhToan,
        [Validators.required, Validators.max(this.tienThanhToan)],
      ],
      moTa: [""],
      phuongThucThanhToan: ["TIEN_MAT"],
      maGiaoDich: [""],
    });

    // Đăng ký sự kiện valueChanges cho trường phuongThucThanhToan
    this.thanhToanForm
      .get("phuongThucThanhToan")
      .valueChanges.subscribe((httt) => {
        // Nếu phuongThucThanhToan là 'CHUYEN_KHOAN', yêu cầu nhập maGiaoDich và ngược lại
        if (httt === "CHUYEN_KHOAN") {
          this.thanhToanForm
            .get("maGiaoDich")
            .setValidators([Validators.required]);
        } else if (httt === "TIEN_MAT") {
          this.thanhToanForm.get("maGiaoDich").setValidators(null);
        }

        // Cập nhật lại validation state
        this.thanhToanForm.get("maGiaoDich").updateValueAndValidity();
      });
  }
  hoanTien() {
    // nếu tien hoan va tong tien khac nhau
    if (this.thanhToanForm.value.tienKhachDua != this.tienThanhToan) {
      this.notification.warning("Tiền hoàn không hợp lệ");
      return;
    }
    if (
      this.thanhToanForm.value.phuongThucThanhToan == "CHUYEN_KHOAN" &&
      this.thanhToanForm.value.maGiaoDich.trim() == ""
    ) {
      this.notification.warning("Mã giao dịch không hợp lệ");
      return;
    }
    // xử lý thêm hóa đơn
    let newThanhToan = new ThanhToan();

    newThanhToan.tenHinhThucThanhToan =
      this.thanhToanForm.value.phuongThucThanhToan;
    newThanhToan.soTien = this.thanhToanForm.value.tienKhachDua;
    newThanhToan.moTa = this.thanhToanForm.value.moTa;
    newThanhToan.maGiaoDich = this.thanhToanForm.value.maGiaoDich;

    Swal.fire({
      title:
        "Bạn có muốn hoàn số tiền " +
        this.pdfService.convertToVND(newThanhToan.soTien) +
        " cho khách hàng không ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then((result) => {
      // start

      this.turnOnOverlay("Vui lòng chờ");
      if (result.isConfirmed) {
        this.hoaDonService.refundMoney(newThanhToan, this.hoaDonId).subscribe({
          next: (resp) => {
            setTimeout(() => {
              this.hoaDonChange.emit(resp);
            }, 300);
            document.getElementById("closeModalHoanTien").click();
            this.notification.success("Hoàn tiền thành công");
            this.turnOffOverlay("");

            this.resetForm();
          },
          error: (err) => {
            this.notification.error(err.error.message);
          },
        });
      }
    });
  }

  resetForm() {
    this.thanhToanForm.patchValue({ ["moTa"]: "" });
    this.thanhToanForm.patchValue({ ["maGiaoDich"]: "" });
    this.thanhToanForm.patchValue({ ["tienKhachDua"]: 0 });
    this.thanhToanForm.patchValue({ ["phuongThucThanhToan"]: "TIEN_MAT" });
  }

  patchTienKhachDua(value: number) {
    this.thanhToanForm.get("tienKhachDua").patchValue(value);
  }

  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  private turnOffOverlay(text: string): void {
    this.overlayText = "";
    this.isLoadding = false;
  }
}
