import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NhanVienResponse } from "src/app/model/interface/nhan-vien-response.interface";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { NhanVienService } from "src/app/service/nhan-vien.service";

@Component({
  selector: "app-sua-nhan-vien",
  templateUrl: "./sua-nhan-vien.component.html",
  styleUrls: ["./sua-nhan-vien.component.css"],
})
export class SuaNhanVienComponent implements OnChanges {
  @Input() nhanVienDetails: NhanVienResponse;

  nhanVienUpdated: NhanVienResponse;

  public updateForm: any;
  private sdtRegex: string = "0[0-9]{9}";
  public pagedResponse: PagedResponse<NhanVienResponse>;

  constructor(
    private nhanVienService: NhanVienService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnChanges() {
    if (this.nhanVienDetails) {
      this.nhanVienUpdated = this.nhanVienDetails;
      this.initUpdateForm();
    }
  }

  public initUpdateForm(): void {
    this.updateForm = new FormGroup({
      hoTen: new FormControl(this.nhanVienDetails.hoTen, [Validators.required]),
      ngaySinh: new FormControl(this.nhanVienDetails.ngaySinh, [
        Validators.required,
      ]),
      sdt: new FormControl(this.nhanVienDetails.sdt, [
        Validators.required,
        Validators.pattern(this.sdtRegex),
      ]),
      gioiTinh: new FormControl(this.nhanVienDetails.gioiTinh, [
        Validators.required,
      ]),
      email: new FormControl(this.nhanVienDetails.email, [
        Validators.required,
        Validators.email,
      ]),
      diaChi: new FormControl(this.nhanVienDetails.diaChi, [
        Validators.required,
      ]),
      tenDangNhap: new FormControl(this.nhanVienDetails.tenDangNhap, [
        Validators.required,
      ]),
      matKhau: new FormControl(this.nhanVienDetails.matKhau, [
        Validators.required,
      ]),
      // matKhau: new FormControl({
      //   value: this.nhanVienDetails.matKhau,
      //   disabled: true,
      // }),
    });
  }

  updateNhanVien(id: number): void {
    this.nhanVienService.update(this.updateForm.value, id).subscribe({
      next: () => {
        // this.goToPage(1, 5, "");
        this.initUpdateForm();
        this.toastr.success("Sửa nhân viên thành công", "Thành công");
        document.getElementById("closeBtnUpdate").click();
        // this.router.navigate(["/nhan-vien/ds-nhan-vien"]);
      },
      error: (erros: HttpErrorResponse) => {
        this.toastr.error("Sửa nhân viên thất bại", "Thất bại");
        console.log(erros.message);
      },
    });
  }

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.nhanVienService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<NhanVienResponse>) => {
        this.pagedResponse = response;
        console.log(this.pagedResponse);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
