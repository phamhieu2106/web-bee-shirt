import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, delay } from "rxjs";
import { KhachHang } from "src/app/model/class/KhachHang.class";
import { DiaChi } from "src/app/model/class/dia-chi.class";
import { KhachHangResponse } from "src/app/model/interface/khach-hang-response.interface";
import { DiaChiService } from "src/app/service/dia-chi.service";
import { KhachHangService } from "src/app/service/khach-hang.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-sua-khach-hang",
  templateUrl: "./sua-khach-hang.component.html",
  styleUrls: ["./sua-khach-hang.component.css"],
})
export class SuaKhachHangComponent {
  icon: string = "fa-solid fa-users";
  title: string = "khách hàng";
  public seletedDetail: KhachHangResponse;
  public kh: KhachHangResponse;
  public id: number;
  public idKh: number;
  public formUpdateKH: FormGroup;
  public khDetail: KhachHangResponse;
  public addFormDC: FormGroup;
  public updateFormDC: FormGroup;
  public dsDC: DiaChi[];
  public tinh: any[] = [];
  public huyen: any[] = [];
  public xa: any[] = [];
  public tinhDetail: any[] = [];
  public huyenDetail: any[] = [];
  public xaDetail: any[] = [];
  public idTinh: number;
  public idHuyen: number;
  public idDC: number;
  public idTinhDetail: number;
  public idHuyenDetail: number;
  public idDCDetail: number;
  private selectFile: File;
  imageUrl: string;
  selectedAddress: DiaChi;
  public isCollapsed: boolean = true;
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private khachHangService: KhachHangService,
    private toas: ToastrService,
    private diaChiService: DiaChiService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.initFormUpdateKh();
    this.initAddFormDC();
    this.initFormUpdateDC();
    this.diaChiService.getTinh().subscribe((data: any)=>{
      this.tinh = data.results;
    })
    const ma = this.route.snapshot.paramMap.get("id");
    this.idKh = parseInt(ma, 10);
    this.diaChiService.getAllDc(this.idKh).subscribe({
      next: (data: DiaChi[]) => {
        this.dsDC = data;
      },
    });    
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
            tenDangNhap: new FormControl(kr.tenDangNhap, [Validators.required]),
          });
        },
      });
    });
    
  }
  public imageChange(event: any): void {
    this.selectFile = event.target["files"][0];
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
  public updateKH(): void { 
    this.khachHangService.update(this.id, this.formUpdateKH.value,this.selectFile).subscribe({
      
      next: (kh: KhachHang) => {
        
        console.log(this.selectFile);
        this.initFormUpdateDC();
        Swal.fire({
          icon: "success",
          title: `Cập nhật thành công!`,
          showConfirmButton: false,
          timer: 2000,
        });
     

      },
      error: (erros: HttpErrorResponse) => {
        console.log(this.formUpdateKH.value);
        this.toas.error("Cập nhật thông tin không thành công", "Thất bại");
      },
    });
  }
  public initFormUpdateKh(): void {
    this.formUpdateKH = new FormGroup({
      id: new FormControl("", [Validators.required]),
      hoTen: new FormControl("", [Validators.required]),
      gioiTinh: new FormControl("", [Validators.required]),
      trangThai: new FormControl("", [Validators.required]),
      tenDangNhap: new FormControl("", [Validators.required]),
      sdt: new FormControl("", [Validators.required]),
      ngaySinh: new FormControl("", [Validators.required]),
      matKhau: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      huyen: new FormControl("", [Validators.required]),
      tinh: new FormControl("", [Validators.required]),
      duong: new FormControl("", [Validators.required]),
      xa: new FormControl("", [Validators.required]),   
    });
  }

  public initAddFormDC(): void {
    this.addFormDC = new FormGroup({
      tinh: new FormControl("", [Validators.required]),
      huyen: new FormControl("", [Validators.required]),
      xa: new FormControl("", [Validators.required]),
      duong: new FormControl("", [Validators.required]),
    });
  }
  public initFormUpdateDC(): void {
   
    this.updateFormDC = new FormGroup({
      idDC: new FormControl("", [Validators.required]),
      tinh: new FormControl("", [Validators.required]),
      huyen: new FormControl("", [Validators.required]),
      duong: new FormControl("", [Validators.required]),
      xa: new FormControl("", [Validators.required]),
      macDinh: new FormControl("", [Validators.required]),
    });
  }

  public addDiaChi(): void {
    this.diaChiService.addDC(this.id, this.addFormDC.value).subscribe({
      next: (dc: DiaChi) => {
        this.initAddFormDC();
        this.initFormUpdateDC();
        Swal.fire({
          icon: "success",
          title: `Thêm địa chỉ thành công!`,
          showConfirmButton: false,
          timer: 1000,
        });
        document.getElementById("closeUpdateBtn").click();
        this.reloadPage();
      },
      error: (erros: HttpErrorResponse) => {
        console.log(erros.message);
      },
    });
  }

  public openUpdateForm(id: number): void {
    this.diaChiService.getDCById(id).subscribe({
      next: (dc: DiaChi) => {
        this.selectedAddress= dc;
        this.idDC=id;
        this.updateFormDC = new FormGroup({
          idDC: new FormControl(dc.id, [Validators.required]),
          tinh: new FormControl(dc.tinh, [Validators.required]),
          huyen: new FormControl(dc.huyen, [Validators.required]),
          duong: new FormControl(dc.duong, [Validators.required]),
          xa: new FormControl(dc.xa, [Validators.required]),
          macDinh: new FormControl(dc.macDinh, [Validators.required]),
        });
        this.diaChiService.getTinh().subscribe((data: any)=>{
          this.tinhDetail = data.results;
        })
        const selectedTinh  = this.tinh.find(t => t.province_name ==this.updateFormDC.get('tinh')?.value);
        if (selectedTinh) {
          const selectedId = selectedTinh.province_id;
          this.diaChiService.getHuyen(selectedId).subscribe((data: any)=>{
            this.huyen = data.results;
          }) 

        };
        const selectedHuyen  = this.huyen.find(t => t.district_name ==this.updateFormDC.get('huyen')?.value);
         if (selectedHuyen) {
      const selectedId = selectedHuyen.district_id;
      this.diaChiService.getXa(selectedId).subscribe((data: any)=>{
        this.xa = data.results;
      }) 
    }
    console.log(this.huyen);
    
      },
    });
  }
  public updateDC(id: number): void {
    console.log(this.idDC);
    console.log(this.id);
    
    console.log(this.updateFormDC.value);
    
    this.diaChiService.updateDC(this.idDC, this.updateFormDC.value).subscribe({
      next: (dc: DiaChi) => {
      
        this.initFormUpdateDC();
        Swal.fire({
          icon: "success",
          title: `Cập nhật thành công!`,
          showConfirmButton: false,
          timer: 1000,
        });
        document.getElementById("closeUpdateBtn").click();
        this.reloadPage();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }
  public reloadPage() {
    location.reload();
  }
  public xoaDC(id: number): void {
    this.diaChiService.deleteDC(id).subscribe({
      next: (dc: DiaChi) => {
        Swal.fire({
          icon: "success",
          title: `Xóa thành công!`,
          showConfirmButton: false,
          timer: 1500,
        });
        this.reloadPage();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  public setDefault(idDC: number): void {
    this.diaChiService.setDefaultDC(idDC).subscribe(() => {
     
      this.reloadPage();
    });
  }
  onCityChange(): void {
    const selectedTinh  = this.tinh.find(t => t.province_name ==this.addFormDC.get('tinh')?.value);
    if (selectedTinh) {
      const selectedId = selectedTinh.province_id;
      this.diaChiService.getHuyen(selectedId).subscribe((data: any)=>{
        this.huyen = data.results;
      }) 
    }
  }

  ondistrictChange(): void {
    const selectedHuyen  = this.huyen.find(t => t.district_name ==this.addFormDC.get('huyen')?.value);
    if (selectedHuyen) {
      const selectedId = selectedHuyen.district_id;
      this.diaChiService.getXa(selectedId).subscribe((data: any)=>{
        this.xa = data.results;
      }) 
    }
  }

  onCityDetailChange(): void {
    const selectedTinh  = this.tinhDetail.find(t => t.province_name ==this.updateFormDC.get('tinh')?.value);
    if (selectedTinh) {
      const selectedId = selectedTinh.province_id;
      this.diaChiService.getHuyen(selectedId).subscribe((data: any)=>{
        this.huyenDetail = data.results;
      }) 
    }
  }

  ondistrictDetailChange(): void {
    const selectedHuyen  = this.huyenDetail.find(t => t.district_name ==this.updateFormDC.get('huyen')?.value);
    if (selectedHuyen) {
      const selectedId = selectedHuyen.district_id;
      this.diaChiService.getXa(selectedId).subscribe((data: any)=>{
        this.xaDetail = data.results;
      }) 
    }
  }
  toggleCollapse(index: number): void {
    this.dsDC[index].isCollapsed = !this.dsDC[index].isCollapsed;
  }
}
