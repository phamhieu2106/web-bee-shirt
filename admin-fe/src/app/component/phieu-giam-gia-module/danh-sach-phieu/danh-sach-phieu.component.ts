import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";


import { PhieuGiamGia } from "src/app/model/class/phieu-giam-gia.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { PhieuGiamGiaService } from "src/app/service/phieu-giam-gia.service";
import { Subscription } from "rxjs";
import { CurrencyPipe } from "@angular/common";
import { el } from "date-fns/locale";



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
    private currencyPipe: CurrencyPipe,
  ) { }

  ngOnInit(): void {
    this.getPhieuGiamGiaList();
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
    // Loại bỏ dấu cách thừa giữa các từ trong chuỗi keyword
    const keywordWithoutExtraSpaces = this.keyword.replace(/\s+/g, ' ');

    this.keyword = this.keyword.trim();
    // Gán giá trị đã được xử lý vào thuộc tính this.keyword
    this.keyword = keywordWithoutExtraSpaces;
    this.filterPrivate(1, 5, this.keyword, this.kieu,this.loai,this.trangThai);
    console.log(this.pagedResponseBinh)
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
    pageSize: number = 6,
    keyword: string = "",
    kieuFilter: number[] = this.kieu,
    loaiFilter: number[] = this.loai,
    trangThaiFilter: string[] = this.trangThai,
    thoiGianBatDauFilter: string = this.thoiGianBatDau,
    thoiGianKetThucFilter: string = this.thoiGianKetThuc
  ): void {
    // Kiểm tra xem thoiGianBatDauFilter và thoiGianKetThucFilter có giá trị rỗng không
    if (!thoiGianBatDauFilter || !thoiGianKetThucFilter) {
      
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
    this.filterPrivate(1, e.target.value, this.search);
    console.log(this.pagedResponseBinh?.data)
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
        return 'red'; // Đỏ
      case 'Sắp diễn ra':
        return '#FFD700'; // Vàng
      case 'Đang diễn ra':
        return '#32ba7c'; // Xanh lá cây
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


  public formatCurrencyGiaTri(amount: number): string {
   if(amount <999){
   return amount +"%"
   }else{
    return this.currencyPipe.transform(amount, "VND", "symbol", "1.0-0");
   }
  }

  public formatCurrency(amount: number): string {
    return this.currencyPipe.transform(amount, "VND", "symbol", "1.0-0");
   }
}
