import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NhanVienResponse } from "src/app/model/interface/nhan-vien-response.interface";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { NhanVienService } from "src/app/service/nhan-vien.service";

@Component({
  selector: "app-sua-nhan-vien",
  templateUrl: "./sua-nhan-vien.component.html",
  styleUrls: ["./sua-nhan-vien.component.css"],
})
export class SuaNhanVienComponent {
  icon: string = "fa-solid fa-users";
  title: string = "Nhân Viên";
  mainHeading: string = "Nhân Viên";

  nhanVienUpdated: NhanVienResponse;

  public idUpdated: number;
  public updateForm: any;
  private sdtRegex: string = "0[0-9]{9}";
  public pagedResponse: PagedResponse<NhanVienResponse>;

  constructor(
    private nhanVienService: NhanVienService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initUpdateForm();
    this.idUpdated = this.route.snapshot.params["id"];
    this.nhanVienService.getOneById(this.idUpdated).subscribe({
      next: (response) => {
        this.nhanVienUpdated = response;
        this.initUpdateForm(this.nhanVienUpdated);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public initUpdateForm(nhanVienUpdated?: NhanVienResponse): void {
    this.updateForm = new FormGroup({
      cccd: new FormControl(nhanVienUpdated?.cccd, [Validators.required]),
      hoTen: new FormControl(nhanVienUpdated?.hoTen, [Validators.required]),
      ngaySinh: new FormControl(nhanVienUpdated?.ngaySinh, [
        Validators.required,
      ]),
      sdt: new FormControl(nhanVienUpdated?.sdt, [
        Validators.required,
        Validators.pattern(this.sdtRegex),
      ]),
      gioiTinh: new FormControl(nhanVienUpdated?.gioiTinh, [
        Validators.required,
      ]),
      email: new FormControl(nhanVienUpdated?.email, [
        Validators.required,
        Validators.email,
      ]),
      diaChi: new FormControl(nhanVienUpdated?.diaChi, [Validators.required]),
      tenDangNhap: new FormControl(nhanVienUpdated?.tenDangNhap, [
        Validators.required,
      ]),
      matKhau: new FormControl(nhanVienUpdated?.matKhau, [Validators.required]),

      // matKhau: new FormControl({
      //   value: this.nhanVienDetails.matKhau,
      //   disabled: true,
      // }),
    });
  }

  updateNhanVien(): void {
    this.nhanVienService
      .update(this.updateForm.value, this.idUpdated)
      .subscribe({
        next: () => {
          // this.initUpdateForm();
          this.toastr.success("Sửa nhân viên thành công", "Thành công");
          this.router.navigate(["/nhan-vien/ds-nhan-vien"]);
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
