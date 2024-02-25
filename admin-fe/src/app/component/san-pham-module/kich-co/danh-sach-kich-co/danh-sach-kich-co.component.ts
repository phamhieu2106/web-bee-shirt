import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { KichCo } from "src/app/model/class/kich-co.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { KichCoService } from "src/app/service/kick-co.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-danh-sach-kich-co",
  templateUrl: "./danh-sach-kich-co.component.html",
  styleUrls: ["./danh-sach-kich-co.component.css"],
})
export class DanhSachKichCoComponent {
  public pagedResponse: PagedResponse<KichCo>;
  public addForm: FormGroup;
  public updateForm: FormGroup;
  public search = "";
  public selectedDetails: KichCo;

  constructor(
    private kichCoService: KichCoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getKieuDangList();
    this.initAddForm();
    this.initUpdateForm();
  }

  // public function
  public add(): void {
    this.kichCoService.add(this.addForm.value).subscribe({
      next: (response: KichCo) => {
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
    this.kichCoService.getByPage(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<KichCo>) => {
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
    this.kichCoService.getById(id).subscribe({
      next: (response: KichCo) => {
        console.log("tay ao:", response);

        this.selectedDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public openUpdateForm(id: number): void {
    this.kichCoService.getById(id).subscribe({
      next: (response: KichCo) => {
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
    this.kichCoService.changeStatus(id).subscribe({
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
    this.kichCoService.update(this.updateForm.value).subscribe({
      next: (response: KichCo) => {
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
    this.kichCoService.getByPage().subscribe({
      next: (response: PagedResponse<KichCo>) => {
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
