import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { PhieuGiamGia } from "src/app/model/class/phieu-giam-gia.class";
import { KhachHangResponse } from "src/app/model/interface/khach-hang-response.interface";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { KhachHangService } from "src/app/service/khach-hang.service";
import { PhieuGiamGiaService } from "src/app/service/phieu-giam-gia.service";
import { ActivatedRoute } from "@angular/router";
import { PhieuGiamGiaKhachHang } from "src/app/model/class/phieu-giam-gia-khach-hang.class";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sua-phieu",
  templateUrl: "./sua-phieu.component.html",
  styleUrls: ["./sua-phieu.component.css"],
})
export class SuaPhieuComponent implements OnInit {
  phieuGiamGiaForm: FormGroup;
  public pagedResponse: PagedResponse<KhachHangResponse>;
  public search = "";

  public idPhieu: number

  phieu: PhieuGiamGia;

  public updateForm: any;

  public khachHangList: any
  public khachHangListKhongCo: any

  constructor(
    private phieuGiamGia: PhieuGiamGiaService,
    private khachHangService: KhachHangService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initUpdateForm();
    this.idPhieu = this.route.snapshot.params["id"];
    this.phieuGiamGia.getOne(this.idPhieu).subscribe({
      next: (response) => {
        this.phieu = response;
        this.initUpdateForm(this.phieu);

        this.phieuGiamGia.getKhachHangTang(this.idPhieu).subscribe({
          next: (response: PhieuGiamGiaKhachHang[]) => {

            this.khachHangList = response
          },
          error: (error) => {
            console.error('Error fetching data:', error);
          }
        });

        this.phieuGiamGia.getKhachHangTangKhongCo(this.idPhieu).subscribe({
          next: (response: PhieuGiamGiaKhachHang[]) => {

            this.khachHangListKhongCo = response
            console.log(this.khachHangListKhongCo)
          },
          error: (error) => {
            console.error('Error fetching data:', error);
          }
        });
      },
      error: (error) => {
        console.error("Khong lấy được phiếu:", error);
        // Handle errors here
      },
    });

    this.getKhachHangList();
    this.getPhieuKhachHang();
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


  // Khách Hàng

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.khachHangService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<KhachHangResponse>) => {
        this.pagedResponse = response;
        console.log(response);
        console.log("get dc");
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

  private getPhieuKhachHang(): void {

  }

  public onChangePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.search);
  }

  selectedIds: number[] = [];
  phieuGiamGiaId: number;

  onCheckboxChange(id: number): void {
    const index = this.selectedIds.indexOf(id);

    if (index === -1) {
      // Nếu ID không tồn tại trong danh sách, thêm vào
      this.selectedIds.push(id);
    } else {
      // Nếu ID đã tồn tại trong danh sách, loại bỏ nó
      this.selectedIds.splice(index, 1);
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
        this.toastr.success("Sửa nhân viên thành công", "Thành Công");

      },
      error: (erros: HttpErrorResponse) => {
        console.log(this.updateForm.value)
        this.toastr.error("Sửa nhân viên thất bại", "Thất bại");
        console.log(erros.message);
      },
    })
  }



}
