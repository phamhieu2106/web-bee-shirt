import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";


import { PhieuGiamGia } from "src/app/model/class/phieu-giam-gia.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { PhieuGiamGiaService } from "src/app/service/phieu-giam-gia.service";
import { Subscription } from "rxjs";



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
  private pollingSubscription: Subscription; // Biến lưu trữ subscription

  constructor(
    private phieuGiamGiaService: PhieuGiamGiaService,
  ) { }

  ngOnInit(): void {
    this.getPhieuGiamGiaList();
    this.initUpdateForm();
    this.startPolling();
  }


  public kieu: number[] = [0, 1];
  public loai: number[] = [0, 1];
  public trangThai: string[] = ["Đang diễn ra","Sắp diễn ra","Đã kết thúc"];
  public thoiGianBatDau: string =""
  public thoiGianKetThuc: string=""
  keyword: string


  searchPhieuGiamGia(event: any): void {
    this.keyword = event.target.value;
    this.filterPrivate(1, 5, this.keyword, this.kieu,this.loai,this.trangThai);
  }

  clearFilters(): void {
    this.thoiGianBatDau = '';
    this.thoiGianKetThuc = '';
    this.kieu = [0, 1];
    this.loai = [0, 1];
    this.trangThai = ['Đang diễn ra', 'Sắp diễn ra', 'Đã kết thúc'];

    this.goToPage(); // Gọi lại hàm lọc để cập nhật dữ liệu
  }

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
   
  ): void {
    console.log(this.thoiGianBatDau)
    this.phieuGiamGiaService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<PhieuGiamGia>) => {
      
        this.pagedResponseBinh = response;

      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }


  public filterPrivate(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = "",
    kieuFilter: number[] = this.kieu,
    loaiFilter: number[] = this.loai,
    trangThaiFilter: string[] = this.trangThai,
    thoiGianBatDauFilter: string = this.thoiGianBatDau,
    thoiGianKetThucFilter: string = this.thoiGianKetThuc
  ): void {
    // Kiểm tra xem thoiGianBatDauFilter và thoiGianKetThucFilter có giá trị rỗng không
    if (!thoiGianBatDauFilter || !thoiGianKetThucFilter) {
       
        console.error("Giá trị thời gian bắt đầu hoặc kết thúc không được để trống.");

        this.phieuGiamGiaService.getAll(
          page,
          pageSize,
          keyword,
          kieuFilter,
          loaiFilter,
          trangThaiFilter,
        
      ).subscribe({
          next: (response: PagedResponse<PhieuGiamGia>) => {
              this.pagedResponseBinh = response;
          },
          error: (error: HttpErrorResponse) => {
              console.log(error);
          },
      });
        
        return; // Dừng hàm và không thực hiện truy vấn
    }

    // Tiếp tục thực hiện truy vấn nếu không có giá trị rỗng
    this.phieuGiamGiaService.filter(
        page,
        pageSize,
        keyword,
        kieuFilter,
        loaiFilter,
        trangThaiFilter,
        thoiGianBatDauFilter,
        thoiGianKetThucFilter
    ).subscribe({
        next: (response: PagedResponse<PhieuGiamGia>) => {
            this.pagedResponseBinh = response;
        },
        error: (error: HttpErrorResponse) => {
            console.log(error);
        },
    });
}



public changeStatus(id: number): void {
  this.phieuGiamGiaService.changeStatus(id).subscribe();
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


  ngOnDestroy(): void {
    // Huỷ subscription khi component được hủy bỏ
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
  // change trạng thái
  startPolling(): void {
    this.pollingSubscription = this.phieuGiamGiaService.startPolling().subscribe((danhSachPhieuGiamGia: PhieuGiamGia[]) => {
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
