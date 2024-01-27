import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { KhachHang } from 'src/app/model/class/KhachHang.class';
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

  constructor(private phieuGiamGia: PhieuGiamGiaService,
    private khachHangService: KhachHangService) { }

  ngOnInit(): void {
    this.initAddForm();
    this.getKhachHangList();
  }

  public add(): void {
    this.phieuGiamGia.add(this.addForm.value).subscribe({
      next: (response: PhieuGiamGia) => {
        console.log(response)
        this.initAddForm();
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
      kieu: new FormControl("", [Validators.required]),
      loai: new FormControl("", [Validators.required]),
      soLuong: new FormControl("", [Validators.required]),
      thoiGianBatDau: new FormControl("", [Validators.required]),
      thoiGianKetThuc: new FormControl("", [Validators.required]),
      dieuKienGiam: new FormControl("", [Validators.required]),
      giaTri: new FormControl("", [Validators.required]),
      giaTriMax: new FormControl("", [Validators.required]),
      trangThai: new FormControl("", [Validators.required]),
    });
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
  selectedKhachHang: number[] = [];

  onCheckboxChange(id: number): void {
    const index = this.selectedKhachHang.indexOf(id);

    if (index === -1) {
      // Nếu ID không tồn tại trong danh sách, thêm vào
      this.selectedKhachHang.push(id);
    } else {
      // Nếu ID đã tồn tại trong danh sách, loại bỏ nó
      this.selectedKhachHang.splice(index, 1);
    }

    console.log(this.selectedKhachHang);
  }

}
