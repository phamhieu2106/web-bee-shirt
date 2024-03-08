import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ThanhToan } from "src/app/model/class/thanh-toan";

@Component({
  selector: "app-thanh-toan",
  templateUrl: "./thanh-toan.component.html",
  styleUrls: ["./thanh-toan.component.css"],
})
export class ThanhToanComponent implements OnChanges {
  @Input({ required: true }) tongTien: number;
  @Input({ required: true }) thanhToans: ThanhToan[];
  @Output() thanhToansChange = new EventEmitter<ThanhToan[]>();
  thanhToanForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.createThanhToanForm();
  }

  getTienConThieu() {
    return this.thanhToans
      ? this.thanhToans
          .map((tt) => tt.soTien)
          .reduce((pre, cur) => pre + cur, 0)
      : 0;
  }
  // tạo form
  createThanhToanForm(): void {
    this.thanhToanForm = this.fb.group({
      tienKhachDua: [
        0,
        [Validators.required, Validators.min(1), Validators.max(this.tongTien)],
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
}
