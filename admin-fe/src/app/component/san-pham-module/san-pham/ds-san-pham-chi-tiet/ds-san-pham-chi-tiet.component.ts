import { CurrencyPipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
import { FilterSPCTParams } from "src/app/model/interface/filter-spct-params.interface";
import { PagedResponse } from "src/app/model/interface/paged-response.interface";
import { ChatLieuService } from "src/app/service/chat-lieu.service";
import { KichCoService } from "src/app/service/kick-co.service";
import { KieuCoAoService } from "src/app/service/kieu-co-ao.service";
import { KieuDangService } from "src/app/service/kieu-dang.service";
import { KieuTayAoService } from "src/app/service/kieu-tay-ao.service";
import { KieuThietKeService } from "src/app/service/kieu-thiet-ke.service";
import { MauSacService } from "src/app/service/mau-sac.service";
import { NotificationService } from "src/app/service/notification.service";
import { SanPhamChiTietService } from "src/app/service/san-pham-chi-tiet.service";
import { SanPhamService } from "src/app/service/san-pham.service";

@Component({
  selector: "app-ds-san-pham-chi-tiet",
  templateUrl: "./ds-san-pham-chi-tiet.component.html",
  styleUrls: ["./ds-san-pham-chi-tiet.component.css"],
})
export class DsSanPhamChiTietComponent {
  public isLoadding = false;
  public overlayText: string = "";

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
  public minAndMaxPrice: number[] = [];

  public selectedKichCoId: number = 0;
  public selectedKieuDangId: number = 0;
  public selectedThietKeId: number = 0;
  public selectedTayAoId: number = 0;
  public selectedCoAoId: number = 0;
  public selectedChatLieuId: number = 0;
  public minPrice: number;
  public maxPrice: number;

  public updateForm: FormGroup;
  public changeableMinPrice: number;
  public changeableMaxPrice: number;

  filterParams: FilterSPCTParams = {
    pageNumber: 1,
    pageSize: 5,
    minPrice: 0,
    maxPrice: 0,
    productId: 0,
    colorId: null,
    sizeId: null,
    formId: null,
    designId: null,
    sleeveId: null,
    collarId: null,
    materialId: null,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private toastr: ToastrService,
    private sanPhamChiTietService: SanPhamChiTietService,
    private sanPhamService: SanPhamService,
    private mauSacService: MauSacService,
    private kichCoService: KichCoService,
    private kieuDangService: KieuDangService,
    private kieuThietKeService: KieuThietKeService,
    private kieuTayAoService: KieuTayAoService,
    private kieuCoAoService: KieuCoAoService,
    private chatLieuService: ChatLieuService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.turnOnOverlay("Đang tải...");

    this.getSanPhamAndMinMaxPrice();
    this.getAllMauSac();
    this.getAllKichCo();
    this.getAllKieuDang();
    this.getAllThietKe();
    this.getAllTayAo();
    this.getAllCoAo();
    this.getAllChatLieu();
    this.initUpdateForm();

    setTimeout(() => {
      this.turnOffOverlay("");
    }, 500);
  }

  // I. public functions
  // 1
  public formatCurrency(amount: number): string {
    return this.currencyPipe.transform(amount, "VND", "symbol", "1.0-0");
  }

  // 2
  public onSelectField(event: any, field: string): void {
    if (event.target.value === "0") {
      this.filterParams[`${field}`] = null;
      this.getSpctByFilterParams();
      return;
    }
    this.filterParams[`${field}`] = event.target.value;
    this.getSpctByFilterParams();
  }

  // 3
  public goToPage(newPageNumber: number): void {
    this.filterParams.pageNumber = newPageNumber;
    this.getSpctByFilterParams();

    const ckBoxAll = document.getElementById("ckBoxAll") as HTMLInputElement;
    ckBoxAll.checked = false;
  }

  // 4
  public selectAllRows(): void {
    const ckBoxAll = document.getElementById(`ckBoxAll`) as HTMLInputElement;
    const selectedCkBoxs = document.querySelectorAll(`.ckBoxForUpdate`);

    for (let i = 0; i < selectedCkBoxs.length; i++) {
      const ckBox = selectedCkBoxs[i] as HTMLInputElement;
      ckBox.checked = ckBoxAll.checked;
    }
  }

  // 5
  public isUpdateBtnHidden(): boolean {
    const selectedCkBoxs = document.querySelectorAll(`.ckBoxForUpdate`);

    for (let i = 0; i < selectedCkBoxs.length; i++) {
      const ckBox = selectedCkBoxs[i] as HTMLInputElement;
      if (ckBox.checked) {
        return true;
      }
    }
    return false;
  }

  // 6
  public checkSelectedRow(rowId: string): boolean {
    const selectedCkBox = document.getElementById(`${rowId}`);
    if (!selectedCkBox) {
      return false;
    }

    const ckBox = selectedCkBox as HTMLInputElement;
    return ckBox.checked ? true : false;
  }

  // 7
  public onCheckboxChange(index: number): void {
    const row = document.getElementById(`row${index}`);
    const ckBox = document.getElementById(`ckBoxForUpdate${index}`);

    if (row) {
      const hasTableActiveClass = row.classList.contains("table-active");

      if (!(ckBox as HTMLInputElement).checked) {
        row.classList.remove("table-active");
      } else {
        row.classList.add("table-active");
      }
    }
  }

  // 8
  public formatNumber2(event: any, inputNameId: string): void {
    let value = event.target.value;
    if (value === "") {
      (document.getElementById(inputNameId) as HTMLInputElement).value = "0";
      return;
    }
    value = value.replace(/,/g, "");
    value = parseFloat(value).toLocaleString("en-US");
    (document.getElementById(inputNameId) as HTMLInputElement).value = value;
  }

  // 9
  public chinhSuaNhanh(pageSize: number): void {
    let xacNhan = confirm("Bạn có chắc muốn cập nhật nhanh?");
    if (xacNhan) {
      const ids: number[] = [];
      const giaNhaps: number[] = [];
      const giaBans: number[] = [];
      const soLuongs: number[] = [];
      for (let i = 0; i < pageSize; i++) {
        const ckBox = document.getElementById(
          `ckBoxForUpdate${i}`
        ) as HTMLInputElement;
        if (ckBox.checked) {
          console.log(ckBox as HTMLInputElement);
          const idValue = (
            document.getElementById(`id${i}`) as HTMLInputElement
          ).value;
          const giaNhapValue = (
            document.getElementById(`giaNhap${i}`) as HTMLInputElement
          ).value.replaceAll(",", "");
          const giaBanValue = (
            document.getElementById(`giaBan${i}`) as HTMLInputElement
          ).value.replaceAll(",", "");
          const soLuongValue = (
            document.getElementById(`soLuong${i}`) as HTMLInputElement
          ).value.replaceAll(",", "");
          ids.push(parseInt(idValue));
          giaNhaps.push(parseInt(giaNhapValue));
          giaBans.push(parseInt(giaBanValue));
          soLuongs.push(parseInt(soLuongValue));
          const updateNhanhReq = {
            ids: ids,
            giaNhaps: giaNhaps,
            giaBans: giaBans,
            soLuongs: soLuongs,
          };
          this.sanPhamChiTietService.updateNhanh(updateNhanhReq).subscribe({
            next: (response: string) => {
              this.toastr.success(response);
              this.getSanPhamAndMinMaxPrice();
            },
            error: (errorResponse: HttpErrorResponse) => {
              this.toastr.error(errorResponse.error.message);
            },
          });
          ckBox.checked = false;
        }
      }
    }
  }

  // 10
  public initUpdateForm(): void {
    this.updateForm = new FormGroup({
      id: new FormControl(0),
      sanPhamId: new FormControl(this.sanPham?.id),
      mauSacId: new FormControl(0, [Validators.required]),
      kichCoId: new FormControl(0, [Validators.required]),
      kieuDangId: new FormControl(0, [Validators.required]),
      thietKeId: new FormControl(0, [Validators.required]),
      tayAoId: new FormControl(0, [Validators.required]),
      coAoId: new FormControl(0, [Validators.required]),
      chatLieuId: new FormControl(0, [Validators.required]),
      giaNhap: new FormControl(0, [Validators.required]),
      giaBan: new FormControl(0, [Validators.required]),
      soLuong: new FormControl(0, [Validators.required]),
    });
  }

  // 11
  public selectUpdateSPCT(spctId: number): void {
    this.sanPhamChiTietService.getOneById(spctId).subscribe({
      next: (response: SanPhamChiTiet) => {
        this.updateForm = new FormGroup({
          id: new FormControl(response.id),
          sanPhamId: new FormControl(this.sanPham?.id),
          mauSacId: new FormControl(response.mauSac.id, [Validators.required]),
          kichCoId: new FormControl(response.kichCo.id, [Validators.required]),
          kieuDangId: new FormControl(response.kieuDang.id, [
            Validators.required,
          ]),
          thietKeId: new FormControl(response.thietKe.id, [
            Validators.required,
          ]),
          tayAoId: new FormControl(response.tayAo.id, [Validators.required]),
          coAoId: new FormControl(response.coAo.id, [Validators.required]),
          chatLieuId: new FormControl(response.chatLieu.id, [
            Validators.required,
          ]),
          giaNhap: new FormControl(response.giaNhap, [Validators.required]),
          giaBan: new FormControl(response.giaBan, [Validators.required]),
          soLuong: new FormControl(response.soLuongTon, [Validators.required]),
        });
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.toastr.error(errorResponse.error.message);
      },
    });
  }

  // 12
  public updateSpct(): void {
    this.sanPhamChiTietService.update(this.updateForm.value).subscribe({
      next: (response: string) => {
        this.notifService.success(response);
        this.getSanPhamAndMinMaxPrice();
        document.getElementById("closeUpdateBtn").click();
      },
      error: (errorResponse: HttpErrorResponse) => {
        const message = JSON.parse(errorResponse.error).message;
        this.notifService.error(message);
      },
    });
  }

  //
  public onMinPriceChange(e: any): void {
    this.changeableMinPrice = e.target.value;
    this.minPrice = e.target.value;
    this.filterParams.minPrice = e.target.value;
    this.getSpctByFilterParams();
  }

  //
  public onMaxPriceChange(e: any): void {
    this.changeableMaxPrice = e.target.value;
    this.maxPrice = e.target.value;
    this.filterParams.maxPrice = e.target.value;
    this.getSpctByFilterParams();
  }

  //
  public changeStatus(id: number): void {
    this.sanPhamChiTietService.changeStatus(id).subscribe({
      next: (response: string) => {
        this.toastr.success(response, "");
        this.getSpctByFilterParams();
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
        this.notifService.error(JSON.parse(errorResponse.error).message);
      },
    });
  }

  public onChangePageSize(e: any): void {
    this.filterParams.pageSize = e.target.value;
    this.getSpctByFilterParams();
  }

  // II. private functions
  // 1
  private getSanPhamAndMinMaxPrice(): void {
    this.activatedRoute.params.subscribe((params) => {
      let productId = params["sanPhamId"];
      this.filterParams.productId = productId;

      // get sp by ID
      this.sanPhamService.getById(productId).subscribe({
        next: (response: SanPham) => {
          this.sanPham = response;
          this.updateForm.get("sanPhamId").setValue(response.id);
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
        },
      });

      // get min price and max price in spctList of sp
      this.sanPhamChiTietService.getMinAndMaxPrice(productId).subscribe({
        next: (response: number[]) => {
          this.minPrice = response[0];
          this.changeableMinPrice = response[0];
          this.maxPrice = response[1];
          this.changeableMaxPrice = response[1];
          this.minAndMaxPrice = response;

          this.filterParams.minPrice = this.minPrice;
          this.filterParams.maxPrice = this.maxPrice;

          // get spctList of sp
          this.getSpctByFilterParams();
        },
        error: (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
        },
      });
    });
  }

  // 2
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

  // 3
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

  // 4
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

  // 5
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

  // 6
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

  // 7
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

  // 8
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

  // 9
  private getSpctByFilterParams(): void {
    this.sanPhamChiTietService.filterSPCTByPage(this.filterParams).subscribe({
      next: (response: PagedResponse<SanPhamChiTiet>) => {
        this.pagedResponse = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      },
    });
  }

  // 10
  private turnOnOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = true;
  }

  // 11
  private turnOffOverlay(text: string): void {
    this.overlayText = text;
    this.isLoadding = false;
  }
}
