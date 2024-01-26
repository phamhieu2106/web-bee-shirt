import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { KieuDang } from "src/app/model/class/kieu-dang.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { KieuDangService } from "src/app/service/kieu-dang.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-danh-sach-kieu-dang",
  templateUrl: "./danh-sach-kieu-dang.component.html",
  styleUrls: ["./danh-sach-kieu-dang.component.css"],
})
export class DanhSachKieuDangComponent {
  public pagedResponse: PagedResponse<KieuDang>;
  public addForm: FormGroup;
  public updateForm: FormGroup;
  public search = "";
  public selectedDetails: KieuDang;

  constructor(
    private kieuDangService: KieuDangService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getKieuDangList();
    this.initAddForm();
    this.initUpdateForm();
  }

  // public function
  public add(): void {
    this.kieuDangService.add(this.addForm.value).subscribe({
      next: (response: KieuDang) => {
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

  public initAddForm(): void {
    this.addForm = new FormGroup({
      ten: new FormControl("", [Validators.required]),
    });
  }

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.kieuDangService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<KieuDang>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public onChangePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.search);
  }

  public timKiem(): void {
    this.goToPage(1, this.pagedResponse.pageSize, this.search);
  }

  public onClearSearchInput(): void {
    this.goToPage();
  }

  public openDetailsForm(id: number): void {
    this.kieuDangService.getById(id).subscribe({
      next: (response: KieuDang) => {
        console.log("tay ao:", response);

        this.selectedDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public openUpdateForm(id: number): void {
    this.kieuDangService.getById(id).subscribe({
      next: (response: KieuDang) => {
        this.updateForm = new FormGroup({
          id: new FormControl(response.id),
          ten: new FormControl(response.ten, [Validators.required]),
          trangThai: new FormControl(response.trangThai),
        });
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public changeStatus(id: number): void {
    this.kieuDangService.changeStatus(id).subscribe({
      next: (response: string) => {
        this.toastr.success(response, "");
        this.goToPage(
          this.pagedResponse.pageNumber,
          this.pagedResponse.pageSize,
          this.pagedResponse.search
        );
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public update(): void {
    console.log(this.updateForm.value);
    this.kieuDangService.update(this.updateForm.value).subscribe({
      next: (response: KieuDang) => {
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
        document.getElementById("closeUpdateBtn").click();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
    });
  }

  // private function
  private getKieuDangList(): void {
    this.kieuDangService.getAll().subscribe({
      next: (response: PagedResponse<KieuDang>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public initUpdateForm(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(0),
      ten: new FormControl("", [Validators.required]),
      trangThai: new FormControl(false),
    });
  }
}
