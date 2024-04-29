import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";


import { PhieuGiamGia } from "src/app/model/class/phieu-giam-gia.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { PhieuGiamGiaService } from "src/app/service/phieu-giam-gia.service";
import { Subscription } from "rxjs";
import { CurrencyPipe } from "@angular/common";




@Component({
  selector: "app-danh-sach-phieu",
  templateUrl: "./danh-sach-phieu.component.html",
  styleUrls: ["./danh-sach-phieu.component.css"],
})
export class DanhSachPhieuComponent {
  public pagedResponse: PagedResponse<PhieuGiamGia>;
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


   
  }


  public kieu: number[] = [0, 1];
  public loai: number[] = [0, 1];
  public trangThai: string[] = ["Đang diễn ra","Sắp diễn ra","Đã kết thúc"];
  public thoiGianBatDau: string =""
  public thoiGianKetThuc: string=""
  keyword: string

  private timeout: any;

  @ViewChild("inputName") inputNameRef: ElementRef;





  public timKiem(e: any): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.keyword = e.target.value;
    // Loại bỏ dấu cách thừa giữa các từ trong chuỗi keyword
    const keywordWithoutExtraSpaces = this.keyword.replace(/\s+/g, ' ');

    this.keyword = this.keyword.trim();
    // Gán giá trị đã được xử lý vào thuộc tính this.keyword
    this.keyword = keywordWithoutExtraSpaces;

    this.timeout = setTimeout(() => {
      this.goToPage(
        this.pagedResponse.pageNumber,
        this.pagedResponse.pageSize,
        this.keyword 
      );
    }, 500);
  }




  filterObject: any = null;
  pageSize: number = 5;
  pageNumber: number = 1;
  onChangeFilter() {
    this.filterObject = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      search: this.search,
      kieu: this.kieu,
      loai: this.loai,
      trangThai: this.trangThai,
      thoiGianBatDau: this.thoiGianBatDau,
      thoiGianKetThuc: this.thoiGianKetThuc
    };
    this.goToPage(
      this.filterObject.pageNumber,
      this.filterObject.pageSize,
      this.filterObject.search
    );
  }




  reloadFilter(): void {
    this.search = "";
    this.kieu = [0, 1];
    this.loai = [0, 1];
    this.trangThai = ['Đang diễn ra', 'Sắp diễn ra', 'Đã kết thúc'];

    this.thoiGianBatDau = '';
    this.thoiGianKetThuc = '';
    this.pageSize = 5;
    this.pageNumber = 1;
    this.getPhieuGiamGiaList();
    this.filterObject = null;
  }


  public goToPage(page: number, pageSize: number, keyword: string): void {
    if (this.filterObject) {
      this.phieuGiamGiaService
        .filter(
          page,
          pageSize,
          keyword,
          this.filterObject.kieu,
          this.filterObject.loai,
          this.filterObject.trangThai,
          this.filterObject.thoiGianBatDau,
          this.filterObject.thoiGianKetThuc,
        )
        .subscribe({
          next: (response: PagedResponse<PhieuGiamGia>) => {
            this.pagedResponse = response;
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
          },
        });
    } else {
      this.phieuGiamGiaService.getAll(page, pageSize, keyword).subscribe({
        next: (response: PagedResponse<PhieuGiamGia>) => {
          this.pagedResponse = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => {
          console.log(this.pagedResponse);
        },
      });
    }
  }

  
 


 




public changeStatus(id: number): void {
  this.phieuGiamGiaService.changeStatus(id).subscribe();
}


public onChangePageSize(): void {
  this.goToPage(this.pageNumber, this.pageSize, this.search);
}

  //private function
  private getPhieuGiamGiaList(): void {
    this.phieuGiamGiaService.getAll().subscribe({
      next: (response: PagedResponse<PhieuGiamGia>) => {
        this.pagedResponse = response;

      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
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
