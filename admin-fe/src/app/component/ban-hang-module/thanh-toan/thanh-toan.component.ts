import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ThanhToan } from "src/app/model/class/thanh-toan";
import { NotificationService } from "src/app/service/notification.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-thanh-toan",
  templateUrl: "./thanh-toan.component.html",
  styleUrls: ["./thanh-toan.component.css"],
})
export class ThanhToanComponent implements OnChanges, OnInit {
  @Input({ required: true }) tongTien: number;
  // @Input({ required: true }) tienGiam: number;
  // @Input({ required: true }) phiVanChuyen: number;
  @Input({ required: true }) thanhToans: any[];
  @Output() thanhToansChange = new EventEmitter<ThanhToan[]>();
  thanhToanForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService
  ) {}
  ngOnInit(): void {
    // this.tongTien = this.tongTien = this.phiVanChuyen - this.tienGiam;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.createThanhToanForm();
    // console.log(this.tongTien);
  }

  getTienConThieu() {
    return (
      this.tongTien -
      (this.thanhToans
        ? this.thanhToans
            .map((tt) => tt.soTien)
            .reduce((pre, cur) => pre + cur, 0)
        : 0)
    );
  }
  // tạo form
  createThanhToanForm(): void {
    this.thanhToanForm = this.fb.group({
      tienKhachDua: [
        this.getTienConThieu(),
        [Validators.required, Validators.max(this.tongTien)],
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
  creatThanhToan() {
    // nếu
    if (
      this.thanhToanForm.value.tienKhachDua <= 0 ||
      this.thanhToanForm.value.tienKhachDua > this.getTienConThieu()
    ) {
      this.notification.warning("Tiền khách đưa không hợp lệ");
      return;
    }
    // xử lý thêm hóa đơn
    let newThanhToan = new ThanhToan();
    newThanhToan.tenHinhThucThanhToan =
      this.thanhToanForm.value.phuongThucThanhToan;

    newThanhToan.soTien = this.thanhToanForm.value.tienKhachDua;
    newThanhToan.moTa = this.thanhToanForm.value.moTa;
    newThanhToan.maGiaoDich = this.thanhToanForm.value.maGiaoDich;
    if (this.thanhToans == null || this.thanhToans == undefined) {
      this.thanhToans = [];
    }
    this.thanhToans.push(newThanhToan);
    this.resetForm();
  }

  resetForm() {
    this.thanhToanForm.patchValue({ ["moTa"]: "" });
    this.thanhToanForm.patchValue({ ["maGiaoDich"]: "" });
    this.thanhToanForm.patchValue({ ["tienKhachDua"]: 0 });
    this.thanhToanForm.patchValue({ ["phuongThucThanhToan"]: "TIEN_MAT" });
  }

  deleteThanhToan(index: number) {
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc muốn xóa Thanh toán này chứ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Đã xóa!",
          icon: "success",
        });

        // handle here
        this.thanhToans.splice(index, 1);
      }
    });
  }

  patchTienKhachDua(value: number) {
    // console.log(value);

    this.thanhToanForm.get("tienKhachDua").patchValue(value);
  }
}
