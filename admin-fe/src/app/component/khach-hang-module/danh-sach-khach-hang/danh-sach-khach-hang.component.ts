import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { KhachHangResponse } from 'src/app/model/interface/khach-hang-response.interface';
import { PagedResponse } from 'src/app/model/interface/paged-response.interface';
import { KhachHangService } from 'src/app/service/khach-hang.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-danh-sach-khach-hang',
  templateUrl: './danh-sach-khach-hang.component.html',
  styleUrls: ['./danh-sach-khach-hang.component.css']
})
export class DanhSachKhachHangComponent {
  icon: string = "fa-solid fa-users";
  title: string = "khách hàng";
  mainHeading: string = "khách hàng"; 
  
  public pagedResponse: PagedResponse<KhachHangResponse>;
  public search = "";
  public khachHangDetail: KhachHangResponse;
  public khDetail: KhachHangResponse;
  public formUpdateKH: FormGroup; 

  constructor(
    private khachHangService: KhachHangService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getKhachHangList();
  }

    public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.khachHangService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<KhachHangResponse>) => {
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

 
    // private function
  private getKhachHangList(): void {
    this.khachHangService.getAll().subscribe({
      next: (response: PagedResponse<KhachHangResponse>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public openDetailsForm(id: number): void {
    this.khachHangService.getById(id).subscribe({
      next: (response) => {
        this.khachHangDetail = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
