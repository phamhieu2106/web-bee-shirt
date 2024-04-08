import { ChatLieuService } from "src/app/service/chat-lieu.service";
import { KieuCoAoService } from "src/app/service/kieu-co-ao.service";
import { KieuTayAoService } from "src/app/service/kieu-tay-ao.service";
import { KieuThietKeService } from "src/app/service/kieu-thiet-ke.service";
import { KieuDangService } from "src/app/service/kieu-dang.service";
import { KichCoService } from "src/app/service/kick-co.service";
import { MauSacService } from "src/app/service/mau-sac.service";
import { Component, EventEmitter, Output } from "@angular/core";
import { SanPhamChiTietService } from "src/app/service/san-pham-chi-tiet.service";
import { MauSac } from "src/app/model/class/mau-sac.class";
import { KichCo } from "src/app/model/class/kich-co.class";
import { KieuDang } from "src/app/model/class/kieu-dang.class";
import { KieuThietKe } from "src/app/model/class/kieu-thiet-ke.class";
import { TayAo } from "src/app/model/class/tay-ao.class";
import { CoAo } from "src/app/model/class/co-ao.class";
import { ChatLieu } from "src/app/model/class/chat-lieu.class";
import { SanPhamChiTiet } from "src/app/model/class/san-pham-chi-tiet.class";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";

@Component({
  selector: "app-search-product-detail",
  templateUrl: "./search-product-detail.component.html",
  styleUrls: ["./search-product-detail.component.css"],
})
export class SearchProductDetailComponent {
  //
  @Output() chooseProduct = new EventEmitter<SanPhamChiTiet>();

  // field filter
  minPrice: number = 0;
  maxPrice: number = 0;
  search: string = "";
  mauSac: string = "";
  kichCo: string = "";
  kieuDang: string = "";
  thietKe: string = "";
  tayAo: string = "";
  coAo: string = "";
  chatLieu: string = "";
  pageNumber: number = 1;
  // variable
  minValue: number = 0;
  maxValue: number = 999999999999999;
  step: number = 1000;
  spctPage: PagedResponse<SanPhamChiTiet>;
  mauSacs: MauSac[] = [];
  kichCos: KichCo[] = [];
  kieuDangs: KieuDang[] = [];
  thietKes: KieuThietKe[] = [];
  tayAos: TayAo[] = [];
  coAos: CoAo[] = [];
  chatLieus: ChatLieu[] = [];
  constructor(
    private spctService: SanPhamChiTietService,
    private mauSacService: MauSacService,
    private kichCoService: KichCoService,
    private kieuDangService: KieuDangService,
    private thietKeService: KieuThietKeService,
    private tayAoService: KieuTayAoService,
    private coAoService: KieuCoAoService,
    private chatLieuService: ChatLieuService
  ) {
    this.getMinMaxPrice();
  }
  ngOnInit(): void {
    this.getAllMauSac();
    this.getAllKichCo();
    this.getAllKieuDang();
    this.getAllThietKe();
    this.getAllTayAo();
    this.getAllCoAo();
    this.getAllChatLieu();
    this.getAllSpct();
  }

  validateRanger() {
    if (this.minValue > this.maxValue) {
      let temp = this.minValue;
      this.minValue = this.maxValue;
      this.maxValue = temp;
    }
    setTimeout(() => {
      this.getAllSpct();
    }, 100);
  }
  getMinMaxPrice() {
    this.spctService.getMinMaxPrice().subscribe({
      next: (resp) => {
        this.minPrice = resp[0];
        this.minValue = resp[0];
        this.maxPrice = resp[1];
        this.maxValue = resp[1];
      },
    });
  }

  getAllKieuDang() {
    this.kieuDangService.getAll().subscribe({
      next: (resp) => {
        this.kieuDangs = resp;
      },
      error: (err) => console.log(err),
    });
  }

  getAllThietKe() {
    this.thietKeService.getAll().subscribe({
      next: (resp) => (this.thietKes = resp),
      error: (err) => console.log(err),
    });
  }

  getAllTayAo() {
    this.tayAoService.getAll().subscribe({
      next: (resp) => (this.tayAos = resp),
      error: (err) => console.log(err),
    });
  }

  getAllCoAo() {
    this.coAoService.getAll().subscribe({
      next: (resp) => {
        this.coAos = resp;
      },
      error: (err) => console.log(err),
    });
  }

  getAllChatLieu() {
    this.chatLieuService.getAll().subscribe({
      next: (resp) => (this.chatLieus = resp),
      error: (err) => console.log(err),
    });
  }

  getAllMauSac() {
    this.mauSacService.getAll().subscribe({
      next: (resp) => (this.mauSacs = resp),
      error: (err) => console.log(err),
    });
  }

  getAllKichCo() {
    this.kichCoService.getAll().subscribe({
      next: (resp) => (this.kichCos = resp),
      error: (err) => console.log(err),
    });
  }

  getAllSpct() {
    this.spctService
      .getAllDetail(
        this.pageNumber,
        this.search.trim(),
        this.mauSac,
        this.kichCo,
        this.kieuDang,
        this.thietKe,
        this.tayAo,
        this.coAo,
        this.chatLieu,
        this.minValue,
        this.maxValue
      )
      .subscribe({
        next: (resp) => {
          this.spctPage = resp;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  changepage(page: number) {
    this.pageNumber = page;
    this.getAllSpct();
  }

  getGiaBan(spct: SanPhamChiTiet): number {
    return this.spctService.getGiaBan(spct);
  }

  chooseSPCT(spct: SanPhamChiTiet) {
    this.chooseProduct.emit(spct);
    this.getAllSpct();
  }
}
