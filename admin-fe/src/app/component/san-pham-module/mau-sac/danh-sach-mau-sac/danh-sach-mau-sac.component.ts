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
  public searchKeyword = "";
  public selectedDetails: MauSac;
  public imageError: boolean = false;

  public isLoadding = false;
  public overlayText: string = "";

  // constructor, ngOn
  constructor(
    private mauSacService: MauSacService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.turnOnOverlay("Đang tải");
    this.getColorList();
    this.initAddForm();
    this.initUpdateForm();

    setTimeout(() => {
      this.turnOffOverlay("");
    }, 500);
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
        this.turnOnOverlay("Đang thêm...");

        let trimmedTen = this.addForm.get("ten").value.trim();
        this.addForm.get("ten")?.setValue(trimmedTen);

        let trimmedMa = this.addForm.get("ma").value.trim();
        this.addForm.get("ma")?.setValue(trimmedMa);

        this.mauSacService.add(this.addForm.value, this.selectFile).subscribe({
          next: (response: MauSac) => {
            this.goToPage(
              this.pagedResponse.pageNumber,
              this.pagedResponse.pageSize,
              this.pagedResponse.search
            );
            this.initAddForm();
            document.getElementById("closeAddModalBtn").click();
            this.notifService.success("Cập nhật thành công!");
            this.turnOffOverlay("");
          },
          error: (errResp: HttpErrorResponse) => {
            this.notifService.error(errResp.error.message);
            this.turnOffOverlay("");
          },
        });
      }
    });
  }

  // 2
  public initAddForm(): void {
    this.addForm = new FormGroup({
      ten: new FormControl("", [
        Validators.required,
        this.customRequiredValidator,
        Validators.pattern("^[a-zA-ZÀ-ỹ0-9\\s]+$"),
      ]),
      ma: new FormControl("", [
        Validators.required,
        this.customRequiredValidator,
        Validators.pattern("^[a-zA-Z0-9#]+$"),
      ]),
    });
    this.selectFile = null;
    (document.getElementById("thumbnail") as HTMLImageElement)["src"] =
      "assets/img/default-image.jpg";
  }

  // 3
  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.mauSacService.getByPage(page, pageSize, keyword).subscribe({
      next: (resp: PagedResponse<MauSac>) => {
        this.pagedResponse = resp;
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 4
  public changePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.searchKeyword);
  }

  // 5
  public searchByNameOrCode(): void {
    this.goToPage(1, this.pagedResponse.pageSize, this.searchKeyword);
  }

  // 6
  public openDetailsForm(id: number): void {
    this.mauSacService.getById(id).subscribe({
      next: (response: MauSac) => {
        this.selectedDetails = response;
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 7
  public openUpdateForm(id: number): void {
    this.mauSacService.getById(id).subscribe({
      next: (response: MauSac) => {
        this.selectedDetails = response;
        this.updateForm = new FormGroup({
          id: new FormControl(response.id),
          ten: new FormControl(response.ten, [
            Validators.required,
            this.customRequiredValidator,
            Validators.pattern("^[a-zA-ZÀ-ỹ0-9\\s]+$"),
          ]),
          ma: new FormControl(response.ma, [
            Validators.required,
            this.customRequiredValidator,
            Validators.pattern("^[a-zA-Z0-9#]+$"),
          ]),
          trangThai: new FormControl(response.trangThai),
        });
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 8
  public changeStatus(id: number): void {
    this.mauSacService.changeStatus(id).subscribe({
      next: () => {
        this.goToPage(
          this.pagedResponse.pageNumber,
          this.pagedResponse.pageSize,
          this.pagedResponse.search
        );
        this.notifService.success("Cập nhật trạng thái thành công!");
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 9
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
        this.turnOnOverlay("Đang cập nhật...");
        let trimmedName = this.updateForm.get("ten").value.trim();
        this.updateForm.get("ten")?.setValue(trimmedName);

        let trimmedCode = this.updateForm.get("ma").value.trim();
        this.updateForm.get("ma")?.setValue(trimmedCode);

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
              document.getElementById("closeUpdateModalBtn").click();
              this.notifService.success("Cập nhật thành công!");
              this.turnOffOverlay("");
            },
            error: (errResp: HttpErrorResponse) => {
              this.notifService.error(errResp.error.message);
              this.turnOffOverlay("");
            },
          });
      }
    });
  }

  // 10
  public onSelectImage(event: any, thumnailId: string): void {
    this.selectFile = event.target["files"][0];
    this.showImageThumbnail(this.selectFile, thumnailId);
  }

  // private functions
  // 1
  private getColorList(): void {
    this.isLoadding = true;
    this.mauSacService.getByPage().subscribe({
      next: (resp: PagedResponse<MauSac>) => {
        this.pagedResponse = resp;
      },
      error: (errResp: HttpErrorResponse) => {
        this.notifService.error(errResp.error.message);
      },
    });
  }

  // 2
  public initUpdateForm(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(0),
      ten: new FormControl("", [
        Validators.required,
        this.customRequiredValidator,
        Validators.pattern("^[a-zA-ZÀ-ỹ0-9\\s]+$"),
      ]),
      ma: new FormControl("", [
        Validators.required,
        this.customRequiredValidator,
        Validators.pattern("^[a-zA-Z0-9#]+$"),
      ]),
      trangThai: new FormControl(false),
    });

    this.selectFile = null;
    (document.getElementById("thumbnail") as HTMLImageElement)["src"] =
      "assets/img/default-image.jpg";
  }

  // 3
  private showImageThumbnail(file: File, thumnailId: string): void {
    let reader = new FileReader();
    reader.onload = (e) => {
      (document.getElementById(thumnailId) as HTMLImageElement)["src"] = e
        .target.result as string;
    };
    reader.readAsDataURL(file);
  }

  // 4
  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  // 5
  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }

  // 6
  private customRequiredValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const value = control.value;

    if (value.trim() === "") {
      return { customRequired: true };
    }
    return null;
  }
}
