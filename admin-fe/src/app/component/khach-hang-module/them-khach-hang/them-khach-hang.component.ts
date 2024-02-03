import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KhachHangResponse } from 'src/app/model/interface/khach-hang-response.interface';
import { DiaChiService } from 'src/app/service/dia-chi.service';
import { KhachHangService } from 'src/app/service/khach-hang.service';
import Swal from 'sweetalert2';

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
  public tinh: any[] = [];
  public huyen: any[] = [];
  public xa: any[] = [];
  public idTinh: number;
  public idHuyen: number;
  imageUrl: string;
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(
    private router: Router,
    private khachHangService: KhachHangService,
    private toas: ToastrService,
    private diaChi: DiaChiService,
  ) {}
  ngOnInit(): void {
    this.initFormAddKh();
    this.diaChi.getTinh().subscribe((data: any)=>{
      this.tinh = data.results;
    })
  }
  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageUrl = URL.createObjectURL(file);
    }
  }

public addKH(): void{ 
  console.log(this.formAddKh.value);
  this.khachHangService.add(this.formAddKh.value).subscribe({
    next: (kh: KhachHangResponse)=>{
      this.initFormAddKh();      

      Swal.fire({
        icon: "success",
        title: `Thêm khách hàng mới thành công!`,
        showConfirmButton: false,
        timer: 1000,
      });

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
      trangThai: new FormControl("1"),
      sdt: new FormControl("",[Validators.required]),
      // imageUrl: new FormControl(""),
      ngaySinh: new FormControl("",[Validators.required]),
      matKhau: new FormControl("12345678"),
      email: new FormControl("",[Validators.required]),
      huyen: new FormControl("",[Validators.required]),
      tinh: new FormControl("",[Validators.required]),
      duong: new FormControl("",[Validators.required]),
      xa: new FormControl("",[Validators.required]),
    })
  }
  onCityChange(): void {
    const selectedTinh  = this.tinh.find(t => t.province_name ==this.formAddKh.get('tinh')?.value);
    if (selectedTinh) {
      const selectedId = selectedTinh.province_id;
      this.diaChi.getHuyen(selectedId).subscribe((data: any)=>{
        this.huyen = data.results;
      }) 
    }

  
  }

  ondistrictChange(): void {
    const selectedHuyen  = this.huyen.find(t => t.district_name ==this.formAddKh.get('huyen')?.value);
    if (selectedHuyen) {
      const selectedId = selectedHuyen.district_id;
      this.diaChi.getXa(selectedId).subscribe((data: any)=>{
        this.xa = data.results;
      }) 
    }
  }
}
