import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PhieuGiamGia } from 'src/app/model/class/phieu-giam-gia.class';
import { KhachHangResponse } from 'src/app/model/interface/khach-hang-response.interface';
import { PagedResponse } from 'src/app/model/interface/paged-response.interface';
import { KhachHangService } from 'src/app/service/khach-hang.service';
import { PhieuGiamGiaService } from 'src/app/service/phieu-giam-gia.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PhieuGiamGiaKhachHang } from 'src/app/model/class/phieu-giam-gia-khach-hang.class';

@Component({
  selector: 'app-sua-phieu',
  templateUrl: './sua-phieu.component.html',
  styleUrls: ['./sua-phieu.component.css']
})
export class SuaPhieuComponent implements OnInit {

  public pagedResponse: PagedResponse<KhachHangResponse>;
  public search = "";
  public idPhieu: number

  phieu: PhieuGiamGia;

  public updateForm: any;

  constructor(private phieuGiamGia: PhieuGiamGiaService,
    private khachHangService: KhachHangService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {

    this.initUpdateForm();
    this.idPhieu = this.route.snapshot.params["id"];
    this.phieuGiamGia.getOne(this.idPhieu).subscribe({
      next: (response) => {
        this.phieu = response;
        this.initUpdateForm(this.phieu);
      },
      error: (error) => {
        console.error('Khong lấy được phiếu:', error);

      }

    })

    this.getKhachHangList();
    this.getPhieuKhachHang();
  }


  // Phiếu giảm giá

  public initUpdateForm(phieu?: PhieuGiamGia): void {

    this.updateForm = new FormGroup({
      maPhieuGiamGia: new FormControl(phieu?.maPhieuGiamGia, [Validators.required]),
      tenPhieuGiamGia: new FormControl(phieu?.tenPhieuGiamGia, [Validators.required]),
      kieu: new FormControl(phieu?.kieu, [Validators.required]),
      giaTri: new FormControl(phieu?.giaTri, [Validators.required]),
      giaTriMax: new FormControl(phieu?.giaTriMax, [Validators.required]),
      soLuong: new FormControl(phieu?.soLuong, [Validators.required]),
      dieuKienGiam: new FormControl(phieu?.dieuKienGiam, [Validators.required]),
      thoiGianBatDau: new FormControl(phieu?.thoiGianBatDau, [Validators.required]),
      thoiGianKetThuc: new FormControl(phieu?.thoiGianKetThuc, [Validators.required]),


    })
  }
  // Khách Hàng

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.khachHangService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<KhachHangResponse>) => {
        this.pagedResponse = response;
        console.log(response);
        console.log("get dc");
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

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


  private getPhieuKhachHang(): void {
    this.phieuGiamGia.getAllPhieuKhachHang().subscribe({
      next: (response: PhieuGiamGiaKhachHang[]) => {

        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  public onChangePageSize(e: any): void {
    this.goToPage(1, e.target.value, this.search);
  }


  selectedIds: number[] = [];
  phieuGiamGiaId: number

  onCheckboxChange(id: number): void {
    const index = this.selectedIds.indexOf(id);

    if (index === -1) {
      // Nếu ID không tồn tại trong danh sách, thêm vào
      this.selectedIds.push(id);
    } else {
      // Nếu ID đã tồn tại trong danh sách, loại bỏ nó
      this.selectedIds.splice(index, 1);
    }
  }



}
