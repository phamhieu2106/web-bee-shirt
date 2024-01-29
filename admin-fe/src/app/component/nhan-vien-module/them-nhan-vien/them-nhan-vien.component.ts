import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NhanVienResponse } from "src/app/model/interface/nhan-vien-response.interface";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { NhanVienService } from "src/app/service/nhan-vien.service";

@Component({
  selector: "app-them-nhan-vien",
  templateUrl: "./them-nhan-vien.component.html",
  styleUrls: ["./them-nhan-vien.component.css"],
})
export class ThemNhanVienComponent {
  @Output() reloadTable: EventEmitter<any> = new EventEmitter<any>();

  public addForm: any;
  private sdtRegex: string = "0[0-9]{9}";
  public pagedResponse: PagedResponse<NhanVienResponse>;

  constructor(
    private nhanVienService: NhanVienService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initAddForm();
  }

  addNhanVien(): void {
    this.nhanVienService.add(this.addForm.value).subscribe({
      next: () => {
        // this.goToPage(1, 5, "");
        this.initAddForm();
        this.toastr.success("Thêm nhân viên mới thành công", "Thành công");
        document.getElementById("closeBtn").click();
        this.reloadTable.emit(); // Gửi sự kiện tới cha
        // this.router.navigate(["/nhan-vien/ds-nhan-vien"]);
      },
      error: (erros: HttpErrorResponse) => {
        this.toastr.error("Thêm nhân viên thất bại", "Thất bại");
        console.log(erros.message);
      },
    });
  }

  public reloadForm() {
    this.initAddForm();
  }

  public initAddForm(): void {
    this.addForm = new FormGroup({
      hoTen: new FormControl("", [Validators.required]),
      ngaySinh: new FormControl("", [Validators.required]),
      sdt: new FormControl("", [
        Validators.required,
        Validators.pattern(this.sdtRegex),
      ]),
      gioiTinh: new FormControl(true, [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      diaChi: new FormControl("", [Validators.required]),
      tenDangNhap: new FormControl("", [Validators.required]),
      matKhau: new FormControl("", [Validators.required]),
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

  // private getAllNhanVien(): void {
  //   this.nhanVienService.getAll().subscribe({
  //     next: (response: PagedResponse<NhanVienResponse>) => {
  //       this.pagedResponse = response;
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       console.log(error);
  //     },
  //   });
  // }
}
