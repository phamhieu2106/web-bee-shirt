import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
  FormBuilder,
} from "@angular/forms";
import { PhieuGiamGia } from "src/app/model/class/phieu-giam-gia.class";
import { KhachHangResponse } from "src/app/model/interface/khach-hang-response.interface";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { KhachHangService } from "src/app/service/khach-hang.service";
import { PhieuGiamGiaService } from "src/app/service/phieu-giam-gia.service";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

@Component({
  selector: "app-them-phieu",
  templateUrl: "./them-phieu.component.html",
  styleUrls: ["./them-phieu.component.css"],
})
export class ThemPhieuComponent implements OnInit {
  public addForm: FormGroup;
  phieuGiamGiaForm: FormGroup;
  public pagedResponse: PagedResponse<KhachHangResponse>;
  public search = "";
  public isUpdatingThoiGianKetThuc: boolean = false;

  errorMessage: string = "";

  selectedIds: number[] = [];
  soLuongCheck: number = 1;
  phieuGiamGiaId: number;

  public giaTriToiDa: number;
  public sendMailChecked: boolean = false;

  constructor(
    private phieuGiamGia: PhieuGiamGiaService,
    private khachHangService: KhachHangService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initAddForm();
    this.getKhachHangList();
  }

  public add(): void {


    if (typeof this.addForm.get("giaTriMax").value === "string") {

      const giaTriMaxFormatted = parseFloat(
        this.addForm.value.giaTriMax.replace(",", "")
      );

      this.addForm.patchValue({ giaTriMax: giaTriMaxFormatted });

    }


    if (typeof this.addForm.get("dieuKienGiam").value === "string") {

      const dieuKienGiamFormatted = parseFloat(
        this.addForm.value.dieuKienGiam.replace(/,/g, "")
      );
      this.addForm.patchValue({ dieuKienGiam: dieuKienGiamFormatted });

    }


    if (typeof this.addForm.get("giaTri").value === "string") {


      const giaTriFormatted = parseFloat(
        this.addForm.value.giaTri.replace(/,/g, "")
      );
      this.addForm.patchValue({ giaTri: giaTriFormatted });

    }

    this.phieuGiamGia.add(this.addForm.value).subscribe({
      next: (response: PhieuGiamGia) => {
        this.initAddForm();
        this.phieuGiamGiaId = response.id;

        this.phieuGiamGia
          .addPhieuKhachHang(this.phieuGiamGiaId, this.selectedIds)
          .subscribe();

        if (this.sendMailChecked) {
          this.selectedIds.forEach((id) => {
            // Gọi service để lấy thông tin của khách hàng dựa trên id
            this.khachHangService.getById(id).subscribe({
              next: (khachHang: any) => {
                // Gửi email cho khách hàng
                console.log(response.maPhieuGiamGia);
                this.send(
                  response.maPhieuGiamGia,
                  khachHang.email,
                  response.thoiGianKetThuc
                );
              },
              error: (error: any) => {
                console.error("Error getting customer information:", error);
              },
            });
          });
        }

        // Kiểm tra nếu checkbox "Gửi Mail Cho Khách Hàng" được chọn

        Swal.fire({
          icon: "success",
          title: `Thêm thành công '${response.tenPhieuGiamGia}'!`,
          showConfirmButton: false,
          timer: 1500,
        });
        // Delay 3-4 giây trước khi chuyển đến trang danh sách
        setTimeout(() => {
          this.router.navigate(["phieu-giam-gia/ds-phieu-giam-gia"]);
        }, 3000); // Đặt thời gian delay tại đây (3000 tương đương 3 giây)
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          // Trích xuất thông điệp lỗi từ response
          this.errorMessage = error.error.message;
         
          Swal.fire({
            toast: true,
            icon: "error",
            position: "top-end",
            title: this.errorMessage,
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          Swal.fire({
            toast: true,
            icon: "error",
            position: "top-end",
            title: "Thêm phiếu giảm giá thất bại",
            showConfirmButton: false,
            timer: 3000,
          });
       
        }
      },
    });
  }

  private send(vocher: string, email: string, ngayHetHan: string) {
    emailjs.init("XlFoYJLd1vcoTgaEY");
    emailjs.send("service_uxvm75s", "template_c1qot7h", {
      // from_name: this.authService.getUserFromStorage().hoTen,
      voucher_code: vocher,
      to_email: email,
      expiry_date: ngayHetHan,
    });
  }

  onSendMailChange(event: any): void {
    // Lấy giá trị mới của checkbox "Gửi Mail Cho Khách Hàng"
    this.sendMailChecked = event.target.checked;
  }

  public initAddForm(): void {
    this.addForm = this.formBuilder.group({
      maPhieuGiamGia: new FormControl(""),
      tenPhieuGiamGia: new FormControl("", [this.validateTen()]),
      kieu: new FormControl("0", [Validators.required]),
      loai: new FormControl("1", [Validators.required]),
      soLuong: new FormControl(this.soLuongCheck, [
        Validators.required,
        Validators.min(1),
      ]),
      thoiGianBatDau: new FormControl("", [
        Validators.required,
        this.validateNgayBatDau(),
      ]),
      thoiGianKetThuc: new FormControl("", [
        Validators.required,
        this.validateNgay(),
      ]),
      dieuKienGiam: new FormControl("", [
        this.validateDieuKien()
      ]),
      giaTri: new FormControl("", [Validators.required, this.validateVip()]),
      giaTriMax: new FormControl(this.giaTriToiDa, [
        this.validateMax()
      ]),
    });
  }

  giaTriNew: any;
  private validateVip(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const addForm = this.addForm;
      if (!addForm) {
        return null;
      }
      const kieu = addForm.get("kieu").value;
      this.giaTriNew = control.value;
      // Kiểm tra nếu ô giá trị trống
      if (!this.giaTriNew) {
        return { giaTri: "Không để trống giá trị" };
      }

      if (kieu === "0") {
        // Kiểm tra điều kiện phải là số
        const numberPattern = /^[0-9]*$/;
        if (!numberPattern.test(this.giaTriNew)) {
          return { giaTri: "Vui lòng nhập số  Và số > 0" };
        }
      } else {
        // Kiểm tra điều kiện phải là số
        const numberPattern = /^-?\d{1,3}(?:,\d{3})*(?:\.\d+)?$/;
        if (!numberPattern.test(this.giaTriNew)) {
          return { giaTri: "Vui lòng nhập số và số > 0" };
        }
      }

      if (typeof this.giaTriNew === "string") {
        this.giaTriNew = parseFloat(this.giaTriNew.replace(/,/g, ""));
      } else {
        this.giaTriNew = parseFloat(this.giaTriNew);
      }

      // Tiếp tục kiểm tra giá trị nhập vào khi không trống
      if (kieu === "1" && this.giaTriNew > 1000000) {
        return { giaTri: "Giá trị tối đa là 1.000.000 VNĐ" };
      } else if (kieu === "1" && this.giaTriNew < 10000) {
        return { giaTri: "Giá trị nhỏ nhất là 10.000 VNĐ" };
      } else if (kieu === "0" && this.giaTriNew > 100) {
        return { giaTri: "Giá trị lớn nhất là 100%" };
      } else if (kieu === "0" && this.giaTriNew < 1) {
        return { giaTri: "Giá trị nhỏ nhất là 1%" };
      }

      return null; // Trả về null nếu không có lỗi
    };
  }

