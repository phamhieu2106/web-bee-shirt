import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";


import { PhieuGiamGia } from "src/app/model/class/phieu-giam-gia.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { PhieuGiamGiaService } from "src/app/service/phieu-giam-gia.service";



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
  public phieuDetails: PhieuGiamGia;

  constructor(
    private phieuGiamGiaService: PhieuGiamGiaService,
  ) { }

  ngOnInit(): void {
    this.getPhieuGiamGiaList();
    this.initUpdateForm();
    this.startPolling();
  }


  public kieu: number[] = [0, 1];
  keyword: string


  searchPhieuGiamGia(event: any): void {
    this.keyword = event.target.value;
    this.goToPage(1, 5, this.keyword, this.kieu);
  }




  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = "",
    kieuFilter: number[]= this.kieu
  ): void {
    this.phieuGiamGiaService.getAll(page, pageSize, keyword, kieuFilter).subscribe({
      next: (response: PagedResponse<PhieuGiamGia>) => {
      
        this.pagedResponseBinh = response;

      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }



  public changeStatus(id: number): void {
    this.phieuGiamGiaService.changeStatus(id).subscribe({
      next: (response: PhieuGiamGia) => {
      },
      error: (error: HttpErrorResponse) => {
      }
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

      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  private initUpdateForm(): void {
    this.updateForm = new FormGroup({
      ten: new FormControl("", [Validators.required])

    })
  }
  // change trạng thái
  startPolling(): void {
    this.phieuGiamGiaService.startPolling().subscribe((danhSachPhieuGiamGia: PhieuGiamGia[]) => {
      danhSachPhieuGiamGia.forEach((phieu: PhieuGiamGia) => {
        this.changeStatus(phieu.id);
      });
    });
  }


  // Đổi màu
  getColorByStatus(status: string): string {
    switch (status) {
      case 'Đã kết thúc':
        return '#FF0000'; // Đỏ
      case 'Sắp diễn ra':
        return '#FFD700'; // Vàng
      case 'Đang Diễn Ra':
        return '#4CAF50'; // Xanh lá cây
      default:
        return '#74c0fc'; // Mặc định là xanh dương
    }
  }

  public openDetailsForm(id: number): void {
    this.phieuGiamGiaService.getOne(id).subscribe({
      next: (response) => {
        this.phieuDetails = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
