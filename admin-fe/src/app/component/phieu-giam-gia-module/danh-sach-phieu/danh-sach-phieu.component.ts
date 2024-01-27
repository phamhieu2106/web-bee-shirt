import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";


import { PhieuGiamGia } from "src/app/model/class/phieu-giam-gia.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { PhieuGiamGiaService } from "src/app/service/phieu-giam-gia.service";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: "app-danh-sach-phieu",
  templateUrl: "./danh-sach-phieu.component.html",
  styleUrls: ["./danh-sach-phieu.component.css"],
})
export class DanhSachPhieuComponent {
  public pagedResponseBinh: PagedResponse<PhieuGiamGia>;
  public updateForm: FormGroup;
  public search = "";
  public selectedDetails: PhieuGiamGia;

  constructor(
    private phieuGiamGiaService: PhieuGiamGiaService,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.getPhieuGiamGiaList();
    this.initAddForm();
    this.initUpdateForm();
  }

  //public function
  public add(): void {}

  public initAddForm(): void {}

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.phieuGiamGiaService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<PhieuGiamGia>) => {
        this.pagedResponseBinh = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }




  public onChangePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.search);
  }

  //private function
  private getPhieuGiamGiaList(): void {
    this.phieuGiamGiaService.getAll().subscribe({
      next: (response: PagedResponse<PhieuGiamGia>) => {
        this.pagedResponseBinh = response;
        console.log(this.pagedResponseBinh)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  private initUpdateForm(): void {
    this.updateForm = new FormGroup({
      ten:new FormControl("",[Validators.required])

    })
  }
}
