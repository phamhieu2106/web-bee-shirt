import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import Swal from "sweetalert2";

import { KhachHang } from "src/app/model/class/KhachHang.class";
import { DiaChiVaPhiVanChuyen } from "src/app/model/class/dia-chi-va-phi-van-chuyen.class";
import { DiaChi } from "src/app/model/class/dia-chi.class";
import { KhachHangResponse } from "src/app/model/interface/khach-hang-response.interface";
import { DiaChiService } from "src/app/service/dia-chi.service";
import { GiaoHangNhanhService } from "src/app/service/giao-hang-nhanh.service";
import { KhachHangService } from "src/app/service/khach-hang.service";

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

  tinhs: any[];
  huyens: any[];
  xas: any[];
  idTinh: number;
  idHuyen: number;
  idXa: number;

  selectedAddress: DiaChi;
  public diaChiVaPhiVanChuyen = new DiaChiVaPhiVanChuyen();
  selectedAddressId: number;

  public dstinh: any[] = [];
  public dshuyen: any[] = [];
  public dsxa: any[] = [];
  public tinhDetail: any[] = [];
  public huyenDetail: any[] = [];
  public xaDetail: any[] = [];
  public idDC: number;
  errorMessage: string = "";
  public idTinhDetail: number;
  public idHuyenDetail: number;
  public idDCDetail: number;
  private selectFile: File;
  imageUrl: string;
  public isCollapsed: boolean = true;
  @ViewChild("fileInput") fileInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private khachHangService: KhachHangService,
    private toas: ToastrService,
    private diaChiService: DiaChiService,
    private ghn: GiaoHangNhanhService
  ) {}

  ngOnInit() {
    this.initFormUpdateKh();
    this.initAddFormDC(); //
    this.initFormUpdateDC();
    this.getAllTinh(); //

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

  //
  private getAllTinh() {
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

  public getAllHuyenByTinh() {
    this.xas = [];
    this.findTinhId();
    this.ghn.getAllDistrictByProvinceID(this.idTinh).subscribe({
      next: (resp) => {
        this.huyens = resp.data;
        this.addFormDC.get("tinh").setValue(this.getTenTinh());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public getAllXaByHuyen() {
    this.findHuyenId();
    this.ghn.getAllWardByDistrictID(this.idHuyen).subscribe({
      next: (resp) => {
        this.xas = resp.data;
        this.addFormDC.get("huyen").setValue(this.getTenHuyen());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private getTenTinh(): string {
    let provinceName = this.addFormDC.get("tinh").value;
    if (provinceName == null || provinceName == "") {
      this.tinhs.forEach((t) => {
        if (t.ProvinceID == this.idTinh) {
          provinceName = t.ProvinceName;
        }
      });
    }
    return provinceName;
  }

  private getTenHuyen(): string {
    let districtName = this.addFormDC.get("huyen").value;
    this.huyens.forEach((t) => {
      if (t.DistrictID == this.idHuyen) {
        districtName = t.DistrictName;
      }
    });
    return districtName;
  }

  private getTenXa(): string {
    let wardName = "";
    this.xas.forEach((t) => {
      if (t.WardCode == this.idXa) {
        wardName = t.WardName;
      }
    });
    return wardName;
  }

  private findXaId() {
    for (let i = 0; i < this.xas.length; i++) {
      const element = this.xas[i];
      if (element.NameExtension.includes(this.selectedAddress.xa)) {
        this.idXa = element.WardCode;
        break;
      }
    }
  }

  private findHuyenId() {
    for (let i = 0; i < this.huyens.length; i++) {
      const element = this.huyens[i];
      if (element.NameExtension.includes(this.addFormDC.get("huyen").value)) {
        this.idHuyen = element.DistrictID;
        break;
      }
    }
  }

  private findTinhId() {
    for (let i = 0; i < this.tinhs.length; i++) {
      const element = this.tinhs[i];
      if (element.NameExtension.includes(this.addFormDC.get("tinh").value)) {
        this.idTinh = element.ProvinceID;
        break;
      }
    }
  }

  // image
  public imageChange(event: any): void {
    this.selectFile = event.target["files"][0];
  }

  public openFileInput() {
    this.fileInput.nativeElement.click();
  }

  public onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageUrl = URL.createObjectURL(file);
    }
  }

  public updateKH(): void {
    if (
      new Date(this.formUpdateKH.value.ngaySinh) > new Date() ||
      new Date(this.formUpdateKH.value.ngaySinh).toDateString() ===
        new Date().toDateString()
    ) {
      this.toas.error("Ngày sinh không được sau ngày hiện tại", "Thất bại");
      return;
    }
    Swal.fire({
      toast: true,
      title: "Bạn có đồng ý sửa thông tin khách hàng không?",
      icon: "warning",
      position: "top",
      showCancelButton: true,
      confirmButtonColor: "#F5B16D",
    }).then((result) => {
      if (result.isConfirmed) {
        this.khachHangService
          .update(this.id, this.formUpdateKH.value, this.selectFile)
          .subscribe({
            next: (kh: KhachHang) => {
              this.initFormUpdateDC();
              Swal.fire({
                icon: "success",
                title: `Cập nhật thành công!`,
                showConfirmButton: false,
                timer: 2000,
              });
            },
            error: (erros: HttpErrorResponse) => {
              this.toas.error(
                "Cập nhật thông tin không thành công",
                "Thất bại"
              );
            },
          });
      }
    });
  }

  private initFormUpdateKh(): void {
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

  private initAddFormDC(): void {
    this.addFormDC = new FormGroup({
      tinh: new FormControl("", [Validators.required]),
      huyen: new FormControl("", [Validators.required]),
      xa: new FormControl("", [Validators.required]),
      duong: new FormControl("", [Validators.required]),
    });
  }

  private initFormUpdateDC(): void {
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
    this.selectedAddressId = id;
    this.getAllTinh();
    this.diaChiService.getDCById(id).subscribe({
      next: (dc: DiaChi) => {
        this.selectedAddress = dc;
        this.findTinhId();
        this.findHuyenId();
        this.findXaId();
        for (let i = 0; i < this.tinhs.length; i++) {
          const element = this.tinhs[i];
          if (element.NameExtension.includes(dc.tinh)) {
            this.idTinh = element.ProvinceID;
            break;
          }
        }
        this.diaChiVaPhiVanChuyen = new DiaChiVaPhiVanChuyen();
        this.diaChiVaPhiVanChuyen.tinh = dc.tinh;
        this.diaChiVaPhiVanChuyen.tinhId = this.idTinh;
        this.diaChiVaPhiVanChuyen.huyen = dc.huyen;
        this.diaChiVaPhiVanChuyen.xa = dc.xa;
        this.diaChiVaPhiVanChuyen.cuThe = dc.duong;
        // console.log(this.diaChiVaPhiVanChuyen);

        this.idDC = id;
        this.updateFormDC = new FormGroup({
          idDC: new FormControl(dc.id, [Validators.required]),
          tinh: new FormControl(dc.tinh, [Validators.required]),
          huyen: new FormControl(dc.huyen, [Validators.required]),
          duong: new FormControl(dc.duong, [Validators.required]),
          xa: new FormControl(dc.xa, [Validators.required]),
          macDinh: new FormControl(dc.macDinh, [Validators.required]),
        });

        this.diaChiService.getTinh().subscribe((data: any) => {
          this.tinhDetail = data.results;
        });
        const selectedTinh = this.dstinh.find(
          (t) => t.province_name == this.updateFormDC.get("tinh")?.value
        );
        if (selectedTinh) {
          const selectedId = selectedTinh.province_id;
          this.diaChiService.getHuyen(selectedId).subscribe((data: any) => {
            this.dshuyen = data.results;
          });
        }
        const selectedHuyen = this.dshuyen.find(
          (t) => t.district_name == this.updateFormDC.get("huyen")?.value
        );
        if (selectedHuyen) {
          const selectedId = selectedHuyen.district_id;
          this.diaChiService.getXa(selectedId).subscribe((data: any) => {
            this.dsxa = data.results;
          });
        }
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

  public toggleCollapse(index: number): void {
    this.dsDC[index].isCollapsed = !this.dsDC[index].isCollapsed;
  }
}
