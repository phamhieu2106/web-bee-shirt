import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { PhieuGiamGia } from 'src/app/model/class/phieu-giam-gia.class';
import { KhachHangResponse } from 'src/app/model/interface/khach-hang-response.interface';
import { PagedResponse } from 'src/app/model/interface/paged-response.interface';
import { KhachHangService } from 'src/app/service/khach-hang.service';
import { PhieuGiamGiaService } from 'src/app/service/phieu-giam-gia.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-them-phieu',
  templateUrl: './them-phieu.component.html',
  styleUrls: ['./them-phieu.component.css']
})
export class ThemPhieuComponent implements OnInit {
  public addForm: FormGroup;
  phieuGiamGiaForm: FormGroup;
  public pagedResponse: PagedResponse<KhachHangResponse>;
  public search = "";

  selectedIds: number[] = [];
  phieuGiamGiaId: number

  constructor(private phieuGiamGia: PhieuGiamGiaService,
    private khachHangService: KhachHangService,) { }

  ngOnInit(): void {
    this.initAddForm();
    this.getKhachHangList();
  }

  public add(): void {
    this.phieuGiamGia.add(this.addForm.value).subscribe({
      next: (response: PhieuGiamGia) => {

        this.initAddForm();
        this.phieuGiamGiaId = response.id;
        console.log(this.selectedIds);
        console.log(this.phieuGiamGiaId);

        this.phieuGiamGia.addPhieuKhachHang(this.phieuGiamGiaId, this.selectedIds).subscribe({
          next: (phieuGiamGia: PhieuGiamGia) => {
            console.log(`Tặng thành công phiếu giảm giácho khách hàng!`)
          }
        })

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
    this.addForm = new FormGroup({
      maPhieuGiamGia: new FormControl("", [Validators.required]),
      tenPhieuGiamGia: new FormControl("", [Validators.required]),
      kieu: new FormControl("1"),
      loai: new FormControl("1"),
      soLuong: new FormControl("", [Validators.required]),
      thoiGianBatDau: new FormControl("", [Validators.required]),
      thoiGianKetThuc: new FormControl("", [Validators.required]),
      dieuKienGiam: new FormControl("", [Validators.required]),
      giaTri: new FormControl("", [Validators.required, this.validateVip()]),
      giaTriMax: new FormControl("", [Validators.required, Validators.min(1), Validators.max(100)]),
      trangThai: new FormControl("", [Validators.required]),
    })


  }

  private validateVip(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const addForm = this.addForm;

      if (!addForm) {
        // Gọi initAddForm() hoặc xử lý khởi tạo addForm ở đây
        return null;
      }

      const kieu = addForm.get('kieu').value;
      const giaTri = control.value;
      console.log(kieu)

      // Kiểm tra nếu ô giá trị trống
      if (!giaTri) {
        return { giaTri: 'Vui lòng nhập giá trị' };
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

  onKieuChange() {
    const loaiValue = this.addForm.get('kieu').value;
    console.log(loaiValue)
    this.addForm.get('giaTri').updateValueAndValidity();
  }


  isTableDisabled: boolean = false;

  onLoaiChange() {
    this.isTableDisabled = !this.isTableDisabled;
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

  public onChangePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.search);
  }


  // onchange check box 




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

  confirmCreation() {
    console.log('Giá trị của addForm:', this.addForm.value);
    const isConfirmed = window.confirm('Bạn có chắc chăn thêm phiếu giảm giá này không');

    if (isConfirmed) {
      // Perform the actual creation logic here
      this.add();
    }
  }












}
