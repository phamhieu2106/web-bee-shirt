import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { PhieuGiamGia } from "src/app/model/class/phieu-giam-gia.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { KhachHangService } from "src/app/service/khach-hang.service";
import { PhieuGiamGiaService } from "src/app/service/phieu-giam-gia.service";
import { ActivatedRoute } from "@angular/router";

import { KhachHang } from "src/app/model/class/KhachHang.class";
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { NotificationService } from "src/app/service/notification.service";
import { PhieuGiamGiaKhachHang } from "src/app/model/class/phieu-giam-gia-khach-hang.class";

@Component({
  selector: "app-sua-phieu",
  templateUrl: "./sua-phieu.component.html",
  styleUrls: ["./sua-phieu.component.css"],
})
export class SuaPhieuComponent implements OnInit {
  phieuGiamGiaForm: FormGroup;
  public pagedResponse: PagedResponse<PhieuGiamGiaKhachHang>;
  public pagedResponse2: PagedResponse<KhachHang>;

  public listKhachHang: KhachHang[] = [];



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
  giaTriNew: any;

  checkNgayBatDau:boolean = false

 


  idKhach: number

  constructor(
    private phieuGiamGia: PhieuGiamGiaService,
    private khachHangService: KhachHangService,
    private route: ActivatedRoute,
    private router: Router,
    private notifService: NotificationService
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
        const kieuValue = this.updateForm.get("kieu").value;
        
       
        if(loaiValue==0){
          this.isTableDisabled = true;
          this.checkSoLuong = false
          this.checkMail = false
         
        }else{
          this.isTableDisabled = false;
          this.checkSoLuong = true
          this.checkMail = true         
        }

        if(kieuValue==1){
          this.updateForm.get("giaTriMax").disable()
        }


        if(this.phieu.trangThai =='Đang diễn ra'){
          this.checkNgayBatDau = true
        }




        this.phieuGiamGia.getKhach(this.idPhieu, true).subscribe({
          next: (response: KhachHang[]) => {
            if (response) {
              this.listKhachHang = response;
            
              
              // Lặp qua từng đối tượng KhachHang
              response.forEach(khach => {
                this.soLuongCheck++;
                this.selectedIds.push(khach.id); // Đưa id vào mảng selectedIds
              });
          
             
            } else {
              console.error('Dữ liệu phản hồi không hợp lệ:', response);
            }
          },
          error: (error) => {
            console.error('Lỗi khi truy xuất dữ liệu:', error);
          }
        });

        
        this.phieuGiamGia.getPhieuKhachCo(1,5, this.idPhieu).subscribe({
          next: (response: PagedResponse<PhieuGiamGiaKhachHang>) => {
            if (response) {
              this.pagedResponse = response;
               console.log( this.pagedResponse?.data)

            } else {
              console.error('Dữ liệu phản hồi không hợp lệ:', response);
            }
          },
          error: (error) => {
            console.error('Lỗi khi truy xuất dữ liệu:', error);
          }
        });
        

       
        this.phieuGiamGia.getPhieuKhachKhongCo(1,5, this.idPhieu).subscribe({
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


  onCheckboxChange(id: number): void {
    const index = this.selectedIds.indexOf(id);
    console.log(index)

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
        return true; // ID được tìm thấy trong danh sách
      }
    }
    
    
    return false; // ID không được tìm thấy trong danh sách
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
      dieuKienGiam: new FormControl(phieu?.dieuKienGiam -0, [ Validators.required,
        Validators.min(0),]),
      giaTri: new FormControl(phieu?.giaTri -0 , [ this.validateVip()]),
      giaTriMax: new FormControl(phieu?.giaTriMax - 0, [this.validateMax()]),
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

  
  private validateVip(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const updateForm = this.updateForm;

      if (!updateForm) {

        return null;
      }

      const kieu = updateForm.get("kieu").value;
      this.giaTriNew = control.value;
      // Kiểm tra nếu ô giá trị trống
      if (this.giaTriNew === null || this.giaTriNew === undefined) {
        return { giaTri: "Không bỏ trống trường này" };
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
        }else {
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
      const updateForm = this.updateForm;

      if (!updateForm) {
        return null;
      }
      const ngayBatDau = control.value;

      // Kiểm tra nếu ô giá trị trống
      if (!ngayBatDau) {
        return { ngayBatDau: "Không bỏ trống trường này" };
      }

       // Lấy ngày hiện tại
      const currentDate = new Date();

      // Kiểm tra nếu ngày bắt đầu trước ngày hiện tại
      const ngayMoi = new Date(ngayBatDau)
    
      if (ngayMoi <= currentDate && this.checkNgayBatDau == false) {
        
          return { ngayBatDau: "Ngày bắt đầu phải sau ngày hiện tại" };
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
      const updateForm = this.updateForm;

      if (!updateForm) {
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
  valueTam: number[] =  this.selectedIds
  onLoaiChange() {
    const loaiValue = this.updateForm.get("loai").value;
    const soLuong = this.updateForm.get("soLuong")

    console.log(this.selectedIds)
    if (loaiValue == 0) {
     
      this.isTableDisabled = true;
      this.selectedIds = this.valueTam;
      this.checkMail = false
      this.checkSoLuong = false
      soLuong.setValue(this.soLuongCheck)
    
     
    } else {
    
      this.isTableDisabled = false;
      this.selectedIds = [];
      this.checkMail = true
      this.checkSoLuong = true
      soLuong.setValue("0")
    }
  }


  // Khách Hàng co

  public goToPageOld(
    page: number = 1,
    pageSize: number = 5,
    id: number = this.idKhach
  ): void {
    this.phieuGiamGia.getPhieuKhachCo(page, pageSize, id).subscribe({
      next: (response: PagedResponse<PhieuGiamGiaKhachHang>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    id: number = this.idKhach
  ): void {
    this.phieuGiamGia.getPhieuKhachCo(page, pageSize, id).subscribe({
      next: (response: PagedResponse<PhieuGiamGiaKhachHang>) => {
        this.pagedResponse = response;
        console.log(response)
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // Khách Hàng kho co

  public goToPage2(
    page: number = 1,
    pageSize: number = 5,
    id: number = this.idKhach
  ): void {
    this.phieuGiamGia.getPhieuKhachKhongCo(page, pageSize, id).subscribe({
      next: (response: PagedResponse<KhachHang>) => {
        this.pagedResponse2 = response;


      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }





  public changePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.idKhach);
  }

  public changePageSize1(e: any): void {
    this.goToPage2(1, e.target.value, this.idKhach);
  }


  giaTriMaxNew: any
  dieuKienGiamNew: any
  giaTriNewNew: any
  updatePhieu(): void {

    this.giaTriMaxNew = this.updateForm.get("giaTriMax").value
    this.dieuKienGiamNew = this.updateForm.get("dieuKienGiam").value
    this.giaTriNewNew = this.updateForm.get("giaTri").value

   


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
               
               if(khachHang.email){
                this.send(response.maPhieuGiamGia, khachHang.email, response.thoiGianKetThuc);
               }
              },
              error: (error: any) => {
                console.error('Error getting customer information:', error);
              }
            });
          });

        
        }

        this.notifService.success("Sửa phiếu giảm giá thành công!");
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
          this.notifService.success("Sửa phiếu giảm giá thất bại!");

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
      title:
        "Bạn có đồng ý sửa phiếu giảm giá không?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then((result) => {
      if (result.value) {
        this.updatePhieu();
      }
    });
  }

 

  chuyenTrang(){
    this.router.navigate(['phieu-giam-gia/ds-phieu-giam-gia']);
  }

}
