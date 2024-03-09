import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";

import { SanPham } from "src/app/model/class/san-pham.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { SanPhamService } from "src/app/service/san-pham.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";

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

  constructor(
    private sanPhamService: SanPhamService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getSanPhamList();
    this.initAddForm();
    this.initUpdateForm();
  }

  // public function
  //
  public add(): void {
    this.sanPhamService.add(this.addForm.value).subscribe({
      next: (response: SanPham) => {
        this.goToPage(
          this.pagedResponse.pageNumber,
          this.pagedResponse.pageSize,
          this.pagedResponse.search
        );
        this.initAddForm();
        Swal.fire({
          icon: "success",
          title: `Thêm thành công '${response.ten}'!`,
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("closeBtn").click();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  //
  public initAddForm(): void {
    this.addForm = new FormGroup({
      ten: new FormControl("", [Validators.required]),
      ma: new FormControl("", [Validators.required]),
      moTa: new FormControl("", [Validators.required]),
    });
  }

  //
  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.sanPhamService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<SanPham>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  //
  public onChangePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.search);
  }

  //
  public timKiem(): void {
    this.goToPage(1, this.pagedResponse.pageSize, this.search);
  }

  //
  public onClearSearchInput(): void {
    this.goToPage();
  }

  //
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

  //
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
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  //
  public changeStatus(id: number): void {
    this.sanPhamService.changeStatus(id).subscribe({
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

  //
  public update(): void {
    this.sanPhamService.update(this.updateForm.value).subscribe({
      next: (response: SanPham) => {
        this.goToPage(
          this.pagedResponse.pageNumber,
          this.pagedResponse.pageSize,
          this.pagedResponse.search
        );
        this.initUpdateForm();
        Swal.fire({
          icon: "success",
          title: `Cập nhật thành công '${response.ten}'!`,
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("updateCloseBtn").click();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  // private function
  //
  private getSanPhamList(): void {
    this.sanPhamService.getAll().subscribe({
      next: (response: PagedResponse<SanPham>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  //
  public initUpdateForm(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(0),
      ten: new FormControl("", [Validators.required]),
      ma: new FormControl("", [Validators.required]),
      moTa: new FormControl("", [Validators.required]),
      trangThai: new FormControl(false),
    });
  }
}
