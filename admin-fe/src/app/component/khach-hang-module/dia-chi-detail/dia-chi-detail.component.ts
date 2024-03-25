import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiaChiVaPhiVanChuyen } from 'src/app/model/class/dia-chi-va-phi-van-chuyen.class';
import { DiaChi } from 'src/app/model/class/dia-chi.class';
import { DiaChiService } from 'src/app/service/dia-chi.service';
import { GiaoHangNhanhService } from 'src/app/service/giao-hang-nhanh.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dia-chi-detail',
  templateUrl: './dia-chi-detail.component.html',
  styleUrls: ['./dia-chi-detail.component.css']
})
export class DiaChiDetailComponent implements OnInit {
  @Input({ required: true }) diaChiVaPhiVanChuyen? = new DiaChiVaPhiVanChuyen();
  @Output() diaChiVaPhiVanChuyenChange =
  new EventEmitter<DiaChiVaPhiVanChuyen>();
  public updateFormDC: FormGroup;
  @Input() dcDetail: any; 
  @Input() selectedAddress: DiaChi;
  tinhs: any[];
  huyens: any[];
  xas: any[];
  idTinh: number;
  idHuyen:number;
  idXa:number;
  diaChi= new DiaChi();
  constructor(    private diaChiService: DiaChiService,
    private ghn: GiaoHangNhanhService,) { }
    ngOnChanges(changes: SimpleChanges): void {
      if (
        changes["diaChiVaPhiVanChuyen"] &&
        !this.diaChiVaPhiVanChuyenIsEmpty()
      ) {
        // Fill data khi có dữ liệu
        this.fillData();
      }
    }
  ngOnInit() {
    
    if (this.diaChiVaPhiVanChuyenIsEmpty()) {
      this.getAllTinh();      
    }
  }
  fillData() {
    // get all tỉnh => lọc ds tìm tinhId
    this.getAllTinh();
    setTimeout(() => this.findTinhId(), 100);

    // get all huyện => lọc danh sách tìm xaId
    setTimeout(() => this.getAllHuyenByTinh(), 200);
    setTimeout(() => this.findHuyenId(), 400);

    // get all xã
    setTimeout(() => this.getAllXaByHuyen(), 600);
    setTimeout(() => this.findXaId(), 800);
  }
  diaChiVaPhiVanChuyenIsEmpty(): boolean {
    return (
      this.diaChiVaPhiVanChuyen.tinh == null &&
      this.diaChiVaPhiVanChuyen.huyen == null &&
      this.diaChiVaPhiVanChuyen.xa == null
    );
  }
  getAllTinh() {
    this.huyens = [];
    this.xas = [];
    this.ghn.getAllProvince().subscribe({
      next: (resp) => {
        this.tinhs = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  findTinhId() {
    for (let i = 0; i < this.tinhs.length; i++) {
      const element = this.tinhs[i];
      if (element.NameExtension.includes(this.diaChiVaPhiVanChuyen.tinh)) {
        this.idTinh = element.ProvinceID;       
        break;
      }
    } 
  }
  findXaId() {
    for (let i = 0; i < this.xas.length; i++) {
      const element = this.xas[i];
      if (element.NameExtension.includes(this.diaChiVaPhiVanChuyen.xa)) {
        this.diaChiVaPhiVanChuyen.xaCode = element.WardCode;
        break;
      }
    }
  }
  findHuyenId() {
    for (let i = 0; i < this.huyens.length; i++) {
      const element = this.huyens[i];
      if (element.NameExtension.includes(this.diaChiVaPhiVanChuyen.huyen)) {
        this.diaChiVaPhiVanChuyen.huyenId = element.DistrictID;
        break;
      }
    }
  }
  getAllHuyenByTinh() {   
    this.xas = [];       
    this.findTinhId();    
    this.idTinh = this.diaChiVaPhiVanChuyen.tinhId;
    
      this.tinhs.forEach((t) => {
        if (t.ProvinceID == this.diaChiVaPhiVanChuyen.tinhId) {
          this.diaChi.tinh = t.ProvinceName;
        }
      });
    this.ghn
      .getAllDistrictByProvinceID(this.idTinh)
      .subscribe({
        next: (resp) => {
          this.huyens = resp.data;
          this.diaChiVaPhiVanChuyen.tinh = this.getTenTinh();
          this.diaChi.tinh = this.getTenTinh();
          
        },
        error: (err) => {
          console.log(err);
        },
      });       
      console.log(this.idTinh);
      
  }

  getAllXaByHuyen() {
    this.findHuyenId();  
    this.idHuyen= this.diaChiVaPhiVanChuyen.huyenId;  
    this.ghn
    .getAllWardByDistrictID(this.diaChiVaPhiVanChuyen.huyenId)
    .subscribe({
      next: (resp) => {
        this.xas = resp.data;
        this.diaChiVaPhiVanChuyen.huyen = this.getTenHuyen();
      },
      error: (err) => {
        console.log(err);
      },
    });  
    console.log(this.idTinh);

  }
  getTenTinh(): string {
    let provinceName = this.diaChiVaPhiVanChuyen.tinh;
    if (provinceName == null || provinceName == "") {
      this.tinhs.forEach((t) => {
        if (t.ProvinceID == this.diaChiVaPhiVanChuyen.tinhId) {
          provinceName = t.ProvinceName;
        }
      });
    }
    return provinceName;
  }
  getTenHuyen(): string {
    let districtName = "";
    this.huyens.forEach((t) => {
      if (t.DistrictID == this.diaChiVaPhiVanChuyen.huyenId) {
        districtName = t.DistrictName;
      }
    });
    return districtName;
  }
  getTenXa(): string {
    let wardName = "";
    this.xas.forEach((t) => {
      if (t.WardCode == this.diaChiVaPhiVanChuyen.xaCode) {
        wardName = t.WardName;
      }
    });
    return wardName;
  }
  

  public updateDC(): void {
    console.log(this.selectedAddress);
    
    this.tinhs.forEach((t) => {
      if (t.ProvinceID == this.idTinh) {
        this.diaChi.tinh = t.ProvinceName;
      }
    });
    this.diaChi.duong = this.diaChiVaPhiVanChuyen.cuThe;
    this.diaChi.huyen = this.getTenHuyen();
    this.diaChi.xa = this.getTenXa();  
    this.diaChi.macDinh = this.selectedAddress.macDinh;
    
    
    this.diaChiService.updateDC(this.selectedAddress.id,this.diaChi).subscribe({
      next: (dc: DiaChi) => {
    
        Swal.fire({
          icon: "success",
          title: `Cập nhật thành công!`,
          showConfirmButton: false,
          timer: 1000,
        });
        document.getElementById("closeUpdateBtn").click();
        location.reload();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
}
