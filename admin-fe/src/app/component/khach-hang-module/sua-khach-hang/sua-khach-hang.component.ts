import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { KhachHang } from "src/app/model/class/KhachHang.class";
import { DiaChi } from "src/app/model/class/dia-chi.class";
import { KhachHangResponse } from "src/app/model/interface/khach-hang-response.interface";
import { DiaChiService } from "src/app/service/dia-chi.service";
import { KhachHangService } from "src/app/service/khach-hang.service";

@Component({
  selector: "app-sua-khach-hang",
  templateUrl: "./sua-khach-hang.component.html",
  styleUrls: ["./sua-khach-hang.component.css"],
})
export class SuaKhachHangComponent  {
  icon: string = "fa-solid fa-users";
  title: string = "khách hàng";
  public kh: KhachHangResponse;
  public id: number;
  public idKh: number;
  public formUpdateKH: FormGroup;
  public addFormDC: FormGroup;
  public khDetail: KhachHangResponse;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private khachHangService: KhachHangService,
    private toas: ToastrService,
    private diaChiService: DiaChiService,
  
  ) {}
  ngOnInit() {
    this.initFormUpdateKh();
    this.initAddFormDC();
    this.idKh = this.route.snapshot.params['id'];    
    this.route.params.subscribe((params) => {
      this.id = +params["id"];      
      this.khachHangService.getById(this.id).subscribe({
        next: (kr: KhachHangResponse) => {
          this.khDetail = kr;       
          this.formUpdateKH = new FormGroup({
            id: new FormControl(kr.id, [Validators.required]),
            hoTen: new FormControl(kr.hoTen, [Validators.required]),
            ngaySinh: new FormControl(kr.ngaySinh, [Validators.required]),
            sdt: new FormControl(kr.sdt, [Validators.required]),
            gioiTinh: new FormControl(kr.gioiTinh, [Validators.required]),
            trangThai: new FormControl(kr.trangThai, [Validators.required]),
            email: new FormControl(kr.email, [Validators.required]),
            tenDangNhap: new FormControl(kr.tenDangNhap, [Validators.required,]),
          });
        },
      });
    });
  }

  public updateKH(): void{
    this.khachHangService.update(this.id,this.formUpdateKH.value).subscribe({
      next: (kh: KhachHang)=>{
        this.toas.success('Cập nhật thông tin thành công','Thành công');
        this.router.navigate(['/khach-hang/sua-khach-hang/',this.id]);
      },error:(erros: HttpErrorResponse)=>{
        this.toas.error('Cập nhật thông tin không thành công','Thất bại');
      }
    })
  }
  public initFormUpdateKh(): void{
    this.formUpdateKH = new FormGroup({
      id: new FormControl("",[Validators.required]),
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

  public initAddFormDC(): void {
    this.addFormDC = new FormGroup({
      tinh: new FormControl("", [Validators.required]),
      huyen: new FormControl("", [Validators.required]),
      xa: new FormControl("", [Validators.required]),
      duong: new FormControl("", [Validators.required]),    
    });
  }

 
  public addDiaChi(): void{
    this.diaChiService.addDC(this.id,this.addFormDC.value).subscribe({
      next: (dc: DiaChi)=>{
        this.initAddFormDC();        
        this.toas.success('Thêm địa chỉ mới thành công','Thành công');
        this.router.navigate(['/khach-hang/ds-khach-hang']);
        
      },error:(erros: HttpErrorResponse)=>{
        console.log(erros.message);
        
      
      }
    })
  }
}
