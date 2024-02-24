import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
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

  selectedIds: number[] = [];
  phieuGiamGiaId: number;

  constructor(
    private phieuGiamGia: PhieuGiamGiaService,
    private khachHangService: KhachHangService,
    private formBuilder: FormBuilder
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
          .subscribe({
            next: (phieuGiamGia: PhieuGiamGia) => {
              console.log(`Tặng thành công phiếu giảm giácho khách hàng!`);
            },
          });

        Swal.fire({
          icon: "success",
          title: `Thêm thành công '${response.tenPhieuGiamGia}'!`,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  public initAddForm(): void {
    this.addForm = this.formBuilder.group({
      maPhieuGiamGia: new FormControl("", [Validators.required]),
      tenPhieuGiamGia: new FormControl("", [Validators.required]),
      kieu: new FormControl("1", [Validators.required]),
      loai: new FormControl("1", [Validators.required]),
      soLuong: new FormControl(this.soLuongCheck, [Validators.required]),
      thoiGianBatDau: new FormControl("", [Validators.required,this.validateNgayBatDau()]),
      thoiGianKetThuc: new FormControl("", [
        Validators.required,
        this.validateNgay(),
      ]),
      dieuKienGiam: new FormControl("", [Validators.required]),
      giaTri: new FormControl("", [Validators.required, this.validateVip()]),
      giaTriMax: new FormControl("", [Validators.required]),
    });

    const kieuValue = this.addForm.get("kieu").value;
    const giaTriMaxControl = this.addForm.get("giaTriMax");
    if (kieuValue === "0") {
      giaTriMaxControl.enable();
    } else {
      giaTriMaxControl.disable();
      giaTriMaxControl.setValue("0");
    }

    this.addForm.get("kieu").valueChanges.subscribe((value) => {
      const giaTriMaxControl = this.addForm.get("giaTriMax");
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
      const addForm = this.addForm;

      if (!addForm) {
        return null;
      }

      const kieu = addForm.get("kieu").value;
      const giaTri = control.value;

      // Kiểm tra nếu ô giá trị trống
      if (!giaTri) {
        return { giaTri: "Không để trống giá trị" };
      }

      // Tiếp tục kiểm tra giá trị nhập vào khi không trống
      if (kieu === "1" && giaTri > 1000000) {
        return { giaTri: "Giá trị tối đa là 1.000.000 VNĐ" };
      } else if (kieu === "1" && giaTri < 10000) {
        return { giaTri: "Giá trị nhỏ nhất là 10.000 VNĐ" };
      } else if (kieu === "0" && giaTri > 100) {
        return { giaTri: "Giá trị lớn nhất là 100%" };
      } else if (kieu === "0" && giaTri < 1) {
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


  checkThoiGian(){
    this.addForm.get("thoiGianBatDau").updateValueAndValidity();
    this.addForm.get("thoiGianKetThuc").updateValueAndValidity();
  }


  onKieuChange() {
    const kieuValue = this.addForm.get("kieu").value;
    const giaTriMaxControl = this.addForm.get("giaTriMax");
    if (kieuValue == 0) {
      giaTriMaxControl.enable();
    } else {
      giaTriMaxControl.disable();
      giaTriMaxControl.setValue(0); // Set giá trị của giaTriMax thành 0
    }
    this.addForm.get("giaTri").updateValueAndValidity();
  }

  isTableDisabled: boolean = false;

  onLoaiChange() {
    const loaiValue = this.addForm.get("loai").value;
    const soluongControl = this.addForm.get("soLuong");
    if (loaiValue === "1") {
      soluongControl.enable();
    } else {
      soluongControl.disable();
    }
    this.isTableDisabled = !this.isTableDisabled;
  }

  // onchange check box

  soLuongCheck: number = 0;
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
    console.log(this.soLuongCheck);
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

  confirmCreation() {
    console.log("Giá trị của addForm:", this.addForm.value);
    const isConfirmed = window.confirm(
      "Bạn có chắc chăn thêm phiếu giảm giá này không"
    );

    if (isConfirmed) {
      // Perform the actual creation logic here
      this.add();
    }
  }
}
