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
  public searchKeyword: string = "";
  public statusFilter: number[] = [0, 1];
  public selectedDetails: SanPham;

  // constructor, ngOn
  constructor(
    private sanPhamService: SanPhamService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getProductList();
    this.initAddForm();
    this.initUpdateForm();
    this.getListIdSanPhamInDiscount();
  }

  // public function
  // 1
  public add(): void {
    Swal.fire({
      title: "Thêm sản phẩm?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Thêm",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        let trimmedTen = this.addForm.get("ten").value.trim();
        this.addForm.get("ten")?.setValue(trimmedTen);

        let trimmedMa = this.addForm.get("ma").value.trim();
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
            this.notifService.error(errorResponse.error.message);
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
    searchKeyword: string = "",
    status: number[] = [0, 1]
  ): void {
    this.sanPhamService
      .getByPage(page, pageSize, searchKeyword, status)
      .subscribe({
        next: (response: PagedResponse<SanPham>) => {
          this.pagedResponse = response;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.notifService.error(errorResponse.error.message);
        },
      });
  }

  // 4
  public changePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.searchKeyword, this.statusFilter);
  }

  // 5
  public searchByName(): void {
    this.goToPage(
      1,
      this.pagedResponse.pageSize,
      this.searchKeyword,
      this.statusFilter
    );
  }

  //
  public searchByStatus(e: any): void {
    if (e.target.value === "Tất cả trạng thái") {
      this.statusFilter = [0, 1];
    } else if (e.target.value === "Đang bán") {
      this.statusFilter = [1];
    } else if (e.target.value === "Ngừng bán") {
      this.statusFilter = [0];
    }
    this.goToPage(
      1,
      this.pagedResponse.pageSize,
      this.searchKeyword,
      this.statusFilter
    );
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
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
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
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  // 9
  public changeStatus(id: number, value: boolean): void {
    Swal.fire({
      title:
        "Thay đổi trạng thái của sản phẩm sẽ ảnh hưởng đến các SPCT liên quan. Bạn có đồng ý thay đổi không?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Thay đổi",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        this.sanPhamService.changeStatus(id, value).subscribe({
          next: (response: string) => {
            this.notifService.success(response);
            this.goToPage(
              this.pagedResponse.pageNumber,
              this.pagedResponse.pageSize,
              this.pagedResponse.search
            );
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.notifService.error(errorResponse.error.message);
          },
        });
      }
    });
  }

  // 10
  public update(): void {
    Swal.fire({
      title: "Cập nhật sản phẩm?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cập nhật",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        let trimmedTen = this.addForm.get("ten").value.trim();
        this.addForm.get("ten")?.setValue(trimmedTen);

        let trimmedMa = this.addForm.get("ma").value.trim();
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
            this.notifService.error(errorResponse.error.message);
          },
        });
      }
    });
  }

  // private function
  // 1
  private getProductList(): void {
    this.sanPhamService.getByPage().subscribe({
      next: (response: PagedResponse<SanPham>) => {
        this.pagedResponse = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
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
