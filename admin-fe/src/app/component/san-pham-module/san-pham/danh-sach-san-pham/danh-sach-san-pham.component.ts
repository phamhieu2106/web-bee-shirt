import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

import Swal, { SweetAlertResult } from "sweetalert2";
import { ToastrService } from "ngx-toastr";
import { AngularEditorConfig } from "@kolkov/angular-editor";

import { SanPham } from "src/app/model/class/san-pham.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { SanPhamService } from "src/app/service/san-pham.service";
import { NotificationService } from "src/app/service/notification.service";

@Component({
  selector: "app-danh-sach-san-pham",
  templateUrl: "./danh-sach-san-pham.component.html",
  styleUrls: ["./danh-sach-san-pham.component.css"],
})
export class DanhSachSanPhamComponent {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "auto",
    minHeight: "200px",
    maxHeight: "auto",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    defaultFontName: "",
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: "redText",
        class: "redText",
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    uploadUrl: "v1/image",
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: "top",
    toolbarHiddenButtons: [["bold", "italic"], ["fontSize"]],
  };

  public pagedResponse: PagedResponse<SanPham>;
  public addForm: FormGroup;
  public updateForm: FormGroup;
  public search = "";
  public selectedDetails: SanPham;

  // constructor, ngOn
  constructor(
    private sanPhamService: SanPhamService,
    private toastr: ToastrService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getSanPhamList();
    this.initAddForm();
    this.initUpdateForm();
    this.getListIdSanPhamInDiscount();
  }

  // public function
  // 1
  public add(): void {
    Swal.fire({
      toast: true,
      title: "Bạn có đồng ý thêm không?",
      icon: "warning",
      position: "top",
      showCancelButton: true,
      confirmButtonColor: "#F5B16D",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        let trimmedTen = this.addForm.get("ten").value.trim();
        this.addForm.get("ten")?.setValue(trimmedTen);

        let trimmedMa = this.addForm.get("ten").value.trim();
        this.addForm.get("ma")?.setValue(trimmedMa);

        this.sanPhamService.add(this.addForm.value).subscribe({
          next: (response: SanPham) => {
            this.goToPage(
              this.pagedResponse.pageNumber,
              this.pagedResponse.pageSize,
              this.pagedResponse.search
            );
            this.initAddForm();
            document.getElementById("closeAddBtn").click();
            this.notifService.success("Thêm sản phẩm thành công!");
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.notifService.success(errorResponse.error.message);
          },
        });
      }
    });
  }

  // 2
  public initAddForm(): void {
    this.addForm = new FormGroup({
      ten: new FormControl("", [Validators.required]),
      ma: new FormControl("", [Validators.required]),
      moTa: new FormControl("", [Validators.required]),
    });
  }

  // 3
  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.sanPhamService.getByPage(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<SanPham>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  // 4
  public onChangePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.search);
  }

  // 5
  public timKiem(): void {
    this.goToPage(1, this.pagedResponse.pageSize, this.search);
  }

  // 6
  public onClearSearchInput(): void {
    this.goToPage();
  }

  // 7
  public openDetailsForm(id: number): void {
    this.sanPhamService.getById(id).subscribe({
      next: (response: SanPham) => {
        this.selectedDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  // 8
  public openUpdateForm(id: number): void {
    this.sanPhamService.getById(id).subscribe({
      next: (response: SanPham) => {
        this.updateForm = new FormGroup({
          id: new FormControl(response.id),
          ten: new FormControl(response.ten, [Validators.required]),
          ma: new FormControl(response.ma, [Validators.required]),
          moTa: new FormControl(response.moTa, [Validators.required]),
          trangThai: new FormControl(response.trangThai),
        });
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.message);
      },
    });
  }

  // 9
  public changeStatus(id: number, value: boolean): void {
    Swal.fire({
      toast: true,
      title:
        "Thay đổi trạng thái của sản phẩm sẽ ảnh hưởng đến các SPCT liên quan. Bạn có đồng ý thay đổi không?",
      icon: "warning",
      position: "top",
      showCancelButton: true,
      confirmButtonColor: "#F5B16D",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.sanPhamService.changeStatus(id, value).subscribe({
          next: (response: string) => {
            this.toastr.success(response, "");
            this.goToPage(
              this.pagedResponse.pageNumber,
              this.pagedResponse.pageSize,
              this.pagedResponse.search
            );
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.toastr.error(errorResponse.error.message);
          },
        });
      }
    });
  }

  // 10
  public update(): void {
    Swal.fire({
      toast: true,
      title: "Bạn có đồng ý cập nhật không?",
      icon: "warning",
      position: "top",
      showCancelButton: true,
      confirmButtonColor: "#F5B16D",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        let trimmedTen = this.addForm.get("ten").value.trim();
        this.addForm.get("ten")?.setValue(trimmedTen);

        let trimmedMa = this.addForm.get("ten").value.trim();
        this.addForm.get("ma")?.setValue(trimmedMa);

        this.sanPhamService.update(this.updateForm.value).subscribe({
          next: (response: SanPham) => {
            this.goToPage(
              this.pagedResponse.pageNumber,
              this.pagedResponse.pageSize,
              this.pagedResponse.search
            );
            this.initUpdateForm();
            this.notifService.success("Cập nhật sản phẩm thành công!");
            document.getElementById("updateCloseBtn").click();
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.toastr.error(errorResponse.error.message);
          },
        });
      }
    });
  }

  // private function
  // 1
  private getSanPhamList(): void {
    this.sanPhamService.getByPage().subscribe({
      next: (response: PagedResponse<SanPham>) => {
        this.pagedResponse = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.message);
      },
    });
  }

  // 2
  public initUpdateForm(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(0),
      ten: new FormControl("", [Validators.required]),
      ma: new FormControl("", [Validators.required]),
      moTa: new FormControl("", [Validators.required]),
      trangThai: new FormControl(false),
    });
  }

  //
  public listIdSanPhamInDiscount: number[];
  private getListIdSanPhamInDiscount() {
    this.sanPhamService.getListIdSanPhamInDiscount().subscribe({
      next: (data) => {
        this.listIdSanPhamInDiscount = data;
      },
      error(err) {
        console.log(err);
      },
    });
  }

  public isDiscounted(id: number) {
    if (
      this.listIdSanPhamInDiscount &&
      this.listIdSanPhamInDiscount.length > 0
    ) {
      return this.listIdSanPhamInDiscount.includes(id);
    }
    return false;
  }
}
