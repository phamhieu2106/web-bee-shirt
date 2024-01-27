import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KhachHangResponse } from 'src/app/model/interface/khach-hang-response.interface';
import { KhachHangService } from 'src/app/service/khach-hang.service';

@Component({
  selector: 'app-them-khach-hang',
  templateUrl: './them-khach-hang.component.html',
  styleUrls: ['./them-khach-hang.component.css']
})
export class ThemKhachHangComponent  {
  icon: string = "fa-solid fa-users";
  title: string = "khách hàng";
  mainHeading: string = "khách hàng";
  public formAddKh: FormGroup;
  public khachHangResponse: KhachHangResponse;
  constructor(
    private fb: FormBuilder,
    private khachHangService: KhachHangService,
  ) {}
  ngOnInit(): void {
    this.initFormAddKh();
    
  }
public addKH(): void{
  // this.khachHangService.add(this.formAddKh.value).subscribe({
  //   next: (kh: KhachHangResponse)=>{
  //     this.initFormAddKh();
  //   },error:(erros: HttpErrorResponse)
  // })
}

  public initFormAddKh(): void{
    this.formAddKh = new FormGroup({
      ho_ten: new FormControl("",[Validators.required]),
      gioi_tinh: new FormControl("",[Validators.required]),
      trang_thai: new FormControl("",[Validators.required]),
      ten_dang_nhap: new FormControl("",[Validators.required]),
      sdt: new FormControl("",[Validators.required]),
      ngay_sinh: new FormControl("",[Validators.required]),
      mat_khau: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required]),
      huyen: new FormControl("",[Validators.required]),
      tinh: new FormControl("",[Validators.required]),
      duong: new FormControl("",[Validators.required]),
      xa: new FormControl("",[Validators.required]),
    })
  }
}