  private validateNgay(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const addForm = this.addForm;

      if (!addForm) {
        return null;
      }

      const ngayKetThuc = control.value;

      // Kiểm tra nếu ô giá trị trống
      if (!ngayKetThuc) {
        return { ngayKetThuc: "Không để trống ngày kết thúc" };
      }

      const thoiGianBatDau = this.addForm.get("thoiGianBatDau");
      const thoiGianKetThuc = this.addForm.get("thoiGianKetThuc");

      // Kiểm tra nếu cả hai ngày đều được nhập
      if (thoiGianBatDau && thoiGianKetThuc) {
        const startDate = new Date(thoiGianBatDau.value);
        const endDate = new Date(thoiGianKetThuc.value);
        // Kiểm tra nếu ngày kết thúc nhỏ hơn ngày bắt đầu
        if (endDate < startDate) {
          return { ngayKetThuc: "Ngày kết thúc không nhỏ hơn ngày bắt đầu" };
        }
      }

      return null; // Trả về null nếu không có lỗi
    };
  }

  private validateNgayBatDau(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const addForm = this.addForm;

      if (!addForm) {
        return null;
      }
      const ngayBatDau = control.value;

      // Kiểm tra nếu ô giá trị trống
      if (!ngayBatDau) {
        return { ngayBatDau: "Không để trống ngày bắt đầu" };
      }

      const thoiGianBatDau = this.addForm.get("thoiGianBatDau");
      const thoiGianKetThuc = this.addForm.get("thoiGianKetThuc");

      // Kiểm tra nếu cả hai ngày đều được nhập
      if (thoiGianBatDau && thoiGianKetThuc) {
        const startDate = new Date(thoiGianBatDau.value);
        const endDate = new Date(thoiGianKetThuc.value);

        // Kiểm tra nếu ngày bắt đầu lớn hơn ngày kết thúc
        if (startDate > endDate) {
          return { ngayBatDau: "Ngày bắt đầu không lớn hơn ngày kết thúc" };
        }
      }

      return null; // Trả về null nếu không có lỗi
    };
  }

  private validateTen(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const addForm = this.addForm;

      if (!addForm) {
        return null;
      }

      const tenPhieuGiamGia = control.value;

      if (!tenPhieuGiamGia || tenPhieuGiamGia.trim() === '') {
        return { checkTen: "Tên phiếu giảm giá không được để trống" };
      }

      // Kiểm tra kí tự đặc biệt
      const regex = /^[a-zA-Z0-9\sÀ-Ỹà-ỹ]*$/; // Cho phép kí tự chữ, số, khoảng trắng và tiếng Việt có dấu
      if (!regex.test(tenPhieuGiamGia)) {
        return { checkTen: "Tên phiếu giảm giá không được chứa kí tự đặc biệt" };
      }

      return null; // Trả về null nếu không có lỗi
    };
  }



  dieuKienGiam: any
  giaTri: any
  giaTriMax: any
  private validateDieuKien(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const addForm = this.addForm;

      if (!addForm) {
        return null;
      }

      this.dieuKienGiam = control.value;

      // Kiểm tra điều kiện trống
      if (!this.dieuKienGiam) {
        return { invalidDieuKien: "Không bỏ trống trường này" };
      }

      if (typeof this.dieuKienGiam === "string") {
        this.dieuKienGiam = parseFloat(this.dieuKienGiam.replace(/,/g, ""));
      } else {
        this.dieuKienGiam = parseFloat(this.dieuKienGiam);
      }

      // Kiểm tra điều kiện phải là số
      const numberPattern = /^[0-9]*$/;
      if (!numberPattern.test(this.dieuKienGiam)) {
        return { invalidDieuKien: "Vui lòng nhập số  Và số > 0" };
      }



      // Kiểm tra điều kiện lớn hơn 0
      if (this.dieuKienGiam <= 0) {
        return { invalidDieuKien: "Vui lòng nhập số > 0" };
      }

      const giaTriMax = addForm.get('giaTriMax').value;
      const kieu = addForm.get('kieu').value;
      const giaTri = addForm.get('giaTri').value;

      if (typeof giaTriMax === "string") {
        this.giaTriMax = parseFloat(giaTriMax.replace(/,/g, ""));
      } else {
        this.giaTriMax = parseFloat(giaTriMax);
      }

      if (typeof giaTri === "string") {
        this.giaTri = parseFloat(giaTri.replace(/,/g, ""));
      } else {
        this.giaTri = parseFloat(giaTri);
      }


      if (kieu === "0") {
        // Kiểm tra điều kiện giảm lớn hơn hoặc bằng giá trị tối đa

        if (this.dieuKienGiam < this.giaTriMax) {

          return { invalidDieuKien: "Điều kiện giảm lớn hơn hoặc bằng giá trị tối đa" };
        }
      } else {
        // Kiểm tra điều kiện giảm lớn hơn hoặc bằng giá trị
        if (this.dieuKienGiam < this.giaTri) {

          return { invalidDieuKien: "Điều kiện giảm lớn hơn hoặc bằng giá trị" };
        }
      }

      return null; // Trả về null nếu không có lỗi
    };
  }



  private validateMax(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const addForm = this.addForm;

      if (!addForm) {
        return null;
      }

      this.giaTriMax = control.value;

      // Kiểm tra điều kiện trống
      if (!this.giaTriMax) {
        return { invalidMax: "Không bỏ trống trường này" };
      }

      if (typeof this.giaTriMax === "string") {
        this.giaTriMax = parseFloat(this.giaTriMax.replace(/,/g, ""));
      } else {
        this.giaTriMax = parseFloat(this.giaTriMax);
      }

      // Kiểm tra điều kiện phải là số
      const numberPattern = /^[0-9]*$/;
      if (!numberPattern.test(this.giaTriMax)) {
        return { invalidMax: "Vui lòng nhập số  Và số > 0" };
      }



      // Kiểm tra điều kiện lớn hơn 0
      if (this.giaTriMax <= 0) {
        return { invalidMax: "Vui lòng nhập số > 0" };
      }

      const dieuKienGiam = addForm.get('dieuKienGiam').value;
      const kieu = addForm.get('kieu').value;




      if (typeof dieuKienGiam === "string") {
        this.dieuKienGiam = parseFloat(dieuKienGiam.replace(/,/g, ""));
      } else {
        this.dieuKienGiam = parseFloat(dieuKienGiam);
      }


      if (kieu === "0") {
        // Kiểm tra điều kiện giảm lớn hơn hoặc bằng giá trị tối đa

        if (this.giaTriMax > this.dieuKienGiam) {

          return { invalidMax: "Giá trị tối đa nhỏ hơn hoặc bằng điều kiện giảm" };

        }
      }

      return null; // Trả về null nếu không có lỗi
    };
  }


  checkGiaTriToiDa() {
    this.addForm.get("dieuKienGiam").updateValueAndValidity();
    this.addForm.get("giaTriMax").updateValueAndValidity();
  }

  checkGiaTriBlur() {
    this.addForm.get("dieuKienGiam").updateValueAndValidity();
    this.addForm.get("giaTri").updateValueAndValidity();
  }




  checkThoiGian() {
    this.addForm.get("thoiGianBatDau").updateValueAndValidity();
    this.addForm.get("thoiGianKetThuc").updateValueAndValidity();
  }

  public checkGiaTri: boolean = false;
  onKieuChange() {
    const kieuValue = this.addForm.get("kieu").value;
    const giaTriMaxControl = this.addForm.get("giaTriMax");
    if (kieuValue == 0) {
      this.checkGiaTri = false;
    } else {
      this.checkGiaTri = true;
      giaTriMaxControl.setValue("1"); // Set giá trị của giaTriMax thành 0
    }
    this.addForm.get("giaTri").updateValueAndValidity();
    this.addForm.get("giaTriMax").updateValueAndValidity();
  }

  isTableDisabled: boolean = false;
  public checkSoLuong: boolean = false;

  onLoaiChange() {
    const loaiValue = this.addForm.get("loai").value;

    if (loaiValue == 0) {
      this.checkSoLuong = true;
      this.isTableDisabled = true;
      this.soLuongCheck = 0;

      this.addForm.get("soLuong").setValue(0);
    } else {
      this.checkSoLuong = false;
      this.isTableDisabled = false;
      this.selectedIds = [];

      this.addForm.get("soLuong").setValue(1);
    }
  }

  // onchange check box

  onCheckboxChange(id: number): void {
    const index = this.selectedIds.indexOf(id);

    const soLuongControl = this.addForm.get("soLuong");
    if (index === -1) {
      // Nếu ID không tồn tại trong danh sách, thêm vào
      this.selectedIds.push(id);
      // Tăng số lượng
      this.soLuongCheck++;
      soLuongControl.setValue(this.soLuongCheck);
    } else {
      // Nếu ID đã tồn tại trong danh sách, loại bỏ nó
      this.selectedIds.splice(index, 1);
      // Giảm số lượng
      if (this.soLuongCheck > 0) {
        this.soLuongCheck--;
        soLuongControl.setValue(this.soLuongCheck);
      }
    }
  }

  isCustomerSelected(id: number): boolean {
    if (this.selectedIds.length > 0) {
      for (const selectedId of this.selectedIds) {
        if (selectedId == id) {
          return true; // ID được tìm thấy trong danh sách
        }
      }
    }

    return false; // ID không được tìm thấy trong danh sách
  }

  //Khách hàng

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.khachHangService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<KhachHangResponse>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  private getKhachHangList(): void {
    this.khachHangService.getAll().subscribe({
      next: (response: PagedResponse<KhachHangResponse>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public onChangePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.search);
  }

  private timeout: any;
  public timKiem(e: any): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.goToPage(
        this.pagedResponse.pageNumber,
        this.pagedResponse.pageSize,
        e.target.value
      );
    }, 500);
  }

  confirmCreation() {
    Swal.fire({
      toast: true,
      title: "Bạn có đồng ý thêm không?",
      icon: "warning",
      position: "top",
      showCancelButton: true,
      confirmButtonColor: "#F5B16D",
    }).then((result) => {
      if (result.value) {
        this.add();
      }
    });
  }

  public formatNumber(event: any, inputName: string): void {
    let value = event.target.value;
    if (value === "") {
      this.addForm.get(inputName).setValue("");
      return;
    }
    value = value.replace(/,/g, "");
    value = parseFloat(value).toLocaleString("en-US");
    this.addForm.get(inputName).setValue(value);
  }

  public formatGiaTri(event: any, inputName: string): void {
    let value = event.target.value;
    const kieu = this.addForm.get("kieu").value;
    if (value === "") {
      this.addForm.get(inputName).setValue("");
      return;
    }
    console.log(kieu);

    if (kieu == 1) {
      value = value.replace(/,/g, "");
      value = parseFloat(value).toLocaleString("en-US");
      this.addForm.get(inputName).setValue(value);
    } else {
      return;
    }
  }
}
