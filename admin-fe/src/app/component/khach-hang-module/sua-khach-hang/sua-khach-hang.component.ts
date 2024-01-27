import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { KhachHang } from "src/app/model/class/KhachHang.class";
import { KhachHangResponse } from "src/app/model/interface/khach-hang-response.interface";
import { KhachHangService } from "src/app/service/khach-hang.service";

@Component({
  selector: "app-sua-khach-hang",
  templateUrl: "./sua-khach-hang.component.html",
  styleUrls: ["./sua-khach-hang.component.css"],
})
export class SuaKhachHangComponent implements OnInit {
  icon: string = "fa-solid fa-users";
  title: string = "khách hàng";
  public kh: KhachHangResponse;
  public id: number;
  public formUpdateKH: FormGroup;
  public khDetail: KhachHangResponse;
  constructor(
    private route: ActivatedRoute,
    private khachHangService: KhachHangService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
      this.khachHangService.getById(this.id).subscribe({
        next: (kr: KhachHangResponse)=>{
          this.khDetail =kr;
          this.formUpdateKH = new FormGroup({
            id: new FormControl(kr.id),
            ho_ten: new FormControl(kr.ho_ten,[Validators.required]),
            gioi_tinh: new FormControl(kr.gioi_tinh,[Validators.required]),
            trang_thai: new FormControl(kr.trang_thai,[Validators.required]),
            ten_dang_nhap: new FormControl(kr.ten_dang_nhap,[Validators.required]),
            sdt: new FormControl(kr.sdt,[Validators.required]),
            ngay_sinh: new FormControl(kr.ngay_sinh,[Validators.required]),
            mat_khau: new FormControl(kr.mat_khau,[Validators.required]),
            email: new FormControl(kr.email,[Validators.required]),
            huyen: new FormControl(kr.huyen,[Validators.required]),
            tinh: new FormControl(kr.tinh,[Validators.required]),
            duong: new FormControl(kr.duong,[Validators.required]),
            xa: new FormControl(kr.xa,[Validators.required]),
          })
        }
}        
      
      );
      console.log(this.kh);
      
    });
  }
}
