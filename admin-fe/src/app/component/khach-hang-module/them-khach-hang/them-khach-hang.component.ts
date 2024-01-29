import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private router: Router,
    private khachHangService: KhachHangService,
    private toas: ToastrService
  ) {}
  ngOnInit(): void {
    this.initFormAddKh();
  }
public addKH(): void{
  this.khachHangService.add(this.formAddKh.value).subscribe({
    next: (kh: KhachHangResponse)=>{
      this.initFormAddKh();
      
      this.toas.success('Thêm khách hàng mới thành công','Thành công');
      this.router.navigate(['/khach-hang/ds-khach-hang']);
      
    },error:(erros: HttpErrorResponse)=>{
      console.log(erros.message);
    }
  })
}

  public initFormAddKh(): void{
    this.formAddKh = new FormGroup({
      hoTen: new FormControl("",[Validators.required]),
      gioiTinh: new FormControl("",[Validators.required]),
      trangThai: new FormControl("",[Validators.required]),
      tenDangNhap: new FormControl("",[Validators.required]),
      sdt: new FormControl("",[Validators.required]),
      ngaySinh: new FormControl("",[Validators.required]),
      matKhau: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required]),
      huyen: new FormControl("",[Validators.required]),
      tinh: new FormControl("",[Validators.required]),
      duong: new FormControl("",[Validators.required]),
      xa: new FormControl("",[Validators.required]),
    })
  }
}
