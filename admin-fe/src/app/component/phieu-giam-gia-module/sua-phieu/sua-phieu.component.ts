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

 
  idKhach:number

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
       
    
        this.phieuGiamGia.getPhieuKhach(1, 5, this.idPhieu,true).subscribe({
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

      console.log(this.selectedIds)
      this.phieuGiamGia.getPhieuKhach(1, 5, this.idPhieu,false).subscribe({
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

  // Phiếu giảm giá

  public getOne(id: number): void { }

  public initUpdateForm(phieu?: PhieuGiamGia): void {
    this.updateForm = new FormGroup({
      maPhieuGiamGia: new FormControl(phieu?.maPhieuGiamGia, [Validators.required]),
      tenPhieuGiamGia: new FormControl(phieu?.tenPhieuGiamGia, [Validators.required]),
      kieu: new FormControl(phieu?.kieu, [Validators.required]),
      loai: new FormControl(phieu?.loai, [Validators.required]),
      soLuong: new FormControl(phieu?.soLuong, [Validators.required]),
      thoiGianBatDau: new FormControl(phieu?.thoiGianBatDau, [Validators.required,this.validateNgayBatDau()]),
      thoiGianKetThuc: new FormControl(phieu?.thoiGianKetThuc, [Validators.required,this.validateNgay()]),
      dieuKienGiam: new FormControl(phieu?.dieuKienGiam, [Validators.required]),
      giaTri: new FormControl(phieu?.giaTri, [Validators.required, this.validateVip()]),
      giaTriMax: new FormControl(phieu?.giaTriMax, [Validators.required]),
    });

    const kieuValue = this.updateForm.get("kieu").value;
    const giaTriMaxControl = this.updateForm.get("giaTriMax");
    if (kieuValue === "0") {
      giaTriMaxControl.enable();
    } else {
      giaTriMaxControl.disable();
      giaTriMaxControl.setValue("0");
    }

    this.updateForm.get("kieu").valueChanges.subscribe((value:any) => {
      const giaTriMaxControl = this.updateForm.get("giaTriMax");
      if (value === "0") {
        giaTriMaxControl.enable();
      } else {
        giaTriMaxControl.disable();
        giaTriMaxControl.setValue("0"); // Set giá trị của giaTriMax thành 0
      }
      giaTriMaxControl.updateValueAndValidity();
    });


  }

  private validateVip(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const updateForm = this.updateForm;

      if (!updateForm) {

        return null;
      }

      const kieu = updateForm.get('kieu').value;
      const giaTri = control.value;


      // Kiểm tra nếu ô giá trị trống
      if (!giaTri) {
        return { giaTri: 'Không để trống giá trị' };
      }

      // Tiếp tục kiểm tra giá trị nhập vào khi không trống
      if (kieu === '1' && giaTri > 1000000) {
        return { giaTri: 'Giá trị tối đa là 1.000.000 VNĐ' };
      } else if (kieu === '1' && giaTri < 10000) {
        return { giaTri: 'Giá trị nhỏ nhất là 10.000 VNĐ' };
      } else if (kieu === '0' && giaTri > 100) {
        return { giaTri: 'Giá trị lớn nhất là 100%' };
      } else if (kieu === '0' && giaTri < 1) {
        return { giaTri: 'Giá trị nhỏ nhất là 1%' };
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
        return { ngayKetThuc: "Không để trống ngày kết thúc" };
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
        return { ngayBatDau: "Không để trống ngày bắt đầu" };
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


  checkThoiGian(){
    this.updateForm.get("thoiGianBatDau").updateValueAndValidity();
    this.updateForm.get("thoiGianKetThuc").updateValueAndValidity();
  }


  onKieuChange() {
    const kieuValue = this.updateForm.get('kieu').value;
    const giaTriMaxControl = this.updateForm.get('giaTriMax');
    if (kieuValue==0) {
      giaTriMaxControl.enable();
    } else {
      giaTriMaxControl.disable();
      giaTriMaxControl.setValue(0); // Set giá trị của giaTriMax thành 0
     
    }
    this.updateForm.get('giaTri').updateValueAndValidity();
  }

  
  isTableDisabled: boolean = false;

  onLoaiChange() {
    const loaiValue = this.updateForm.get('loai').value;
    const soluongControl = this.updateForm.get('soLuong');
    if (loaiValue === '1') {
      soluongControl.enable();
    } else {
      soluongControl.disable();
   
    }
    this.isTableDisabled = !this.isTableDisabled;
  }


  // Khách Hàng co

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    id:number = this.idKhach 
  ): void {
    this.phieuGiamGia.getPhieuKhach(page, pageSize,id,true).subscribe({
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
      id:number = this.idKhach 
    ): void {
      this.phieuGiamGia.getPhieuKhach(page, pageSize,id,false).subscribe({
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


  updatePhieu(): void {
    this.phieuGiamGia.update(this.idPhieu, this.updateForm.value).subscribe({
      next: () => {
        console.log(this.idPhieu)

        this.phieuGiamGia
        .addPhieuKhachHang(this.idPhieu, this.selectedIds)
        .subscribe();
       
        Swal.fire({
          icon: "success",
          title: `Sửa nhân viên thành công!`,
          showConfirmButton: false,
          timer: 1500,
        });
           // Delay 3-4 giây trước khi chuyển đến trang danh sách
        setTimeout(() => {
          this.router.navigate(['phieu-giam-gia/ds-phieu-giam-gia']);
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
            title: "Sửa phiếu giảm giá thất bại",
            showConfirmButton: false,
            timer: 3000,
          });
          console.log(error.message);
        }
      },
    });
}



}
