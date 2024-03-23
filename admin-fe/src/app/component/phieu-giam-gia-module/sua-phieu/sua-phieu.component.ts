import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { PhieuGiamGia } from "src/app/model/class/phieu-giam-gia.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { KhachHangService } from "src/app/service/khach-hang.service";
import { PhieuGiamGiaService } from "src/app/service/phieu-giam-gia.service";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { KhachHang } from "src/app/model/class/KhachHang.class";
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

@Component({
  selector: "app-sua-phieu",
  templateUrl: "./sua-phieu.component.html",
  styleUrls: ["./sua-phieu.component.css"],
})
export class SuaPhieuComponent implements OnInit {
  phieuGiamGiaForm: FormGroup;
  public pagedResponse: PagedResponse<KhachHang>;
  public pagedResponse2: PagedResponse<KhachHang>;


  public idPhieu: number

  phieu: PhieuGiamGia;

  public updateForm: any;

  public khachHangList: any
  public khachHangListKhongCo: any
  errorMessage: string = "";
  selectedIds: number[] = [];
  phieuGiamGiaId: number;
  soLuongCheck: number = 0;
  sendMailChecked: boolean = false

  isTableDisabled: boolean = false;
  checkMail:boolean

 


  idKhach: number

  constructor(
    private phieuGiamGia: PhieuGiamGiaService,
    private khachHangService: KhachHangService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initUpdateForm();
    this.idPhieu = this.route.snapshot.params["id"];
    this.idKhach = this.idPhieu
    this.phieuGiamGia.getOne(this.idPhieu).subscribe({
      next: (response) => {
        this.phieu = response;

        this.initUpdateForm(this.phieu);

        const loaiValue = this.updateForm.get("loai").value;
        console.log(loaiValue)
        if(loaiValue==0){
          this.isTableDisabled = true;
          this.checkSoLuong = false
         
        }else{
          this.isTableDisabled = false;
          this.checkSoLuong = true
        }

        this.phieuGiamGia.getPhieuKhach(1, 5, this.idPhieu, true).subscribe({
          next: (response: PagedResponse<KhachHang>) => {
            if (response) {
              this.pagedResponse = response;
              response.data.forEach(khach => {
                this.selectedIds.push(khach.id);
                this.soLuongCheck++;
              });

            } else {
              console.error('Dữ liệu phản hồi không hợp lệ:', response);
            }
          },
          error: (error) => {
            console.error('Lỗi khi truy xuất dữ liệu:', error);
          }
        });

       
        this.phieuGiamGia.getPhieuKhach(1, 5, this.idPhieu, false).subscribe({
          next: (response: PagedResponse<KhachHang>) => {
            if (response) {
              this.pagedResponse2 = response;

            } else {
              console.error('Dữ liệu phản hồi không hợp lệ:', response);
            }
          },
          error: (error) => {
            console.error('Lỗi khi truy xuất dữ liệu:', error);
          }
        });
      },
      error: (error) => {
        console.error("Không lấy được phiếu:", error);
        // Xử lý lỗi ở đây
      },
    });

   


  }





  public initUpdateForm(phieu?: PhieuGiamGia): void {
    this.updateForm = new FormGroup({
      maPhieuGiamGia: new FormControl(phieu?.maPhieuGiamGia),
      tenPhieuGiamGia: new FormControl(phieu?.tenPhieuGiamGia, [this.validateTen()]),
      kieu: new FormControl(phieu?.kieu, [Validators.required]),
      loai: new FormControl(phieu?.loai, [Validators.required]),
      soLuong: new FormControl(phieu?.soLuong, [Validators.required, Validators.min(1)]),
      thoiGianBatDau: new FormControl(phieu?.thoiGianBatDau, [Validators.required, this.validateNgayBatDau()]),
      thoiGianKetThuc: new FormControl(phieu?.thoiGianKetThuc, [Validators.required, this.validateNgay()]),
      dieuKienGiam: new FormControl(phieu?.dieuKienGiam -0, [this.validateDieuKien()]),
      giaTri: new FormControl(phieu?.giaTri -0 , [Validators.required, this.validateVip()]),
      giaTriMax: new FormControl(phieu?.giaTriMax - 0, [this.validateMax()]),
    });

    const kieuValue = this.updateForm.get("kieu").value;
    const giaTriMaxControl = this.updateForm.get("giaTriMax");
    if (kieuValue === "0") {
      giaTriMaxControl.enable();
    } else {
      giaTriMaxControl.disable();
      giaTriMaxControl.setValue("");
    }

    this.updateForm.get("kieu").valueChanges.subscribe((value: any) => {
      const giaTriMaxControl = this.updateForm.get("giaTriMax");
      if (value === "0") {
        giaTriMaxControl.enable();
      } else {
        giaTriMaxControl.disable();
        giaTriMaxControl.setValue(""); // Set giá trị của giaTriMax thành 0
      }
      giaTriMaxControl.updateValueAndValidity();
    });

  }

