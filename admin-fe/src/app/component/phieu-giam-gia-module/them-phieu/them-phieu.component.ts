import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PhieuGiamGia } from 'src/app/model/class/phieu-giam-gia.class';
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

  constructor(private phieuGiamGia: PhieuGiamGiaService) { }

  ngOnInit(): void {
    this.initAddForm();
  }

  public add(): void {
    this.phieuGiamGia.add(this.addForm.value).subscribe({
      next: (response: PhieuGiamGia) => {

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


}
