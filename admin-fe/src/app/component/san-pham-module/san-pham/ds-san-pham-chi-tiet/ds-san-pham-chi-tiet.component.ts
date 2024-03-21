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
import { ProductDiscountResponse } from "src/app/model/interface/product-discount-response";
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
import Swal, { SweetAlertResult } from "sweetalert2";

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

  public selectedImgFileList: File[] = [];
  public uploadImgFileList: File[] = [];
  public currentMauSacId: number = 0;

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

  // constructor, ngOn
  constructor(
    private activatedRoute: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private toastr: ToastrService,
    private spctService: SanPhamChiTietService,
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
          this.spctService.updateNhanh(updateNhanhReq).subscribe({
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
    this.spctService.getOneById(spctId).subscribe({
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
    this.spctService.update(this.updateForm.value).subscribe({
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
    this.spctService.changeStatus(id).subscribe({
      next: (response: string) => {
        this.toastr.success(response, "");
        this.getSpctByFilterParams();
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.notifService.error(JSON.parse(errorResponse.error).message);
      },
    });
  }

  //
  public onChangePageSize(e: any): void {
    this.filterParams.pageSize = e.target.value;
    this.getSpctByFilterParams();
  }

  //
  public openModalChinhSuaAnh(spctId: number, mauSacId: number): void {
    document.getElementById("triggerUpdateAnhModal").click();
    this.currentMauSacId = mauSacId;
    console.log(spctId);
    console.log(this.sanPham.id);
    console.log(mauSacId);
  }

  //
  public openInputUpdateImg(): void {
    document.getElementById("inputUpdateImg").click();
  }

  //
  public changeInput(event: any): void {
    for (let i = 0; i < event.target["files"].length; i++) {
      let currentFile = event.target["files"][i];
      if (!this.checkUploadImage(currentFile.name, this.uploadImgFileList)) {
        this.uploadImgFileList.push(currentFile);
      }
    }

    // show list ảnh vừa được chọn
    for (let i = 0; i < this.uploadImgFileList.length; i++) {
      this.showImageThumbnail(this.uploadImgFileList[i], `uploadImg${i}`);
    }
  }

  //
  public isUploadImgChecked(fileName: string): boolean {
    for (let i = 0; i < this.selectedImgFileList.length; i++) {
      if (this.selectedImgFileList[i].name === fileName) {
        return true;
      }
    }
    return false;
  }

  //
  public toggleUploadImage(chkBoxIndex: number, file: File, event: any): void {
    const isChecked = event.target.checked;
    if (this.selectedImgFileList.length === 5 && isChecked) {
      this.notifService.warning("Không chọn quá 5 ảnh!");

      const currentCheckbox = document.getElementById(
        `chkBoxUploadImg${chkBoxIndex}`
      ) as HTMLInputElement;
      currentCheckbox.checked = !currentCheckbox.checked;
      return;
    }

    if (isChecked) {
      this.selectedImgFileList.push(file);
    } else {
      this.selectedImgFileList = this.selectedImgFileList.filter(
        (item: File) => item.name !== file.name
      );
    }

    // show ảnh
    for (let i = 0; i < this.selectedImgFileList.length; i++) {
      this.showImageThumbnail(this.selectedImgFileList[i], `selectedImg2${i}`);
    }
  }

  //
  public updateAnhSpct(): void {
    Swal.fire({
      title: "Cập nhật ảnh sản phẩm?",
      cancelButtonText: "Hủy",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Thêm",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        if (this.selectedImgFileList.length > 0) {
          this.spctService
            .updateImages(
              this.selectedImgFileList,
              this.sanPham.id,
              this.currentMauSacId
            )
            .subscribe({
              next: (response: any) => {
                this.notifService.success(response);
              },
              error: (errorResponse: HttpErrorResponse) => {
                this.notifService.error(errorResponse.error.message);
              },
            });
        } else {
          this.notifService.error("Bạn chưa chọn ảnh!");
        }
      }
    });
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
        error: (errorResponse: HttpErrorResponse) => {},
      });

      // get min price and max price in spctList of sp
      this.spctService.getMinAndMaxPrice(productId).subscribe({
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
        error: (errorResponse: HttpErrorResponse) => {},
      });
    });
  }

  // 2
  private getAllMauSac(): void {
    this.mauSacService.getAll().subscribe({
      next: (response: MauSac[]) => {
        this.mauSacs = response;
      },
      error: (errorResponse: HttpErrorResponse) => {},
    });
  }

  // 3
  private getAllKichCo(): void {
    this.kichCoService.getAll().subscribe({
      next: (response: KichCo[]) => {
        this.kichCos = response;
      },
      error: (errorResponse: HttpErrorResponse) => {},
    });
  }

  // 4
  private getAllKieuDang(): void {
    this.kieuDangService.getAll().subscribe({
      next: (response: KieuDang[]) => {
        this.kieuDangs = response;
      },
      error: (errorResponse: HttpErrorResponse) => {},
    });
  }

  // 5
  private getAllThietKe(): void {
    this.kieuThietKeService.getAll().subscribe({
      next: (response: KieuThietKe[]) => {
        this.thietKes = response;
      },
      error: (errorResponse: HttpErrorResponse) => {},
    });
  }

  // 6
  private getAllTayAo(): void {
    this.kieuTayAoService.getAll().subscribe({
      next: (response: TayAo[]) => {
        this.tayAos = response;
      },
      error: (errorResponse: HttpErrorResponse) => {},
    });
  }

  // 7
  private getAllCoAo(): void {
    this.kieuCoAoService.getAll().subscribe({
      next: (response: CoAo[]) => {
        this.coAos = response;
      },
      error: (errorResponse: HttpErrorResponse) => {},
    });
  }

  // 8
  private getAllChatLieu(): void {
    this.chatLieuService.getAll().subscribe({
      next: (response: ChatLieu[]) => {
        this.chatLieus = response;
      },
      error: (errorResponse: HttpErrorResponse) => {},
    });
  }

  // 9
  private getSpctByFilterParams(): void {
    this.spctService.filterSPCTByPage(this.filterParams).subscribe({
      next: (response: PagedResponse<SanPhamChiTiet>) => {
        this.pagedResponse = response;
      },
      error: (errorResponse: HttpErrorResponse) => {},
    });
    this.getProductInDiscount(this.filterParams.productId);
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

  // 12
  private checkUploadImage(fileName: string, curUploadImgFileList: File[]) {
    return curUploadImgFileList.some((file: File) => file.name === fileName);
  }

  // 13
  private showImageThumbnail(file: File, thumnailId: string): void {
    let reader = new FileReader();
    reader.onload = (e) => {
      (document.getElementById(thumnailId) as HTMLImageElement)["src"] = e
        .target.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Get Product In Discount
  public listProductInDiscount: ProductDiscountResponse[];
  private getProductInDiscount(id: number): void {
    this.sanPhamService.getListSanPhamChiTietInDiscount(id).subscribe({
      next: (value) => {
        this.listProductInDiscount = value;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }
  public returnNewPrice(id: number, giaBan: number): number {
    if (this.listProductInDiscount && this.listProductInDiscount.length > 0) {
      const productInDiscount = this.listProductInDiscount.find(
        (product) => product.id === id
      );
      if (productInDiscount) {
        // Nếu sản phẩm có trong danh sách, tính toán giá bán mới dựa trên phần trăm giảm
        const phanTranGiam = productInDiscount.phanTramGiam;
        const giaBanMoi = giaBan * (1 - phanTranGiam / 100);
        return giaBanMoi; // Trả về giá bán mới
      }
    }
    return giaBan; // Nếu không tìm thấy sản phẩm hoặc mảng không được khởi tạo, trả về giá ban đầu
  }

  public isDiscounted(id: number): boolean {
    if (this.listProductInDiscount && this.listProductInDiscount.length > 0) {
      return this.listProductInDiscount.some((p) => p.id === id);
    }
    return false;
  }
}