  private validateTen(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const updateForm = this.updateForm;

      if (!updateForm) {
        return null;
      }
      const tenPhieuGiamGia = control.value;

      if (!tenPhieuGiamGia || tenPhieuGiamGia.trim() === '') {
        return { checkTen: "Không bỏ trống trường này" };
      }


      // Kiểm tra kí tự đặc biệt
      const regex = /^[a-zA-Z0-9\sÀ-Ỹà-ỹ]*$/; // Cho phép kí tự chữ, số, khoảng trắng và tiếng Việt có dấu
      if (!regex.test(tenPhieuGiamGia)) {
        return { checkTen: "Tên phiếu giảm giá không được chứa kí tự đặc biệt" };
      }

      return null; // Trả về null nếu không có lỗi
    };
  }

  giaTriNew: any;
  private validateVip(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const updateForm = this.updateForm;

      if (!updateForm) {

        return null;
      }

      const kieu = updateForm.get("kieu").value;
      this.giaTriNew = control.value;
      // Kiểm tra nếu ô giá trị trống
      if (!this.giaTriNew) {
        return { giaTri: "Không bỏ trống trường này" };
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
      const updateForm = this.updateForm;

      if (!updateForm) {
        return null;
      }

      const ngayKetThuc = control.value;

      // Kiểm tra nếu ô giá trị trống
      if (!ngayKetThuc) {
        return { ngayKetThuc: "Không bỏ trống trường này" };
      }

      const thoiGianBatDau = this.updateForm.get("thoiGianBatDau");
      const thoiGianKetThuc = this.updateForm.get("thoiGianKetThuc");

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
      const updateForm = this.updateForm;

      if (!updateForm) {
        return null;
      }
      const ngayBatDau = control.value;

      // Kiểm tra nếu ô giá trị trống
      if (!ngayBatDau) {
        return { ngayBatDau: "Không bỏ trống trường này" };
      }

      const thoiGianBatDau = this.updateForm.get("thoiGianBatDau");
      const thoiGianKetThuc = this.updateForm.get("thoiGianKetThuc");

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

  dieuKienGiam: any
  giaTri: any
  giaTriMax: any
  private validateDieuKien(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const updateForm = this.updateForm;

      if (!updateForm) {
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
        return { invalidDieuKien: "Vui lòng nhập số và số > 0" };
      }
      // Kiểm tra điều kiện lớn hơn 0
      if (this.dieuKienGiam <= 0) {
        return { invalidDieuKien: "Vui lòng nhập số và số > 0" };
      }

      const giaTriMax = updateForm.get('giaTriMax').value;
      const kieu = updateForm.get('kieu').value;
      const giaTri = updateForm.get('giaTri').value;

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

      console.log(this.giaTri)
      console.log(kieu)


      if (kieu === "0") {
        // Kiểm tra điều kiện giảm lớn hơn hoặc bằng giá trị tối đa

        if (this.dieuKienGiam < this.giaTriMax) {

          return { invalidDieuKien: "Điều kiện giảm lớn hơn hoặc bằng giá trị tối đa" };
        }
      } else {
        // Kiểm tra điều kiện giảm lớn hơn hoặc bằng giá trị
        if (this.dieuKienGiam-0 < this.giaTri-0) {

          return { invalidDieuKien: "Điều kiện giảm lớn hơn hoặc bằng giá trị" };
        }
      }

      return null; // Trả về null nếu không có lỗi
    };
  }



  private validateMax(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const updateForm = this.updateForm;

      if (!updateForm) {
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
        return { invalidMax: "Vui lòng nhập số và số > 0" };
      }



      // Kiểm tra điều kiện lớn hơn 0
      if (this.giaTriMax <= 0) {
        return { invalidMax: "Vui lòng nhập số và số > 0" };
      }

      const dieuKienGiam = updateForm.get('dieuKienGiam').value;
      const kieu = updateForm.get('kieu').value;




      if (typeof dieuKienGiam === "string") {
        this.dieuKienGiam = parseFloat(dieuKienGiam.replace(/,/g, ""));
      } else {
        this.dieuKienGiam = parseFloat(dieuKienGiam);
      }


      if (kieu === "0") {
        // Kiểm tra điều kiện giảm lớn hơn hoặc bằng giá trị tối đa

        if (this.giaTriMax > this.dieuKienGiam) {
          this.checkGiaTriBlur()
          return { invalidMax: "Giá trị tối đa nhỏ hơn hoặc bằng điều kiện giảm" };
        

        }
      }

      return null; // Trả về null nếu không có lỗi
    };
  }


  checkGiaTriToiDa() {
    this.updateForm.get("giaTriMax").updateValueAndValidity();
    this.updateForm.get("dieuKienGiam").updateValueAndValidity();
    
  }


  checkGiaTriBlur() {
   
    this.updateForm.get("giaTri").updateValueAndValidity();
    this.updateForm.get("dieuKienGiam").updateValueAndValidity();
  }


  checkThoiGian() {
    this.updateForm.get("thoiGianBatDau").updateValueAndValidity();
    this.updateForm.get("thoiGianKetThuc").updateValueAndValidity();
  }

  public checkGiaTri: boolean = false;
  onKieuChange() {
    const kieuValue = this.updateForm.get("kieu").value;
    const giaTriMaxControl = this.updateForm.get("giaTriMax");
    if (kieuValue == 0) {
      giaTriMaxControl.enable()
     
    } else {
      giaTriMaxControl.disable()
     
    }
    this.updateForm.get("giaTri").updateValueAndValidity();
    this.updateForm.get("giaTriMax").updateValueAndValidity();
    this.updateForm.get("soLuong").updateValueAndValidity();
  }

 


  public checkSoLuong: boolean = false
  onLoaiChange() {
    const loaiValue = this.updateForm.get("loai").value;
    const soLuong = this.updateForm.get("soLuong")

    if (loaiValue == 0) {
     
      this.isTableDisabled = true;
      this.soLuongCheck = 0;
      this.checkMail = true
      soLuong.disable()

     
    } else {
    
      this.isTableDisabled = false;
      this.selectedIds = [];
      this.checkMail = true
      soLuong.enable()

    
    }
  }


  // Khách Hàng co

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    id: number = this.idKhach
  ): void {
    this.phieuGiamGia.getPhieuKhach(page, pageSize, id, true).subscribe({
      next: (response: PagedResponse<KhachHang>) => {
        this.pagedResponse = response;


      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  // Khách Hàng kho co

  public goToPage2(
    page: number = 1,
    pageSize: number = 5,
    id: number = this.idKhach
  ): void {
    this.phieuGiamGia.getPhieuKhach(page, pageSize, id, false).subscribe({
      next: (response: PagedResponse<KhachHang>) => {
        this.pagedResponse = response;


      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }





  public onChangePageSize(e: any): void {
    console.log(this.idKhach)
    this.goToPage(1, e.target.value, this.idKhach);
  }




  onCheckboxChange(id: number): void {
    const index = this.selectedIds.indexOf(id);

    const soLuongControl = this.updateForm.get("soLuong");
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
    for (const selectedId of this.selectedIds) {
      if (selectedId === id) {
        console.log("Tìm thấy")
        return true; // ID được tìm thấy trong danh sách
      }
    }
    return false; // ID không được tìm thấy trong danh sách
  }

  giaTriMaxNew: any
  dieuKienGiamNew: any
  giaTriNewNew: any
  updatePhieu(): void {

    this.giaTriMaxNew = this.updateForm.get("giaTriMax").value
    this.dieuKienGiamNew = this.updateForm.get("dieuKienGiam").value
    this.giaTriNewNew = this.updateForm.get("giaTri").value
    const loaiValue = this.updateForm.get("loai").value;

    if (typeof this.giaTriMaxNew === "string") {

      const containsComma = /,/g.test(this.giaTriMaxNew); // Kiểm tra xem chuỗi có chứa dấu phẩy không
      if (containsComma) {

        const giaTriMaxFormatted = parseFloat(
          this.updateForm.value.giaTriMax.replace(",", "")
        );

        this.updateForm.patchValue({ giaTriMax: giaTriMaxFormatted });
      }

    }


    if (typeof this.dieuKienGiamNew === "string") {

      const containsComma = /,/g.test(this.dieuKienGiamNew); // Kiểm tra xem chuỗi có chứa dấu phẩy không
      if (containsComma) {

        const dieuKienGiamFormatted = parseFloat(
          this.updateForm.value.dieuKienGiam.replace(",", "")
        );

        this.updateForm.patchValue({ dieuKienGiam: dieuKienGiamFormatted });
      }

    }

    if (typeof this.giaTriNewNew === "string") {

      const containsComma = /,/g.test(this.giaTriNewNew); // Kiểm tra xem chuỗi có chứa dấu phẩy không
      if (containsComma) {

        const giaTriFormatted = parseFloat(
          this.updateForm.value.giaTri.replace(",", "")
        );


        this.updateForm.patchValue({ giaTri: giaTriFormatted });
      }

    }

    this.phieuGiamGia.update(this.idPhieu, this.updateForm.value).subscribe({
      next: (response: PhieuGiamGia) => {
       

        this.phieuGiamGia
          .addPhieuKhachHang(this.idPhieu, this.selectedIds)
          .subscribe();

        if (this.sendMailChecked) {
          this.selectedIds.forEach(id => {
            // Gọi service để lấy thông tin của khách hàng dựa trên id
            this.khachHangService.getById(id).subscribe({
              next: (khachHang: any) => {
                // Gửi email cho khách hàng
               
                this.send(response.maPhieuGiamGia, khachHang.email, response.thoiGianKetThuc);
              },
              error: (error: any) => {
                console.error('Error getting customer information:', error);
              }
            });
          });

        
        }

        Swal.fire({
          icon: "success",
          title: `Sửa phiếu giảm giá thành công `,
          showConfirmButton: false,
          timer: 1500,
        });
        // Delay 3-4 giây trước khi chuyển đến trang danh sách
        setTimeout(() => {
          this.router.navigate(['phieu-giam-gia/ds-phieu-giam-gia']);
        }, 500); // Đặt thời gian delay tại đây (3000 tương đương 3 giây)

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
            title: "Sửa phiếu giảm giá thất bại",
            showConfirmButton: false,
            timer: 3000,
          });

        }
      },
    });



  }


  onSendMailChange(event: any): void {
    // Lấy giá trị mới của checkbox "Gửi Mail Cho Khách Hàng"
    this.sendMailChecked = event.target.checked;
  }
  private send(vocher: string, email: string, ngayHetHan: string) {
    emailjs.init("XlFoYJLd1vcoTgaEY");
    emailjs.send("service_uxvm75s", "template_c1qot7h", {
      // from_name: this.authService.getUserFromStorage().hoTen,
      voucher_code: vocher,
      to_email: email,
      expiry_date: ngayHetHan

    });

  }

  confirmCreation() {

    Swal.fire({
      toast: true,
      title: "Bạn có đồng ý sửa không?",
      icon: "warning",
      position: "top",
      showCancelButton: true,
      confirmButtonColor: "#F5B16D",
    }).then((result) => {
      if (result.value) {
        this.updatePhieu();
      }
    });
  }

  public formatNumber(event: any, inputName: string): void {
    let value = event.target.value;
    if (value === "") {
      this.updateForm.get(inputName).setValue("");
      return;
    }
    value = value.replace(/,/g, "");
    value = parseFloat(value).toLocaleString("en-US");
    this.updateForm.get(inputName).setValue(value);
  }



  public formatGiaTri(event: any, inputName: string): void {
    let value = event.target.value;
    const kieu = this.updateForm.get("kieu").value;
    if (value === "") {
      this.updateForm.get(inputName).setValue("");
      return;
    }
    console.log(kieu);

    if (kieu == 1) {
      value = value.replace(/,/g, "");
      value = parseFloat(value).toLocaleString("en-US");
      this.updateForm.get(inputName).setValue(value);
    } else {
      return;
    }
  }

  chuyenTrang(){
    this.router.navigate(['phieu-giam-gia/ds-phieu-giam-gia']);
  }

}
