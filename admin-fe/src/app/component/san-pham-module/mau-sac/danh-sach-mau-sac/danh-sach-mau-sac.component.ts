import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";

import { MauSac } from "src/app/model/class/mau-sac.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { MauSacService } from "src/app/service/mau-sac.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-danh-sach-mau-sac",
  templateUrl: "./danh-sach-mau-sac.component.html",
  styleUrls: ["./danh-sach-mau-sac.component.css"],
})
export class DanhSachMauSacComponent {
  private selectFile: File;

  public pagedResponse: PagedResponse<MauSac>;
  public addForm: FormGroup;
  public updateForm: FormGroup;
  public search = "";
  public selectedDetails: MauSac;

  constructor(
    private mauSacService: MauSacService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMauSacList();
    this.initAddForm();
    this.initUpdateForm();
  }

  // public function
  public add(): void {
    console.log(this.addForm.value);
    console.log(this.selectFile);

    this.mauSacService.add(this.addForm.value, this.selectFile).subscribe({
      next: (response: MauSac) => {
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
      ma: new FormControl("", [Validators.required]),
    });
  }

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.mauSacService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<MauSac>) => {
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
    // this.mauSacService.getById(id).subscribe({
    //   next: (response: MauSac) => {
    //     console.log("tay ao:", response);
    //     this.selectedDetails = response;
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.log(error);
    //   },
    // });
  }

  public openUpdateForm(id: number): void {
    // this.mauSacService.getById(id).subscribe({
    //   next: (response: MauSac) => {
    //     this.updateForm = new FormGroup({
    //       id: new FormControl(response.id),
    //       ten: new FormControl(response.ten, [Validators.required]),
    //       trangThai: new FormControl(response.trangThai),
    //     });
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.log(error);
    //   },
    // });
  }

  public changeStatus(id: number): void {
    // this.mauSacService.changeStatus(id).subscribe({
    //   next: (response: string) => {
    //     this.toastr.success(response, "");
    //     this.goToPage(
    //       this.pagedResponse.pageNumber,
    //       this.pagedResponse.pageSize,
    //       this.pagedResponse.search
    //     );
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.log(error);
    //   },
    // });
  }

  public update(): void {
    // this.mauSacService.update(this.updateForm.value).subscribe({
    //   next: (response: MauSac) => {
    //     this.goToPage(
    //       this.pagedResponse.pageNumber,
    //       this.pagedResponse.pageSize,
    //       this.pagedResponse.search
    //     );
    //     this.initUpdateForm();
    //     Swal.fire({
    //       icon: "success",
    //       title: `Cập nhật thành công '${response.ten}'!`,
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     document.getElementById("closeUpdateBtn").click();
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     console.log(error.message);
    //   },
    // });
  }

  public imageChange(event: any): void {
    this.selectFile = event.target["files"][0];
    this.showImageThumbnail(this.selectFile);
  }

  // private function
  private getMauSacList(): void {
    this.mauSacService.getAll().subscribe({
      next: (response: PagedResponse<MauSac>) => {
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
      ma: new FormControl("", [Validators.required]),
      trangThai: new FormControl(false),
    });
  }

  private showImageThumbnail(file: File): void {
    let reader = new FileReader();
    reader.onload = (e) => {
      (document.getElementById("thumbnail") as HTMLImageElement)["src"] = e
        .target.result as string;
    };
    reader.readAsDataURL(file);
  }
}
