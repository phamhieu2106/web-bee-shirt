import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NhanVienResponse } from "src/app/model/interface/nhan-vien-response.interface";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { NhanVienService } from "src/app/service/nhan-vien.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-sua-nhan-vien",
  templateUrl: "./sua-nhan-vien.component.html",
  styleUrls: ["./sua-nhan-vien.component.css"],
})
export class SuaNhanVienComponent {
  icon: string = "fa-solid fa-users";
  title: string = "Nhân Viên";
  mainHeading: string = "Nhân Viên";
  errorMessage: string = "";

  nhanVienUpdated: NhanVienResponse;

  @ViewChild("fileInput") fileInput: ElementRef;

  public idUpdated: number;
  public updateForm: any;
  private sdtRegex: string = "0[0-9]{9}";
  private cccdRegex: string = "0[0-9]{11}";
  private emailRegex: string = "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$";

  public pagedResponse: PagedResponse<NhanVienResponse>;
  public imageNew: string;
  private selectFile: File;

  constructor(
    private nhanVienService: NhanVienService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
      cccd: new FormControl(nhanVienUpdated?.cccd, [
        Validators.required,
        Validators.pattern(this.cccdRegex),
      ]),
      hoTen: new FormControl(nhanVienUpdated?.hoTen, [
        Validators.required,
        // Validators.pattern(/^[\p{L}\s]+$/u),
        // Validators.pattern(/^[\p{L}]+(?:\s[\p{L}]+)*$/u),
      ]),
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
        Validators.pattern(this.emailRegex),
      ]),
      diaChi: new FormControl(nhanVienUpdated?.diaChi, [Validators.required]),
      // tenDangNhap: new FormControl(nhanVienUpdated?.tenDangNhap, [
      //   Validators.required,
      // ]),
      matKhau: new FormControl(nhanVienUpdated?.matKhau),
      role: new FormControl(nhanVienUpdated?.role),
    });
  }

  updateNhanVien(): void {
    if (
      new Date(this.updateForm.value.ngaySinh) > new Date() ||
      new Date(this.updateForm.value.ngaySinh).toDateString() ===
        new Date().toDateString()
    ) {
      this.toastr.error(
        "Ngày sinh không được sau hoặc bằng ngày hiện tại",
        "Thất bại"
      );
      return;
    }

    Swal.fire({
      toast: true,
      title: "Bạn có đồng ý sửa không?",
      // text: "Bạn có chắc chắn sửa không",
      icon: "warning",
      position: "top",
      showCancelButton: true,
      confirmButtonColor: "#F5B16D",
      // cancelButtonColor: "#d33",
      // confirmButtonText: "Sửa",
    }).then((result) => {
      if (result.isConfirmed) {
        this.nhanVienService
          .update(this.updateForm.value, this.idUpdated, this.selectFile)
          .subscribe({
            next: () => {
              // this.initUpdateForm();
              Swal.fire({
                toast: true,
                icon: "success",
                position: "top-end",
                title: "Sửa nhân viên thành công",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
              });
              this.router.navigate(["/nhan-vien/ds-nhan-vien"]);
            },
            error: (error: HttpErrorResponse) => {
              if (error.status === 400) {
                // Trích xuất thông điệp lỗi từ response
                this.errorMessage = error.error.message;
                Swal.fire({
                  toast: true,
                  icon: "error",
                  position: "top-end",
                  title: this.errorMessage,
                  showConfirmButton: false,
                  timer: 3000,
                });
              } else {
                Swal.fire({
                  toast: true,
                  icon: "error",
                  position: "top-end",
                  title: "Sửa nhân viên thất bại",
                  showConfirmButton: false,
                  timer: 3000,
                });
                console.log(error.message);
              }
            },
          });
      }
    });
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageNew = URL.createObjectURL(file);
    }
  }

  public imageChange(event: any): void {
    this.selectFile = event.target["files"][0];
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
