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
import { KhachHang } from "src/app/model/class/KhachHang.class";

@Component({
  selector: "app-them-phieu",
  templateUrl: "./them-phieu.component.html",
  styleUrls: ["./them-phieu.component.css"],
})
export class ThemPhieuComponent implements OnInit {
  public addForm: FormGroup;
  phieuGiamGiaForm: FormGroup;
  public pagedResponse: PagedResponse<KhachHang>
  public search = "";
  public isUpdatingThoiGianKetThuc: boolean = false;

  errorMessage: string = "";

  selectedIds: number[] = [];
  soLuongCheck: number = 0;
  phieuGiamGiaId: number;
  checkMail: boolean

  public giaTriToiDa: number;
  public sendMailChecked: boolean = false;
  isTableDisabled: boolean = false;

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
        }, 100);
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

    this.checkMail=true
    this.checkSoLuong=true
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
      
      if (this.giaTriNew === null ) {
        return { giaTri: "Không bỏ trống trường này1" };
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
        return { ngayKetThuc: "Không bỏ trống trường này" };
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
        } else {
          // Tính số phút giữa thời gian bắt đầu và kết thúc
          const diffMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

          // Kiểm tra nếu thời gian kết thúc không hơn thời gian bắt đầu ít nhất 5 phút
          if (diffMinutes < 5) {
            return { ngayKetThuc: 'Thời gian bắt đầu phải trước thời gian kết thúc ít nhất 5 phút' };
          }
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
        return { ngayBatDau: "Không bỏ trống trường này" };
        
      }

       // Lấy ngày hiện tại
       const currentDate = new Date();
       console.log(currentDate)
       console.log(ngayBatDau)

       // Kiểm tra nếu ngày bắt đầu sau ngày hiện tại
       if (ngayBatDau <= currentDate) {
           return { ngayBatDau: "Ngày bắt đầu phải sau ngày hiện tại" };
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
        } else {
          // Tính số phút giữa thời gian bắt đầu và kết thúc
          const diffMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

          // Kiểm tra nếu thời gian kết thúc không hơn thời gian bắt đầu ít nhất 5 phút
          if (diffMinutes < 5) {
            return { ngayBatDau: 'Thời gian kết thúc phải sau thời gian bắt đầu ít nhất 5 phút' };
          }
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
      if (this.dieuKienGiam === null || this.dieuKienGiam === undefined) {
        return { invalidDieuKien: "Không bỏ trống trường này" };
      }

      // Kiểm tra điều kiện < 0
      if (this.dieuKienGiam < 0) {
        return { invalidDieuKien: "Vui lòng nhập số >= 0" };
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
      if (this.giaTriMax === null || this.giaTriMax === undefined) {
        return { invalidMax: "Không bỏ trống trường này" };
      }

    
   // Kiểm tra điều kiện lớn hơn 0
   if (this.giaTriMax < 10000) {
    return { invalidMax: "Vui lòng nhập số >= 10000" };
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
      giaTriMaxControl.enable()

    } else {
      giaTriMaxControl.disable()

    }
    this.addForm.get("giaTri").updateValueAndValidity();
    this.addForm.get("giaTriMax").updateValueAndValidity();
    this.addForm.get("soLuong").updateValueAndValidity();
  }


  public checkSoLuong: boolean = false;

  onLoaiChange() {
    const loaiValue = this.addForm.get("loai").value;
    const soLuong = this.addForm.get("soLuong")

    if (loaiValue == 0) {

      this.isTableDisabled = true;
      this.checkMail = false
     this.checkSoLuong = false
      soLuong.setValue("0")


    } else {

      this.isTableDisabled = false;
      this.selectedIds = [];
      this.checkMail = true
      this.checkSoLuong = true
      soLuong.setValue("0")


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
  keyword: string

  public search1(e: any): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.keyword = e.target.value;
    // Loại bỏ dấu cách thừa giữa các từ trong chuỗi keyword
    const keywordWithoutExtraSpaces = this.keyword.replace(/\s+/g, ' ');

    this.keyword = this.keyword.trim();
    // Gán giá trị đã được xử lý vào thuộc tính this.keyword
    this.keyword = keywordWithoutExtraSpaces;

    this.timeout = setTimeout(() => {
      this.goToPage(
        this.pagedResponse.pageNumber,
        this.pagedResponse.pageSize,
        this.keyword 
      );
    }, 500);
  }

  filterObject: any = null;
  pageSize: number = 5;
  pageNumber: number = 1;
  onChangeFilter() {
    this.filterObject = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search
     
    };
    this.goToPage(
      this.filterObject.pageNumber,
      this.filterObject.pageSize,
      this.filterObject.search
    );
  }

  public onChangePageSize(): void {
    this.goToPage(this.pageNumber, this.pageSize, this.search);
  }


  public goToPage(page: number, pageSize: number, keyword: string): void {
    console.log(this.filterObject)
    if (this.filterObject) {
      this.phieuGiamGia.getAllActive(
          page,
          pageSize,
          keyword
         
        )
        .subscribe({
          next: (response: PagedResponse<KhachHang>) => {
            this.pagedResponse = response;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          },
        });
    } else {
      this.phieuGiamGia.getAllActive(page, pageSize, keyword).subscribe({
        next: (response: PagedResponse<KhachHang>) => {
          this.pagedResponse = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => {
          console.log(this.pagedResponse);
        },
      });
    }
  }







  // public goToPage(
  //   page: number = 1,
  //   pageSize: number = 5,
  //   keyword: string = ""
  // ): void {
  //   this.phieuGiamGia.getAllActive(page, pageSize, keyword).subscribe({
  //     next: (response: PagedResponse<KhachHang>) => {
  //       this.pagedResponse = response;
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.log(error);
  //     },
  //   });
  // }

  private getKhachHangList(): void {
    this.phieuGiamGia.getAllActive().subscribe({
      next: (response: PagedResponse<KhachHang>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
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

  chuyenTrang() {
    this.router.navigate(['phieu-giam-gia/ds-phieu-giam-gia']);
  }
}
