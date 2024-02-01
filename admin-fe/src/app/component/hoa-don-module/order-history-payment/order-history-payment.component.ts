import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";

import { ThanhToan } from "src/app/model/class/thanh-toan";
import { ThanhToanService } from "src/app/service/thanh-toan.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-order-history-payment",
  templateUrl: "./order-history-payment.component.html",
  styleUrls: ["./order-history-payment.component.css"],
})
export class OrderHistoryPaymentComponent implements OnInit, OnChanges {
  @Input({ required: true }) thanhToans: ThanhToan[]; // danh sách lịch sử thanh toán
  @Input({ required: true }) loaiHoaDon: string; // check disable chức năng thanh toán
  @Input({ required: true }) tongTien: number; // check disable chức năng thanh toán
  thanhToanForm: FormGroup; // thanh toán modal
  @Input({ required: true }) idHoaDon: number; // id hóa đơn cần tạo thanh toán

  // constructor
  constructor(
    private formBuilder: FormBuilder,
    private thanhToanService: ThanhToanService,
    private toastrService: ToastrService
  ) {}

  //onChanges
  ngOnChanges(changes: SimpleChanges): void {
    this.createThanhToanForm();
  }

  // onInit
  ngOnInit(): void {}

  // tạo mới thanh toán
  newThanhToan() {
    this.thanhToanService
      .postThanhToan(this.thanhToanForm.value, this.idHoaDon)
      .subscribe({
        next: (resp: ThanhToan) => {
          console.log(resp);
          this.thanhToans.push(resp);
          this.toastrService.success("Thêm thành công", "Thành công");
        },
        error: (err) => {
          console.log(err);
          this.toastrService.error(err.error.message, "Thất bại");
        },
      });
  }

  // tạo form
  createThanhToanForm(): void {
    this.thanhToanForm = this.formBuilder.group({
      tienKhachDua: [
        this.tongTien,
        [Validators.required, Validators.min(this.tongTien)],
      ],
      tienThua: [0, [Validators.min(0)]],
      ghiChu: [""],
      hinhThucThanhToan: ["TIEN_MAT"],
      maGiaoDich: [""],
    });

    // Đăng ký sự kiện valueChanges cho trường tienKhachDua
    this.thanhToanForm
      .get("tienKhachDua")
      .valueChanges.subscribe((tienKhachDua) => {
        // Tính toán và cập nhật giá trị của tienThua khi tienKhachDua thay đổi
        this.thanhToanForm.patchValue({
          tienThua: tienKhachDua - this.tongTien,
        });
      });

    // Đăng ký sự kiện valueChanges cho trường phuongThucThanhToan
    this.thanhToanForm
      .get("hinhThucThanhToan")
      .valueChanges.subscribe((httt) => {
        // Nếu phuongThucThanhToan là 'CHUYEN_KHOAN', yêu cầu nhập maGiaoDich, ngược lại
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
