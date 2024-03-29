import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import Swal, { SweetAlertResult } from "sweetalert2";

import { MauSac } from "src/app/model/class/mau-sac.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { MauSacService } from "src/app/service/mau-sac.service";
import { HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from "src/app/service/notification.service";

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
  public isLoadding = false;
  public overlayText: string = "";
  public imageError: boolean = false;

  // constructor, ngOn
  constructor(
    private mauSacService: MauSacService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getMauSacList();
    this.initAddForm();
    this.initUpdateForm();
  }

  // public functions
  // 1
  public add(): void {
    Swal.fire({
      title: "Thêm màu sắc?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Thêm",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        if (this.selectFile == null) {
          this.imageError = true;
          return;
        }

        let trimmedTen = this.addForm.get("ten").value.trim();
        this.addForm.get("ten")?.setValue(trimmedTen);

        let trimmedMa = this.addForm.get("ma").value.trim();
        this.addForm.get("ma")?.setValue(trimmedMa);

        this.turnOnOverlay("Đang thêm...");
        this.mauSacService.add(this.addForm.value, this.selectFile).subscribe({
          next: (response: MauSac) => {
            this.goToPage(
              this.pagedResponse.pageNumber,
              this.pagedResponse.pageSize,
              this.pagedResponse.search
            );
            this.initAddForm();
            document.getElementById("closeBtn").click();
            this.turnOffOverlay("");
            this.notifService.success("Cập nhật thành công!");
          },
          error: (errorResponse: HttpErrorResponse) => {
            this.turnOffOverlay("");
            this.notifService.error(errorResponse.error.message);
          },
        });
      }
    });
  }

  //
  public initAddForm(): void {
    this.addForm = new FormGroup({
      ten: new FormControl("", [Validators.required]),
      ma: new FormControl("", [Validators.required]),
    });
    this.selectFile = null;
    (document.getElementById("thumbnail") as HTMLImageElement)["src"] =
      "assets/img/default-image.jpg";
  }

  //
  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.mauSacService.getByPage(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<MauSac>) => {
        this.pagedResponse = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  //
  public changePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.search);
  }

  public searchByName(): void {
    this.goToPage(1, this.pagedResponse.pageSize, this.search);
  }

  //
  public openDetailsForm(id: number): void {
    this.mauSacService.getById(id).subscribe({
      next: (response: MauSac) => {
        this.selectedDetails = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  //
  public openUpdateForm(id: number): void {
    this.mauSacService.getById(id).subscribe({
      next: (response: MauSac) => {
        this.selectedDetails = response;
        this.updateForm = new FormGroup({
          id: new FormControl(response.id),
          ten: new FormControl(response.ten, [Validators.required]),
          ma: new FormControl(response.ma, [Validators.required]),
          trangThai: new FormControl(response.trangThai),
        });
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  //
  public changeStatus(id: number): void {
    this.mauSacService.changeStatus(id).subscribe({
      next: (response: string) => {
        this.goToPage(
          this.pagedResponse.pageNumber,
          this.pagedResponse.pageSize,
          this.pagedResponse.search
        );
        this.notifService.success(response);
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  //
  public update(): void {
    Swal.fire({
      title: "Cập nhật màu sắc?",
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

        let trimmedMa = this.addForm.get("ten").value.trim();
        this.addForm.get("ten")?.setValue(trimmedMa);

        this.turnOnOverlay("Đang cập nhật...");
        this.mauSacService
          .update(this.updateForm.value, this.selectFile)
          .subscribe({
            next: (response: MauSac) => {
              this.goToPage(
                this.pagedResponse.pageNumber,
                this.pagedResponse.pageSize,
                this.pagedResponse.search
              );
              this.initUpdateForm();
              document.getElementById("closeUpdateBtn").click();
              this.turnOffOverlay("");
              this.notifService.success("Cập nhật thành công!");
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.notifService.error(errorResponse.error.message);
            },
          });
      }
    });
  }

  //
  public imageChange(event: any, thumnailId: string): void {
    this.selectFile = event.target["files"][0];
    this.showImageThumbnail(this.selectFile, thumnailId);
  }

  // private functions
  //
  private getMauSacList(): void {
    this.isLoadding = true;
    this.mauSacService.getByPage().subscribe({
      next: (response: PagedResponse<MauSac>) => {
        this.pagedResponse = response;
        this.isLoadding = false;
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(errorResponse.error.message);
      },
    });
  }

  //
  public initUpdateForm(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(0),
      ten: new FormControl("", [Validators.required]),
      ma: new FormControl("", [Validators.required]),
      trangThai: new FormControl(false),
    });

    this.selectFile = null;
    (document.getElementById("thumbnail") as HTMLImageElement)["src"] =
      "assets/img/default-image.jpg";
  }

  //
  private showImageThumbnail(file: File, thumnailId: string): void {
    let reader = new FileReader();
    reader.onload = (e) => {
      (document.getElementById(thumnailId) as HTMLImageElement)["src"] = e
        .target.result as string;
    };
    reader.readAsDataURL(file);
  }

  //
  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  //
  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }
}
