import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { ToastrService } from "ngx-toastr";
import { ChatLieu } from "src/app/model/class/chat-lieu.class";
import { CoAo } from "src/app/model/class/co-ao.class";
import { KichCo } from "src/app/model/class/kich-co.class";
import { KieuDang } from "src/app/model/class/kieu-dang.class";
import { KieuThietKe } from "src/app/model/class/kieu-thiet-ke.class";
import { MauSac } from "src/app/model/class/mau-sac.class";

import { SanPhamChiTiet } from "src/app/model/class/san-pham-chi-tiet.class";
import { SanPham } from "src/app/model/class/san-pham.class";
import { TayAo } from "src/app/model/class/tay-ao.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { ChatLieuService } from "src/app/service/chat-lieu.service";
import { KichCoService } from "src/app/service/kick-co.service";
import { KieuCoAoService } from "src/app/service/kieu-co-ao.service";
import { KieuDangService } from "src/app/service/kieu-dang.service";
import { KieuTayAoService } from "src/app/service/kieu-tay-ao.service";
import { KieuThietKeService } from "src/app/service/kieu-thiet-ke.service";
import { MauSacService } from "src/app/service/mau-sac.service";
import { SanPhamChiTietService } from "src/app/service/san-pham-chi-tiet.service";
import { SanPhamService } from "src/app/service/san-pham.service";

@Component({
  selector: "app-ds-san-pham-chi-tiet",
  templateUrl: "./ds-san-pham-chi-tiet.component.html",
  styleUrls: ["./ds-san-pham-chi-tiet.component.css"],
})
export class DsSanPhamChiTietComponent {
  public addForm: FormGroup;
  public content: string;
  public pagedResponse: PagedResponse<SanPhamChiTiet>;
  public sanPham: SanPham;

  public mauSacs: MauSac[] = [];
  public kichCos: KichCo[] = [];
  public kieuDangs: KieuDang[] = [];
  public thietKes: KieuThietKe[] = [];
  public tayAos: TayAo[] = [];
  public coAos: CoAo[] = [];
  public chatLieus: ChatLieu[] = [];

  public selectedMauSacId: number = 0;
  public selectedKichCoId: number = 0;
  public selectedKieuDangId: number = 0;
  public selectedThietKeId: number = 0;
  public selectedTayAoId: number = 0;
  public selectedCoAoId: number = 0;
  public selectedChatLieuId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private sanPhamChiTietService: SanPhamChiTietService,
    private sanPhamService: SanPhamService,
    private mauSacService: MauSacService,
    private kichCoService: KichCoService,
    private kieuDangService: KieuDangService,
    private kieuThietKeService: KieuThietKeService,
    private kieuTayAoService: KieuTayAoService,
    private kieuCoAoService: KieuCoAoService,
    private chatLieuService: ChatLieuService
  ) {}

  ngOnInit(): void {
    this.getSpChiTietBySpId();
    this.getAllMauSac();
    this.getAllKichCo();
    this.getAllKieuDang();
    this.getAllThietKe();
    this.getAllTayAo();
    this.getAllCoAo();
    this.getAllChatLieu();
  }

  // public functions
  public formatCurrency(amount: number): string {
    return this.currencyPipe.transform(amount, "VND", "symbol", "1.0-0");
  }

  // on select field
  public onSelectMauSac(event: any): void {
    this.selectedMauSacId = event.target.value;
  }

  public goToPage(
    page: number = 1,
    pageSize: number = 5,
    keyword: string = ""
  ): void {
    this.sanPhamChiTietService.getAll(page, pageSize, keyword).subscribe({
      next: (response: PagedResponse<SanPhamChiTiet>) => {
        this.pagedResponse = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  public onClearSearchInput(): void {
    this.goToPage();
  }

  // private functions
  private getSpChiTietBySpId(): void {
    this.activatedRoute.params.subscribe((params) => {
      let spId = params["sanPhamId"];

      this.sanPhamService.getById(spId).subscribe({
        next: (response: SanPham) => {
          this.sanPham = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });

      this.sanPhamChiTietService.getByPage(spId).subscribe({
        next: (response: PagedResponse<SanPhamChiTiet>) => {
          this.pagedResponse = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
      });
    });
  }

  private getAllMauSac(): void {
    this.mauSacService.getAll().subscribe({
      next: (response: MauSac[]) => {
        this.mauSacs = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  private getAllKichCo(): void {
    this.kichCoService.getAll().subscribe({
      next: (response: KichCo[]) => {
        this.kichCos = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  private getAllKieuDang(): void {
    this.kieuDangService.getAll().subscribe({
      next: (response: KieuDang[]) => {
        this.kieuDangs = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  private getAllThietKe(): void {
    this.kieuThietKeService.getAll().subscribe({
      next: (response: KieuThietKe[]) => {
        this.thietKes = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  private getAllTayAo(): void {
    this.kieuTayAoService.getAll().subscribe({
      next: (response: TayAo[]) => {
        this.tayAos = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  private getAllCoAo(): void {
    this.kieuCoAoService.getAll().subscribe({
      next: (response: CoAo[]) => {
        this.coAos = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }

  private getAllChatLieu(): void {
    this.chatLieuService.getAll().subscribe({
      next: (response: ChatLieu[]) => {
        this.chatLieus = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
