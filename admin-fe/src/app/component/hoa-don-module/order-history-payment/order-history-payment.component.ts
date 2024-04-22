import { HoaDon } from "./../../../model/class/hoa-don.class";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";

import { ThanhToan } from "src/app/model/class/thanh-toan";
import { ThanhToanService } from "src/app/service/thanh-toan.service";
import { HoaDonService } from "src/app/service/hoa-don.service";
import { NotificationService } from "src/app/service/notification.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-order-history-payment",
  templateUrl: "./order-history-payment.component.html",
  styleUrls: ["./order-history-payment.component.css"],
})
export class OrderHistoryPaymentComponent implements OnInit, OnChanges {
  @Input({ required: true }) hoaDon: HoaDon; // id hóa đơn cần tạo thanh toán
  @Output() hoaDonChange = new EventEmitter<HoaDon>(); // id hóa đơn cần tạo thanh toán
  thanhToanForm: FormGroup; // thanh toán modal

  // constructor
  constructor(
    private formBuilder: FormBuilder,
    private thanhToanService: ThanhToanService,
    private hoaDonService: HoaDonService,
    private notifycation: NotificationService
  ) {}

  //onChanges
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["hoaDon"]) {
      this.createThanhToanForm();
    }
  }

  // onInit
  ngOnInit(): void {}

  // tạo mới thanh toán
  newThanhToan() {
    this.thanhToanService
      .postThanhToan(this.thanhToanForm.value, this.hoaDon.id)
      .subscribe({
        next: (resp: ThanhToan) => {
          // console.log(resp);
          this.hoaDon.thanhToans.push(resp);
          this.notifycation.success("Thêm thành công");
          this.hoaDonChange.emit(this.hoaDon);
        },
        error: (err) => {
          console.log(err);
          this.notifycation.error(err.error.message);
        },
      });
  }

  // tạo form
  createThanhToanForm(): void {
    this.thanhToanForm = this.formBuilder.group({
      tienKhachDua: [
        this.hoaDon.tongTien +
          this.hoaDon.phiVanChuyen -
          this.hoaDon.tienGiam -
          this.hoaDonService.getTienKhachThanhToan(this.hoaDon.thanhToans) <
        0
          ? 0
          : this.hoaDon.tongTien +
            this.hoaDon.phiVanChuyen -
            this.hoaDon.tienGiam -
            this.hoaDonService.getTienKhachThanhToan(this.hoaDon.thanhToans),
        [Validators.required],
      ],
      moTa: [""],
      hinhThucThanhToan: ["TIEN_MAT"],
      maGiaoDich: [""],
    });

    // Đăng ký sự kiện valueChanges cho trường tienKhachDua
    // this.thanhToanForm
    //   .get("tienKhachDua")
    //   .valueChanges.subscribe((tienKhachDua) => {
    //     // Tính toán và cập nhật giá trị của tienThua khi tienKhachDua thay đổi
    //     this.thanhToanForm.patchValue({
    //       tienThua:
    //         tienKhachDua +
    //         this.hoaDonService.getTienKhachThanhToan(this.hoaDon.thanhToans) -
    //         (this.hoaDon.tongTien +
    //           this.hoaDon.phiVanChuyen -
    //           this.hoaDon.tienGiam),
    //     });
    //   });

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
  getTienKhachThanhToan() {
    return this.hoaDonService.getTienKhachThanhToan(this.hoaDon.thanhToans);
  }

  deleteThanhToan(thanhToan: ThanhToan) {
    Swal.fire({
      title: "Xác nhận xóa ?",
      text: "Bạn đồng ý xóa thanh toán này chứ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire({
        //   title: "Đã xóa!",
        //   icon: "success",
        // });
        this.thanhToanService.deleteThanhToan(thanhToan.id).subscribe({
          next: (resp) => {
            this.hoaDon.thanhToans = this.hoaDon.thanhToans.filter(
              (tt) => tt.id != resp.id
            );
            this.notifycation.success("Xóa thành công !");
            this.hoaDonChange.emit(this.hoaDon);
          },
          error: (err) => {
            this.notifycation.error(err.error.message);
          },
        });
      }
    });
  }

  patchTienKhachDua(value: number) {
    this.thanhToanForm.get("tienKhachDua").patchValue(value);
  }
  isGiaoHangAndChuyenKhoan(hoaDon: HoaDon): boolean {
    return this.hoaDonService.isGiaoHangAndChuyenKhoan(hoaDon);
  }
}
